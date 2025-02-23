import { FaTimes, FaTrash } from "react-icons/fa";
import { useMoneyCalc } from "./useMoneyCalc.hooks";
import { FC } from "react";
import { formatNumber, parseNumber } from "@/utils/number";

export const Home: FC = () => {
  const {
    newPerson,
    setNewPerson,
    people,
    newService,
    setNewService,
    services,
    contributions,
    editingServiceName,
    setEditingServiceName,
    editServiceNameValue,
    setEditServiceNameValue,
    editingServiceCost,
    setEditingServiceCost,
    editServiceCostValue,
    setEditServiceCostValue,
    error,
    isResultCollapsed,
    setIsResultCollapsed,
    totals,
    handleAddService,
    costInputRef,
    personInputRef,
    transactions,
    handleCostKeyDown,
    handleUpdateServiceCost,
    handleContributionChange,
    handleRemoveService,
    handleUpdateServiceName,
    debouncedAddPerson,
    handleRemovePerson,
    resetAll, // Giả định hook cung cấp hàm resetAll
  } = useMoneyCalc();

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6 pb-40 md:pb-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
            Hết nợ
          </h1>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm md:text-base cursor-pointer hover:bg-red-600"
            onClick={resetAll}
          >
            Reset Toàn Bộ
          </button>
        </div>

        {/* Thông báo lỗi */}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md z-20">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Thêm Người */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Thêm Người
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <input
                ref={personInputRef}
                className="flex-1 p-2 border rounded-md text-sm md:text-base"
                placeholder="Tên người tham gia"
                value={newPerson}
                onChange={(e) => setNewPerson(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    debouncedAddPerson(newPerson);
                  }
                }}
              />
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm md:text-base whitespace-nowrap cursor-pointer"
                onClick={() => {
                  debouncedAddPerson(newPerson);
                }}
              >
                + Thêm
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {people.map((person) => (
                <div
                  key={person}
                  className="flex items-center bg-gray-200 px-2 py-1 rounded-md text-sm md:text-base"
                >
                  <img
                    alt={`Avatar of ${person}`}
                    className="w-6 h-6 rounded-full mr-2"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      person
                    )}&background=random`}
                  />
                  {person}
                  <FaTimes
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={() => handleRemovePerson(person)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Thêm Dịch Vụ */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Thêm Dịch Vụ
            </h2>
            <input
              className="w-full p-2 border rounded-md mb-2 text-sm md:text-base"
              placeholder="Tên dịch vụ"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleAddService()}
            />
            <div className="relative">
              <input
                ref={costInputRef}
                className="w-full p-2 border rounded-md mb-2 text-sm md:text-base"
                placeholder="Số tiền"
                type="text"
                value={formatNumber(newService.cost)}
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    cost: parseNumber(e.target.value),
                  })
                }
                onKeyDown={handleCostKeyDown}
              />
              {newService.cost > 0 && newService.cost % 1000 !== 0 && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  {formatNumber(Math.round(newService.cost / 1000) * 1000)}đ
                </span>
              )}
            </div>
            <button
              className="bg-blue-500 text-white w-full py-2 rounded-md text-sm md:text-base cursor-pointer"
              onClick={handleAddService}
            >
              + Thêm Dịch Vụ
            </button>
          </div>

          {/* Danh Sách Dịch Vụ */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Danh Sách Dịch Vụ
            </h2>
            {services.length === 0 ? (
              <p className="text-gray-500 text-sm md:text-base">
                Chưa có dịch vụ nào
              </p>
            ) : (
              services.map((service) => (
                <div
                  key={service.name}
                  className="border p-3 rounded-md mb-3 text-sm md:text-base"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      {editingServiceName === service.name ? (
                        <div className="flex gap-2 items-center">
                          <input
                            className="font-semibold p-1 border rounded-md w-full text-sm md:text-base"
                            value={editServiceNameValue}
                            onChange={(e) =>
                              setEditServiceNameValue(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                handleUpdateServiceName(service.name);
                              if (e.key === "Escape") {
                                setEditingServiceName(null);
                                setEditServiceNameValue("");
                              }
                            }}
                            onBlur={() => handleUpdateServiceName(service.name)}
                            autoFocus
                          />
                          <button
                            className="text-gray-500 text-sm cursor-pointer"
                            onClick={() => {
                              setEditingServiceName(null);
                              setEditServiceNameValue("");
                            }}
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <div
                          className="font-semibold cursor-pointer"
                          onClick={() => {
                            setEditingServiceName(service.name);
                            setEditServiceNameValue(service.name);
                          }}
                        >
                          {service.name}
                        </div>
                      )}
                      {editingServiceCost === service.name ? (
                        <div className="flex gap-2 items-center">
                          <input
                            className="text-blue-600 font-bold p-1 border rounded-md w-full text-sm md:text-base"
                            type="text"
                            value={formatNumber(editServiceCostValue)}
                            onChange={(e) =>
                              setEditServiceCostValue(
                                parseNumber(e.target.value)
                              )
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                handleUpdateServiceCost(service.name);
                              if (e.key === "Escape") {
                                setEditingServiceCost(null);
                                setEditServiceCostValue(0);
                              }
                            }}
                            onBlur={() => handleUpdateServiceCost(service.name)}
                            autoFocus
                          />
                          <button
                            className="text-gray-500 text-sm cursor-pointer"
                            onClick={() => {
                              setEditingServiceCost(null);
                              setEditServiceCostValue(0);
                            }}
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <div
                          className="text-blue-600 font-bold cursor-pointer"
                          onClick={() => {
                            setEditingServiceCost(service.name);
                            setEditServiceCostValue(service.cost);
                          }}
                        >
                          {service.cost.toLocaleString("vi-VN")}đ
                        </div>
                      )}
                    </div>
                    <FaTrash
                      className="text-gray-500 cursor-pointer"
                      onClick={() => handleRemoveService(service.name)}
                    />
                  </div>
                  {people.map((person) => (
                    <div
                      key={person}
                      className={`flex items-center mb-2 gap-2 ${
                        contributions[service.name]?.[person]?.used
                          ? ""
                          : "text-gray-400"
                      }`}
                    >
                      <label className="flex items-center gap-2 flex-1 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 md:w-5 md:h-5"
                          checked={
                            contributions[service.name]?.[person]?.used || false
                          }
                          onChange={(e) =>
                            handleContributionChange(
                              service.name,
                              person,
                              "used",
                              e.target.checked
                            )
                          }
                        />
                        <span>{person}</span>
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          className="p-1 border rounded-md w-20 md:w-40 text-sm md:text-base disabled:bg-gray-100 pr-6"
                          placeholder={`${person} đã trả`}
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
                          disabled={
                            !contributions[service.name]?.[person]?.used
                          }
                          title={`Số tiền ${person} đã trả cho ${service.name}`}
                        />
                        <span className="absolute right-2 text-gray-500 text-sm pointer-events-none">
                          đ
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Kết Quả Chia Tiền + Chi Tiết Thanh Toán */}
          <div className="bg-white p-4 rounded-lg shadow md:static fixed bottom-0 left-0 right-0 mx-4 mb-4 md:mb-0 md:mx-0 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-semibold">
                Kết Quả Chia Tiền
              </h2>
              <button
                className="md:hidden text-blue-500 text-sm cursor-pointer"
                onClick={() => setIsResultCollapsed(!isResultCollapsed)}
              >
                {isResultCollapsed ? "Hiện" : "Ẩn"}
              </button>
            </div>
            <div
              className={`${isResultCollapsed ? "hidden" : "block"} md:block`}
            >
              {Object.keys(totals).length === 0 ? (
                <p className="text-gray-500 text-sm md:text-base mt-2">
                  Chưa có kết quả
                </p>
              ) : (
                <div className="max-h-40 md:max-h-none overflow-y-auto mt-2">
                  {Object.entries(totals).map(([person, amount]) => (
                    <div
                      key={person}
                      className={`flex items-center mb-2 p-2 rounded-md text-sm md:text-base ${
                        amount >= 0 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <img
                        alt={`Avatar of ${person}`}
                        className="w-6 h-6 rounded-full mr-2"
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          person
                        )}&background=random`}
                      />
                      <span className="flex-1">{person}</span>
                      <span
                        className={`${
                          amount >= 0 ? "text-green-600" : "text-red-600"
                        } font-semibold`}
                      >
                        {amount >= 0 ? "Nhận: " : "Trả: "}
                        {Math.abs(amount).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {transactions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-md md:text-lg font-semibold mb-2">
                    Chi Tiết Thanh Toán
                  </h3>
                  <div className="max-h-40 md:max-h-none overflow-y-auto">
                    {transactions.map((transaction, index) => (
                      <div
                        key={index}
                        className="flex items-center mb-2 p-2 bg-gray-100 rounded-md text-sm md:text-base"
                      >
                        <span className="flex-1">
                          {transaction.from} trả cho {transaction.to}
                        </span>
                        <span className="text-blue-600 font-semibold">
                          {transaction.amount.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
