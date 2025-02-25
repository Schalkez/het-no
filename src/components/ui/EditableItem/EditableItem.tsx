import { FC, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FaTrash } from "react-icons/fa";

type Item = {
  name: string;
  value: number; // Có thể là cost hoặc bất kỳ giá trị số nào
  id: string;
};

type Props = {
  item: Item;
  onUpdateName: (id: string, newName: string) => void; // Callback để cập nhật name
  onUpdateValue: (id: string, newValue: number) => void; // Callback để cập nhật value
  onDelete: (id: string) => void; // Callback để xóa item
  formatValue?: (value: number) => string; // Hàm tùy chọn để định dạng value
};

export const EditableItem: FC<Props> = ({
  item,
  onUpdateName,
  onUpdateValue,
  onDelete,
  formatValue = (value) => value.toLocaleString("vi-VN") + "đ", // Mặc định định dạng tiền Việt Nam
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [nameInput, setNameInput] = useState(item.name);
  const [valueInput, setValueInput] = useState(item.value.toString());

  const handleSaveName = () => {
    if (nameInput.trim() !== item.name) {
      onUpdateName(item.id, nameInput.trim());
    }
    setIsEditingName(false);
  };

  const handleSaveValue = () => {
    const parsedValue = parseInt(valueInput.replace(/[^0-9]/g, ""), 10) || 0;
    if (parsedValue !== item.value) {
      onUpdateValue(item.id, parsedValue);
    }
    setIsEditingValue(false);
  };

  const handleCancel = (field: "name" | "value") => {
    if (field === "name") {
      setIsEditingName(false);
      setNameInput(item.name);
    } else {
      setIsEditingValue(false);
      setValueInput(item.value.toString());
    }
  };

  return (
    <div className="flex justify-between items-center gap-10 mb-2">
      <div>
        {isEditingName ? (
          <div className="flex gap-2 items-center">
            <Input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveName();
                if (e.key === "Escape") handleCancel("name");
              }}
              onBlur={handleSaveName}
              autoFocus
            />
            <Button
              variant="ghost"
              onClick={() => handleCancel("name")}
              className="cursor-pointer"
            >
              Hủy
            </Button>
          </div>
        ) : (
          <div
            className="font-semibold cursor-pointer"
            onClick={() => setIsEditingName(true)}
          >
            {item.name}
          </div>
        )}
        {isEditingValue ? (
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveValue();
                if (e.key === "Escape") handleCancel("value");
              }}
              onBlur={handleSaveValue}
              autoFocus
            />
            <Button
              variant="ghost"
              onClick={() => handleCancel("value")}
              className="cursor-pointer"
            >
              Hủy
            </Button>
          </div>
        ) : (
          <div
            className="text-blue-600 font-bold cursor-pointer"
            onClick={() => setIsEditingValue(true)}
          >
            {formatValue(item.value)}
          </div>
        )}
      </div>
      <FaTrash
        className="text-gray-500 cursor-pointer"
        onClick={() => onDelete(item.id)}
      />
    </div>
  );
};
