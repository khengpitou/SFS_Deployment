'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import axios from 'axios';
import dayjs from 'dayjs';
import { ToastContainer } from 'react-toastify';

import useWidth from '@/hooks/useWidth';

function DepartmentDetailPage() {
	const [department, setDepartment] = useState(null);
	const [users, setUsers] = useState([]);
	const { width, breakpoints } = useWidth();
	const pathname = usePathname();
	const id = pathname?.split('/').pop();

	useEffect(() => {
		const fetchDepartment = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/api/v1/department/get?id=${id}`,
				);
				const departmentData = response.data;
				setDepartment(departmentData);
			} catch (error) {
				console.error('Error fetching department:', error);
			}
		};

		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8080/api/v1/user/get-all-user?page=0&size=10&role=ALL',
				);
				const userData = response.data.content;
				setUsers(userData);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchDepartment();
		fetchUsers();
	}, []);

	if (!department || users.length === 0) {
		return <div>Loading department...</div>;
	}

	// Find the username for createdBy and updatedBy IDs
	const createdByUser = users.find((user) => user.id === department.createdBy);
	const updatedByUser = users.find((user) => user.id === department.updatedBy);

	return (
		<div className="department-detail">
			<ToastContainer />
			<div className="flex flex-wrap justify-between items-center mb-4">
				<h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
					Department Detail
				</h4>
			</div>
			<div className="department-detail-info my-6">
				<p className='mb-2'>
					<strong>Name:</strong> {department.name}
				</p>
				<p className='mb-2'>
					<strong>Created At:</strong>{' '}
					{dayjs(department.createdAt).format('DD/MM/YYYY')}
				</p>
				<p className='mb-2'>
					<strong>Created By:</strong> {createdByUser?.username}
				</p>
				<p className='mb-2'>
					<strong>Updated By:</strong> {updatedByUser?.username}
				</p>
				<p className='mb-2'>
					<strong>Updated At:</strong>{' '}
					{dayjs(department.updatedAt).format('DD/MM/YYYY')}
				</p>
			</div>
		</div>
	);
}

export default DepartmentDetailPage;
