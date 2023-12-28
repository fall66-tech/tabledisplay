import React from "react";
import { useState, useEffect } from "react";
import StudentList2 from "./StudentList2";
import Icon from "@mdi/react";
import { mdiSortAlphabeticalAscending } from '@mdi/js';

import { Modal } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import ListView from "./ListView";
import TextView from "./TextView";
import Button from "@mui/material/Button";

const getLocalstotage = () => {
  const items = localStorage.getItem("items");
  console.log(items);
  if (items) {
    return JSON.parse(localStorage.getItem("items"));
  } else {
    return [];
  }
};

export default function Appp() {
  const [students, setStudents] = useState(getLocalstotage);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showModal, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setAlert(null);
  };
  const handleShow = () => setShow(true);

  const [alert, setAlert] = useState(null);
  //alert
  const showAlert = (message) => {
    setAlert({
      msg: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
// add student
  const addStudent = () => {
    if (name.trim() === "" || age.trim() === "") {
      showAlert("Name and Age are required fields.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      showAlert("Name must contain only letters and spaces.");
      return;
    }
    const ageValue = parseInt(age);
    if (isNaN(ageValue) || ageValue < 1 || ageValue > 100) {
      showAlert("Age must be a number between 1 and 100.");
      return;
    }
    let phoneNumberValue = phoneNumber.trim();
    if (phoneNumberValue !== "" && !/^\d{10}$/.test(phoneNumberValue)) {
      showAlert("Phone number must be 10 digits if provided.");
      return;
    }
    if (phoneNumberValue === "") {
      phoneNumberValue = "N/A";
    }

    const lowercaseName = name.toLowerCase();
    const studentNameExists = students.some(
      (student) => student.name.toLowerCase() === lowercaseName
    );
    const studentPhoneExists = students.some(
      (student) =>
        student.phoneNumber === phoneNumberValue &&
        student.phoneNumber !== "N/A"
    );
    if (studentNameExists) {
      showAlert("Student with the same name already exists.");
      return;
    }

    if (studentPhoneExists) {
      showAlert("Student with the same phone number already exists.");
      return;
    }

    const newStudent = {
      name,
      age: parseInt(age),
      phoneNumber: phoneNumberValue,
    };

    setStudents([...students, newStudent]);
    setName("");
    setAge("");
    setPhoneNumber("");
    handleClose();
    setAlert(null);
  };

  const CloseClear = () => {
    setName("");
    setAge("");
    setPhoneNumber("");
    handleClose();
    setAlert(null);
  };

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  //modal hook for remove
  const openModalR = (index) => {
    setSelectedItemIndex(index);
    handleShowR();
  };
  const [showModalR, setShowR] = useState(false);
  const handleCloseR = () => {
    setShowR(false);
    setAlert(null);
  };
  const handleShowR = () => setShowR(true);
  //remove modal open

  //remove student function
  const removeStudent = () => {
    const updatedStudents = [...students];
    updatedStudents.splice(selectedItemIndex, 1);
    setStudents(updatedStudents);
  };
  const BothRemoveClose = () => {
    removeStudent();
    handleCloseR();
  };

  //update student
  const openUpdateModal = (index) => {
    setSelectedItemIndex(index);
    const selectedStudent = students[index];
    setupdatedName(selectedStudent.name);
    setupdatedAge(selectedStudent.age.toString());
    if (selectedStudent.phoneNumber === "N/A") {
      setupdatedPhoneNumber("");
    } else {
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
      (student, index) =>
        index !== selectedItemIndex &&
        student.name.toLowerCase() === lowercaseName
    );

    const isPhoneNumberAlreadyExists = students.some(
      (student, index) =>
        index !== selectedItemIndex &&
        student.phoneNumber === UpPhoneNumberValue &&
        student.phoneNumber !== "N/A"
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
      phoneNumber: UpPhoneNumberValue,
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

  const [currentComponent, setCurrentComponent] = useState(1);
  const toggleComponent = () => {
    setCurrentComponent((prevComponent) => (prevComponent % 3) + 1);
  };

  const getButtonText = () => {
    switch (currentComponent) {
      case 1:
        return "show ListView";
      case 2:
        return "Show Add List";
      case 3:
        return "show text";
      default:
        return "show ListView";
    }
  };

  function sortDataAlphabetically() {
    setStudents([...students].sort((a, b) => a.name.localeCompare(b.name)));
  }

  let componentToDisplay;

  switch (currentComponent) {
    case 1:
      componentToDisplay = <TextView />;
      break;
    case 2:
      componentToDisplay = (
        <div className=" p-2 mx-4">
          <div className="flex justify-between items-center my-4">
            <h1 className=" text-lg font-bold">LIST VIEW</h1>

            <div className="flex">
              <button
                type="button"
                className="btn text-white bg-black mx-3"
                onClick={sortDataAlphabetically}
              >
                <Icon  path={mdiSortAlphabeticalAscending} size={1} />
              </button>
            <Button
              variant="text text-white bg-black px-2 py-2"
              onClick={handleShow}
            >
              Add new data
            </Button>

            </div>
            




          </div>
          <ListView
            students={students}
            openModal={openModalR}
            openUpdateModal={openUpdateModal}
          />
        </div>
      );

      break;
    case 3:
      componentToDisplay = (
        <div className=" p-2 mx-4">
          <div className="flex justify-between items-center my-4">
            <h1 className=" text-lg font-bold">TABLE VIEW</h1>
            <Button
              className="  text-white bg-black px-2 py-2"
              onClick={handleShow}
            >
              Add new data
            </Button>
          </div>

          <StudentList2
            students={students}
            openModal={openModalR}
            openUpdateModal={openUpdateModal}
          />
        </div>
      );
      break;
    default:
      componentToDisplay = <TextView />;
  }
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(students));
  }, [students]);

  return (
    <div>
      <div className=" bg-slate-300">
        <Button
          variant="text text-white bg-black mx-4 my-2"
          onClick={toggleComponent}
        >
          {getButtonText()}
        </Button>
      </div>

      {componentToDisplay}

      {/* //modal add */}
      <Modal className="modal" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter new details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-0 p-0">
          {alert && <Alert severity="warning">{alert.msg}</Alert>}
          <form>
            <div className="m-3">
              <label htmlFor="formName" className="form-label">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="formName"
              />
            </div>

            <div className="m-3">
              <label htmlFor="formAge" className="form-label">
                Age:
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-control"
                id="formAge"
              />
            </div>
            <div className="m-3">
              <label htmlFor="formPhone" className="form-label">
                Phone:
              </label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control"
                id="formPhone"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="bg-grey-400" onClick={CloseClear}>
            Close
          </Button>
          <Button variant="text text-white bg-black" onClick={addStudent}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //remove modal */}
      <Modal className="modal" show={showModalR} onHide={handleCloseR}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="m-2 p-2">
          <Alert severity="error">Are you sure?</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="text text-grey-800" onClick={handleCloseR}>
            Close
          </Button>
          <Button variant="text text-white bg-black" onClick={BothRemoveClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //update modal */}
      <Modal className="modal" show={showModalUp} onHide={handleClose2}>
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
                value={updatedName}
                onChange={(e) => {
                  setupdatedName(e.target.value);
                }}
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
  
  );
}
