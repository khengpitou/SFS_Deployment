import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";

export const appUserSlice = createSlice({
  name: "appUser",
  initialState: {
    openProjectModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    users: [
      {
        id: uuidv4(),
        role: "Admin",
        name: "visothipong ",
        des: "hi there",
        startDate: "2022-10-03",
        updateDate: "2022-10-06",
        department: "IT",
        password: "123456",
        confirm_password: "123456"
      },
      {
        id: uuidv4(),
        role: "Admin",
        name: "Lakhena ",
        des: "hi there",
        startDate: "2022-10-03",
        updateDate: "2022-10-06",
        department: "IT",
        password: "123456",
        confirm_password: "123456"
      },
    ],
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

      toast.success("Add Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(
        (item) => item.id !== action.payload
      );
      toast.warning("Remove Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    updateUser: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.users.findIndex(
        (item) => item.id === action.payload.id
      );
      // update project
      state.users.splice(index, 1, {
        id: action.payload.id,
        name: action.payload.name,
        des: action.payload.des,
        startDate: action.payload.startDate,
        updateDate: action.payload.updateDate,
        role: action.payload.role,
        department: action.payload.department,
        password: action.payload.password,
        confirm_password: action.payload.confirm_password
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
