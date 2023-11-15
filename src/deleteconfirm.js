
import { Modal, Button } from "react-bootstrap";
<div>



























         <Modal className="modal-dialog modal-dialog-centered" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter new details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="m-0 p-0">
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addStudent}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
</div>























// import { Modal, Button } from "react-bootstrap";
// <div>
// <Button className="buttonpop" variant="primary" onClick={handleShow}>
//         Add new user
// </Button>


// <button
//  type="button"
// className="btn btn-primary me-2 mt-1"
// onClick={() => removeStudent(index)}>
// Remove
// </button>
// </div>
