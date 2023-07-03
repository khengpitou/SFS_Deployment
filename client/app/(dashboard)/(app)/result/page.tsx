"use client";
import React, { useState } from "react";
import Response from "@/components/partials/app/form/feedback-table";


const ResultTable = () => {
    const data = [
        {
          key: '1',
          question: 'What is your favorite color?',
          outstanding: 0,
          exceeds_expectations: 0,
          meets_expectation: 0,
          needs_improvement: 0,
          unacceptable:9,
        },
        {
          key: '2',
          question: 'What is your favorite food?',
          outstanding: 0,
          exceeds_expectations: 0,
          meets_expectation: 0,
          needs_improvement: 0,
          unacceptable:9,
        },
        {
          key: '3',
          question: 'What is your favorite movie?',
          outstanding: 0,
          exceeds_expectations: 0,
          meets_expectation: 0,
          needs_improvement: 0,
          unacceptable:9,
        },
      ];
    return (
        <div>
             <div className="flex justify-between items-end">
                <p className='flex text-lg font-semi-bold'>FeedBack Form</p>
                    <div className=''>
                    <div className='flex justify-end'>Lecture Name:<span >Dinesh</span></div>
                    <div className='py-2 flex justify-end'>Course Name:Data Science</div>
                    <div className='pb-2 flex justify-end'>Total Rate <span>100</span></div>
                    </div>
             </div>
            <Response projects={data}></Response>
        </div>
    );
};

export default ResultTable;
