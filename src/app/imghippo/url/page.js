'use client';

import { useState } from 'react';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmitFile = async (e) => {
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

  const handleSubmitUrl = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please enter an image URL to upload.');
      return;
    }

    const res = await fetch('/api/upload-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input type="file" onChange={handleFileChange} accept="image/*"  />
        <button type="submit">Upload File</button>
      </form>
      <form onSubmit={handleSubmitUrl}>
        <input
          type="text"
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="Enter image URL"

        />
        <button type="submit">Upload URL</button>
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
