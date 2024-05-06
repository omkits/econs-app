import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate =  useNavigate()

  const {user} = useSelector((state) => state.auth)
  return (
    <div className="container mt-5">
    {user ? (
      <div>
        {navigate('/Product')}
      </div>
    ) : (
      <div>
        <h1 className="text-center">Welcome to My App</h1>
        <div className="d-flex justify-content-center mt-3">
          <Link to="/register" className="btn btn-primary me-3">Register</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>
    )}
  </div>

  )
}

export default Home