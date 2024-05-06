import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    password2: '',
  });

  const {name, email, phoneNo, password, password2} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch() 

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
)

useEffect(() => {
  if(isError) {
      toast.error(message)
  }
  if(isSuccess && user) {
      navigate('/product')
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
        if (password !== password2) {
          toast.error('password do not match')
        } else {
          // setFormData({
          //   name: '',
          //   email: '',
          //   phoneNo: '',
          //   password: '',
          //   password2: '',
          // })
          const userData = {
            name,
            email,
            phoneNo,
            password,
          }
          dispatch(register(userData))
        }
    }

    if (isLoading) {
      return <Spinner/>
    }

  return (
    <div className="container">
      <h1 className="text-center">Register</h1>
      <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Enter your name" 
                    name="name" 
                    value={name} 
                    onChange={onChange} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" 
                    className="form-control" 
                    id="email" 
                    placeholder="Enter your email" 
                    name="email" 
                    value={email} 
                    onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNo" className="form-label">Phone Number:</label>
                    <input type="text" 
                    className="form-control" 
                    id="phoneNo" 
                    placeholder="Enter your phone number" 
                    name="phoneNo" 
                    value={phoneNo} 
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
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">confirm password:</label>
                    <input type="password" 
                    className="form-control" 
                    id="password2" 
                    placeholder="Enter your password" 
                    name="password2" 
                    value={password2} 
                    onChange={onChange}
                     />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Register