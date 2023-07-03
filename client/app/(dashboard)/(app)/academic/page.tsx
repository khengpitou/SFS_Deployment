"use client"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import UserGrid from "@/components/partials/app/user-service/UserGrid";
import AcademicList from "@/components/partials/app/academic-service-all/AcademicList";
import ListLoading from "@/components/skeleton/ListLoading";
import TableLoading from "@/components/skeleton/Table";
import AddAcademic from "@/components/partials/app/academic-service-all/AddAcademic";
import EditAcademic from "@/components/partials/app/academic-service-all/EditAcademic";
import { ToastContainer } from "react-toastify";
import { batchToggleAddModal, courseToggleAddModal, semesterToggleAddModal } from "@/components/partials/app/academic-service-all/store";


const AcademicPostPage = () => {
    const [filler, setFiller] = useState("course");
    // use width is necessary for the repsonsive layout
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);
    const { courses } = useSelector((state) => state.course);
    const { batches } = useSelector((state) => state.batch);
    const { semesters } = useSelector((state) => state.semester)
    const dispatch = useDispatch();
    useEffect(() => {
        // this is the loading animation need to implemnent with backend  
        setIsLoaded(true);
        setTimeout(() => {
            setIsLoaded(false);
        }, 1000);
    }, [filler]);

    return (
        <div>
            <ToastContainer />
            <div className="mb-4 flex flex-wrap items-center justify-between">
                <h4 className="inline-block text-xl font-medium capitalize text-slate-900 ltr:pr-4 rtl:pl-4 lg:text-2xl">
                    Academic - {filler}
                </h4>
                <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } items-center rtl:space-x-reverse md:flex md:justify-end md:space-x-4`}
                >
                    <Button
                        icon="heroicons-outline:academic-cap"
                        text="Course view"
                        disabled={isLoaded}
                        className={`${filler === "course"
                            ? "bg-slate-900 text-white  dark:bg-slate-700"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("course")}
                    />
                    <Button
                        icon="heroicons-outline:clipboard-check"
                        text="Batch view"
                        disabled={isLoaded}
                        className={`${filler === "batch"
                            ? "bg-slate-900 text-white  dark:bg-slate-700"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("batch")}
                    />
                    <Button
                        icon="heroicons-outline:view-grid"
                        text="Semester view"
                        disabled={isLoaded}
                        className={`${filler === "semester"
                            ? "bg-slate-900 text-white dark:bg-slate-700"
                            : " bg-white dark:bg-slate-800 dark:text-slate-300"
                            }   h-min text-sm font-normal`}
                        iconClass=" text-lg"
                        onClick={() => setFiller("semester")}
                    />

                    <Button
                        icon="heroicons-outline:plus"
                        text={`Add new ${filler}`}
                        className="btn-dark h-min  text-sm font-normal dark:bg-slate-800"
                        iconClass=" text-lg"
                        onClick={() => filler == 'course' ? dispatch(courseToggleAddModal(true)) : filler == 'batch' ? dispatch(batchToggleAddModal(true)) : dispatch(semesterToggleAddModal(true))}
                    />
                </div>
            </div>
            {isLoaded && filler === "course" && (
                <TableLoading count={courses?.length} items={courses} />
            )}
            {isLoaded && filler === "batch" && (
                <TableLoading count={courses?.length} items={courses} />
            )}
            {isLoaded && filler === "semester" && (
                <TableLoading count={courses?.length} items={courses} />
            )}

            {filler === "course" && !isLoaded && (
                <div>
                    <AcademicList projects={courses} filler={filler} />
                </div>
            )}
            {filler === "batch" && !isLoaded && (
                <div>
                    <AcademicList projects={batches} filler={filler} />
                </div>
            )}
            {filler === "semester" && !isLoaded && (
                <div>
                    <AcademicList projects={semesters} filler={filler} />
                </div>
            )}
            <AddAcademic filler={filler} />
            {/* <EditAcademic filler={filler} /> */}
        </div>
    );
};

export default AcademicPostPage;
