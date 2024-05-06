import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Product from './pages/Product';
import User from './pages/User';
import Header from './components/Header';
import Cart from './pages/Cart';
import Notfound from './pages/Notfound';
import { useSelector } from 'react-redux'
function App() {

  const {user} = useSelector((state) => state.auth)
  return (
    <>
    <Router>
      <div className='container'>
        {user && <Header/>}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Product' element={<Product/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/Cart' element={<Cart/>}/>
          <Route path="*" element={<Notfound/>} /> {/* This route will match any other path */}
        </Routes>
      </div>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App