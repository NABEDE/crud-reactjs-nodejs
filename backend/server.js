const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require("cors");
const fs = require('fs'); // pour supprimer les anciennes images

const app = express();

// Middleware pour parser le JSON et les données encodées dans l'URL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Dossier pour servir les images

// Configurer multer pour le téléchargement d'images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renomme le fichier pour éviter les collisions
    },
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: "8889",
    user: "root",
    password: "root",
    database: "crud"
});

// Route pour récupérer toutes les tâches
app.get("/", (req, res) => {
    const sql = "SELECT * FROM posts";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Route pour mettre à jour l'image d'une tâche
app.post('/update-image/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  // Vérifier si le fichier est bien reçu
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const query = 'UPDATE posts SET image = ? WHERE id = ?';
  
  db.query(query, [image, id], (err, result) => {
    if (err) {
      console.error('Error updating image in database:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    console.log("Image updated successfully:", result);
    res.json({ message: 'Image updated successfully', task: { id, image } });
  });
});


app.listen(8081, () => {
    console.log("Listening on http://localhost:8081");
});
