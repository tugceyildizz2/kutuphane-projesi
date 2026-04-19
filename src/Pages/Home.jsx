import { useState, useEffect } from 'react';
import BookForm from '../Components/BookForm';
import Stats from '../Components/Stats';

const Home = () => {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("tugce_kutuphane_soft");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("tugce_kutuphane_soft", JSON.stringify(books));
  }, [books]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addBook = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    const newBook = { id: Date.now(), title, author, isRead: false };
    setBooks([newBook, ...books]);
    setTitle(""); setAuthor("");
    showToast("Listeye eklendi 🌸");
  };

  const deleteBook = (id) => {
    if(window.confirm("Bu kitabı kaldıralım mı?")) {
      setBooks(books.filter(b => b.id !== id));
      showToast("Kitap silindi ✨");
    }
  };

  const toggleUpdate = (id) => {
    setBooks(books.map(b => b.id === id ? { ...b, isRead: !b.isRead } : b));
    showToast("Durum güncellendi ✨");
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 p-6 md:p-12 flex justify-center font-sans antialiased">
      {toast && (
        <div className="fixed top-8 right-8 bg-white/80 backdrop-blur-md border border-violet-100 text-violet-600 px-6 py-4 rounded-[2rem] shadow-xl z-50 font-bold text-sm">
          {toast}
        </div>
      )}

      <div className="max-w-xl w-full">
        <header className="flex justify-between items-center mb-8 px-2">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tighter">My Library</h1>
            <div className="h-1 w-12 bg-gradient-to-r from-violet-400 to-rose-400 rounded-full"></div>
          </div>
          <div className="text-right">
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Hoş Geldin</p>
             <p className="text-violet-600 font-black text-xl italic">Tuğçe Yıldız</p>
          </div>
        </header>

        <Stats books={books} />

        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-[3.5rem] shadow-2xl shadow-violet-200/20 border border-white">
          <BookForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} addBook={addBook} />

          <div className="relative my-6">
            <input 
              className="w-full bg-white/50 border-2 border-violet-50 p-4 pl-12 rounded-[1.5rem] outline-none focus:border-rose-200 focus:bg-white transition-all text-sm font-medium text-slate-600"
              placeholder="Kitaplarda ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-4 text-xl opacity-30">🔍</span>
          </div>

          <div className="space-y-4">
            {filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-2 opacity-40">🕊️</p>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Sonuç Yok</p>
              </div>
            ) : (
              filteredBooks.map((book) => (
                <div key={book.id} className="flex justify-between items-center p-5 bg-white/80 rounded-[2rem] border border-white shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className={`font-bold text-lg truncate ${book.isRead ? 'line-through text-slate-300' : 'text-slate-700'}`}>
                      {book.title}
                    </h3>
                    <p className="text-[10px] text-rose-400 font-black uppercase tracking-widest leading-none">{book.author}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleUpdate(book.id)} 
                      className={`px-5 py-2 rounded-full text-[10px] font-black transition-all ${book.isRead ? 'bg-rose-50 text-rose-500' : 'bg-violet-50 text-violet-600 hover:bg-violet-100'}`}
                    >
                      {book.isRead ? 'BİTTİ' : 'OKU'}
                    </button>
                    <button onClick={() => deleteBook(book.id)} className="text-slate-300 hover:text-rose-400 transition-colors text-lg">✕</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <footer className="mt-12 text-center">
            <p className="text-slate-300 text-[10px] font-black tracking-[0.3em] uppercase italic">© 2026 Tuğçe Yıldız</p>
        </footer>
      </div>
    </div>
  );
};
export default Home;