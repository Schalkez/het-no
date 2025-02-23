import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Transaction } from "@/models/Transaction";
import { FC } from "react";

type Props = {
  totals: Record<string, number>;
  transactions: Transaction[];
};

export const Desktop: FC<Props> = ({ transactions, totals }) => {
  return (
    <Card className="hidden md:block">
      <CardHeader>
        <CardTitle>Kết Quả Chia Tiền</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(totals).length === 0 ? (
          <p className="text-gray-500">Chưa có kết quả</p>
        ) : (
          <div>
            {Object.entries(totals).map(([person, amount]) => (
              <div
                key={person}
                className={`flex items-center mb-2 p-2 rounded-md ${
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
                  {amount >= 0 ? "Nhận: " : "Trả: "}{" "}
                  {Math.abs(amount).toLocaleString("vi-VN")}đ
                </span>
              </div>
            ))}
          </div>
        )}
        {transactions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Chi Tiết Thanh Toán</h3>
            <div>
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 p-2 bg-gray-100 rounded-md"
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
      </CardContent>
    </Card>
  );
};
