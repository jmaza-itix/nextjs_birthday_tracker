import clsx from "clsx";
import Image from "next/image";
import { UpdateBirthday, DeleteBirthday } from "@/ui/buttons";
import { BirthdayForm } from "@/lib/definitions";

export function Card({ birthday }: { birthday: BirthdayForm }) {
  function getProximityClass(day: number, month: number) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthdayDate = new Date(currentYear, month - 1, day);

    const diff =
      (birthdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diff <= -1) {
      return "bg-gray-300 text-gray-500"; // Already passed this year
    } else if (diff < 0) {
      return "bg-red-400  text-white border-4 border-double "; // TODAY
    } else if (diff <= 7) {
      return "bg-yellow-100"; // very soon
    } else if (diff <= 30) {
      return "bg-green-100"; // within a month
    } else {
      return "bg-white"; // normal
    }
  }

  return (
    <div
      key={birthday.id}
      className={clsx(
        "mb-2 w-full rounded-md  p-1 ",
        getProximityClass(birthday.day, birthday.month)
      )}
    >
      <div className="flex items-stretch justify-between">
        {/* Col 1: Date */}
        <div className="flex flex-col  items-center justify-center w-20 pl-2 pr-2 border-r border-gray-200">
          <div className="text-xl font-bold">
            {birthday.day}/{birthday.month}
          </div>
          {birthday.year != null && (
            <div className="text-sm block">[{birthday.year}]</div>
          )}
        </div>

        {/* Col 2: Name + Email */}
        <div className="flex flex-col justify-center flex-1 px-4">
          <span className="text-lg font-medium">{birthday.name}</span>
          <span className="text-sm ">{birthday.email}</span>
        </div>

        {/* Col 3: Buttons */}
        <div className="flex items-center gap-2">
          <UpdateBirthday id={birthday.id} />
          <DeleteBirthday id={birthday.id} />
        </div>
      </div>
    </div>
  );
}
