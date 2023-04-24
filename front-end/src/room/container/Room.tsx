import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export default function Room() {
  const { roomId } = useParams();
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    const socket = io(`http://localhost:3001/chat?roomId=${roomId}`, {
      path: '/socket.io',
      transports: ['websocket'],
    });

    socket.on('disconnect', () => {
      console.log('disconnected with server');
    });

    socket.on('join', (userInfo) => {
      console.log('test');
      setParticipants((prevParticipants: any) => [...prevParticipants, userInfo]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>Room {roomId}</h1>
      {participants.map((participant: any) => (
        <h2 key={participant.userId}>{participant.userId}</h2>
      ))}
    </>
  );
}
