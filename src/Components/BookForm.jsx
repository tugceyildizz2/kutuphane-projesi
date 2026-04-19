const BookForm = ({ title, setTitle, author, setAuthor, addBook }) => {
  return (
    <form onSubmit={addBook} className="space-y-3 mb-4">
      <input 
        className="w-full bg-white/50 border-2 border-violet-50 p-4 rounded-[1.5rem] outline-none focus:border-violet-200 focus:bg-white transition-all text-slate-600 font-medium placeholder:text-slate-300" 
        placeholder="Kitap Adı" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <input 
        className="w-full bg-white/50 border-2 border-violet-50 p-4 rounded-[1.5rem] outline-none focus:border-violet-200 focus:bg-white transition-all text-slate-600 font-medium placeholder:text-slate-300" 
        placeholder="Yazar" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
      />
      <button className="w-full bg-gradient-to-r from-violet-500 to-rose-400 hover:from-violet-600 hover:to-rose-500 text-white font-black py-5 rounded-[1.5rem] shadow-lg shadow-violet-200 transition-all active:scale-[0.97] uppercase tracking-widest text-xs">
        Listeye Ekle ✨
      </button>
    </form>
  );
};
export default BookForm;