import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const auth = localStorage.getItem('User');
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div>
      {auth ? <ul className='Nav-list'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={Logout} to="/login">LogOut</Link></li>

      </ul>
        :
        <ul className='Nav-list bottom-list'>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  )
}

export default Navbar
