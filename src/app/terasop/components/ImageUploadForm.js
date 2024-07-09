'use client';

import { useState } from 'react';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" required />
        <button type="submit">Upload</button>
      </form>
      {response && (
        <div>
          {response.success ? (
            <div>
              <p>Image uploaded successfully!</p>
              <p>Name: {response.data.name}</p>
              <p>URL: <a href={response.data.url} target="_blank" rel="noopener noreferrer">{response.data.url}</a></p>
              <p>View URL: <a href={response.data.view_url} target="_blank" rel="noopener noreferrer">{response.data.view_url}</a></p>
              <p>Created At: {response.data.created_at}</p>
            </div>
          ) : (
            <p>Failed to upload image.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
