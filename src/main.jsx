import React, { useEffect, useState, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
// Import all of Bootstrap's JS
import { Button, Dropdown, Tooltip, Toast, Popover } from 'bootstrap'
import { BrowserRouter, Routes, Route, Navigate, Link, Outlet, useSearchParams, useLocation } from 'react-router-dom';
import { useNavigate, useParams } from "react-router";
import * as user from './users';

import Profile from './components/Profile';
import UserList from './components/UserList';
import UsersState from './context/User/UserState';
import Form from './components/Form';
import { TaskContext, TaskState } from './context/Task/TaskContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path='users' element={<User />} >
          <Route path=":userId" element={<InfoUser />} />
        </Route>
        <Route path='blog' element={<Blog />} />
        <Route path='contact' element={<Contact />} />
        <Route path='tareas' element={< ContainerTask />} />
        <Route path='about' element={< About />} />
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
  const { search } = useLocation();
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
                      <Link to={usuario.id.toString() + search}> {usuario.name}</Link>
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
  const userFinder = user.getUser(+userId);
  if (!userFinder) {
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
  const handleErrorLoad = e => {
    e.target.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png");
  }
  const handleDelted = () => {
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
                <img style={{ backgroundColor: "#adb5bd" }} onError={handleErrorLoad} onLoad={handleLoad} src={`https://picsum.photos/500/300?image=${id}`} className="card-img-top" alt={username} />
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
          <div className="col-12">
            <h1 className='text-center'>Blog</h1>
            <UsersState>
              <div className="row">
                <div className="col-12 col-md-6">
                  <UserList />
                </div>
                <div className="col-12 col-md-6">
                  <Profile />
                </div>
              </div>
            </UsersState>
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



  useEffect(() => {
    const ANCHURA_MAXIMA = 812;
    const handleCloseButton = () => {
      //obtener anchura de la pantalla
      const widthScreen = window.innerWidth;
      console.log(widthScreen);
      if (widthScreen < ANCHURA_MAXIMA) {
        if (buttonMenu.classList.contains("collapsed")) return;
        buttonMenu.click();
      }
      //detectar si hay cambios en la anchura de la pantalla
      window.addEventListener("resize", handleCloseButton);


    }
    const buttonMenu = document.querySelector(".navbar-toggler");
    const links = document.querySelectorAll(".toogle-menu");
    links.forEach(b => b.addEventListener("click", handleCloseButton));
  }, []);

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
                <Link to="/users" className="nav-link toogle-menu" aria-current="page" >Usuarios</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link toogle-menu" >Sobre nosotros</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Opciones
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to="blog" className="dropdown-item toogle-menu" >Blog</Link></li>
                  <li><Link to="contact" className="dropdown-item toogle-menu" >Contacto</Link></li>
                  <li className="dropdown-divider"></li>
                  <li><Link to="tareas" className="dropdown-item toogle-menu" >Lista de tareas</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled toogle-menu">Salir</a>
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

function ListTask() {
  const taskContext = useContext(TaskContext);
  const { tareas, handleEditTarea, error, success, handleDeleteTarea } = taskContext;
  return <>
    {error ? <div className="alert alert-danger">{error}</div> : null}
    {success ? <div className="alert alert-success">{success}</div> : null}
    <ul className="list-group">
      {tareas.length === 0 ? (
        <li className="list-group-item">No hay tareas</li>
      ) : (
        tareas.map((item) => (
          <li className="list-group-item" key={item.id}>
            <span className="lead">{item.nombreTarea}</span>
            <button
              className="btn btn-danger btn-sm float-end mx-2"
              onClick={() => handleDeleteTarea(item.id)}
            >
              Eliminar
            </button>
            <button
              className="btn btn-warning btn-sm float-end"
              onClick={() => handleEditTarea(item)}
            >
              Editar
            </button>
          </li>
        ))
      )}
    </ul>
  </>
}
function FormTask() {
  const taskContext = useContext(TaskContext);
  const { tarea, handleAddTarea, modoEdicion, setTarea, handleUpdateTarea } = taskContext;
  return <>
    <form className="form-group" onSubmit={modoEdicion ? handleUpdateTarea : handleAddTarea}>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Ingrese tarea"
        onChange={(e) => setTarea(e.target.value)}
        value={tarea}
      />
      <button
        className={
          modoEdicion
            ? "btn btn-warning btn-block"
            : "btn btn-dark btn-block"
        }
        type="submit"
      >
        {modoEdicion ? "Editar" : "Agregar"}
      </button>
    </form>
  </>
}

function Tareas() {
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <h1 className='text-center'>Lista de tareas</h1>
            <FormTask />
            <ListTask />
          </div>
        </div>
      </div>
    </>
  );
}


function ContainerTask() {
  return <>
    <TaskState>
      <Tareas />
    </TaskState>
  </>
}


const useShow = (initialState = true) => {
  const [show, setShow] = useState(initialState);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  const handleToggle = () => setShow(!show);
  return [show, handleShow, handleHide, handleToggle];
}


function About() {
  const [show, handleShow, handleHide, handleToggle] = useShow(true);
  return <>
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className='text-center'>Acerca de</h1>
          <div className="d-flex justify-content-between my-3">
            <button onClick={handleToggle} className='btn btn-primary'>Toogle show</button>
            <button onClick={handleShow} className='btn btn-warning'>mostrar</button>
            <button onClick={handleHide} className='btn btn-danger'>ocultar</button>
          </div>
          {
            show && <div className="card">
              <div>
                Mostrar información de la empresa
              </div>
              <div>
                Práctica de custom hooks
              </div>
            </div>
              
          }

        </div>
      </div>
    </div>
  </>
}




function Contact() {

  return <>
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className='text-center'>Contacto</h1>
          <Form />
        </div>
      </div>
    </div>
  </>


}