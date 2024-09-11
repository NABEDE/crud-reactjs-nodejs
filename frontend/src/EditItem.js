import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditItem() {
  const { id } = useParams(); // Récupère l'ID de l'élément à éditer depuis l'URL
  const navigate = useNavigate();

  const [item, setItem] = useState({
    title: '',
    body: ''
  });

  // Récupérer les données de l'élément via son id
  useEffect(() => {
    axios.get(`http://localhost:8081/item/${id}`)
      .then(response => {
        setItem(response.data); // Remplir les champs du formulaire avec les données existantes
      })
      .catch(error => {
        console.error('There was an error fetching the item!', error);
      });
  }, [id]);

  // Mettre à jour les données de l'élément
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/item/${id}`, item)
      .then(response => {
        console.log('Item updated:', response.data);
        navigate('/'); // Redirige vers la page principale après la mise à jour
      })
      .catch(error => {
        console.error('There was an error updating the item!', error);
      });
  };

  // Gérer la modification des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            name="title" 
            value={item.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            className="form-control" 
            name="body" 
            value={item.body} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Item</button>
      </form>
    </div>
  );
}

export default EditItem;
