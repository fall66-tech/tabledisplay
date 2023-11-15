import React from "react";
// import "./App.css";

import Icon from "@mdi/react";
import { mdiDeleteForever, mdiTableEdit } from "@mdi/js";

const StudentList2 = ({ students, openModal, openUpdateModal }) => {
  const openRModal = (index) => {
    openModal(index);
  };
  const openAUpdateModal = (index) => {
    openUpdateModal(index);
  };
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500  border-1 border-gray-700">
          <thead className="text-xs text-white uppercase bg-black rounded-lg">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Age
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3 text-center ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr className="bg-white border-b text-black font-medium " key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4 text-center ">{student.name}</td>
                <td className="px-6 py-4 text-center">{student.age}</td>
                <td className="px-6 py-4 text-center">{student.phoneNumber}</td>
                <td className=" flex justify-center pt-2">
                  <button
                    type="button"
                    className="btn text-white bg-black me-2 mt-1"
                    onClick={() => openRModal(index)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList2;
