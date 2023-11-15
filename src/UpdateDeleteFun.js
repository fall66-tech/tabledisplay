import React from 'react'
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import Icon from '@mdi/react';
import { mdiDeleteForever, mdiTableEdit } from '@mdi/js';
import Button from '@mui/material/Button';


export default function UpdateDeleteFun({students,
    setStudents,
    alert,
    showAlert,
    setAlert,}) {
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    //modal hook for remove
    const [showModal, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
      setAlert(null);
    };
    const handleShow = () => setShow(true);
    //remove modal open
    const openModal = (index) => {
      setSelectedItemIndex(index);
      handleShow();
    };
    //remove student function
    const removeStudent = () => {
      const updatedStudents = [...students];
      updatedStudents.splice(selectedItemIndex, 1);
      setStudents(updatedStudents);
    };
    const BothRemoveClose = () => {
      removeStudent();
      handleClose();
    };
  
    //update student
    const openUpdateModal = (index) => {
      setSelectedItemIndex(index); 
      const selectedStudent = students[index];
      setupdatedName(selectedStudent.name); 
      setupdatedAge(selectedStudent.age.toString()); 
      if(selectedStudent.phoneNumber==="N/A"){
        setupdatedPhoneNumber("")
      }
      else {
        setupdatedPhoneNumber(selectedStudent.phoneNumber); 
      }
      
      handleShow2();
    };
    //modal hook for update
    const [showModalUp, setShowUp] = useState(false);
    const handleClose2 = () => setShowUp(false);
    const handleShow2 = () => setShowUp(true);
  
    const [updatedName, setupdatedName] = useState("");
    const [updatedAge, setupdatedAge] = useState("");
    const [updatedPhoneNumber, setupdatedPhoneNumber] = useState("");
  
    const updateStudent = () => {
      if (updatedName.trim() === "" || updatedAge.trim() === "") {
        showAlert("Name and Age are required fields.");
        return;
      }
      if (!/^[a-zA-Z\s]+$/.test(updatedName.trim())) {
        showAlert("Name must contain only letters and spaces.");
        return;
      }
      const ageValue = parseInt(updatedAge);
      if (isNaN(ageValue) || ageValue < 1 || ageValue > 100) {
        showAlert("Age must be a number between 1 and 100.");
        return;
      }
      let UpPhoneNumberValue = updatedPhoneNumber.trim();
      if (UpPhoneNumberValue !== "" && !/^\d{10}$/.test(UpPhoneNumberValue)) {
        showAlert("Phone number must be 10 digits if provided.");
        return;
      }
      if (UpPhoneNumberValue === "") {
        UpPhoneNumberValue = "N/A";
      }
  
  
    const lowercaseName = updatedName.toLowerCase();
      const isNameAlreadyExists = students.some(
        (student, index) => index !== selectedItemIndex && student.name.toLowerCase() === lowercaseName
      );
      
      const isPhoneNumberAlreadyExists = students.some(
        (student, index) =>
          index !== selectedItemIndex && student.phoneNumber === UpPhoneNumberValue && student.phoneNumber !=="N/A"
      );
    
      if (isNameAlreadyExists) {
        showAlert("Name already exists in the list.");
        return;
      }
    
     
    
      if (isPhoneNumberAlreadyExists) {
        showAlert("Phone number already exists in the list.");
        return;
      }
    
      const updatedStudents = [...students];
      updatedStudents[selectedItemIndex] = {
        name: updatedName,
        age: parseInt(updatedAge),
        phoneNumber:UpPhoneNumberValue,
      };
      setStudents(updatedStudents);
      setupdatedName("");
      setupdatedAge("");
      setupdatedPhoneNumber("");
      handleClose2();
      setAlert(null);
    };
  
    const CloseClear2 = () => {
      setupdatedName("");
      setupdatedAge("");
      setupdatedPhoneNumber("");
      handleClose2();
      setAlert(null);
    };
  return (
    <div>
      <Modal className="modal" show={showModal} openModal={openModal}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-2 p-2">
          <Alert severity="error">Are you sure?</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="text text-grey-800" onClick={handleClose}>
            Close
          </Button>
          <Button variant="text text-white bg-black" onClick={BothRemoveClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal className="modal" show={showModalUp} openUpdateModal={openUpdateModal} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Update new details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-0">
          {alert && <Alert severity="warning">{alert.msg}</Alert>}
          <form>
            <div className="m-3">
              <label htmlFor="updateformName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                value={updatedName }
                onChange={(e) => {setupdatedName(e.target.value);}}
                className="form-control"
                id="updateformName"
              />
            </div>

            <div className="m-3">
              <label htmlFor="updateformAge" className="form-label">
                Age:
              </label>
              <input
                type="number"
                value={updatedAge}
                onChange={(e) => setupdatedAge(e.target.value)}
                className="form-control"
                id="updateformAge"
              />
            </div>
            <div className="m-3">
              <label htmlFor="updateformPhone" className="form-label">
                Phone:
              </label>
              <input
                type="text"
                value={updatedPhoneNumber}
                onChange={(e) => setupdatedPhoneNumber(e.target.value)}
                className="form-control"
                id="updateformPhone"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant=" bg-grey-400" onClick={CloseClear2}>
            Close
          </Button>
          <Button variant="text text-white bg-black" onClick={updateStudent}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
