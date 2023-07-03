'use client';

import React from 'react';

const feedbackData = [
  {
    id: 1,
    name: 'John Doe',
    course: 'Introduction to Computer Science',
    rating: 4,
    comment: 'Great course, learned a lot!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    course: 'Data Structures and Algorithms',
    rating: 3,
    comment: 'Good course, but some of the material was difficult to follow.',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    course: 'Computer Networks',
    rating: 5,
    comment: 'Awesome course, loved the hands-on labs!',
  },
];

function Feedback() {
  return (
    <div>
      <h1>Feedback</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.name}</td>
              <td>{feedback.course}</td>
              <td>{feedback.rating}</td>
              <td>{feedback.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Feedback;