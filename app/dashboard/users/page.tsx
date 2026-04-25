export default function UserManagement() {
  const users = [
    { id: 1, name: 'Sabbir Hossain', email: 'sabbir@techguru.com', role: 'USER' },
    { id: 2, name: 'Thomas Alison', email: 'thomas@agency.com', role: 'EMPLOYEE' },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800">Assign Roles</h2>
        <p className="text-slate-500 text-sm">Manage user permissions and promote them to specific roles.</p>
      </div>

      <table className="w-full text-left">
        <thead className="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-50">
          <tr>
            <th className="pb-4">Full Name</th>
            <th className="pb-4">Current Role</th>
            <th className="pb-4 text-right">Promote To</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {users.map((user) => (
            <tr key={user.id} className="group hover:bg-slate-50/50 transition-all">
              <td className="py-5 font-bold text-slate-700">{user.name}</td>
              <td className="py-5">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                  user.role === 'ADMIN' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="py-5 text-right space-x-2">
                <button className="bg-slate-100 text-slate-600 px-3 py-2 rounded-xl text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all uppercase">Leader</button>
                <button className="bg-slate-100 text-slate-600 px-3 py-2 rounded-xl text-[10px] font-bold hover:bg-emerald-600 hover:text-white transition-all uppercase">HR</button>
                <button className="bg-slate-900 text-white px-3 py-2 rounded-xl text-[10px] font-bold hover:bg-blue-500 transition-all uppercase">Employee</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}