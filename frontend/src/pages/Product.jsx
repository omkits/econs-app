import React from 'react'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner";
import { fetchProducts } from '../features/product/productSlice'
// import { addCart } from '../features/cart/cartSlice';
function Product() {

  const dispatch = useDispatch()

  const {product, isLoading, isSuccess, isError, message} = useSelector((state) => state.product)
  // const {user} = useSelector((state) => state.auth)
  
  
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
   
    dispatch(fetchProducts())

  }, [product, isError, isSuccess, message,dispatch])


  // const addToCart = (productId, quantity) => {
  //   const cartData = {
  //     userId: user && user._id,
  //     productId,
  //     quantity,
  //   };

  //   dispatch(addCart(cartData))
  //     .then(() => {
  //       toast.success("Item added to cart!");
  //     })
  //     .catch((error) => {
  //       toast.error("Failed to add item to cart: " + error.message);
  //     });
  // };
     

   
  if (isLoading) {
    <Spinner/>
  }
  return (
    <>
    {isSuccess && (
      <div className="container mt-3">
          <div className="row">
              {product && product.map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <div className="card">
                    <img src={item.image} className="card-img-top" alt="Product" id='card-image' />
                      <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">{item.description.length > 30 ? `${item.description.substring(0, 50)} .Read more...` : item.description}</p>
                          <p className="card-text">category: {item.category}</p>
                          <p className="card-text">Price: ${item.price}</p>
                          <p className="card-text">Rating: {item.rating.rate}</p>
                          {/* <input type="number" defaultValue="1" min="1" id={`quantity-${item.id}`} />
                          <button onClick={() => addToCart(item.id, document.getElementById(`quantity-${item.id}`).value)}>Add to Cart</button> */}
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

export default Product