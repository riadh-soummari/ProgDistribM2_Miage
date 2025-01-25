// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { getAllData } from '../api';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData().then((response) => setData(response));
  }, []);

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
