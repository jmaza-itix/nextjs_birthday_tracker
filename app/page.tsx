import Table from "@/ui/table";
import { addBirthday, getAllBirthdaysSorted } from "@/lib/actions";
import { monthsEnum } from "@/lib/definitions";

export default async function HomePage() {
  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Birthdays !</h1>

      <form action={addBirthday} className="mb-6 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border rounded px-2 py-1 w-full"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="border rounded px-2 py-1 w-full"
        />

        <div className="flex gap-2">
          <select name="day" className="border rounded px-2 py-1 flex-1">
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select name="month" className="border rounded px-2 py-1 flex-1">
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
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </form>

      <Table />
    </main>
  );
}
