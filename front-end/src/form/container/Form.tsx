import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  async function createRoom(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch('http://localhost:3001/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    navigate('/');
  }

  useEffect(() => {
    console.log(title);
  }, [title]);

  return (
    <>
      <fieldset>
        <legend>방 생성</legend>
        <form onSubmit={createRoom}>
          <div>
            <input type="text" name="title" placeholder="방 제목" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <button type="submit">생성</button>
          </div>
        </form>
      </fieldset>
    </>
  );
}
