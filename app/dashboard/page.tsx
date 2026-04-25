export default function OverviewPage() {
  const stats = [
    { title: 'Wallet Balance', value: '$55,600', color: 'text-slate-900' },
    { title: 'Total Income', value: '$75,090', color: 'text-blue-600' },
    { title: 'Total Expenses', value: '$62,800', color: 'text-rose-600' },
    { title: 'Net Profit', value: '$12,290', color: 'text-emerald-600' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{s.title}</p>
            <h3 className={`text-3xl font-black tracking-tight ${s.color}`}>{s.value}</h3>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 h-96 flex items-center justify-center">
        <p className="text-slate-300 font-medium italic">Revenue Graph Visualization Area</p>
      </div>
    </div>
  );
}