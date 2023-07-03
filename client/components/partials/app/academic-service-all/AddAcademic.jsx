'use client'
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { courseToggleAddModal, semesterToggleAddModal, batchToggleAddModal } from "./store";
import CourseForm from "./CourseForm";
import BatchForm from "./BatchForm";
import SemesterForm from "./SemesterForm";


const assigneeOptions = [
  {
    value: "Pong",
    label: "Pong",
    image: "/assets/images/avatar/av-1.svg",
  },
  {
    value: "Leakhena",
    label: "Leakhena",
    image: "/assets/images/avatar/av-2.svg",
  },
  {
    value: "Pitou",
    label: "Pitou",
    image: "/assets/images/avatar/av-3.svg",
  },

];
const options = [
  {
    value: "semester 1",
    label: " Semester 1",
  },
  {
    value: "semester 2",
    label: "Semester 2",
  },
  {
    value: "semester 3",
    label: "Semester 3",
  },

];

const OptionComponent = ({ data, ...props }) => {
  //const Icon = data.icon;

  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  );
};

const AddAcademic = ({ filler }) => {
  const { openProjectModal } = useSelector(filler == "course" ? (state) => state.course : filler == 'batch' ? (state) => state.batch : (state) => state.semester);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        title={`Create a new ${filler.toUpperCase()}`}
        labelclassName="btn-outline-dark"
        activeModal={openProjectModal}
        onClose={() => dispatch(filler == 'course' ? dispatch(courseToggleAddModal(false)) : filler == 'batch' ? dispatch(batchToggleAddModal(false)) : dispatch(semesterToggleAddModal(false)))}
      >
        {
          filler == 'course' ? <CourseForm OptionComponent={OptionComponent} option={options} assigneeOptions={assigneeOptions} /> : filler == "batch" ? <BatchForm /> : <SemesterForm />
        }

      </Modal>
    </div>
  );
};

export default AddAcademic;
