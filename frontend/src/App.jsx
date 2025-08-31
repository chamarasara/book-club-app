import { Route, Routes, NavLink, Navigate } from 'react-router-dom';
import AuthorsList from './pages/authors/AuthorsList';
import AuthorDetail from './pages/authors/AuthorDetail';
import AuthorForm from './pages/authors/AuthorForm';
import BooksList from './pages/books/BooksList';
import BookDetail from './pages/books/BookDetail';
import BookForm from './pages/books/BookForm';
import Toasts from './components/Toasts';

export default function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex gap-4">
          <NavLink to="/authors" className={({isActive}) => isActive ? 'font-semibold' : ''}>Authors</NavLink>
          <NavLink to="/books" className={({isActive}) => isActive ? 'font-semibold' : ''}>Books</NavLink>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/authors" />} />
          <Route path="/authors" element={<AuthorsList />} />
          <Route path="/authors/new" element={<AuthorForm />} />
          <Route path="/authors/:id" element={<AuthorDetail />} />
          <Route path="/authors/:id/edit" element={<AuthorForm />} />

          <Route path="/books" element={<BooksList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/edit" element={<BookForm />} />
        </Routes>
      </main>
      <Toasts />
    </div>
  );
}
