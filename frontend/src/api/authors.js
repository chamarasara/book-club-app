import { api } from './axios';

export const getAuthors = () => api.get('/authors').then(r => r.data);
export const getAuthor = (id) => api.get(`/authors/${id}`).then(r => r.data);
export const createAuthor = (data) => api.post('/authors', data).then(r => r.data);
export const updateAuthor = (id, data) => api.put(`/authors/${id}`, data).then(r => r.data);
export const deleteAuthor = (id) => api.delete(`/authors/${id}`);
