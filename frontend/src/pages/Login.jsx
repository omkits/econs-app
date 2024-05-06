import { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice';
import Spinner from "../components/Spinner"


function Login() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const {name, password} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
)

useEffect(() => {
    if(isError) {
        toast.error(message)
    }
    if(isSuccess && user) {
        navigate('/Product')
    }
    dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
     setFormData( (prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
     }))
  }

    const onSubmit = (e) => {
        e.preventDefault()

      const userData = {
        name, 
        password,
      }
      dispatch(login(userData))
    }

    if (isLoading) {
      return <Spinner/>
    }

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <form onSubmit={onSubmit} className="mt-5">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Enter your name" 
                    name="name" 
                    value={name} 
                    onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Enter your password" 
                    name="password" 
                    value={password} 
                    onChange={onChange}
                     />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Login