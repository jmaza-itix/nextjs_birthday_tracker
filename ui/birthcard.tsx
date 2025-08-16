import { CakeIcon, SparklesIcon } from "@heroicons/react/24/outline";

import clsx from "clsx";
import Image from "next/image";
import { UpdateBirthday, DeleteBirthday } from "@/ui/buttons";
import { BirthdayForm } from "@/lib/definitions";

export function Card({ birthday }: { birthday: BirthdayForm }) {
  var proximityClass = "";
  var prediction = "";

  const today = new Date();
  const currentYear = today.getFullYear();
  const birthdayDate = new Date(currentYear, birthday.month - 1, birthday.day);

  const diff =
    (birthdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  var nextAge = null;
  var celebrateToday = diff > -1 && diff < 0;

  if (birthday.year != null) {
    nextAge = currentYear - birthday.year;
    if (diff < -1) {
      nextAge++; // If the birthday has already passed this year, increment age
    }
    prediction = `He/she will turn ${nextAge}`;
  }

  if (diff <= -1) {
    // Already passed this year
    if (nextAge != null) {
      prediction = `He/she will turn ${nextAge} next year`;
    }
    proximityClass = "bg-gray-300 text-gray-500";
  } else if (diff < 0) {
    // TODAY
    if (birthday.year) {
      prediction = `Today he/she turns ${nextAge}!`;
    } else {
      prediction = `Today is his/her birthday!`;
    }
    proximityClass = "bg-red-400 text-white border-4 border-double ";
  } else if (diff <= 7) {
    // very soon
    prediction = `${(diff + 1).toFixed(0)} days left`;
    proximityClass = "bg-yellow-100";
  } else if (diff <= 30) {
    // within a month
    prediction = `In less than a month ${
      nextAge != null ? `will turn ${nextAge}` : "it is his/her birthday"
    }`;
    proximityClass = "bg-green-100";
  } else {
    // normal
    proximityClass = "bg-white";
  }

  return (
    <div
      key={birthday.id}
      className={clsx("mb-2 w-full rounded-md  p-1 ", proximityClass)}
    >
      <div className="flex items-stretch justify-between">
        {/* Col 1: Date */}
        <div className="flex flex-col items-center justify-center w-20 pl-2 pr-2 border-r border-gray-200">
          <div className="text-xl font-bold">
            {birthday.day}/{birthday.month}
          </div>
          {birthday.year != null && (
            <div className="text-sm block">[{birthday.year}]</div>
          )}
        </div>

        {/* Col 2: Name + Prediction (with cake if today) */}
        <div className="flex flex-col justify-center flex-1 px-4">
          <div className="flex items-center gap-2">
            {celebrateToday && (
              <SparklesIcon className="w-6 text-white animate-[ping_3s_ease-in-out_infinite] " />
            )}
            <span className="text-lg font-medium">{birthday.name}</span>
          </div>
          <span className="text-sm ">{prediction}</span>
        </div>

        {/* Col 4: Buttons */}
        <div className="flex items-center gap-2">
          <UpdateBirthday id={birthday.id} />
          <DeleteBirthday id={birthday.id} />
        </div>
      </div>
    </div>
  );
}
