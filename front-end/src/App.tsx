import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from './rooms/container/Rooms';
import Form from './form/container/Form';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Rooms />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}
