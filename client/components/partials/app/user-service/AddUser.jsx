'use client';

import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Flatpickr from 'react-flatpickr';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import FormGroup from '@/components/ui/FormGroup';
import Modal from '@/components/ui/Modal';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';

import { pushUser, toggleAddModal } from './store';

const styles = {
	multiValue: (base, state) => {
		return state.data.isFixed ? { ...base, opacity: '0.5' } : base;
	},
	multiValueLabel: (base, state) => {
		return state.data.isFixed
			? { ...base, color: '#626262', paddingRight: 6 }
			: base;
	},
	multiValueRemove: (base, state) => {
		return state.data.isFixed ? { ...base, display: 'none' } : base;
	},
	option: (provided, state) => ({
		...provided,
		fontSize: '14px',
	}),
};

const assigneeOptions = [
	{
		value: 'admin',
		label: 'Admin',
		image: '/assets/images/avatar/av-1.svg',
	},
	{
		value: 'student',
		label: 'Student',
		image: '/assets/images/avatar/av-2.svg',
	},
	{
		value: 'teacher',
		label: 'Teacher',
		image: '/assets/images/avatar/av-3.svg',
	},
];
const options = [
	{
		value: 'software engineering',
		label: ' Software Engineer',
	},
	{
		value: 'data-science',
		label: 'Data Science',
	},
	{
		value: 'tourist',
		label: 'Tourist',
	},
	{
		value: 'hospitality-and-management',
		label: ' TM Management',
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

	const FormValidationSchema = yup
		.object({
			username: yup.string().required('Username is required'),
			firstname: yup.string().required('First Name is required'),
			lastname: yup.string().required('Last Name is required'),
			email: yup.string().email('Invalid email').required('Email is Required'),
			role: yup.mixed().required('Role is required'),
			password: yup
				.string()
				.min(4, 'Password must be at least 6 characters')
				.max(20, "Password shouldn't be more than 20 characters")
				.required('Please enter password'),
			// confirm password
			confirmpassword: yup
				.string()
				.oneOf([yup.ref('password'), null], 'Passwords must match'),
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
		mode: 'all',
	});

	const onSubmit = (data) => {
		console.log(data);
		const user = {
			id: uuidv4(),
			username: data?.username,
			firstname: data?.firstname,
			lastname: data?.lastname,
			email: data?.email,
			role: data?.role.value,
      password: data?.password
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
						name="username"
						label="Username"
						placeholder="Username"
						register={register}
						error={errors.username}
					/>

					<Textinput
						name="firstname"
						label="First Name"
						placeholder="First Name"
						register={register}
						error={errors.firstname}
					/>
					<Textinput
						name="lastname"
						label="Last Name"
						placeholder="Last Name"
						register={register}
						error={errors.lastname}
					/>
					<Textinput
						name="email"
						label="E-Mail"
						placeholder="email"
						register={register}
						error={errors.email}
					/>

					<div className={errors.assign ? 'has-error' : ''}>
						<label className="form-label" htmlFor="icon_s">
							Role
						</label>
						<Controller
							name="role"
							control={control}
							render={({ field }) => {
								console.log(field);
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
								);
							}}
						/>
						{errors.assign && (
							<div className=" mt-2  text-danger-500 block text-sm">
								{errors.assign?.message || errors.assign?.label.message}
							</div>
						)}
					</div>

					
					<Textinput
						name="password"
						label="Password"
						type="password"
						placeholder="Enter your password"
						register={register}
						error={errors.password}
					/>
					<Textinput
						name="confirmpassword"
						label="Confirm Password"
						type="password"
						register={register}
						error={errors.confirmpassword}
					/>

					<div className="ltr:text-right rtl:text-left">
						<button className="btn btn-dark  text-center">Add</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default AddUser;
