import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { connectAPI } from '../../connection/connectionAPI';
import { BsDashCircle, BsPlusCircle} from "react-icons/bs";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { BtnAddAct } from '../elements/btnAddActivity';
import { ModalAddAct } from '../elements/modalAddActivity';

const Matter = ()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[subjectsData, setSubjects] = useState([])
    const[name, setName] = useState('')
    const[teacher, setTeacher] = useState('')
    const[cedits, setCedits] = useState('')
    const navigate = useNavigate();


    function peticionPost(){
        connectAPI
        .post("/subjects", { name, teacher, cedits })
                .then((response) => {
                    if (response.data) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Materia añadida con exito',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                    }
                })
    }
    useEffect(() => {
        connectAPI.get('/subjects')
        .then(resp => {
            setSubjects(resp.data)   
        })
    },[])

    function goAct() {
        navigate("/activities");    
    }

    return (
            <div className='container'>
                <br/>
                <div className='row'>
                    <div className='col-sm-3'>
                        <Button variant="success" onClick={handleShow}>
                            <BsPlusCircle/> Nueva Materia
                        </Button>
                    </div>
                </div>                

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Materia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Materia</Form.Label>
                            <Form.Control type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Profesor</Form.Label>
                            <Form.Control type="text"  name="teacher" id="teacher" value={teacher} onChange={(e)=>setTeacher(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Creditos</Form.Label>
                            <Form.Control type="number" min={0} max={4} name="cedits" id="cedits" value={cedits} onChange={(e)=>setCedits(e.target.value)} required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" type='submit' onClick={peticionPost}>
                            Guardar
                        </Button>
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

                <div className='row'>
                    {subjectsData.map(element => (
                        <Card className="col-sm-3 form-inline position-relative d-inline-block my-2 border-secondary mb-3">
                            <Card.Header className='text-center'>
                                {element.name}
                            </Card.Header>
                            <Card.Body>
                                Profesor: {element.teacher}<br/>
                                Creditos: {element.cedits}
                            </Card.Body>
                            <Card.Footer>
                                <div className='row'>
                                    <Button variant="link" onClick={goAct}>
                                        Actividades
                                    </Button>
                                    <BtnAddAct btnName="Nueva Actividad"  dataUpdate={<ModalAddAct idMatter={element.id} nameMatter={element.name} />} title="Nueva Actividad"/>
                                </div>
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            </div>
    )
}

export default Matter;