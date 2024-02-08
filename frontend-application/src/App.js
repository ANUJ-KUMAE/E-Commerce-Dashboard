//import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProducts from './Components/AddProducts';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
        
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList/>} />
            <Route path='/add' element={<AddProducts/>} />
            <Route path='/update/:id' element={<UpdateProduct/>} />
            <Route path='/logout' element={<h1>Logout From Website</h1>} />
            <Route path='/profile' element={<h1>Check Your Profile</h1>} />
          </Route>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
