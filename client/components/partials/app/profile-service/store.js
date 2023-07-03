import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";

export const appProfileSlice = createSlice({
  name: "appProfile",
  initialState: {
    openProjectModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    profiles: {
        id: uuidv4(),
        role: "Admin",
        name: "visothipong ",
        email : "visothipong@gmail.com",
        phone: '12313243214',
        location: "Home# 320/N, Road# 71/B, phnom penh, Cambodia",
        batch: "8",
        class: "A",
        course: "Math",
        department: "IT",
        password: "123456",
        skill: "Frontend Developer",
        confirm_password: "123456",
        image: '/assets/images/avatar/av-6.svg',                
        startDate: "2022-10-03",
        updateDate: "2022-10-06",
      },
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openProjectModal = action.payload;
    },
    toggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    pushUserProfile: (state, action) => {
      state.profiles.unshift(action.payload);

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
    removeUserProfile: (state, action) => {
      state.profiles = state.profiles.filter(
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
    updateUserProfile: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // update profile 
     state.profiles = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        location: action.payload.location,
        class: action.payload.class,
        course: action.payload.course,
        batch: action.payload.batch,
        skill: action.payload.skill,
        image: action.payload.image,
        startDate: action.payload.startDate,
        updateDate: action.payload.updateDate,
        role: action.payload.role,
        department: action.payload.department,
        password: action.payload.password,
        confirm_password: action.payload.confirm_password
     }
    },
  },
});

export const {
  openModal,
  pushUserProfile,
  toggleAddModal,
  removeUserProfile,
  toggleEditModal,
  updateUserProfile,
} = appProfileSlice.actions;
export default appProfileSlice.reducer;
