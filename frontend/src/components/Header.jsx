import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import {toast} from 'react-toastify'

function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)

    const onLogout = (e) => {
        dispatch(logout())
        .then(() => {
          dispatch(reset());
          navigate('/');
        })
        .catch((error) => {
          toast.error(error)
        });
    
      }
  return (
    <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Omkits</Link> {/* Use Link instead of 'a' tag */}
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/Search"> Search</Link> {/* Use Link instead of 'a' tag */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">Product</Link> {/* Use Link instead of 'a' tag */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/User">User</Link> {/* Use Link instead of 'a' tag */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cart">Cart</Link> {/* Use Link instead of 'a' tag */}
            </li>
          </ul>
          <span className="navbar-text">
          {user && (
        <button className="btn btn-danger logout-btn" onClick={onLogout}>Logout</button>
        )}
          </span>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Header