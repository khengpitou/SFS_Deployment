import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-toastify";

export const appCourseSlice = createSlice({
  name: "appCourse",
  initialState: {
    openProjectModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    courses: [
      {
        id: uuidv4(),
        course: "Computer Science",
        lecturer: "visothipong ",
        rating:"5",
        takeIn: "map ft Semester",
        startDate: "2022-10-03",
        updateDate: "2022-10-06",
        
      },
      {
        id: uuidv4(),
        course: "Computer Science",
        lecturer: "Leakhena ",
        rating:"5",
        takeIn: "map ft Semester",
        startDate: "2022-10-03",
        updateDate: "2022-10-06",
      },
    ],
  },
  reducers: {
    courseToggleAddModal: (state, action) => {
      state.openProjectModal = action.payload;
    },
    courseToggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    pushCourse: (state, action) => {
      state.courses.unshift(action.payload);

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
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(
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
    updateCourse: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.courses.findIndex(
        (item) => item.id === action.payload.id
      );
      // update project
      state.courses.splice(index, 1, {
        ...action.payload,
      });
    },
  },
});

export const appBatchSlice = createSlice({
  name: "appBatch",
  initialState: {
    openProjectModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    batches: [
      {
        id: uuidv4(),
        batchNumber : "8",
        startDate: "2022-10-03",
        endDate: "2022-10-06",
        
      },
      {
        id: uuidv4(),
        batchNumber : "8",
        startDate: "2022-10-03",
        endDate: "2022-10-06",
      },
    ],
  },
  reducers: {
    batchToggleAddModal: (state, action) => {
      state.openProjectModal = action.payload;
    },
    batchToggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    pushBatch: (state, action) => {
      state.batches.unshift(action.payload);

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
    removeBatch: (state, action) => {
      state.batches = state.batches.filter(
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
    updateBatch: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.batches.findIndex(
        (item) => item.id === action.payload.id
      );
      // update project
      state.batches.splice(index, 1, {
        ...action.payload,
      });
    },
  },
});

export const appSemesterSlice = createSlice({
  name: "appSemester",
  initialState: {
    openProjectModal: false,
    isLoading: null,
    editItem: {},
    editModal: false,
    semesters: [
      {
        id: uuidv4(),
        semester: "1",
        credits : 10,
        startDate: "2022-10-03",
        endDate: "2022-10-06",
        
      },
      {
        id: uuidv4(),
        semester: "2",
        credits : 10,
        startDate: "2022-10-03",
        endDate: "2022-10-06",
      },
    ],
  },
  reducers: {
    semesterToggleAddModal: (state, action) => {
      state.openProjectModal = action.payload;
    },
    semesterToggleEditModal: (state, action) => {
      state.editModal = action.payload;
    },
    pushSemester: (state, action) => {
      state.semesters.unshift(action.payload);

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
    removeSemester: (state, action) => {
      state.semesters = state.semesters.filter(
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
    updateSemester: (state, action) => {
      // update project and  store it into editItem when click edit button

      state.editItem = action.payload;
      // toggle edit modal
      state.editModal = !state.editModal;
      // find index
      let index = state.semesters.findIndex(
        (item) => item.id === action.payload.id
      );
      // update project
      state.semesters.splice(index, 1, {
        ...action.payload,
      });
    },
  },
});
export const {
  openModalCourse,
  pushCourse,
  courseToggleAddModal,
  removeCourse,
  courseToggleEditModal,
  updateCourse,
} = appCourseSlice.actions;
export const {
  openModal,
  pushBatch,
  batchToggleAddModal,
  removeBatch,
  batchToggleEditModal,
  updateBatch,
} = appBatchSlice.actions;
export const {
  openModalSemester,
  pushSemester,
  semesterToggleAddModal,
  removeSemester,
  semesterToggleEditModal,
  updateSemester,
} = appSemesterSlice.actions;

export default [{course: appCourseSlice.reducer,batch : appBatchSlice.reducer, semester : appSemesterSlice.reducer}];
// export default appCourseSlice.reducer;
