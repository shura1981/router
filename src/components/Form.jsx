
import { Http, showErrorFetch, showSuccess, toogleLoading } from "../utils"

const Form = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Formulario enviado')
        const data = new FormData(e.target)
        const body = {
            title: data.get('name'),
            body: data.get('lastname'),
            email: data.get('email'),
            userId: 1,
        }

        //   
        console.log(body);
        toogleLoading();
        Http({
            url: "https://jsonplaceholder.typicode.com/posts", method: "POST", data: body, headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(res => {
                showSuccess('Se envio correctamente');
                //resetear el formulario
                e.target.reset();
            })
            .catch(err => showErrorFetch(err.statusText))
            .finally(() => console.log('Finalizo'))

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Nombre</label>
                    <input required type="text" id="name" name="name" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname">Apellido</label>
                    <input required type="text" id="lastname" name="lastname" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Correo</label>
                    <input required type="email" id="email" name="email" className="form-control" />
                </div>
                <button className="btn btn-primary" type="submit">Enviar</button>
            </form>
        </div>
    )
}


export default Form