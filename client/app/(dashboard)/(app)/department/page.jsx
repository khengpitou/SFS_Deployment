'use client';

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { fetchData } from 'next-auth/client/_utils';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import AddDepartment from '@/components/partials/app/department-service/AddDepartment';
import DepartmentList from '@/components/partials/app/department-service/DepartmentList';
import EditDepartment from '@/components/partials/app/department-service/EditDepartment';
import { toggleAddModalDep } from '@/components/partials/app/department-service/store';
import TableLoading from '@/components/skeleton/Table';
import Button from '@/components/ui/Button';
import useWidth from '@/hooks/useWidth';

const apiUrl = 'http://loalhost:8080';
const originUrl = 'http://localhost:3000';

axios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage after login
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	config.headers['Origin'] = originUrl;
	return config;
});

function DepartmentPage() {	
	const { width, breakpoints } = useWidth();
	const [isLoaded, setIsLoaded] = useState(false);
	const { departments } = useSelector((state) => state.department);
	// console.log(departments);
	const dispatch = useDispatch();
	useEffect(() => {
		setIsLoaded(true);
		setTimeout(() => {
			setIsLoaded(false);
		}, 1000);
	}, []);

	// console.log(departments);

	return (
		<div>
			<div>
				<ToastContainer />
				<div className="flex flex-wrap justify-between items-center mb-4">
					<h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
						Department
					</h4>
					<div
						className={`${
							width < breakpoints.md ? 'space-x-rb' : ''
						} md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
					>
						<Button
							icon="heroicons-outline:plus"
							text="Add Department"
							className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
							iconClass=" text-lg"
							onClick={() => dispatch(toggleAddModalDep(true))}
						/>
					</div>
				</div>
				{isLoaded ? (
					<TableLoading count={departments?.length} />
				) : (
					<DepartmentList />
				)}
				<AddDepartment />
				<EditDepartment />
			</div>
		</div>
	);
}

export default DepartmentPage;
