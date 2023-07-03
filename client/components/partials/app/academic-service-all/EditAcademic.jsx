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

const roleOptions = [
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

const EditUser = ({ filler }) => {
  const { editModal, editItem } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [updateDate, setUpdateDate] = useState(new Date());

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Name is required"),
      role: yup.mixed().required("role is required"),
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

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = (data) => {
    dispatch(
      updateUser({
        id: editItem.id,
        name: data.name,
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        role: data.role.value,
        department: data.department.value,
        startDate: startDate.toISOString().split("T")[0],
        updateDate: updateDate.toISOString().split("T")[0],
        password: data.password.value
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
        <div className={errors.role ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            role
          </label>
          <Controller
            name="role"
            control={control}
            defaultValue={editItem.role}
            render={({ field }) => (
              <Select
                {...field}
                options={roleOptions}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                isSearchable={false}
                defaultValue={editItem.role}
                // isMulti
                components={{
                  Option: OptionComponent,
                }}
                id="icon_s"
              />
            )}
          />
          {errors.role && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.role?.message || errors.role?.label.message}
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
            defaultValue={editItem.department}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                // isMulti
                id="icon_s"
              />
            )}
          />
          {errors.role && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.tags?.message || errors.tags?.label.message}
            </div>
          )}
        </div>
        <Textinput
          name="password"
          label="passwrod"
          type="password"
          defaultValue={editItem.password}
          placeholder=" Enter your password"
          register={register}
          error={errors.password}

        />
        <Textinput
          name="confirmpassword"
          label="confirmpassword"
          defaultValue={editItem.password}
          type="password"
          register={register}
          error={errors.confirmpassword}
        />
        <Textarea label="Description" placeholder="Description" defaultValue={editItem.des} />

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUser;
