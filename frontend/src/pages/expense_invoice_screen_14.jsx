import { Search, Filter, ArrowLeft, Download, FileText, CheckCircle, Sparkles, DollarSign, PieChart } from "lucide-react";

const INVOICE_ITEMS = [
  { id: 1, category: "Hotel",  description: "Hotel Booking Paris",         quantity: "3 Nights", unitCost: 3000,  amount: 9000 },
  { id: 2, category: "Travel", description: "Flight Bookings (DEL → PAR)", quantity: "1",        unitCost: 12000, amount: 12000 },
  { id: 3, category: "Food",   description: "Luxury Dinner Reservation",   quantity: "2",        unitCost: 500,   amount: 1000 },
];
const subtotal = 22000, tax = 1050, discount = 50;
const total = subtotal + tax - discount;

export default function ExpenseInvoicePage() {
  return (
    <div className="page-bg">
      <div className="orb orb-purple" />
      <div className="orb orb-pink" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-8 animate-fade-up">
          <div className="page-badge mb-4"><Sparkles className="h-3 w-3" /> Smart Billing & Expense Tracking</div>
          <h1 className="hero-title">Expense Invoice 💳</h1>
          <p className="mt-2 text-gray-400 text-sm max-w-xl">
            Track trip expenses, invoices, bookings, payments, and travel budget insights beautifully.
          </p>
        </div>

        {/* MAIN */}
        <div className="rounded-2xl border border-white/08 p-6 sm:p-8 content-card animate-fade-up delay-100">

          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all text-sm font-medium">
              <ArrowLeft className="h-4 w-4" /> Back To My Trips
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <input type="text" placeholder="Search invoices..."
                  className="w-full sm:w-[340px] rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-sm text-white placeholder:text-gray-500 backdrop-blur-xl outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <button className="flex items-center justify-center gap-2 rounded-2xl btn-glass px-5 py-3.5 text-sm text-gray-300">
                <Filter className="h-4 w-4" /> Filter
              </button>
            </div>
          </div>

          {/* INVOICE + BUDGET */}
          <div className="grid xl:grid-cols-[1fr_300px] gap-5 mb-6">

            {/* INVOICE DETAILS */}
            <div className="rounded-2xl border border-white/08 bg-white/[0.025] p-6 backdrop-blur-xl">
              <div className="grid sm:grid-cols-[180px_1fr] gap-6">
                {/* IMAGE */}
                <div className="overflow-hidden rounded-2xl border border-white/08 h-44">
                  <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop" alt="" className="h-full w-full object-cover" />
                </div>

                {/* DETAILS */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h2 className="t-section text-white">Trip To Europe Adventure</h2>
                    <p className="mt-2 text-gray-400 text-xs">May 25 - Jan 05, 2025 • 4 Cities</p>
                    <p className="text-gray-400 text-xs mt-0.5">Created by James</p>
                    <div className="mt-5">
                      <h3 className="t-label text-gray-400 uppercase tracking-widest mb-3">Traveler Details</h3>
                      <div className="space-y-2">
                        {["James", "Arjun", "Jerry", "Cristina"].map(name => (
                          <div key={name} className="rounded-xl border border-white/07 bg-white/5 px-4 py-2 text-sm text-gray-300 font-medium">{name}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[{ title: "Invoice ID", value: "INV-xyz-30290", status: false }, { title: "Generated Date", value: "May 20, 2025", status: false }, { title: "Payment Status", value: "Pending", status: true }].map(({ title, value, status }) => (
                      <div key={title} className="rounded-xl border border-white/07 bg-white/5 p-4">
                        <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest mb-1.5">{title}</p>
                        <h3 className={`text-base font-bold ${status ? "text-yellow-300" : "text-purple-300"}`}>{value}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BUDGET */}
            <div className="rounded-2xl border border-white/08 bg-gradient-to-b from-purple-500/10 to-pink-500/10 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="h-5 w-5 text-purple-300" />
                <h3 className="t-heading text-white">Budget Insights</h3>
              </div>
              <div className="flex justify-center mb-6">
                <div className="relative h-36 w-36 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
                  <div className="absolute inset-5 rounded-full bg-[#040710]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center"><h3 className="text-2xl font-black">78%</h3><p className="text-[10px] text-gray-400">Spent</p></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                {[{ label: "Total Budget", value: "$20,000", danger: false }, { label: "Total Spent", value: "$22,000", danger: false }, { label: "Remaining", value: "-$2,000", danger: true }].map(({ label, value, danger }) => (
                  <div key={label} className="flex items-center justify-between rounded-xl border border-white/07 bg-white/5 px-4 py-3">
                    <span className="text-gray-300 text-sm font-medium">{label}</span>
                    <span className={`font-bold text-sm ${danger ? "text-red-400" : "text-purple-300"}`}>{value}</span>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full rounded-xl border border-purple-500/20 bg-purple-500/10 px-5 py-3 text-sm text-purple-300 hover:bg-purple-500/20 transition-all font-medium">
                View Full Budget
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-white/08 bg-white/[0.025] backdrop-blur-xl mb-6">
            <div className="grid grid-cols-6 gap-4 border-b border-white/07 px-6 py-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
              <div>#</div><div>Category</div><div>Description</div><div>Qty/Details</div><div>Unit Cost</div><div>Amount</div>
            </div>
            {INVOICE_ITEMS.map(item => (
              <div key={item.id} className="grid grid-cols-6 gap-4 border-b border-white/06 px-6 py-4 text-sm transition-all hover:bg-white/[0.03]">
                <div className="text-gray-500 font-medium">{item.id}</div>
                <div className="text-gray-300 font-medium">{item.category}</div>
                <div className="text-gray-300">{item.description}</div>
                <div className="text-gray-400">{item.quantity}</div>
                <div className="text-gray-300">${item.unitCost.toLocaleString()}</div>
                <div className="font-semibold text-purple-300">${item.amount.toLocaleString()}</div>
              </div>
            ))}
            <div className="flex justify-end p-6">
              <div className="w-full max-w-sm space-y-3">
                {[{ label: "Subtotal", value: `$${subtotal.toLocaleString()}` }, { label: "Tax (5%)", value: `$${tax}` }, { label: "Discount", value: `$${discount}` }].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{label}</span><span className="font-semibold text-gray-200">{value}</span>
                  </div>
                ))}
                <div className="divider" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-white">Grand Total</span>
                  <span className="text-2xl font-black text-purple-300">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl btn-primary px-8 py-4 text-sm font-semibold">
              <Download className="h-4 w-4" /> Download Invoice
            </button>
            <button className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl btn-glass px-8 py-4 text-sm font-semibold text-gray-300">
              <FileText className="h-4 w-4" /> Export As PDF
            </button>
            <button className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-green-500/20 bg-green-500/10 px-8 py-4 text-sm font-semibold text-green-300 hover:bg-green-500/20 transition-all">
              <CheckCircle className="h-4 w-4" /> Mark As Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}