'use client'
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushUser } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import FormGroup from "@/components/ui/FormGroup";

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

const assigneeOptions = [
  {
    value: "admin",
    label: "Admin",
    image: "/assets/images/avatar/av-1.svg",
  },
  {
    value: "student",
    label: "Student",
    image: "/assets/images/avatar/av-2.svg",
  },
  {
    value: "teacher",
    label: "Teacher",
    image: "/assets/images/avatar/av-3.svg",
  },

];
const options = [
  {
    value: "software engineering",
    label: " Software Engineer",
  },
  {
    value: "data-science",
    label: "Data Science",
  },
  {
    value: "tourist",
    label: "Tourist",
  },
  {
    value: "hospitality-and-management",
    label: " TM Management",
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

const AddUser = () => {
  const { openProjectModal } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      title: yup.string().required("Title is required"),
      role: yup.mixed().required("Role is required"),
      department: yup.mixed().required("Department is required"),
      startDate: yup
        .date()
        .required("Start date is required")
        .min(new Date(), "Start date must be greater than today"),
      updateDate: yup
        .date()
        .required("End date is required")
        .min(new Date(), "End date must be greater than today"),
      password: yup
        .string()
        .min(4, "Password must be at least 6 characters")
        .max(20, "Password shouldn't be more than 20 characters")
        .required("Please enter password"),
      // confirm password
      confirmpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
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

  const onSubmit = (data) => {
    console.log(data)
    const user = {
      id: uuidv4(),
      name: data?.title,
      role: data?.role.value,
      // get only data value from startDate and updateDate
      department: data?.department?.value,
      startDate: startDate?.toISOString().split("T")[0],
      updateDate: updateDate?.toISOString().split("T")[0],
      des: "hi pong",
    };
    dispatch(pushUser(user));
    dispatch(toggleAddModal(false));
    reset();
  };

  return (
    <div>
      <Modal
        title="Create User"
        labelclassName="btn-outline-dark"
        activeModal={openProjectModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="title"
            label="User Name"
            placeholder="User Name"
            register={register}
            error={errors.title}
          />
          <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
            <FormGroup
              label="Start Date"
              id="default-picker"
              error={errors.startDate}
            >
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    className="form-control py-2"
                    id="default-picker"
                    placeholder="yyyy, dd M"
                    value={startDate}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                    }}
                  />
                )}
              />
            </FormGroup>
            <FormGroup
              label="End Date"
              id="default-picker2"
              error={errors.updateDate}
            >
              <Controller
                name="updateDate"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    className="form-control py-2"
                    id="default-picker2"
                    placeholder="yyyy, dd M"
                    value={updateDate}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                    }}
                  />
                )}
              />
            </FormGroup>
          </div>
          <div className={errors.assign ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => {
                console.log(field)
                return (
                  <Select
                    {...field}
                    options={assigneeOptions}
                    styles={styles}
                    className="react-select"
                    classNamePrefix="select"
                    components={{
                      Option: OptionComponent,
                    }}
                    id="icon_s"
                  />
                )
              }
              }
            />
            {errors.assign && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.assign?.message || errors.assign?.label.message}
              </div>
            )}
          </div>

          <div className={errors.tags ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              Department
            </label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  id="icon_s"
                />
              )}
            />
            {errors.assign && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.tags?.message || errors.tags?.label.message}
              </div>
            )}
          </div>
          {/* input password */}
          <Textinput
            name="password"
            label="passwrod"
            type="password"
            placeholder=" Enter your password"
            register={register}
            error={errors.password}
          />
          <Textinput
            name="confirmpassword"
            label="confirmpassword"
            type="password"
            register={register}
            error={errors.confirmpassword}
          />
          <Textarea label="Description" placeholder="Description" />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddUser;
