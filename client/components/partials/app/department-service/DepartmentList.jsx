'use client';

import React, { useEffect, useMemo, useState } from 'react';

		import { useRouter } from 'next/navigation';

import { Menu } from '@headlessui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table';

import Card from '@/components/ui/Card';
import Dropdown from '@/components/ui/Dropdown';
import Icon from '@/components/ui/Icon';

import { removeDep, updateDep } from './store';

const DepartmentList = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [departments, setDepartments] = useState([]);
	// const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [departmentResponse, userResponse] = await Promise.all([
					axios.get(
						'http://localhost:8080/api/v1/department/get-all?page=0&size=10',
					),
					axios.get(
						'http://localhost:8080/api/v1/user/get-all-user?page=0&size=10&role=ALL',
					),
				]);

				const departmentData = departmentResponse.data.content;
				const userData = userResponse.data.content;

				const usersData = userData.reduce((acc, user) => {
					acc[user.id] = user.username;
					return acc;
				}, {});

				const transformedDepartments = departmentData.map((department) => ({
					...department,
					createdBy: usersData[department.createdBy] || department.createdBy,
					updatedBy: usersData[department.updatedBy] || department.updatedBy,
				}));

				setDepartments(transformedDepartments);
			} catch (error) {
				console.error('Error fetching departments:', error);
			}
		};

		fetchData();
	}, []);

	const COLUMNS = [
		{
			Header: 'Department',
			accessor: 'name',
			Cell: (row) => {
				return <span>{row?.cell?.value}</span>;
			},
		},

		// {
		// 	Header: 'Batch',
		// 	accessor: 'batch',
		// 	Cell: (row) => {
		// 		return <span>{row?.cell?.value ?? 'batch'}</span>;
		// 	},
		// },

		{
			Header: 'Create By',
			accessor: 'createdBy',
			Cell: (row) => {
				return <span>{row?.cell?.value}</span>;
			},
		},
		{
			Header: 'Update By',
			accessor: 'updatedBy',
			Cell: (row) => {
				return <span>{row?.cell?.value}</span>;
			},
		},
		{
			Header: 'Update At',
			accessor: 'updatedAt',
			Cell: (row) => {
				const date = dayjs(row?.cell?.value)?.toDate();
				const formattedDate = date?.toLocaleString();

				return <span>{formattedDate ?? row?.cell?.value}</span>;
			},
		},
		{
			Header: 'action',
			accessor: 'action',
			Cell: (row) => {
				return (
					<div>
						<Dropdown
							classMenuItems="right-0 w-[140px] top-[110%] "
							label={
								<span className="text-xl text-center block w-full">
									<Icon icon="heroicons-outline:dots-vertical" />
								</span>
							}
						>
							<div className="divide-y divide-slate-100 dark:divide-slate-800 mb-2">
								{actions.map((item, i) => (
									<Menu.Item
										key={i}
										onClick={() => item.doit(row?.row?.original)}
									>
										<div
											className={`
                
                  ${
										item.name === 'delete'
											? 'bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white'
											: 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50'
									}
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
										>
											<span className="text-base">
												<Icon icon={item.icon} />
											</span>
											<span>{item.name}</span>
										</div>
									</Menu.Item>
								))}
							</div>
						</Dropdown>
					</div>
				);
			},
		},
	];
	const actions = [
		{
			name: 'view',
			icon: 'heroicons-outline:eye',
			doit: (item) => router.push(`/department/${item.id}`),
		},
		{
			name: 'edit',
			icon: 'heroicons:pencil-square',
			doit: (item) => dispatch(updateDep(item)),
		},
		{
			name: 'delete',
			icon: 'heroicons-outline:trash',
			doit: (item) => dispatch(removeDep(item.id)),
		},
	];

	const columns = useMemo(() => COLUMNS, []);
	const data = useMemo(() => departments, [departments]);

	const tableInstance = useTable(
		{
			columns,
			data,
		},

		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
	);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		state,
		gotoPage,
		pageCount,
		setPageSize,
		setGlobalFilter,
		prepareRow,
	} = tableInstance;

	const { globalFilter, pageIndex, pageSize } = state;
	return (
		<>
			<Card noborder>
				<div className="md:flex justify-between items-center mb-6">
					<h4 className="card-title">Department List</h4>
				</div>
				<div className="overflow-x-auto -mx-6">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden ">
							<table
								className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
								{...getTableProps}
							>
								<thead className=" bg-slate-100 dark:bg-slate-700">
									{headerGroups.map((headerGroup) => (
										<tr
											{...headerGroup.getHeaderGroupProps()}
											key={`ex-tr-${headerGroup.id}`}
										>
											{headerGroup.headers.map((column) => (
												<th
													{...column.getHeaderProps(
														column.getSortByToggleProps(),
													)}
													key={`ex-th-${column.id}`}
													scope="col"
													className=" table-th "
												>
													{column.render('Header')}
													<span>
														{column.isSorted
															? column.isSortedDesc
																? ' 🔽'
																: ' 🔼'
															: ''}
													</span>
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody
									className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
									{...getTableBodyProps}
								>
									{page.map((row) => {
										prepareRow(row);
										return (
											<tr
												key={`ex-tr2-${row.id}`}
												{...row.getRowProps()}
												className=" even:bg-slate-100 dark:even:bg-slate-700"
											>
												{row.cells.map((cell) => {
													return (
														<td
															{...cell.getCellProps()}
															className="table-td"
															key={`ex-td-${cell.column.id}`}
														>
															{cell.render('Cell')}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
					<div className=" flex items-center space-x-3 rtl:space-x-reverse">
						<span className=" flex space-x-2  rtl:space-x-reverse items-center">
							<span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
								Go
							</span>
							<span>
								<input
									type="number"
									className=" form-control py-2"
									defaultValue={pageIndex + 1}
									onChange={(e) => {
										const pageNumber = e.target.value
											? Number(e.target.value) - 1
											: 0;
										gotoPage(pageNumber);
									}}
									style={{ width: '50px' }}
								/>
							</span>
						</span>
						<span className="text-sm font-medium text-slate-600 dark:text-slate-300">
							Page{' '}
							<span>
								{pageIndex + 1} of {pageOptions.length}
							</span>
						</span>
					</div>
					<ul className="flex items-center  space-x-3  rtl:space-x-reverse">
						<li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
							<button
								className={` ${
									!canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								onClick={() => previousPage()}
								disabled={!canPreviousPage}
							>
								<Icon icon="heroicons-outline:chevron-left" />
							</button>
						</li>
						{pageOptions.map((page, pageIdx) => (
							<li key={pageIdx}>
								<button
									href="#"
									aria-current="page"
									className={` ${
										pageIdx === pageIndex
											? 'bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium '
											: 'bg-slate-100  dark:text-slate-400 text-slate-900  font-normal '
									}    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
									onClick={() => gotoPage(pageIdx)}
								>
									{page + 1}
								</button>
							</li>
						))}
						<li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
							<button
								className={` ${
									!canNextPage ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								onClick={() => nextPage()}
								disabled={!canNextPage}
							>
								<Icon icon="heroicons-outline:chevron-right" />
							</button>
						</li>
					</ul>
				</div>
			</Card>
		</>
	);
};

export default DepartmentList;
