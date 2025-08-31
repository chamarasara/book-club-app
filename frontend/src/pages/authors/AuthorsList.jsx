import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthors, deleteAuthor } from '../../api/authors';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import toast from 'react-hot-toast';

export default function AuthorsList(){
  const qc = useQueryClient();
  const { data = [], isLoading, isError } = useQuery({ queryKey: ['authors'], queryFn: getAuthors });
  const { mutate: remove } = useMutation({
    mutationFn: deleteAuthor,
    onSuccess: () => { toast.success('Author deleted'); qc.invalidateQueries({ queryKey:['authors']}); }
  });

  if (isLoading) return <Spinner/>;
  if (isError) return <div className="text-red-600">Failed to load authors</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Authors</h1>
        <Link to="/authors/new" className="px-3 py-2 bg-black text-white rounded">New Author</Link>
      </div>
      {data.length === 0 ? <EmptyState title="No authors yet"/> : (
        <div className="bg-white shadow rounded divide-y">
          {data.map(a => (
            <div key={a.id} className="p-3 flex items-center justify-between">
              <div>
                <Link to={`/authors/${a.id}`} className="font-medium hover:underline">{a.name}</Link>
                <div className="text-sm text-gray-500">Books: {a.books?.length ?? 0}</div>
              </div>
              <div className="flex gap-2">
                <Link to={`/authors/${a.id}/edit`} className="px-2 py-1 border rounded">Edit</Link>
                <button onClick={()=>{ if(confirm('Delete author?')) remove(a.id); }} className="px-2 py-1 border rounded text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
