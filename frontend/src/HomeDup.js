import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/bootstrap.min.css';
import axios from 'axios';

function Home() {

  const [data, setData] = useState([])

  axios.get("http://localhost:8081")
    .then(result =>)

  return (
    <div class="container mt-5">
  <h1 class="text-center mb-4">CRUD Table Design</h1>
  
  <div class="text-end mb-3">
    <button class="btn btn-primary">Add New Item</button>
  </div>

  <table class="table table-striped table-hover table-bordered">
    <thead class="table-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Post Title 1</td>
        <td>This is the description of post 1.</td>
        <td>
          <button class="btn btn-warning me-2">Edit</button>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Post Title 2</td>
        <td>This is the description of post 2.</td>
        <td>
          <button class="btn btn-warning me-2">Edit</button>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
  );
}
          
        
      
    
export default Home;
