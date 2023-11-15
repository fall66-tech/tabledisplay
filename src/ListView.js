import React from "react";
// import './ListView.css'
import Icon from "@mdi/react";
import { mdiDeleteForever, mdiTableEdit } from "@mdi/js";

const ListView = ({ students, openModal, openUpdateModal }) => {
  const openAModal = (index) => {
    openModal(index);
  };
  const openAUpdateModal = (index) => {
    openUpdateModal(index);
  };

  return (
    <div className="  bg-slate-100  p-4 space-y-9 rounded-md">
      {students.map((student, index) => (
        <div key={index} className=" pl-4 rounded-md">
          <div className="flex justify-between bg-slate-300 p-2 rounded-lg items-center">
            <h3 className=" text-lg font-semibold text-black pl-1 ">
              {" "}
              ID: {index + 1}
            </h3>
            <div>
              <button
                type="button"
                className="btn text-white bg-black me-2 mt-1"
                onClick={() => openAModal(index)}
              >
                <Icon path={mdiDeleteForever} size={1} />
              </button>

              <button
                type="button"
                className="btn text-white bg-black mt-1"
                onClick={() => openAUpdateModal(index)}
              >
                <Icon path={mdiTableEdit} size={1} />
              </button>
            </div>
          </div>

          <ul className="pl-5 list-disc ">
            <li className=""> <strong>Name:</strong> {student.name}</li>
            <li className=""> <strong>Age:</strong> {student.age}</li>
            <li className=""> <strong>Phone Number:</strong> {student.phoneNumber}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListView;
