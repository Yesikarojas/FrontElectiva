import axios from "axios";
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';


// esta constante es para tener la url de la Api que se va a consumir
// ejemplo: const url="https://localhost:44302/api/empresas/"

const url = "https://localhost:44302/api/empresas/"

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
            tipoModal:'actualizar',
            form: {
                id: actividad.id,
                description: actividad.description,
                dateDelivery: actividad.dateDelivery,
                qual: actividad.qual,
                percent: actividad.percent
            }
        })
    }

    peticionPut=()=>{
        axios.put(url+this.state.form.id, this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
        })
    }

    peticionDelete=()=>{
        axios.delete(url+this.state.form.id).then(response=>{
            this.setState({modalEliminar:false});
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
                <Button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'});this.modalInsertar()}}>Nueva Actividad</Button>
                <br /><br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Descripción</th>
                            <th>Entrega</th>
                            <th>Calificación</th>
                            <th>Porcentaje</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>taller</td>
                            <td>2000-12-87</td>
                            <td>46</td>
                            <td>15%</td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>this.modalInsertar()}><FontAwesomeIcon icon={faEdit} /></button>
                                <button className="btn btn-danger" onClick={()=>{this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt} /></button>
                            </td>
                        </tr>
                        {/* aqui se llena la tabla con los datos que hay en data y estos son los que vienen de la Api */}
                        {this.state.data.map(actividades => {
                            {/*este nombre de actividades es segun lo que haya en url es decir como se llama la tabla de actividades en la api */ }
                            <tr>
                                <td>{actividades.id}</td>
                                <td>{actividades.description}</td>
                                <td>{actividades.dateDelivery}</td>
                                <td>{actividades.qualification}</td>
                                <td>{actividades.percent}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>{this.seleccionarId(actividades); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit} /></button>
                                    {"  "}
                                    <button className="btn btn-danger" onClick={()=>{this.seleccionarId(actividades); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </td>
                            </tr>
                        })

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
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length + 1} />
                            <br />
                            <label htmlFor="description">Descripción</label>
                            <input className="form-control" type="text" name="description" id="description" required onChange={this.handleChange} value={form?form.description: ''} />
                            <br />
                            <label htmlFor="dateDelibery">Fecha de entrega</label>
                            <input className="form-control" type="date" name="dateDelibery" id="dateDelibery" required onChange={this.handleChange} value={form?form.dateDelivery: ''} />
                            <br />
                            <label htmlFor="qual">Calificación</label>
                            <input className="form-control" type="number" pattern="[0-9]" name="qual" id="qual" onChange={this.handleChange} value={form?form.qual: ''} />
                            <br />
                            <label htmlFor="percent">Porcentaje</label>
                            <input className="form-control" type="text" name="percent" id="percent" onChange={this.handleChange} value={form?form.percent: ''} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                        <Button className="btn btn-success" onClick={() => this.peticionPost()}>Guardar</Button>:
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
                        <Button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Si</Button>
                        <Button className="btn btn-dark" onClick={()=>this.setState({modalEliminar: false})}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Activities;