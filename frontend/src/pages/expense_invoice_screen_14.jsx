import {
  Search,
  Filter,
  ArrowLeft,
  Download,
  FileText,
  CheckCircle,
  Sparkles,
  DollarSign,
  PieChart,
} from "lucide-react";

export default function ExpenseInvoicePage() {
  const invoiceItems = [
    {
      id: 1,
      category: "Hotel",
      description: "Hotel Booking Paris",
      quantity: "3 Nights",
      unitCost: 3000,
      amount: 9000,
    },

    {
      id: 2,
      category: "Travel",
      description: "Flight Bookings (DEL → PAR)",
      quantity: "1",
      unitCost: 12000,
      amount: 12000,
    },

    {
      id: 3,
      category: "Food",
      description: "Luxury Dinner Reservation",
      quantity: "2",
      unitCost: 500,
      amount: 1000,
    },
  ];

  const subtotal = 22000;
  const tax = 1050;
  const discount = 50;
  const total = subtotal + tax - discount;

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-10">
      <div className="max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Smart Billing & Expense Tracking
          </span>

          <h1 className="mt-5 text-5xl font-black leading-tight">
            Expense Invoice 💳
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-400">
            Track trip expenses, invoices, bookings, payments, and travel budget
            insights beautifully.
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0b1020] to-[#050816] p-8 shadow-2xl backdrop-blur-xl">
          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
            {/* BACK */}
            <button className="flex items-center gap-3 text-gray-300 hover:text-white transition-all">
              <ArrowLeft className="h-5 w-5" />
              Back To My Trips
            </button>

            {/* SEARCH + FILTER */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* SEARCH */}
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full lg:w-[420px] rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* FILTER */}
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl hover:bg-white/10 transition-all">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>

          {/* INVOICE + BUDGET */}
          <div className="grid xl:grid-cols-[1fr_340px] gap-8 mb-10">
            {/* LEFT INVOICE */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="grid lg:grid-cols-[220px_1fr] gap-8">
                {/* IMAGE */}
                <div className="overflow-hidden rounded-3xl border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* LEFT */}
                  <div>
                    <h2 className="text-3xl font-black">
                      Trip To Europe Adventure
                    </h2>

                    <p className="mt-4 text-gray-400">
                      May 25 - Jan 05, 2025 • 4 Cities
                    </p>

                    <p className="mt-2 text-gray-400">
                      Created by James
                    </p>

                    {/* TRAVELERS */}
                    <div className="mt-8">
                      <h3 className="text-xl font-bold">
                        Traveler Details
                      </h3>

                      <div className="mt-4 space-y-3">
                        {[
                          "James",
                          "Arjun",
                          "Jerry",
                          "Cristina",
                        ].map((name, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3"
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div>
                    <div className="space-y-6">
                      <InfoCard
                        title="Invoice ID"
                        value="INV-xyz-30290"
                      />

                      <InfoCard
                        title="Generated Date"
                        value="May 20, 2025"
                      />

                      <InfoCard
                        title="Payment Status"
                        value="Pending"
                        status
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT BUDGET */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <PieChart className="h-7 w-7 text-purple-300" />

                <h3 className="text-2xl font-black">
                  Budget Insights
                </h3>
              </div>

              {/* CHART */}
              <div className="mt-10 flex justify-center">
                <div className="relative h-52 w-52 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
                  <div className="absolute inset-8 rounded-full bg-[#0b1020]" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-black">
                        78%
                      </h3>

                      <p className="text-sm text-gray-400">
                        Spent
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div className="mt-10 space-y-5">
                <BudgetRow
                  label="Total Budget"
                  value="$20000"
                />

                <BudgetRow
                  label="Total Spent"
                  value="$22000"
                />

                <BudgetRow
                  label="Remaining"
                  value="-$2000"
                  danger
                />
              </div>

              {/* BUTTON */}
              <button className="mt-10 w-full rounded-2xl border border-purple-500/20 bg-purple-500/10 px-6 py-4 text-purple-300 backdrop-blur-xl hover:bg-purple-500/20 transition-all">
                View Full Budget
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            {/* TABLE HEADER */}
            <div className="grid grid-cols-6 gap-4 border-b border-white/10 px-8 py-5 text-sm font-semibold text-gray-400">
              <div>#</div>
              <div>Category</div>
              <div>Description</div>
              <div>Qty/Details</div>
              <div>Unit Cost</div>
              <div>Amount</div>
            </div>

            {/* TABLE ROWS */}
            {invoiceItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 gap-4 border-b border-white/10 px-8 py-6 transition-all hover:bg-white/5"
              >
                <div>{item.id}</div>

                <div>{item.category}</div>

                <div>{item.description}</div>

                <div>{item.quantity}</div>

                <div>${item.unitCost}</div>

                <div className="font-semibold text-purple-300">
                  ${item.amount}
                </div>
              </div>
            ))}

            {/* TOTAL */}
            <div className="flex justify-end p-8">
              <div className="w-full max-w-md space-y-4">
                <TotalRow
                  label="Subtotal"
                  value={`$${subtotal}`}
                />

                <TotalRow
                  label="Tax (5%)"
                  value={`$${tax}`}
                />

                <TotalRow
                  label="Discount"
                  value={`$${discount}`}
                />

                <div className="h-[1px] bg-white/10" />

                <TotalRow
                  label="Grand Total"
                  value={`$${total}`}
                  grand
                />
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-col lg:flex-row gap-5">
            {/* DOWNLOAD */}
            <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-5 text-lg font-semibold shadow-2xl hover:scale-[1.02] transition-all">
              <Download className="h-5 w-5" />
              Download Invoice
            </button>

            {/* PDF */}
            <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-semibold backdrop-blur-xl hover:bg-white/10 transition-all">
              <FileText className="h-5 w-5" />
              Export As PDF
            </button>

            {/* PAID */}
            <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-8 py-5 text-lg font-semibold text-green-300 backdrop-blur-xl hover:bg-green-500/20 transition-all">
              <CheckCircle className="h-5 w-5" />
              Mark As Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* INFO CARD */
/* ================================================= */

function InfoCard({ title, value, status }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h3
        className={`mt-3 text-xl font-bold ${
          status
            ? "text-yellow-300"
            : "text-purple-300"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}

/* ================================================= */
/* BUDGET ROW */
/* ================================================= */

function BudgetRow({ label, value, danger }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <span className="text-gray-300">
        {label}
      </span>

      <span
        className={`font-bold ${
          danger
            ? "text-red-400"
            : "text-purple-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ================================================= */
/* TOTAL ROW */
/* ================================================= */

function TotalRow({ label, value, grand }) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`${
          grand
            ? "text-2xl font-black"
            : "text-gray-400"
        }`}
      >
        {label}
      </span>

      <span
        className={`${
          grand
            ? "text-3xl font-black text-purple-300"
            : "text-xl font-semibold"
        }`}
      >
        {value}
      </span>
    </div>
  );
}