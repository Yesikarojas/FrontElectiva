import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { connectAPI } from '../../connection/connectionAPI';
import { BsDashCircle, BsPlusCircle} from "react-icons/bs";
import Swal from "sweetalert2";
import { BtnAddAct } from '../elements/btnAddActivity';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { ModalUpdActivity } from '../elements/modalUpdActivity';

const Activities = ()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[activitiesData, setActivities] = useState([])
    const[name, setName] = useState('')
    const[teacher, setTeacher] = useState('')
    const[cedits, setCedits] = useState('')

    function peticionPost(){
        connectAPI
        .post("/activities", { name, teacher, cedits })
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

    function compareFechas(fechaActividad) {
        const aux = new Date(fechaActividad);
        const fechaActual = new Date();

        if (aux > fechaActual) {
          return <Card.Text>Ufff!!! aún hay tiempo :v</Card.Text>;
        }else{
            if (aux <= fechaActual) {
                return <Card.Text>Ha terminado el tiempo :(</Card.Text>;
              }
        }
    }

    function estadoACT(estado) {
        const aux = estado;
        if (aux) {
          return <Card.Text>Entregada</Card.Text>;
        }else{
            return <Card.Text>Sin Entregar</Card.Text>;
        }
    }

    function generateCard(id, description, name, dateDelivery, qual, percent, statusAct, subId){
        const fechaActivi = new Date(dateDelivery);
        const fechaActual = new Date();
        const status = statusAct;

        if(!status){
            if (fechaActivi > fechaActual) {
                return(
                    <>
                  
                    <Card
                        bg="warning"
                        text='white'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{description} - {name}</Card.Header>
                        <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item>Fecha Entrega: {dateDelivery}</ListGroup.Item>
                                    <ListGroup.Item>Calificación: {qual}</ListGroup.Item>
                                    <ListGroup.Item>Porcentaje: {percent}</ListGroup.Item>
                                    <ListGroup.Item>Estado Actividad: {estadoACT(statusAct)} </ListGroup.Item>
                                    <ListGroup.Item><b>{compareFechas(dateDelivery)}</b></ListGroup.Item>
                                </ListGroup>                              
                        </Card.Body>
                        <Card.Footer>
                            <BtnAddAct btnName="Editar Actividad" dataUpdate={<ModalUpdActivity idAct={id} descAct={description} dateAct={dateDelivery} qualAct={qual} percentAct={percent} statusAct={status} subjectAct={name} subjectId={subId} />} title="Actualizar Actividad"/>
                        </Card.Footer>
                    </Card>
                    </>
                  )
            }else{
                if (fechaActivi <= fechaActual) {
                    return(  
                        <Card
                            bg="danger"
                            text='white'
                            style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Header>{description} - {name}</Card.Header>
                            <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>Fecha Entrega: {dateDelivery}</ListGroup.Item>
                                        <ListGroup.Item>Calificación: {qual}</ListGroup.Item>
                                        <ListGroup.Item>Porcentaje: {percent}</ListGroup.Item>
                                        <ListGroup.Item>Estado Actividad: {estadoACT(statusAct)} </ListGroup.Item>
                                        <ListGroup.Item><b>{compareFechas(dateDelivery)}</b> </ListGroup.Item>
                                    </ListGroup>                              
                            </Card.Body>
                            <Card.Footer>
            
                            </Card.Footer>
                        </Card>
                      )
                }
            }
        }else{
            return(
                <>
              
                <Card
                    bg="primary"
                    text='white'
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header>{description} - {name}</Card.Header>
                    <Card.Body>
                            <ListGroup>
                                <ListGroup.Item>Fecha Entrega: {dateDelivery}</ListGroup.Item>
                                <ListGroup.Item>Calificación: {qual}</ListGroup.Item>
                                <ListGroup.Item>Porcentaje: {percent}</ListGroup.Item>
                                <ListGroup.Item>Estado Actividad: {estadoACT(statusAct)} </ListGroup.Item>
                                <ListGroup.Item><b>Lo has hecho!!! :)</b></ListGroup.Item>
                            </ListGroup>                              
                    </Card.Body>
                </Card>
                </>
              )
        } 
    }

    useEffect(() => {
        connectAPI.get('/activities')
        .then(resp => {
            setActivities(resp.data)   
        })
    },[])

    return (
            <div className='container'>
                <br/>
                <div className='row'>
                    <h4>Estas son sus actividades</h4>
                    {activitiesData.map(element => (
                        generateCard( element.id, element.description, element.subject.name, element.dateDelivery, element.qual, element.percent, element.statusAct, element.subject.id)
                    ))}
                </div>
            </div>
    )
}

export default Activities;