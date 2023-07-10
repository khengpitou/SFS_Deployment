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

import { toggleEditModal, updateDep, updateUser } from './store';
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

const EditDepartment = () => {
	const { editModal, editItem } = useSelector((state) => state.department);
	const dispatch = useDispatch();

	const FormValidationSchema = yup
		.object({
			name: yup.string().required('Name is required'),
			// id: yup.string().required('id is required'),
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
	// 	dispatch(
	// 		updateUser({
	// 			id: editItem.id,
	// 			name: data.name,
				
	// 		}),
	// 	);
	// 	dispatch(toggleEditModal(false));
	// 	toast.info('Edit Successfully', {
	// 		position: 'top-right',
	// 		autoClose: 1500,
	// 		hideProgressBar: false,
	// 		closeOnClick: true,
	// 		pauseOnHover: true,
	// 		draggable: true,
	// 		progress: undefined,
	// 		theme: 'dark',
	// 	});
	// };

  const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				'http://localhost:8080/api/v1/department/edit',
				{
					name: data.name,
					id: data.id,
				}
			);
			const updatedDepartment = response.data; // Assuming the response contains the updated department
			dispatch(updateDep(updatedDepartment));
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
			title="Edit Department"
			activeModal={editModal}
			onClose={() => dispatch(toggleEditModal(false))}
		>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
				<FormGroup error={errors.name}>
					<input
						type="text"
						defaultValue={editItem.name}
						className="form-control py-2"
						{...register('name')}
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
