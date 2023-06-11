import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
// Import all of Bootstrap's JS
import { Button, Dropdown, Tooltip, Toast, Popover } from 'bootstrap'
import { BrowserRouter, Routes, Route, Navigate, Link, Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { useNavigate, useParams } from "react-router";
import * as user from './users';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path='users' element={<User />} >
          <Route path=":userId" element={<InfoUser />} />
        </Route>
        <Route path='blog' element={<Blog />} />
      </Route>
      {/* <Route path='*'  element={<NoFound/>} /> */}
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>


  </BrowserRouter>
)



function App() {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h1 className='text-center'>Hola mundo</h1>
            <div className="container__grid--center">
              <button type="button" className="btn btn-primary">Volver</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


function User() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {search}= useLocation();
  const filter = searchParams.get("filter") ?? '';
  const handleFilter = (e) => {
    setSearchParams({ filter: e.target.value });
  }
  const handleListFilter = (user) => {
    if (!filter) return true;
    const name = String(user.name).toLowerCase();
    return name.includes(filter.toLowerCase());
  }

 
  const listFiltered = user.getAllUsers().filter(handleListFilter)
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h1 className='text-center'>Seleccione un Usario</h1>
            <form className="d-flex mb-3" role="search">
              <input onChange={handleFilter} value={filter} className="form-control" type="search" placeholder="Buscar Usuario" aria-label="Search" />
            </form>
            <ul className="list-group">
              {
                listFiltered.length > 0 ?
                  listFiltered.map(usuario => {
                    return <li key={usuario.id} className="list-group-item">
                      <Link to={usuario.id.toString()+search}> {usuario.name}</Link>
                    </li>
                  }) : <li className="list-group-item">
                    <Link > "Sin resultados en la búsqueda"</Link>
                  </li>
              }


            </ul>

          </div>
          <div className="col-12 col-md-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}


function InfoUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userFinder= user.getUser(+userId);
if(!userFinder){
  return <div> No encontrado</div>
}

  const { id, name, username, email, phone, website } = userFinder;
  const listImage = document.querySelectorAll(".info-user img");
  listImage.forEach(img => {
    img.setAttribute("src", "");
    img.classList.remove("show-in");
  });
  const containersLoader = document.querySelectorAll(".loader-container");
  containersLoader.forEach(c => c.classList.remove("hide"));

  const handleLoad = e => {
    e.target.nextSibling.classList.add("hide");
    e.target.classList.add("show-in");
  }
const handleErrorLoad = e =>{
e.target.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png");
}
const handleDelted=()=>{
  user.deleteUser(id);
  navigate("/users");
}
  return (
    <>
      <div className="container my-5 info-user">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h1 className='text-center'>Usario {userId} </h1>
            <div className="card" style={{ width: "18rem" }}>
              <div className="ratio ratio-16x9">
                <img style={{ backgroundColor: "#adb5bd" }}  onError={handleErrorLoad} onLoad={handleLoad} src={`https://picsum.photos/500/300?image=${id}`} className="card-img-top" alt={username} />
                <div className="absolute loader-container">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title"> {name} </h5>
                <p className="card-text"> {email} </p>
                <button onClick={handleDelted} className="btn btn-primary">Borrar </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Blog() {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h1 className='text-center'>Blog</h1>
          </div>
        </div>
      </div>
    </>
  );
}

function NoFound() {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h1 className='text-center'>404 no encontrado</h1>
          </div>
        </div>
      </div>
    </>
  );
}

function Layout() {
  return <>
    <main>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" >Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/users" className="nav-link active" aria-current="page" >Usuarios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" >Link</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to="blog" className="dropdown-item" >Blog</Link></li>
                  <li><Link className="dropdown-item" >Another action</Link></li>
                  <li className="dropdown-divider"></li>
                  <li><Link className="dropdown-item" >Something else here</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>

          </div>
        </div>
      </nav>

      <section>
        <Outlet />
      </section>

    </main>

  </>
}