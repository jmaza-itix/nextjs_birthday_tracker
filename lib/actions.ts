"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { stringify } from "querystring";

export async function getAllBirthdaysSorted() {
  const birthdays = await prisma.birthday.findMany();

  const currMonth = new Date().getMonth() + 1;
  const currDay = new Date().getDate();

  birthdays.sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  });

  const next = birthdays.filter((b) => {
    return b.month > currMonth || (b.month === currMonth && b.day >= currDay);
  });

  const past = birthdays.filter((b) => {
    return b.month < currMonth || (b.month === currMonth && b.day < currDay);
  });

  return next.concat(past);
}

export async function getBirthdayById(params: { id: string | number }) {
  const id = parseInt(params.id.toString(), 10); // ensure it's a number
  if (isNaN(id)) throw new Error("Invalid ID");

  return await prisma.birthday.findUnique({
    where: { id },
  });
}

function toTitleCase(str: string | undefined): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean) // remove accidental double spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function addBirthday(formData: FormData) {
  "use server";
  const name = toTitleCase(formData.get("name")?.toString());
  const email = formData.get("email")?.toString();
  const day = parseInt(formData.get("day") as string, 10);
  const month = parseInt(formData.get("month") as string, 10);
  const yearValue = formData.get("year")?.toString().trim();
  const year = yearValue ? parseInt(yearValue) : null;

  if (!name || !day || !month) return;

  await prisma.birthday.create({
    data: {
      name,
      email,
      day,
      month,
      year,
    },
  });

  revalidatePath("/");
}

export async function updateBirthday(id: number, formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const day = parseInt(formData.get("day") as string, 10);
  const month = parseInt(formData.get("month") as string, 10);
  const yearValue = formData.get("year")?.toString().trim();
  const year = yearValue ? parseInt(yearValue) : null;

  if (!name || !day || !month) return;

  await prisma.birthday.update({
    where: { id },
    data: {
      name,
      email,
      day,
      month,
      year,
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteBirthday(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  if (!id) return;

  await prisma.birthday.delete({
    where: { id },
  });

  revalidatePath("/");
  redirect("/");
}
