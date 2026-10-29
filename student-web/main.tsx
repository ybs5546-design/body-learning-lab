import React from 'react';
import {createRoot} from 'react-dom/client';
import StudentApp from '../app/student-app';
import '../app/globals.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><StudentApp/></React.StrictMode>);
