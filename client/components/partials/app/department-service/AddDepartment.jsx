'use client'
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import {  toggleAddModalDep, pushDep } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import FormGroup from "@/components/ui/FormGroup";
import axios from "axios";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};



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

const AddDepartment = () => {
  const { openProjectModal } = useSelector((state) => state.department);
  const dispatch = useDispatch();

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Department name is required"),
     
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  // const onSubmit = (data) => {
  //   console.log(data)
  //   const user = {
  //     id: uuidv4(),
  //     name: data?.name,
     
  //   };
  //   dispatch(pushDep(user));
  //   dispatch(toggleAddModalDep(false));
  //   reset();
  // };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/department/create",
        {
          name: data.name,
        }
      );
      const newDepartment = response.data; // Assuming the response contains the newly created department
      dispatch(pushDep(newDepartment));
      dispatch(toggleAddModalDep(false));
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Modal
        title="Create Department"
        labelclassName="btn-outline-dark"
        activeModal={openProjectModal}
        onClose={() => dispatch(toggleAddModalDep(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="name"
            label="Department"
            placeholder="Enter Department Name"
            register={register}
            error={errors.name}
          />
          
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddDepartment;
