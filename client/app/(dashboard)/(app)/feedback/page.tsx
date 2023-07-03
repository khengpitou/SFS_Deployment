"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import UserGrid from "@/components/partials/app/user-service/UserGrid";
import UserList from "@/components/partials/app/user-service/UserList";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { toggleAddModal } from "@/components/partials/app/user-service/store";
import AddUser from "@/components/partials/app/user-service/AddUser";
import { ToastContainer } from "react-toastify";
import EditUser from "@/components/partials/app/user-service/EditUser";
import FeedbackResult from "@/components/partials/app/form/feedback-result";
import FormAddFeedBack from "@/components/FeedBackForm";
import {  Input, Radio, RadioChangeEvent } from 'antd';
import { Select,Table } from 'antd';
import BaseDialog from '@/components/BaseDialog';
import Item from "antd/es/list/Item";


const FeedbackPostPage = () => {
    const [selectedLecture, setSelectedLecture] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const { Option } = Select;
    

    // const [filler, setFiller] = useState("list");
    // // use width is necessary for the repsonsive layout
    // const { width, breakpoints } = useWidth();
    // const [isLoaded, setIsLoaded] = useState(false);
    // const { users } = useSelector((state) => state.user);
    // const dispatch = useDispatch();

    // console.log(users)
    // useEffect(() => {
    //     // this is the loading animation need to implemnent with backend  
    //     setIsLoaded(true);
    //     setTimeout(() => {
    //         setIsLoaded(false);
    //     }, 1000);
    // }, [filler]);
    const [dataSource, setDataSource] = useState([
        
        {
            key: '1',
            course: 'Data Structures',
            lecturer:'Dinesh Kumar',
            numberofvote: 20
          },
          {
            key: '2',
            course: 'Circuit Analysis',
            lecturer:'Leo',
            numberofvote: 20
            
          },
      ]);
      function handleLectureChange(value:any) {
        setSelectedLecture(value);
      }
      function handleCourseChange(value: any) {
        setSelectedCourse(value);
      }

    return (
        <div>
            <ToastContainer />
            <div className="flex items-center pb-2 " >
                <div className=" w-full mr-2">
                    <p className="text-sm">Filter Lecture</p>
                    <Select id="lecture-select" value={selectedLecture} onChange={handleLectureChange} className='w-full'>
                    <Option value="">Select a lecture</Option>
                    <Option value="John Doe">Dinesh Kumar</Option>
                    <Option value="Jane Smith">Leo</Option>
                    </Select>
                </div>
                <div className=" w-full">
                    <p className="text-sm">Filter Course</p>
                    <Select id="course-select" value={selectedCourse} onChange={handleCourseChange} className='w-full'>
                        <Option value="">Select a course</Option>
                        <Option value="Introduction to Computer Science">Introduction to Computer Science</Option>
                        <Option value="Data Structures and Algorithms">Data Structures and Algorithms</Option>
                        <Option value="Computer Networks">Computer Networks</Option>
                        <Option value="Operating Systems">Operating Systems</Option>
                        <Option value="Calculus">Calculus</Option>
                        <Option value="Linear Algebra">Linear Algebra</Option>
                        <Option value="Probability Theory">Probability Theory</Option>
                        <Option value="Number Theory">Number Theory</Option>
                    </Select>
                </div>
            </div>
            
                {/* <Radio.Group onChange={handleOptionChange} value={selectedOption}>
                    <Space direction="hirizontal">
                        <Radio value='lecture'>Filter By Lecture</Radio>
                        <Radio value='course'>Filter By Course</Radio>
                    </Space>
                </Radio.Group> */}

            <FeedbackResult projects={dataSource} />
            {/* <div className="flex flex-wrap justify-between items-center mb-4">
                <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                    User
                </h4>
                <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                >
                    <Button
                        icon="heroicons:list-bullet"
                        text="List view"
                        disabled={isLoaded}
                        className={`${filler === "list"
                            ? "bg-slate-900 dark:bg-slate-700  text-white"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("list")}
                    />
                    <Button
                        icon="heroicons-outline:view-grid"
                        text="Grid view"
                        disabled={isLoaded}
                        className={`${filler === "grid"
                            ? "bg-slate-900 dark:bg-slate-700 text-white"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("grid")}
                    />

                    <Button
                        icon="heroicons-outline:plus"
                        text="Add User"
                        className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                        iconClass=" text-lg"
                        onClick={() => dispatch(toggleAddModal(true))}
                    />
                </div>
            </div>
            {isLoaded && filler === "grid" && (
                <GridLoading count={users?.length} />
            )}
            {isLoaded && filler === "list" && (
                <TableLoading count={users?.length} />
            )}

            {filler === "grid" && !isLoaded && (
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    {users.map((user, projectIndex) => (
                        <UserGrid project={user} key={projectIndex} />
                    ))}
                </div>
            )}
            {filler === "list" && !isLoaded && (
                <div>
                    <UserList projects={users} />
                </div>
            )}
            <AddUser /> */}
          

            {/* <EditUser /> */}
           

            

           
        </div>
    );
};

export default FeedbackPostPage;
