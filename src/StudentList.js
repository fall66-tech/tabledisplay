import { useState } from "react";
import React  from "react";
import { Modal, Button } from "react-bootstrap";


const StudentList = ({ students, setStudents ,updateStudent}) => {
  const [showRemModal, setShowR] = useState(false);
  const handleRemClose = () => setShowR(false);
  const handleRemShow = () => setShowR(true);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const showRemovemodal = (index)=> {
    showRemModal();
    setSelectedItemIndex(index);
  };

  const removeStudent = (selectedItemIndex) => {
    const updatedStudents = [...students];
    updatedStudents.splice(selectedItemIndex, 1);
    setStudents(updatedStudents);
  };

  return (
    <div>
      
      <h2>Table view</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.phoneNumber}</td>
              <td>
               
                <button
                  type="button"
                  className="btn btn-primary me-2 mt-1"
                  onClick={() => showRemovemodal(index)}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="btn btn-primary mt-1"
                  onClick={() => updateStudent(index)}
                  
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal className="modal" show={handleRemShow} onHide={handleRemClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update new details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="m-0 p-0">
            <h2>hello world</h2>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleRemClose}>
              Close
            </Button>
            <Button variant="primary" 
            onClick={removeStudent(selectedItemIndex)}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default StudentList;
