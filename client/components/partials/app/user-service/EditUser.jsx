import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Flatpickr from 'react-flatpickr';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select, { components } from 'react-select';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import FormGroup from '@/components/ui/FormGroup';
import Icon from '@/components/ui/Icon';
import Modal from '@/components/ui/Modal';
import Textarea from '@/components/ui/Textarea';
import Textinput from '@/components/ui/Textinput';

import { toggleEditModal, updateUser } from './store';
import axios from 'axios';

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

const roleOptions = [
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

const EditUser = () => {
	const { editModal, editItem } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const FormValidationSchema = yup
		.object({
			firstname: yup.string().required('First Name is required'),
			lastname: yup.string().required('Last Name is required'),
			role: yup.mixed().required('role is required'),
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

	useEffect(() => {
		reset(editItem);
	}, [editItem]);

	// const onSubmit = (data) => {
	//   dispatch(
	//     updateUser({
	//       id: editItem.id,
	//       firstname: data.firstname,
	//       lastname: data.lastname,
	//       role: data.role.value,
	//       password: data.password.value
	//     })
	//   );
	//   dispatch(toggleEditModal(false));
	//   toast.info("Edit Successfully", {
	//     position: "top-right",
	//     autoClose: 1500,
	//     hideProgressBar: false,
	//     closeOnClick: true,
	//     pauseOnHover: true,
	//     draggable: true,
	//     progress: undefined,
	//     theme: "dark",
	//   });
	// };

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				'http://localhost:8080/api/v1/user/edit-user',
				{
					id: editItem.id,
					firstname: data.firstname,
					lastname: data.lastname,
					role: data.role.value,
					password: data.password.value,
				},
			);
			const updatedUser = response.data; 
			dispatch(updateUser(updatedUser));
			dispatch(toggleEditModal(false));
			toast.info('Edit Successfully', {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'dark',
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Modal
			title="Edit User"
			activeModal={editModal}
			onClose={() => dispatch(toggleEditModal(false))}
		>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
				<FormGroup error={errors.firstname}>
					<input
						type="text"
						defaultValue={editItem.firstname}
						className="form-control py-2"
						{...register('firstname')}
					/>
				</FormGroup>
				<FormGroup error={errors.lastname}>
					<input
						type="text"
						defaultValue={editItem.lastname}
						className="form-control py-2"
						{...register('lastname')}
					/>
				</FormGroup>

				<div className={errors.role ? 'has-error' : ''}>
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
			

				<div className="ltr:text-right rtl:text-left">
					<button className="btn btn-dark  text-center">Update</button>
				</div>
			</form>
		</Modal>
	);
};

export default EditUser;
