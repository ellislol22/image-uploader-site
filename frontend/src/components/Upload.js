import { useState } from 'react';
import API from '../api';

export default function Upload() {
  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      await API.post('/upload', formData);
      alert('Uploaded!');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}
