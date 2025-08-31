import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAuthor, getAuthor, updateAuthor } from '../../api/authors';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const schema = z.object({ name: z.string().min(1, 'Name is required'), bio: z.string().optional() });

export default function AuthorForm(){
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();
  const { register, handleSubmit, setError, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  useEffect(()=>{(async()=>{
    if(isEdit){
      try{ const a = await getAuthor(id); setValue('name', a.name); setValue('bio', a.bio||''); }catch{ /* handled */ }
    }
  })()},[id]);

  const onSubmit = async (values) => {
    try{
      if(isEdit) await updateAuthor(id, values); else await createAuthor(values);
      toast.success(`Author ${isEdit? 'updated':'created'}`);
      nav('/authors');
    }catch(e){ setError('root', { message: 'Failed to save' }); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-4">
      <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'New'} Author</h1>
      <div>
        <label className="block text-sm mb-1">Name *</label>
        <input className="w-full border rounded px-3 py-2" {...register('name')} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Bio</label>
        <textarea className="w-full border rounded px-3 py-2" rows="4" {...register('bio')}></textarea>
      </div>
      {errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>}
      <div className="flex gap-2">
        <button disabled={isSubmitting} className="px-3 py-2 bg-black text-white rounded">Save</button>
        <button type="button" className="px-3 py-2 border rounded" onClick={()=>history.back()}>Cancel</button>
      </div>
    </form>
  );
}
