import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from backend
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.student_id}>
            {student.name} (Semester: {student.semester}, Contacts: {student.contact_numbers.join(', ')})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;