import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAuthor } from '../../api/authors';
import Spinner from '../../components/Spinner';

export default function AuthorDetail(){
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({ queryKey: ['author', id], queryFn: ()=>getAuthor(id) });
  if (isLoading) return <Spinner/>;
  if (isError) return <div className="text-red-600">Failed to load author</div>;
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <Link className="px-2 py-1 border rounded" to={`/authors/${id}/edit`}>Edit</Link>
      </div>
      {data.bio && <p className="text-gray-700">{data.bio}</p>}
      <section>
        <h2 className="text-xl font-medium mb-2">Books</h2>
        <ul className="list-disc ml-6">
          {(data.books||[]).map(b => (<li key={b.id}>{b.title} {b.publishedYear ? `(${b.publishedYear})` : ''}</li>))}
        </ul>
      </section>
    </div>
  );
}
