import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const [rooms, setRooms] = useState<any[]>([]);
  useEffect(() => {
    const getRooms = async () => {
      const result = await fetch('http://localhost:3001/room');
      const rooms = await result.json();
      console.log(rooms);
      setRooms(rooms);
    };

    getRooms();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3001/room', {
      path: '/socket.io',
      transports: ['websocket'],
    });

    socket.on('disconnect', () => {
      console.log('disconnected with server');
    });

    socket.on('newRoom', (newRoom: any) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    });

    socket.on('news', (data) => {
      console.log(data);
      socket.emit('reply', 'Hello Node.JS');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('news');
    };
  }, []);

  return (
    <>
      <h1>GIF 채팅방</h1>
      <fieldset>
        <legend>채팅방 목록</legend>
        <table>
          <thead>
            <tr>
              <th>방 제목</th>
              <th>종류</th>
              <th>허용 인원</th>
              <th>방장</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room: any) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.max}</td>
                <td>{room.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </>
  );
}

export default App;
