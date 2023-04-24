import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from './rooms/container/Rooms';
import Room from './room/container/Room';
import Form from './form/container/Form';
import Gnb from './gnb/container/Gnb';

export default function App() {
  return (
    <>
      <Router>
        <Gnb />
        <Routes>
          <Route path="/" element={<Rooms />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router>
    </>
  );
}
