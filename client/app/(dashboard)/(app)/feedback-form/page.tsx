"use client";
import React, { useState } from "react";
import FormAddFeedBack from "@/components/partials/app/form/feedback-form";


const FeedBackResult = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            course: 'Data Structures',
            numberofquestion: 20
          },
          {
            key: '2',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            course: 'Circuit Analysis',
            numberofquestion: 20
            
          },
      ]);
      const columns = [
        {
          title: 'Number',
          dataIndex: 'number',
          key: 'number',
          width: 80,
        },
        {
          title: 'Question',
          dataIndex: 'question',
          key: 'question',
          width: 400,
        },
        {
          title: 'Outstanding',
          dataIndex: 'outstanding',
          key: 'outstanding',
          width: 50,
          render: (_, record) => record.rating === 5 ? record.number : null,
        },
        {
          title: 'Exceeds Expectations',
          dataIndex: 'exceeds',
          key: 'exceeds',
          width: 50,
          render: (_, record) => record.rating === 4 ? record.number : null,
        },
        {
          title: 'Meets Expectations',
          dataIndex: 'meets',
          key: 'meets',
          width: 50,
          align:'center',
          render: (_, record) => record.rating === 3 ? record.number : null,
        },
        {
          title: 'Needs Improvement',
          dataIndex: 'needs',
          key: 'needs',
          width: 50,
          align:'center',
          render: (_, record) => record.rating === 2 ? record.number : null,
        },
        {
          title: 'Unacceptable',
          dataIndex: 'unacceptable',
          key: 'unacceptable',
          width: 50,
          align:'center',
          render: (_, record) => record.rating === 1 ? record.number : null,
        },
      ];
    return (
        <div>
             
            <FormAddFeedBack projects={dataSource}/>
        </div>
    );
};

export default FeedBackResult;
