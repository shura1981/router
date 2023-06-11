import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/User/UserContext';

const UserList = () => {
const {users, getUsers ,  getProfile} = useContext(UserContext);
useEffect(() => {
  console.log("se monta el componente", users);
  getUsers();

return ()=>{
  console.log("se desmonta el componente");
}

}, []);


  return (
  <>
 <div className="container">
  <div className="row">
    <div className="col-12">
    <h1>Listado de usuarios</h1>
  <ul className="list-group w-100">
    {
      users.map((user)=>(
        <li onClick={()=>{
          getProfile(user.id );
        }}  key={ user.id } className="list-group-item d-flex" style={{cursor: "pointer"}}>
          <img style={{height: "60px", width:"auto"}} className='me-3 rounded-circle' src={user.avatar} alt={user.name} />
          <div className='d-flex flex-column'>
        <div>
        {user.first_name}
        </div>
        <div>
        {user.email}
        </div>
          </div>
        </li>
      ))
    }
</ul>
    </div>

  </div>
 </div>
  </>
  )
}

export default UserList