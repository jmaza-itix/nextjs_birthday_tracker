import EditBirthdayForm from "@/ui/edit-form";

import { getBirthdayById } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const id = params.id;

  const birthday = await getBirthdayById({ id });

  if (!birthday) {
    notFound();
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <EditBirthdayForm birthday={birthday} />
    </main>
  );
}
