import { Download } from "lucide-react";

export const StatCard = ({ label, value }) => (
  <div className="bg-base-100 rounded-xl p-6 border border-base-300">
    <div className="text-sm text-base-content/60">{label}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export const ChartCard = ({ title, children }) => (
  <div className="bg-base-100 rounded-xl p-6 border border-base-300">
    <div className="text-sm text-base-content/60 mb-3">{title}</div>
    {children}
  </div>
);

export const ExportMenu = ({ exportCSV }) => (
  <div className="inline-flex items-center gap-1 md:gap-2">
    <button className="px-1 md:px-4 py-2 rounded-xl text-sm font-medium bg-base-200 text-base-content hover:bg-base-300 border border-base-300 flex items-center gap-2">
      <Download className="w-4 h-4" />
      PDF
    </button>
    <button
      onClick={() => exportCSV()}
      className="px-1 md:px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white hover:opacity-90 border border-primary flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      CSV
    </button>
  </div>
);
