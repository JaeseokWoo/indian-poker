import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import List from '../component/List';
import Button from '../component/Button';

export default function Rooms() {
  const [rooms, setRooms] = useState<any[]>([]);
  const navigate = useNavigate();

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
      <List rooms={rooms} />
      <Button
        title="방 생성"
        onClick={() => {
          navigate('/form');
        }}
      />
    </>
  );
}
