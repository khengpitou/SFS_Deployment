'use client';

import React, { useState } from 'react';
import { Button, Input, Form, Select, List } from "antd";
import TextArea from 'antd/es/input/TextArea';

export default function FormAddFeedBack() {
  const [inputFields, setInputFields] = useState([{ value: '' }]);
  const handleAddFields = () => {
    setInputFields([...inputFields, { value: '' }]);
  };
  const handleChangeInput = (index: number, event: any) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Input fields:", inputFields);
  };
  const data = [
    {
      title: 'Oustanding',
      description: 'This term is used to describe performance or achievement that is exceptionally good or excellent. It indicates that the person has gone above and beyond expectations and has demonstrated outstanding skills, knowledge, or abilities.'
    },
    {
      title: 'Exceeds Expectations',
      description: 'This term is used to describe performance or achievement that is better than what was expected. It indicates that the person has demonstrated a high level of proficiency and has exceeded the minimum requirements or standards.'
    },
    {
      title: 'Meets Expectations',
      description: 'This term is used to describe performance or achievement that meets the minimum requirements or standards. It indicates that the person has demonstrated the necessary skills, knowledge, or abilities to perform their job or task satisfactorily.'
    },
    {
      title: 'Needs Improvement',
      description: 'This term is used to describe performance or achievement that falls below the minimum requirements or standards. It indicates that the person has not demonstrated the necessary skills, knowledge, or abilities to perform their job or task satisfactorily and needs to improve in certain areas.'
    },
    {
      title: 'Unacceptable',
      description: 'This term is used to describe performance or achievement that is completely unsatisfactory and falls far below the minimum requirements or standards. It indicates that the person has not demonstrated the necessary skills, knowledge, or abilities to perform their job or task and requires immediate improvement or corrective action.'
    }
  ];
  return (
    <div className='flex'>
      <div className='px-2 w-3/4'>
        <p className='font-bold text-lg text-black'>FeedBack Form</p>
        <p className='text-black py-2'>Questionnaire in this feedback  form has been designed to seek feedback of students with an objective to strengthen the quality of teaching-learning environment.</p>
        <Form onValuesChange={handleSubmit}>
          <Form.Item label="Course">
            <Select>
              <Select.Option value="all">Apply All</Select.Option>
              <Select.Option value="all">Computer Science</Select.Option>
              <Select.Option value="all">Network</Select.Option>
            </Select>
          </Form.Item>
          <label>Form Description</label>
          <TextArea
            placeholder="Form Description"
            autoSize={{ minRows: 3, maxRows: 5 }}
            className='mb-2'
          />
          <div className='flex flex-wrap'>
            {inputFields.map((field, index) => (
              <div key={index} className={`flex items-center pb-4 w-full ${index > 0 ? 'w-full' : ''}`}>
                <div className='pr-2'>Question{index + 1}</div>
                <Input
                  type="text"
                  placeholder="Please Input Question"
                  value={field.value}
                  onChange={event => handleChangeInput(index, event)}
                  className={`flex-grow ${index === 0 && index > 0 ? 'mr-2' : ''}`}
                />
                {index === inputFields.length - 1 && (
                  <Button onClick={() => handleAddFields()} className='ml-2 base-color-primary text-primary'>
                    Add More Question
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
            <Button className='bg-primary text-primary'>Submit</Button>
          </div>
        </Form>
      </div>
      <div className='px-3 w-1/4'>
        <div className='h-screen overflow-scroll'>
          <p className='text-[var(--base-blue)] text-lg font-bold mb-0'>Note</p>
          <div className='text-[var(--base-blue)]'>The Answer of the question would be having this below options. Student will only need to select one among this choice</div>
          <List className=''
            itemLayout="vertical"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<strong>{item.title}</strong>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}
