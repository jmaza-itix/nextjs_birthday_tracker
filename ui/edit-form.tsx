"use client";

import { BirthdayForm, monthsEnum } from "@/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/ui/buttons";
import { updateBirthday } from "@/lib/actions";

export default function EditBirthdayForm({
  birthday,
}: {
  birthday: BirthdayForm;
}) {
  const updateBirthdayWithId = updateBirthday.bind(null, birthday.id);

  return (
    <form action={updateBirthdayWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={birthday.name}
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Email */}
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={birthday.email}
                placeholder="Enter email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Birthday */}
        <label htmlFor="birthday" className="mb-2 block text-sm font-medium">
          Birthday
        </label>
        <div className="flex gap-2">
          <select
            name="day"
            className="border rounded px-2 py-1 flex-1"
            defaultValue={birthday.day || ""}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            name="month"
            className="border rounded px-2 py-1 flex-1"
            defaultValue={birthday.month || ""}
          >
            <option value="">Month</option>
            {monthsEnum.map((m, i) => (
              <option key={i + 1} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="year"
            placeholder="Year (optional)"
            className="border rounded px-2 py-1 w-28"
            defaultValue={birthday.year || ""}
          />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Update Birthday</Button>
        </div>
      </div>
    </form>
  );
}
