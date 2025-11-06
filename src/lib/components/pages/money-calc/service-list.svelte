<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '$lib/components/ui/card/card.svelte';
  import CardContent from '$lib/components/ui/card/card-content.svelte';
  import CardHeader from '$lib/components/ui/card/card-header.svelte';
  import CardTitle from '$lib/components/ui/card/card-title.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import type { Service } from '$lib/models/service';
  import { moneyCalcStore } from '$lib/stores/money-calc';
  import { formatNumber, parseNumber } from '$lib/utils/number';
  import ListCheckIcon from '$lib/components/ui/icons/list-check.svelte';

  const buildPersonCheckboxId = (serviceId: string, personName: string) =>
    `service-${serviceId}-person-${personName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;

  const ensureUnique = (items: string[]): string[] => Array.from(new Set(items));

  const toggleExpanded = (serviceId: string) => {
    if (expandedServices.includes(serviceId)) {
      expandedServices = expandedServices.filter((id) => id !== serviceId);
    } else {
      expandedServices = ensureUnique([...expandedServices, serviceId]);
    }
  };

  const toggleAllParticipants = (serviceId: string, checked: boolean) => {
    $moneyCalcStore.people.forEach((person) => {
      moneyCalcStore.handleContributionChange(serviceId, person, 'used', checked);
      if (!checked) {
        moneyCalcStore.handleContributionChange(serviceId, person, 'paid', 0);
      }
    });
  };

  const shareEvenly = (service: Service) => {
    const contributions = $moneyCalcStore.contributions[service.id] ?? {};
    let participants = $moneyCalcStore.people.filter((person) => contributions[person]?.used);

    if (participants.length === 0) {
      participants = [...$moneyCalcStore.people];
      participants.forEach((person) => {
        moneyCalcStore.handleContributionChange(service.id, person, 'used', true);
      });
    }

    if (participants.length === 0) {
      return;
    }

    const baseShare = Math.floor(service.cost / participants.length);
    const remainder = service.cost - baseShare * participants.length;

    participants.forEach((person, index) => {
      const amount = baseShare + (index < remainder ? 1 : 0);
      moneyCalcStore.handleContributionChange(service.id, person, 'paid', amount);
    });

    expandedServices = ensureUnique([...expandedServices, service.id]);
  };

  let expandedServices: string[] = [];
  let previousServiceIds: string[] = [];

  $: {
    const currentIds = $moneyCalcStore.services.map((service) => service.id);
    const addedIds = currentIds.filter((id) => !previousServiceIds.includes(id));
    if (addedIds.length > 0) {
      expandedServices = ensureUnique([...expandedServices, ...addedIds]);
    }
    previousServiceIds = currentIds;
  }

  const formatCurrency = (value: number): string => formatNumber(value ?? 0);
</script>

<Card className="shadow-xl shadow-black/5" data-tour="service-list">
  <CardHeader className="flex-row items-center justify-between gap-3 border-b border-border/60 bg-gradient-to-r from-secondary/20 via-secondary/10 to-transparent pb-4">
    <div class="flex items-center gap-3">
      <div class="hidden h-11 w-11 items-center justify-center rounded-xl bg-secondary/25 text-secondary-foreground md:flex">
        <ListCheckIcon size={22} />
      </div>
      <div class="space-y-1">
        <CardTitle>Danh sách dịch vụ</CardTitle>
        {#if $moneyCalcStore.services.length > 0}
          <p class="text-sm text-muted-foreground">
            Quản lý khoản chi, tick người sử dụng và nhập số tiền đã trả.
          </p>
        {:else}
          <p class="text-sm text-muted-foreground">
            Ghi lại các khoản chi tiêu chung để chia tiền rõ ràng.
          </p>
        {/if}
      </div>
    </div>
    <Button className="md:hidden" on:click={() => moneyCalcStore.setIsAddServiceSheetOpen(true)}>
      + Thêm dịch vụ
    </Button>
  </CardHeader>
  <CardContent className="space-y-4">
    {#if $moneyCalcStore.services.length === 0}
      <div class="rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <h3 class="text-base font-semibold text-foreground">Chưa có dịch vụ nào được ghi lại</h3>
        <p class="mt-2 text-sm text-muted-foreground">
          Sử dụng nút “+ Thêm dịch vụ” để mở biểu mẫu, nhập tên khoản chi và số tiền tương ứng.
        </p>
        <Button
          className="mt-4 w-full md:w-auto"
          variant="secondary"
          on:click={() => moneyCalcStore.setIsAddServiceSheetOpen(true)}
        >
          + Thêm dịch vụ
        </Button>
      </div>
    {:else}
      <ul class="space-y-4">
        {#each $moneyCalcStore.services as service (service.id)}
          {@const contributions = $moneyCalcStore.contributions[service.id] ?? {}}
          {@const usedPeople = $moneyCalcStore.people.filter(
            (person) => contributions[person]?.used
          )}
          {@const totalPaid = usedPeople.reduce(
            (sum, person) => sum + (contributions[person]?.paid ?? 0),
            0
          )}
          {@const balance = service.cost - totalPaid}
          {@const expanded = expandedServices.includes(service.id)}
          {@const serviceNameInputId = `service-${service.id}-name`}
          {@const serviceCostInputId = `service-${service.id}-cost`}

          <li class="rounded-2xl border border-border bg-background/95 shadow-sm transition">
            <div class="flex flex-col gap-5 p-5">
              <div class="flex flex-col gap-4 rounded-xl bg-muted/15 p-4">
                <div class="flex flex-col gap-2">
                  <span
                    class="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Tên dịch vụ
                  </span>
                  <Input
                    id={serviceNameInputId}
                    className="text-base font-medium"
                    placeholder="Ví dụ: Tiền cà phê"
                    value={service.name}
                    on:change={(event) => {
                      const target = event.currentTarget as HTMLInputElement;
                      moneyCalcStore.handleUpdateServiceName(service.id, target.value);
                    }}
                  />
                </div>

                <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div class="flex flex-col gap-1 md:w-48">
                    <span
                      class="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Tổng chi phí
                    </span>
                    <div class="flex items-center gap-2">
                      <Input
                        id={serviceCostInputId}
                        type="text"
                        inputmode="numeric"
                        className="text-base"
                        placeholder="0"
                        value={formatNumber(service.cost)}
                        on:input={(event) => {
                          const target = event.currentTarget as HTMLInputElement;
                          const cost = parseNumber(target.value);
                          moneyCalcStore.handleUpdateServiceCost(service.id, cost);
                        }}
                      />
                      <span class="text-sm text-muted-foreground">đ</span>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center justify-end gap-2 md:flex-row">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 md:flex-none"
                      on:click={() => shareEvenly(service)}
                    >
                      Chia đều
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 md:flex-none"
                      on:click={() => toggleExpanded(service.id)}
                    >
                      {#if expanded}
                        Thu gọn
                      {:else}
                        Chi tiết
                      {/if}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 md:flex-none"
                      on:click={() => moneyCalcStore.handleRemoveService(service.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                <span class="rounded-full bg-muted px-3 py-1 text-foreground">
                  {usedPeople.length} người sử dụng
                </span>
                <span class="rounded-full bg-muted px-3 py-1 text-foreground">
                  Đã trả {formatCurrency(totalPaid)}đ
                </span>
                <span
                  class={`rounded-full px-3 py-1 ${
                    balance === 0
                      ? 'bg-emerald-100 text-emerald-700'
                      : balance > 0
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {#if balance === 0}
                    Đã khớp số tiền
                  {:else if balance > 0}
                    Còn thiếu {formatCurrency(balance)}đ
                  {:else}
                    Dư {formatCurrency(Math.abs(balance))}đ
                  {/if}
                </span>
              </div>

              {#if expanded}
                <div class="space-y-4 rounded-xl bg-muted/10 p-4">
                  {#if $moneyCalcStore.people.length === 0}
                    <p class="text-sm text-muted-foreground">
                      Chưa có thành viên nào. Thêm người ở bước trên để phân bổ dịch vụ.
                    </p>
                  {:else}
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <p class="text-sm font-semibold text-foreground">Thành viên sử dụng</p>
                      <label class="flex items-center gap-2">
                        <Checkbox
                          checked={$moneyCalcStore.people.length > 0 &&
                            $moneyCalcStore.people.every((person) => contributions[person]?.used)}
                          on:change={(event) => {
                            const target = event.currentTarget as HTMLInputElement;
                            toggleAllParticipants(service.id, target.checked);
                          }}
                        />
                        <span class="text-sm font-medium text-foreground">Chọn tất cả</span>
                      </label>
                    </div>

                    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {#each $moneyCalcStore.people as person (person)}
                        {@const contribution = $moneyCalcStore.contributions[service.id]?.[
                          person
                        ] ?? { used: false, paid: 0 }}
                        {@const checkboxId = buildPersonCheckboxId(service.id, person)}

                        <div
                          class={`rounded-xl border p-3 transition ${
                            contribution.used
                              ? 'border-border bg-background'
                              : 'border-dashed border-border/60 bg-muted/20'
                          }`}
                        >
                          <div class="flex items-center justify-between gap-2">
                            <label
                              class="flex items-center gap-2 text-sm font-medium text-foreground"
                              for={checkboxId}
                            >
                              <Checkbox
                                id={checkboxId}
                                checked={contribution.used}
                                on:change={(event) => {
                                  const target = event.currentTarget as HTMLInputElement;
                                  moneyCalcStore.handleContributionChange(
                                    service.id,
                                    person,
                                    'used',
                                    target.checked
                                  );
                                  if (!target.checked) {
                                    moneyCalcStore.handleContributionChange(
                                      service.id,
                                      person,
                                      'paid',
                                      0
                                    );
                                  }
                                }}
                              />
                              <span>{person}</span>
                            </label>
                            {#if contribution.used}
                              <span class="text-xs text-muted-foreground">
                                {contribution.paid > 0
                                  ? `${formatCurrency(contribution.paid)}đ`
                                  : 'Chưa nhập số tiền'}
                              </span>
                            {/if}
                          </div>

                          <div class="mt-2 flex items-center gap-2">
                            <Input
                              type="text"
                              inputmode="numeric"
                              className="pr-8 text-sm"
                              placeholder="Đã chi"
                              value={contribution.used ? formatNumber(contribution.paid ?? '') : ''}
                              disabled={!contribution.used}
                              on:input={(event) => {
                                const target = event.currentTarget as HTMLInputElement;
                                moneyCalcStore.handleContributionChange(
                                  service.id,
                                  person,
                                  'paid',
                                  parseNumber(target.value)
                                );
                              }}
                              aria-label={`Số tiền ${person} đã trả cho ${service.name}`}
                            />
                            <span class="text-sm text-muted-foreground">đ</span>
                            {#if contribution.used && (contribution.paid ?? 0) > 0}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-muted-foreground hover:text-destructive"
                                on:click={() =>
                                  moneyCalcStore.handleContributionChange(
                                    service.id,
                                    person,
                                    'paid',
                                    0
                                  )}
                                aria-label={`Xóa số tiền ${person} đã trả cho ${service.name}`}
                              >
                                ×
                              </Button>
                            {/if}
                          </div>
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  </CardContent>
</Card>
