// src/pages/Create.js
import React, { useState } from 'react';
import { createData } from '../api';

function Create() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createData({ name, description }).then(() => {
      alert('Data created successfully');
      setName('');
      setDescription('');
    });
  };

  return (
    <div>
      <h1>Create Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;
