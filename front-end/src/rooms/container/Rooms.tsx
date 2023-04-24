import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import List from '../component/List';
import Button from '../component/Button';

export default function Rooms() {
  const [gameRooms, setGameRooms] = useState<any[]>([]);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      const result = await fetch('http://localhost:3001/room');
      const gameRooms = await result.json();
      setGameRooms(gameRooms);
    };

    getRooms();
  }, []);

  useEffect(() => {
    const socket = io('http://localhost:3001/gameRooms', {
      path: '/socket.io',
    });

    socket.on('disconnect', () => {
      console.log('disconnected with server');
    });

    socket.on('login', (userInfo) => {
      console.log(userInfo);
      setUser(userInfo.id);
    });

    socket.on('newGameRoom', (newGameRoom: any) => {
      setGameRooms((prevGameRooms) => [...prevGameRooms, newGameRoom]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>{user}</h1>
      <List rooms={gameRooms} />
      <Button
        title="방 생성"
        onClick={() => {
          navigate('/form');
        }}
      />
    </>
  );
}
