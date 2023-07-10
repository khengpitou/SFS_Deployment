import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const appUserSlice = createSlice({
	name: 'appUser',
	initialState: {
		openProjectModal: false,
		isLoading: null,
		editItem: {},
		editModal: false,
		users: [],
	},
	reducers: {
		toggleAddModal: (state, action) => {
			state.openProjectModal = action.payload;
		},
		toggleEditModal: (state, action) => {
			state.editModal = action.payload;
		},
		pushUser: (state, action) => {
			state.users.unshift(action.payload);

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
		removeUser: (state, action) => {
			state.users = state.users.filter((item) => item.id !== action.payload);
			toast.warning('Remove Successfully', {
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
		updateUser: (state, action) => {
			// update project and  store it into editItem when click edit button

			state.editItem = action.payload;
			// toggle edit modal
			state.editModal = !state.editModal;
			// find index
			let index = state.users.findIndex(
				(item) => item.id === action.payload.id,
			);
			// update project
			state.users.splice(index, 1, {
				id: action.payload.id,
				username: action.payload.username,
				role: action.payload.role,
				password: action.payload.password,
				
			});
		},
	},
});

export const {
	openModal,
	pushUser,
	toggleAddModal,
	removeUser,
	toggleEditModal,
	updateUser,
} = appUserSlice.actions;
export default appUserSlice.reducer;
