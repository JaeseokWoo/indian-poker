import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Button() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/form');
  };
  return <button onClick={handleClick}>방 생성</button>;
}
