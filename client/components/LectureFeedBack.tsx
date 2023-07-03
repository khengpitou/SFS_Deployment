import { useState } from 'react';
import { Select } from 'antd';
import CourseFeedback from './CourseFeedBack';

const { Option } = Select;

export default function LectureFeedback() {

  const [selectedLecture, setSelectedLecture] = useState('');

  function handleLectureChange(value:any) {
    setSelectedLecture(value);
    // Programmatically navigate to the response page with the selected lecture as a parameter
  }

  return (
    <div className='pt-4'>
      <p className='text-black'>View feedback for a lecture</p>
      <form>
        <Select id="lecture-select" value={selectedLecture} onChange={handleLectureChange} className='w-1/2'>
          <Option value="">Select a lecture</Option>
          <Option value="John Doe">John Doe</Option>
          <Option value="Jane Smith">Jane Smith</Option>
        </Select>
      </form>

      {selectedLecture && <CourseFeedback lecture={selectedLecture} />}

    </div>
  );
}