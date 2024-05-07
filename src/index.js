import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
//for dropdown to work
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import store from './store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { logger } from './util/util';
// import 'react-phone-number-input/style.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
logger('This is a log message');

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();




// import StudentsPicker from '../components/StudentsPicker';
// import StudentsTable from '../components/StudentsTable';
// import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
// import { useState } from 'react';

// const studentsDataComponent = () => {
//   const [studentsData, setStudentsData] = useState([]);
//   const [schoolsData, setSchoolsData] = useState([]);
//   const [legalguardiansData, setLegalguardiansData] = useState([]);

//   const onStudentsPick = async (studentIds) => {
//     const newStudentsData = [];
//     const newSchoolsData = [];
//     const newLegalguardiansData = [];
//     for (const studentId of studentIds) {
//       const studentData = await fetchStudentData(studentId);
//       newStudentsData.push(studentData);
//       const { schoolId, legalguardianId } = studentData;
//       const schoolData = await fetchSchoolData(schoolId);
//       newSchoolsData.push(schoolData);
//       const legalguardianData = await fetchLegalguardianData(legalguardianId);
//       newLegalguardiansData.push(legalguardianData);
//     }
//     setStudentsData([...studentsData, ...newStudentsData]);
//     setSchoolsData([...schoolsData, ...newSchoolsData]);
//     setLegalguardiansData([...legalguardiansData, ...newLegalguardiansData]);
//   };

//   return (
//     <>
//       <StudentsPicker onPickHandler={onStudentsPick} />
//       <StudentsTable
//         studentsData={studentsData}
//         schoolsData={schoolsData}
//         legalguardiansData={legalguardiansData}
//       />
//     </>
//   );
// };

// export default studentsDataComponent;