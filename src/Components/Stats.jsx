const Stats = ({ books }) => {
  const total = books.length;
  const readCount = books.filter(b => b.isRead).length;
  const unreadCount = total - readCount;

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-[2rem] border border-violet-100 text-center shadow-sm">
        <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Toplam</p>
        <p className="text-2xl font-black text-violet-600">{total}</p>
      </div>
      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-[2rem] border border-rose-100 text-center shadow-sm">
        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Okunan</p>
        <p className="text-2xl font-black text-rose-500">{readCount}</p>
      </div>
      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-[2rem] border border-amber-100 text-center shadow-sm">
        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Kalan</p>
        <p className="text-2xl font-black text-amber-600">{unreadCount}</p>
      </div>
    </div>
  );
};
export default Stats;