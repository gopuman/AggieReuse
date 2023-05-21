import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InvTable() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/invtable')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from server', error);
      });
  }, []);

  return (
    <div>
      <h1>Inventory Table</h1>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Day</th>
            <th>Date</th>
            <th>Timestamp</th>
            <th>Dress</th>
            <th>Cap</th>
            <th>Pants</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.Week}</td>
              <td>{post.Day}</td>
              <td>{post.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
