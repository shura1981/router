import { useContext, useEffect } from "react"
import UserContext from "../context/User/UserContext"

const Profile = () => {
const{ selectedUser  } = useContext(UserContext);

 


  return (
   <>
   {
      selectedUser ? ( 
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={selectedUser.avatar} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title"> {selectedUser.first_name} {selectedUser.last_name} </h5>
              <p className="card-text"> {selectedUser.email} </p>
            </div>
          </div>
        </div>
      </div>
      )  : <h1> Selecciona un usuario </h1>
        

   }
   
   </>
  )
}

export default Profile