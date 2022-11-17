import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { connectAPI } from "../../connection/connectionAPI";
import { FloatingLabel } from 'react-bootstrap';

import Swal from "sweetalert2";

export function ModalAddAct({ idMatter, nameMatter }) {

    const[id, setId] = useState('');
    const[name, setName] = useState('');

    const[description, setDescripcion] = useState('');
    const[dateDelivery, setFecha] = useState('');
    const[percent, setPorcentaje] = useState('');

    function addAct(){
        connectAPI
        .post("/activities",{ description, dateDelivery,"qual":0,percent, "statusAct":false,
        "subject":{
            "id":id
        } })
        .then((response) => {
            if (response.data) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Actividad añadida con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
        })
    }

  useEffect(() => {
    setId(idMatter)
    setName(nameMatter)
  }, [])



  return (
    <>
        <Form>
            
            <Form.Group className="mb-3">
                <Form.Label>Nombre Materia</Form.Label>
                <Form.Control type="text" value={name} readOnly='true' />
            </Form.Group>
            <Form.Group className="mb-3" >
                <FloatingLabel controlId="formBasicDescription" label="Descripción de la actividad">
                    <Form.Control
                        as="textarea"
                        style={{ height: '100px' }}
                        value={description} onChange={(e)=>setDescripcion(e.target.value)}
                    />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Fecha Vencimiento</Form.Label>
                <Form.Control type="datetime-local" value={dateDelivery} onChange={(e)=>setFecha(e.target.value)}/>
                <Form.Label>Porcentaje Actividad</Form.Label>
                <Form.Control type="number" min={0} max={100} value={percent} onChange={(e)=>setPorcentaje(e.target.value)}/>
            </Form.Group>
            <Button variant="success" type='submit' 
                onClick={addAct}
            >Guardar</Button>
        </Form>
    </>
  )
}