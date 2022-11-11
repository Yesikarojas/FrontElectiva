import axios from "axios";
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

// esta constante es para tener la url de la Api que se va a consumir
// ejemplo: const url="https://localhost:44302/api/empresas/"

const url = "https://localhost:44302/api/empresas/"
const numbers = [123, 2222, 3345, 4111, 555533, 1,2,3,5,7,54,3];

class Matter extends Component {
    //un estado para almacenar los datos y mostrar
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id: '',
            name: '',
            teacher: '',
            cedits: '',
            tipoModal: ''
        }
    }

    //metodo para mostrar modal insertar
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }
    //metodo para la peticion get
    peticionGet = () => {
        //esta url es la de la api que mencione arriba
        axios.get(url).then(response => {
            this.setState({ data: response.data })  //esto muestra en la consola lo que tenga en este caso los datos de materias
        }).catch(error => {
            console.log(error.message);
        })
    }
    //metodo de petición post
    peticionPost = async () => {
        delete this.state.form.id;
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    //metodo para recibir id de actividad a modificar
    seleccionarId = (matter) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: matter.id,
                name: matter.name,
                teacher: matter.teacher,
                cedits: matter.cedits,
            }
        })
    }

    peticionPut = () => {
        axios.put(url + this.state.form.id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        })
    }

    peticionDelete = () => {
        axios.delete(url + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        })
    }
    //metodo para capturar los datos que ingresan
    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }
    //ciclo de vida para el metodo Get
    componentDidMount() {
        this.peticionGet();
    }

    render() {
        const { form } = this.state;
        return (
            <div className="App">
                
                <br />
                <Button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Nueva Materia</Button>
                <br /><br />
                {numbers.map(element => (
                    <Card className="col-sm-3 form-inline position-relative d-inline-block my-2 border-success mb-3">
                        <CardHeader className="border-success mb-3">
                            Materia
                        </CardHeader>
                        <CardBody className="border-success mb-3">
                            Nombre: {element}

                        </CardBody>
                        <CardFooter className="border-success mb-3">
                            <button className="btn btn-primary" onClick={() => this.modalInsertar()}><FontAwesomeIcon icon={faEdit} /></button>
                            <button className="btn btn-danger" onClick={() => { this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>

                        </CardFooter>
                    </Card>
                ))}
                                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Profesor</th>
                            <th>Creditos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>taller</td>
                            <td>2000-12-87</td>
                            <td>46</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => this.modalInsertar()}><FontAwesomeIcon icon={faEdit} /></button>
                                <button className="btn btn-danger" onClick={() => { this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </td>
                        </tr>
                        {/* aqui se llena la tabla con los datos que hay en data y estos son los que vienen de la Api */}
                        {this.state.data.map(matter => {
                            {/*este nombre de actividades es segun lo que haya en url es decir como se llama la tabla de actividades en la api */ }
                            <tr>
                                <td>{matter.id}</td>
                                <td>{matter.name}</td>
                                <td>{matter.teacher}</td>
                                <td>{matter.cedits}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => { this.seleccionarId(matter); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                    {"  "}
                                    <button className="btn btn-danger" onClick={() => { this.seleccionarId(matter); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </td>
                            </tr>
                        })

                        }

                    </tbody>

                </table>



                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'left' }}>Materia</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">Id</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                            <br />
                            <label htmlFor="name">Nombre</label>
                            <input className="form-control" type="text" name="name" id="name" required onChange={this.handleChange} value={form ? form.name : ''} />
                            <br />
                            <label htmlFor="teacher">Profesor</label>
                            <input className="form-control" type="text" name="teacher" id="teacher" onChange={this.handleChange} value={form ? form.teacher : ''} />
                            <br />
                            <label htmlFor="cedits">Creditos</label>
                            <input className="form-control" type="number" pattern="[0-9]" name="cedits" id="cedits" onChange={this.handleChange} value={form ? form.cedits : ''} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal == 'insertar' ?
                            <Button className="btn btn-success" onClick={() => this.peticionPost()}>Guardar</Button> :
                            <Button className="btn btn-success" onClick={() => this.peticionPut()}>Guardar</Button>}


                        <Button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

                {/*modal eliminar*/}
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalHeader>
                        Eliminar
                    </ModalHeader>
                    <ModalBody>
                        ¿Esta seguro de eliminar ?
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</Button>
                        <Button className="btn btn-dark" onClick={() => this.setState({ modalEliminar: false })}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Matter;