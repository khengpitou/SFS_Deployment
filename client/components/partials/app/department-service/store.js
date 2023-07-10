import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const departmentSlice = createSlice({
	name: 'department',
	initialState: {
		openProjectModal: false,
		isLoading: null,
		editItem: {},
		editModal: false,
		deps: [],
	},
	reducers: {
		toggleAddModalDep: (state, action) => {
			state.openProjectModal = action.payload;
		},
		toggleEditModal: (state, action) => {
			state.editModal = action.payload;
		},
		pushDep: (state, action) => {
			state.deps.unshift(action.payload);

			toast.success('Add Successfully', {
				position: 'top-right',
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		},
		// removeDep: (state, action) => {
		//   state.deps = state.deps.filter(
		//     (item) => item.id !== action.payload
		//   );
		//   toast.warning("Remove Successfully", {
		//     position: "top-right",
		//     autoClose: 1500,
		//     hideProgressBar: false,
		//     closeOnClick: true,
		//     pauseOnHover: true,
		//     draggable: true,
		//     progress: undefined,
		//     theme: "light",
		//   });
		// },
		updateDep: (state, action) => {
			// update project and  store it into editItem when click edit button

			state.editItem = action.payload;
			// toggle edit modal
			state.editModal = !state.editModal;
			// find index
			let index = state.deps.findIndex((item) => item.id === action.payload.id);
			// update project
			state.deps.splice(index, 1, {
				id: action.payload.id,
				name: action.payload.name,
				des: action.payload.des,
			});
		},

		removeDep: (state, action) => {
			const departmentId = action.payload;

			deleteDepartment(departmentId)
				.then(() => {
					state.department = state.department.filter(
						(item) => item.id !== departmentId,
					);

					toast.error('Failed to remove department', {});
				})
				.catch((error) => {
					console.error(error);
					toast.success('Remove Successfully', {});
				});
		},
	},
});

const deleteDepartment = async (departmentId) => {
	try {
		const response = await axios.get(
			`http://localhost:8080/api/v1/department/delete?id=${departmentId}`,
		);
		return response.data;
	} catch (error) {
		throw new Error('Failed to delete department');
	}
};

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

export const {
	openModal,
	pushDep,
	toggleAddModalDep,
	removeDep,
	toggleEditModal,
	updateDep,
} = departmentSlice.actions;
export default departmentSlice.reducer;
