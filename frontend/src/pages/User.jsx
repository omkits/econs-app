import React from 'react'
import { useSelector } from 'react-redux';

function User() {
  const{ user} = useSelector(state => state.auth)

  return (
    <div className="container mt-3">
      <div className="row">
        {user && (
          <div className=" mb-5" key={user._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center mb-2" >{user.name}</h5>
                <p className="card-text text-center"> Email:{user.email}</p>
                <p className="card-text text-center">Phone:{user.phoneNo}</p>   
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default User
