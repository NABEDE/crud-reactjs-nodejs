import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);

  // Chemin de l'image par défaut
  const defaultImage = '/default-image.svg';

  useEffect(() => {
    axios.get("http://localhost:8081")
      .then(result => {
        console.log("API Response:", result.data);
        setData(result.data || []);
      })
      .catch(err => console.log("Error fetching data:", err));
  }, []);

  // Fonction pour uploader une nouvelle image
  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
  
    axios.post(`http://localhost:8081/update-image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log("Image uploaded successfully:", response.data);
      const updatedTask = response.data.task;
      setData(prevData =>
        prevData.map(item => item.id === updatedTask.id ? updatedTask : item)
      );
    })
    .catch(err => {
      console.error("Error uploading image:", err.response || err);
    });
  };
  

  // Fonction pour supprimer un élément
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`http://localhost:8081/delete/${id}`)
        .then(() => {
          setData(prevData => prevData.filter(item => item.id !== id));
        })
        .catch(err => console.error("Error deleting item:", err));
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">CRUD Table Design</h1>

      <div className="text-end mb-3">
        <Link to="/create" className="btn btn-primary">Add New Item</Link>
      </div>

      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                  <label>
                  <img
                    src={item.image ? `http://localhost:8081${item.image}` : defaultImage}
                    alt={item.title}
                    width="100"
                  />
                  <input
                      id={`file-input-${item.id}`}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(event) => handleImageChange(event, item.id)}
                  />
                  </label>
                </td>
                <td>
                  <Link to={`/edititem/${item.id}`} className="btn btn-warning me-2">Edit</Link>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          ) : (
              <tr>
                <td colSpan="5" className="text-center">No data available</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
