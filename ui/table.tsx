import { getAllBirthdaysSorted } from "@/lib/actions";
import { Card } from "./birthcard";

export default async function BirthdaysTable() {
  const birthdays = await getAllBirthdaysSorted();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-200 p-2">
          {birthdays?.map((birthday) => (
            <Card key={birthday.id} birthday={birthday} />
          ))}
        </div>
      </div>
    </div>
  );
}
