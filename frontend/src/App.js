import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './Create';
import EditItem from './EditItem';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Navbar reste visible sur toutes les pages */}
        <Navbar />

        {/* Contenu dynamique en fonction des routes */}
        <div className="container mt-4">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/edititem/:id' element={<EditItem />}></Route>
          </Routes>
        </div>

        {/* Footer reste visible sur toutes les pages */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
