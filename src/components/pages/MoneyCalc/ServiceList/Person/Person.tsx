import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Contribution } from "@/models/Contributor";
import { Service } from "@/models/Service";
import { formatNumber, parseNumber } from "@/utils/number";
import { FC, memo } from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  person: string;
  service: Service;
  resetPaidAmount: (serviceName: string, person: string) => void;
  contributions: Record<string, Record<string, Contribution>>;
  handleContributionChange: (
    serviceName: string,
    person: string,
    field: keyof Contribution,
    value: boolean | number
  ) => void;
};

export const Person: FC<Props> = memo(
  ({
    person,
    contributions,
    resetPaidAmount,
    handleContributionChange,
    service,
  }) => {
    return (
      <div
        key={person}
        className={`flex items-center mb-2 gap-2 ${
          contributions[service.name]?.[person]?.used ? "" : "text-gray-400"
        }`}
      >
        <Checkbox
          id={`${service.name}-${person}`}
          checked={contributions[service.name]?.[person]?.used || false}
          onCheckedChange={(checked) =>
            handleContributionChange(
              service.name,
              person,
              "used",
              typeof checked === "boolean" && checked
            )
          }
        />
        <label htmlFor={`${service.name}-${person}`} className="flex-1">
          {person}
        </label>
        <div className="relative">
          <Input
            type="text"
            placeholder={`${person} đã chi`}
            value={formatNumber(
              contributions[service.name]?.[person]?.paid || ""
            )}
            onChange={(e) =>
              handleContributionChange(
                service.name,
                person,
                "paid",
                parseNumber(e.target.value)
              )
            }
            disabled={!contributions[service.name]?.[person]?.used}
            title={`Số tiền ${person} đã trả cho ${service.name}`}
            className="w-40 pr-8"
          />
          {contributions[service.name]?.[person]?.paid > 0 && (
            <FaTimes
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => resetPaidAmount(service.name, person)}
              title="Xóa số tiền đã trả"
            />
          )}
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
            đ
          </span>
        </div>
      </div>
    );
  }
);

Person.displayName = "Person";
