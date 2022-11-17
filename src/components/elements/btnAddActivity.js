import { Button, Modal } from "react-bootstrap"
import { useState } from "react"
import { BsFillGearFill} from "react-icons/bs";

export function BtnAddAct({btnName, dataUpdate , title }) {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button size="sm" variant="outline-dark" onClick={() => setShow(true)} className="me-2">
        {btnName}
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {dataUpdate}
            
        </Modal.Body>
      </Modal>
    </>
  )
}