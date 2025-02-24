import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useMoneyCalcStore } from "@/store/store";
import { FC, memo } from "react";
import { FaTimes } from "react-icons/fa";

export const AddPersonArea: FC = memo(() => {
  const {
    people,
    newPerson,
    addPerson,
    setNewPerson,
    personInputRef,
    handleRemovePerson,
  } = useMoneyCalcStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Người Tham Gia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Input
            ref={personInputRef}
            placeholder="Tên người tham gia"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addPerson(newPerson);
              }
            }}
          />
          <Button
            onClick={() => addPerson(newPerson)}
            className="cursor-pointer whitespace-nowrap"
          >
            + Thêm
          </Button>
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
      </CardContent>
    </Card>
  );
});

AddPersonArea.displayName = "AddPersonArea";
