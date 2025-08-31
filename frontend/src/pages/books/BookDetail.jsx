import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBook } from '../../api/books';
import Spinner from '../../components/Spinner';

export default function BookDetail(){
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({ queryKey: ['book', id], queryFn: ()=>getBook(id) });
  if (isLoading) return <Spinner/>;
  if (isError) return <div className="text-red-600">Failed to load book</div>;
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <Link className="px-2 py-1 border rounded" to={`/books/${id}/edit`}>Edit</Link>
      </div>
      <p className="text-gray-700">Author: {data.author?.name || '—'}</p>
      {data.description && <p className="text-gray-700">{data.description}</p>}
      {data.publishedYear && <p className="text-gray-700">Published: {data.publishedYear}</p>}
    </div>
  );
}
