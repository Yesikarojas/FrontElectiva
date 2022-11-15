import { connectAPI } from "../../conection/conectionAPI";
import React, { Component, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

import Swal from "sweetalert2";


const subjects = [{ id: 1, name: "Teoria General de Sistemas", teacher: "Marco Javier", cedits: 3 },
{ id: 2, name: "Transmisión de datos", teacher: "Pedro Nel", cedits: 4 }];
const act = [{ id: 1, description: "Taller 2", dateDelivery: "2022-11-03", qual: 3.9, percent: "20%", code: 1 },
{ id: 2, description: "Quiz 2", dateDelivery: "2022-11-05", qual: '', percent: "50%", code: 2 }];
const [subject, setSubject] = useState([]);

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
            cedits: ''
        },

        tipoModal: '',
        code: ''

    }

    //metodo para mostrar modal insertar
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }
    //metodo para la peticion get
    peticionGet = () => {
        //esta url es la de la api que mencione arriba

        connectAPI.get("/subjects")
            .then(response => {
                setSubject(response.data)
            }).catch(error => {
                console.log(error.message);
            })
    }
    /*useEffect(() => {
        connectAPI.get('/subjects')
        .then(resp => {
            setSubject(resp.data)   
  
        })
    },[])*/
    //metodo de petición post
    peticionPost = async () => {
        delete this.state.form.id;
        connectAPI.post("https://8103-132-255-20-66.ngrok.io/subjects", { name: this.state.form.name, teacher: this.state.form.teacher, cedits: this.state.form.cedits })
            .then((response) => {
                if (response.data) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Materia añadida con exito',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    this.modalInsertar();
                }
            })
    }



    //metodo para recibir id de materia a modificar
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
    idSubject = (matter) => {
        console.log(matter);
        this.setState({
            code: matter
        })
        console.log(this.state.code + "----");
    }
    //ciclo de vida para el metodo Get
    componentDidMount() {
    }

    render() {
        const { form } = this.state;
        return (
            <div className="App">

                <br />
                <Button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Nueva Materia</Button>
                <br /><br />
                {subject.map(element => (
                    <Card className="col-sm-3 form-inline position-relative d-inline-block my-2 border-secondary mb-3">
                        <CardHeader className="border-secondary mb-3 text-bg-info mb-3 text-center">
                            {element.name}
                        </CardHeader>
                        <CardBody >
                            Profesor: {element.teacher}<br></br>
                            Creditos: {element.cedits}
                        </CardBody>
                        <CardFooter className="text-center">
                            <button className="btn btn-success" onClick={() => this.idSubject(element.id)}><Link className="nav-link" to='/activities'><FontAwesomeIcon icon={faBookBookmark} />   Actividades</Link></button> <button className="btn btn-danger" onClick={() => { this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} />  Eliminar Materia</button>

                        </CardFooter>
                    </Card>
                ))}

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