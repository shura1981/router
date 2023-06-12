import { createContext, useEffect, useState } from 'react';

export const TaskContext = createContext();

export const TaskState = ({ children }) => {
    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState("");
    const [error, setError] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState("");
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const tareasLocalStorage = JSON.parse(localStorage.getItem("tareas"));
        if (!tareasLocalStorage) return;
        setTareas(tareasLocalStorage);
        console.log("primer usefect");
    }, []);

    useEffect(() => {
        localStorage.setItem("tareas", JSON.stringify(tareas));
        console.log("segundo usefect");
    }, [tareas]);

    const handleAddTarea = (e) => {
        e.preventDefault();
        if (!tarea.trim()) {
            setError("Escriba algo por favor");
            return;
        }
        const id_task = tareas.length === 0 ? 1 : tareas[tareas.length - 1].id + 1;
        console.log(id_task);

        setTareas([...tareas, { id: id_task, nombreTarea: tarea }]);
        setTarea("");
        setError(null);
        setSuccess("Tarea agregada con exito");
    };

    const handleDeleteTarea = (id) => {
        const arrayFiltrado = tareas.filter((item) => item.id !== id);
        setTareas(arrayFiltrado);
    };

    const handleEditTarea = (item) => {
        setModoEdicion(true);
        setTarea(item.nombreTarea);
        setId(item.id);
    };

    const handleUpdateTarea = (e) => {
        e.preventDefault();
        if (!tarea.trim()) {
            setError("Escriba algo por favor");
            return;
        }
        const arrayEditado = tareas.map((item) =>

            item.id === id ? { id, nombreTarea: tarea } : item
        );
        setTareas(arrayEditado);
        setModoEdicion(false);
        setTarea("");
        setId("");
        setError(null);
        setSuccess("Tarea actualizada con exito");
    };
    return (
        <TaskContext.Provider value={{ 
            tareas,
            tarea,
            error,
            modoEdicion,
            id,
            success,
            setTarea,
            handleAddTarea,
            handleDeleteTarea,
            handleEditTarea,
            handleUpdateTarea,
            setSuccess
            
         }}>
            {children}
        </TaskContext.Provider>
    );
}
