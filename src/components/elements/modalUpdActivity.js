import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { connectAPI } from "../../connection/connectionAPI";
import { FloatingLabel } from 'react-bootstrap';

import Swal from "sweetalert2";

export function ModalUpdActivity({ idAct, descAct, dateAct, qualAct, percentAct, statusAct, subjectAct, subjectId }) {

    const[id, setId] = useState('');
    const[desc, setDesc] = useState('');
    const[date, setDate] = useState('');
    const[qual, setQual] = useState('');
    const[percent, setPercent] = useState('');
    const[status, setStatus] = useState('');
    const[subject, setSubject] = useState('');

    function updAct(){
        console.log(status)
        connectAPI
        .put("/activities/",{ "id":id, "description":desc, "dateDelivery":date, "qual":qual, "percent":percent, "statusAct":true,
        "subject":{
            "id":subjectId
        } })
        .then((response) => {
            if (response.data) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Actividad modificada con exito',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }
        })
    }

  useEffect(() => {
    setId(idAct)
    setDesc(descAct)
    setDate(dateAct)
    setPercent(percentAct)
    setQual(qualAct)
    setStatus(statusAct)
    setSubject(subjectAct)
  }, [])



  return (
    <>
        <Form>
            
            <Form.Group className="mb-3">
                <Form.Label>Info. Actividad</Form.Label>
                <Form.Control type="text" value={desc+' - '+subject} readOnly='true' />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Porcentaje Actividad</Form.Label>
                <Form.Control type="number" min={0} max={100} value={percent} onChange={(e)=>setPercent(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Calificación</Form.Label>
                <Form.Control type="number" min={0} max={5} value={qual} onChange={(e)=>setQual(e.target.value)}/>
            </Form.Group>
            <Button variant="success" type='submit' 
                onClick={updAct}
            >Guardar</Button>
        </Form>
    </>
  )
}