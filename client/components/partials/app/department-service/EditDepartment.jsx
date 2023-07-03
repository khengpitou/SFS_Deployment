import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditModal, updateUser } from "./store";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FormGroup from "@/components/ui/FormGroup";
import Textinput from "@/components/ui/Textinput";
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



const EditDepartment = () => {
  const { editModal, editItem } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
      createdDate : yup
        .date()
        .required("Start date is required")
        .min(new Date(), "Start date must be greater than today"),
    
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

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = (data) => {
    dispatch(
      updateUser({
        id: editItem.id,
        name: data.name,
        createdDate: startDate.toISOString().split("T")[0],
        batch: data.batch.value
      })
    );
    dispatch(toggleEditModal(false));
    toast.info("Edit Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <Modal
      title="Edit User"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <FormGroup error={errors.name}>
          <input
            type="text"
            defaultValue={editItem.name}
            className="form-control py-2"
            {...register("name")}
          />
        </FormGroup>
        
      

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditDepartment;
