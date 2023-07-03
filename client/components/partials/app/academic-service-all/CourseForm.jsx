import React, { useState } from 'react'
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddModal, pushUser, pushCourse, courseToggleAddModal } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormGroup from "@/components/ui/FormGroup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
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
function CourseForm({ assigneeOptions, option, OptionComponent }) {

    const dispatch = useDispatch();

    const FormValidationSchema = yup
        .object({
            course: yup.string().required("Title is required"),
            rating: yup.mixed().required("Role is required"),
            takeIn: yup.mixed().required("Take In is required"),
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
        const course = {
            id: uuidv4(),
            course: data.course,
            takeIn: data.takeIn.value,
            lecturer: data.lecturer.value,
            rating: data.rating,
        };
        dispatch(pushCourse(course));
        dispatch(courseToggleAddModal(false));
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
                name="course"
                label="Course Name"
                placeholder="Enter your course name"
                register={register}
                error={errors.course}
            />
            <label className="form-label" htmlFor="icon_s">
                Take IN Semester
            </label>
            <Controller
                name="takeIn"
                control={control}
                render={({ field }) => {
                    return (
                        <Select
                            {...field}
                            options={option}
                            className="react-select "
                            classNamePrefix="select"
                            id="icon_s"
                        />
                    )
                }
                }
            />
            {errors.takeIn && (
                <div className=" mt-2  text-danger-500 block text-sm">
                    {errors.assign?.message || errors.assign?.label.message}
                </div>
            )}
            <div className={errors.assign ? "has-error" : ""}>
                <label className="form-label" htmlFor="icon_s">
                    Lecturer
                </label>
                <Controller
                    name="lecturer"
                    control={control}
                    render={({ field }) => {
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

            </div>

            <div className={errors.tags ? "has-error" : ""}>
                <Textinput
                    name="rating"
                    label="Rating"
                    placeholder="Enter Rating"
                    register={register}
                    error={errors.rating}
                />
            </div>

            <div className="ltr:text-right rtl:text-left ">
                <button className="btn btn-dark  text-center">Add</button>
            </div>
        </form>
    )
}

export default CourseForm