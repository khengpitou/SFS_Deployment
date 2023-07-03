'use client';

import { useState } from 'react';
import LectureFeedback from './LectureFeedBack';
import CourseFeedback from './CourseFeedBack';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Input, Radio, RadioChangeEvent, Space } from 'antd';
import { Select,Table } from 'antd';
import BaseDialog from './BaseDialog';
import Link from 'next/link';
import { useRouter } from "next/navigation";


const { Option } = Select;
export default function Feedback() {
  const [selectedOption, setSelectedOption] = useState('');
  const [value, setValue] = useState('');
  const router = useRouter();
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

  const fields = [
    {
      label: 'Course',
      name: 'course',
      rules: [{ required: true, message: 'Please enter the course name.' }],
      component: <Input />,
    },
  ];
  const columns = [
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      ellipsis: true,
      width: 150
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: 'Number of question',
      dataIndex: 'numberofquestion',
      key: 'numberofquestion',
      ellipsis: true
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'right',
      width: 200,
      render: (text, record, index) => (
        <div className='flex justify-end'>
          <Button className="mx-2 border-[var(--base-blue)] text-[var(--base-blue)]" onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.key, index)} danger>Delete</Button>
        </div>
      ),
    },
  ];


  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingKey, setEditingKey] = useState('');

  const cancel = () => {
    setEditingKey('');
  };
  const handleEdit = (record) => {
    setSelectedRow(record);
    router.push('/feedback/create-feedback/');
    // setOpen(true);
  };

  const handleDelete = (key, index) => {
    const newDataSource = [...dataSource];
    newDataSource.splice(index, 1);
    setDataSource(newDataSource);
  };

  const handleOk = (values) => {
    const newDataSource = dataSource.map((item) =>
      item.key === selectedRow.key ? { ...item, ...values } : item
    );
    setDataSource(newDataSource);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  function handleOptionChange(e: RadioChangeEvent) {
    setSelectedOption(e.target.value);
  }
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <div className='flex justify-end mt-10 w-full'>
            <BaseDialog
                open={open}
                onSubmit={handleOk}
                onCancel={handleCancel}
                fields={fields}
                dialogTitle='Add Department'
            />
            </div>
            {/* <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
                onChange: cancel,
            }}
            /> */}

      
      <label>Please Select Filter Type</label>
      <div className='py-2 px-2'>
        <Radio.Group onChange={handleOptionChange} value={selectedOption}>
          <Space direction="vertical">
            <Radio value='lecture'>Filter By Lecture</Radio>
            <Radio value='course'>Filter By Course</Radio>
          </Space>
        </Radio.Group>
      </div>
      {selectedOption === 'lecture' && <LectureFeedback />}
      {selectedOption === 'course' && <CourseFeedback />}
        
      
      {/* <Select value={selectedOption} onChange={handleOptionChange} className='w-1/2'>
        <Option value="">Select an option</Option>
        <Option value="lecture">View feedback for a lecture</Option>
        <Option value="course">View feedback for a course</Option>
      </Select> */}

      
    </div>
  );
}