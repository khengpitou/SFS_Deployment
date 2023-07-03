import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";

export const appDepSlice = createSlice({
  name: "appDep",
  initialState: {
    openProjectModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    deps: [
      {
        id: uuidv4(),
        name: "Software Engineer ",
        createdAt: "2022-10-03",
      },
      {
        id: uuidv4(),
        createdAt: "2022-10-03",
        name: "Architecture ",
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
    pushDep: (state, action) => {
      state.deps.unshift(action.payload);

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
    removeDep: (state, action) => {
      state.deps = state.deps.filter(
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
    updateDep: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.deps.findIndex(
        (item) => item.id === action.payload.id
      );
      // update project
      state.deps.splice(index, 1, {
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
  pushDep,
  toggleAddModalDep,
  removeDep,
  toggleEditModal,
  updateDep,
} = appDepSlice.actions;
export default appDepSlice.reducer;
