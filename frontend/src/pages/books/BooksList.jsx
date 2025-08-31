import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, deleteBook } from '../../api/books';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import toast from 'react-hot-toast';

export default function BooksList(){
  const qc = useQueryClient();
  const { data = [], isLoading, isError } = useQuery({ queryKey: ['books'], queryFn: getBooks });
  const { mutate: remove } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => { toast.success('Book deleted'); qc.invalidateQueries({ queryKey:['books']}); }
  });

  if (isLoading) return <Spinner/>;
  if (isError) return <div className="text-red-600">Failed to load books</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Books</h1>
        <Link to="/books/new" className="px-3 py-2 bg-black text-white rounded">New Book</Link>
      </div>
      {data.length === 0 ? <EmptyState title="No books yet"/> : (
        <div className="bg-white shadow rounded divide-y">
          {data.map(b => (
            <div key={b.id} className="p-3 flex items-center justify-between">
              <div>
                <Link to={`/books/${b.id}`} className="font-medium hover:underline">{b.title}</Link>
                <div className="text-sm text-gray-500">Author: {b.author?.name || '—'}</div>
              </div>
              <div className="flex gap-2">
                <Link to={`/books/${b.id}/edit`} className="px-2 py-1 border rounded">Edit</Link>
                <button onClick={()=>{ if(confirm('Delete book?')) remove(b.id); }} className="px-2 py-1 border rounded text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
