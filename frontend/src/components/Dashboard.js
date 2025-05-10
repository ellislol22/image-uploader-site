import { useEffect, useState } from 'react';
import API from '../api';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [imgRes, userRes] = await Promise.all([
          API.get('/upload/all'),
          API.get('/users/admin')
        ]);
        setImages(imgRes.data);
        setUsers(userRes.data);
      } catch (err) {
        alert('Error loading dashboard');
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Users:</h3>
      <ul>
        {users.map(u => <li key={u._id}>{u.email}</li>)}
      </ul>
      <h3>Images:</h3>
      {images.map(img => (
        <div key={img._id}>
          <p>Uploaded by: {img.userId.email}</p>
          <img src={img.url} alt="user upload" width="200" />
        </div>
      ))}
    </div>
  );
}
