export default function UserPage() {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-black italic text-slate-200 mb-6 tracking-tighter">REBACK</div>
        <h1 className="text-3xl font-black italic text-slate-900 mb-4 tracking-tight">WAITING FOR ROLE...</h1>
        <p className="text-slate-400 max-w-sm mx-auto font-medium italic leading-relaxed">
          আপনার অ্যাকাউন্টটি বর্তমানে আমাদের সিস্টেম রিভিউ করছে। অ্যাডমিন আপনাকে একটি নির্দিষ্ট রোল দিলে আপনার ড্যাশবোর্ড আপডেট হয়ে যাবে।
        </p>
      </div>
    </div>
  );
}