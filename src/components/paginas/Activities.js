import axios from "axios";
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';


// esta constante es para tener la url de la Api que se va a consumir
// ejemplo: const url="https://localhost:44302/api/empresas/"

const url = "https://8103-132-255-20-66.ngrok.io/"
const act = [{ id: 1, description: "Taller 2", dateDelivery: "2022-11-03", qual: 3.9, percent: "20%", code: 1 },
{ id: 2, description: "Quiz 2", dateDelivery: "2022-11-05", qual: '', percent: "50%", code: 2 }];
const matters = [{ id: 1, name: "Teoria General de Sistemas", teacher: "Marco Javier", cedits: 3 },
{ id: 2, name: "Transmisión de datos", teacher: "Pedro Nel", cedits: 4 }];



class Activities extends Component {
    //un estado para almacenar los datos y mostrar
    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            id: '',
            description: '',
            dateDelivery: '',
            qual: '',
            percent: '',
            code: '',
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
            this.setState({ data: response.data })  //esto muestra en la consola lo que tenga en este caso los datos de actividades
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
    seleccionarId = (actividad) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: actividad.id,
                description: actividad.description,
                dateDelivery: actividad.dateDelivery,
                qual: actividad.qual,
                percent: actividad.percent,
                code: actividad.code
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
        const x = 2;
        if (x==2) {
            console.log("entro if");
        }
        return (
            <div className="App">
                <br />
                <Button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Nueva Actividad</Button>
                <br /><br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripción</th>
                            <th>Entrega</th>
                            <th>Calificación</th>
                            <th>Porcentaje</th>
                            <th>Código Materia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* aqui se llena la tabla con los datos que hay en data y estos son los que vienen de la Api */}
                        
                        if (act.code==matters.id) {
                            act.forEach(act1 => {
                                <tr>
                                    <td>{act1.id}</td>
                                    <td>{act1.description}</td>
                                    <td>{act1.dateDelivery}</td>
                                    <td>{act1.qual}</td>
                                    <td>{act1.percent}</td>
                                    <td>{matters.id}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { this.seleccionarId(act1); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button> <button className="btn btn-danger" onClick={() => { this.seleccionarId(act1); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            })
                        } else {
                            
                        }


                    </tbody>

                </table>



                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'left' }}>Actividad</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">Id</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                            <br />
                            <label htmlFor="description">Descripción</label>
                            <input className="form-control" type="text" name="description" id="description" required onChange={this.handleChange} value={form ? form.description : ''} />
                            <br />
                            <label htmlFor="dateDelibery">Fecha de entrega</label>
                            <input className="form-control" type="date" name="dateDelibery" id="dateDelibery" required onChange={this.handleChange} value={form ? form.dateDelivery : ''} />
                            <br />
                            <label htmlFor="qual">Calificación</label>
                            <input className="form-control" type="number" pattern="[0-9]" name="qual" id="qual" onChange={this.handleChange} value={form ? form.qual : ''} />
                            <br />
                            <label htmlFor="percent">Porcentaje</label>
                            <input className="form-control" type="text" name="percent" id="percent" onChange={this.handleChange} value={form ? form.percent : ''} />
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

export default Activities;