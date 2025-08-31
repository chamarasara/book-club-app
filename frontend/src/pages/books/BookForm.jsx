import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBook, getBook, updateBook } from '../../api/books';
import { getAuthors } from '../../api/authors';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const currentYear = new Date().getFullYear();
const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  authorId: z.coerce.number({ required_error: 'Author is required' }).int().positive('Choose an author'),
  description: z.string().optional(),
  publishedYear: z.coerce.number().int().min(0).max(currentYear).optional()
});

export default function BookForm(){
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();
  const [authors, setAuthors] = useState([]);
  const { register, handleSubmit, setError, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  useEffect(()=>{(async()=>{
    try{ setAuthors(await getAuthors()); }catch{}
    if(isEdit){
      try{ const b = await getBook(id); ['title','description','authorId','publishedYear'].forEach(k=>setValue(k, b[k]??'')); }catch{}
    }
  })()},[id]);

  const onSubmit = async (values) => {
    try{
      if(isEdit) await updateBook(id, values); else await createBook(values);
      toast.success(`Book ${isEdit? 'updated':'created'}`);
      nav('/books');
    }catch{ setError('root', { message: 'Failed to save' }); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'New'} Book</h1>
      <div>
        <label className="block text-sm mb-1">Title *</label>
        <input className="w-full border rounded px-3 py-2" {...register('title')} />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Author *</label>
        <select className="w-full border rounded px-3 py-2" {...register('authorId')}> 
          <option value="">Select author</option>
          {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        {errors.authorId && <p className="text-sm text-red-600">{errors.authorId.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Published Year</label>
        <input type="number" className="w-full border rounded px-3 py-2" {...register('publishedYear', { valueAsNumber: true })} />
        {errors.publishedYear && <p className="text-sm text-red-600">{errors.publishedYear.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea className="w-full border rounded px-3 py-2" rows="4" {...register('description')}></textarea>
      </div>
      {errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>}
      <div className="flex gap-2">
        <button disabled={isSubmitting} className="px-3 py-2 bg-black text-white rounded">Save</button>
        <button type="button" className="px-3 py-2 border rounded" onClick={()=>history.back()}>Cancel</button>
      </div>
    </form>
  );
}
