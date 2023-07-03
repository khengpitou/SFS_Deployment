
import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { semesterToggleAddModal, pushSemester } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import FormGroup from "@/components/ui/FormGroup";

function SemesterForm() {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const FormValidationSchema = yup
        .object({
            semester: yup.string().required("Semester is required"),
            credits: yup.string().required("Credits are required"),
            startDate: yup
                .date()
                .required("Start date is required"),
            endDate: yup
                .date()
                .required("End date is required")
                .min(new Date(), "End date must be greater than today"),

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
        const semester = {
            id: uuidv4(),
            semester: data.semester,
            credits: data.credits,
            startDate: data.startDate?.toISOString().split("T")[0],
            endDate: data.endDate?.toISOString().split("T")[0],
        };
        dispatch(pushSemester(semester));
        dispatch(semesterToggleAddModal(false));
        reset();
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                <Textinput
                    name="semester"
                    label="semester Number"
                    placeholder="semester Number"
                    register={register}
                    error={errors.semester}
                />
                <Textinput
                    name="credits"
                    label="Credits"
                    placeholder="Credits"
                    register={register}
                    error={errors.credits}
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
                        error={errors.endDate}
                    >
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <Flatpickr
                                    className="form-control py-2"
                                    id="default-picker2"
                                    placeholder="yyyy, dd M"
                                    value={endDate}
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

                <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark  text-center">Add</button>
                </div>
            </form>
        </div>
    )
}

export default SemesterForm