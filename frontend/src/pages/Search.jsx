import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {productsByCategory } from '../features/product/productSlice'
import Spinner from "../components/Spinner";

function Search() {

  const [formData, setFormData] = useState({
    category: '',
  })

  const {category} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {product, isLoading, isSuccess, isError, message} = useSelector((state) => state.product)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

  }, [product, isError, isSuccess, message, navigate, dispatch,])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (category.trim() === '') {
      // If category is empty, do nothing
      return;
    }
  
    dispatch(productsByCategory(category));
  
  };

  if (isLoading) {
    <Spinner/>
  }
  
  return (
    <>
  
<div className="container mt-5">
      <h1 className="mb-4">Search Page</h1>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input type="search" 
          className="form-control" 
          placeholder="Search" 
          name='category'
          value={category}
          onChange={onChange}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      <div className="alert alert-info" role="alert">
       search for the product your looking for.
       search for only this avaliable product electronics jewelery, men's clothing, women's clothing
      </div>
    </div>
    {isSuccess && product && (
  <div className="container mt-3">
    <div className="row">
      {product.map((item) => (
        <div className="col-md-4 mb-4" key={item.id}>
          <div className="card">
          <img src={item.image} className="card-img-top" alt="Product" />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description.length > 40 ? `${item.description.substring(0, 40)}. Read more...` : item.description}</p>
              <p className="card-text">category: {item.category}</p>
              <p className="card-text">Price: ${item.price}</p>
              <p className="card-text">Rating: {item.rating.rate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
    </>
  )
}

export default Search