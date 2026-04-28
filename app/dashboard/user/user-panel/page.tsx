"use client";

/**
 * UserPage Component
 * This acts as a 'Pending State' screen for users who have signed up 
 * but are waiting for an Admin to assign them a specific role.
 */
export default function UserPage() {
  return (
    <div className="h-[70vh] flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        
        {/* Background Branding */}
        <div className="text-7xl md:text-8xl font-black italic text-slate-100 mb-2 tracking-tighter select-none">
          REBACK
        </div>

        {/* Status Message */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black italic text-slate-900 tracking-tight uppercase">
            Waiting for Role Assignment
          </h1>
          
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-slate-500 max-w-md mx-auto font-bold italic leading-relaxed text-sm md:text-base">
            Your account is currently being reviewed by our system. 
            Once an administrator assigns you a specific role, 
            your dashboard will automatically update with your assigned tools.
          </p>
        </div>

        {/* Visual Indicator */}
        <div className="pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
            </span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              System Review in Progress
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}