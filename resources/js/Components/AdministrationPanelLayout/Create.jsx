import { useForm } from "@inertiajs/react";
import { Wallet } from "lucide-react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Field from "@/Components/Form/Field";
import { inputCls } from "@/Components/Form/styles";
import { INFO } from "./createInfo";

export default function Create() {
  const { data, setData, post, processing, reset, errors } = useForm({
    linkName: "",
    amount: "",
    email: "",
    mode: "all",
    expiry: "",
    notify: true,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("payment-links.store")); // apna route name
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex items-center gap-2">
        <Wallet size={20} className="text-violet-700" />
        <h1 className="text-lg font-semibold text-slate-900">Create payment link</h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Link name" htmlFor="linkName" infoKey="linkName" error={errors.linkName} className="sm:col-span-2">
          <input
            id="linkName"
            className={inputCls}
            placeholder="Order #1042"
            value={data.linkName}
            onChange={(e) => setData("linkName", e.target.value)}
          />
        </Field>

        <Field label="Amount (₹)" htmlFor="amount" infoKey="amount" error={errors.amount}>
          <input
            id="amount"
            type="number"
            min="1"
            step="0.01"
            className={inputCls}
            placeholder="0.00"
            value={data.amount}
            onChange={(e) => setData("amount", e.target.value)}
          />
        </Field>

        <Field label="Customer email" htmlFor="email" infoKey="email" error={errors.email}>
          <input
            id="email"
            type="email"
            className={inputCls}
            placeholder="name@example.com"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
          />
        </Field>

        <Field label="Payment mode" htmlFor="mode" infoKey="mode">
          <select
            id="mode"
            className={inputCls}
            value={data.mode}
            onChange={(e) => setData("mode", e.target.value)}
          >
            <option value="all">All modes</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="netbanking">Netbanking</option>
          </select>
        </Field>

        <Field label="Link expiry" htmlFor="expiry" infoKey="expiry">
          <input
            id="expiry"
            type="date"
            className={inputCls}
            value={data.expiry}
            onChange={(e) => setData("expiry", e.target.value)}
          />
        </Field>

        <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
          <input
            type="checkbox"
            checked={data.notify}
            onChange={(e) => setData("notify", e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-600"
          />
          Customer ko email se link bhejo
        </label>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={processing}
          className="rounded-md bg-[#1b1464] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2a1f8f] disabled:opacity-60"
        >
          Create link
        </button>
      </div>
    </form>
  );
}

// Inertia persistent layout — page change par layout re-mount nahi hota
Create.layout = (page) => (
  <DashboardLayout active="Overview" info={INFO}>
    {page}
  </DashboardLayout>
);
