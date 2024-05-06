import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import Spinner from "../components/Spinner";
import {toast} from 'react-toastify'
import { getCart } from '../features/cart/cartSlice';

function Cart() {

  const dispatch = useDispatch()

  const {cart, isLoadng, isError, message, isSuccess} = useSelector((state) => state.cart)
  useEffect(() => {
    if (isError) {
      toast.error(message)
    };
    
    if (isSuccess) {
      dispatch(getCart())
    }

  },[isError, message, isSuccess, dispatch])

  if (isLoadng) {
    return <Spinner/>
  }
  return (
    <>
    {/* {isSuccess && (
      <div className="container mt-3">
          <div className="row">
              {cart && cart.map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <div className="card">
                    <img src={item.image} className="card-img-top" alt="Product" id='card-image' />
                      <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">{item.description.length > 30 ? `${item.description.substring(0, 50)} .Read more...` : item.description}</p>
                          <p className="card-text">category: {item.category}</p>
                          <p className="card-text">Price: ${item.price}</p>
                          <p className="card-text">Rating: {item.rating.rate}</p>
                        </div>
                  </div>
                </div>
              ))}
          </div>
      </div>
    )} */}
    <div className='container'>
      <div className='text-center issue'> This page hasn't been created yet</div>
    </div>
    </>
  )
}

export default Cart