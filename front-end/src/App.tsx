import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      path: '/socket.io',
      transports: ['websocket'],
    });

    socket.on('disconnect', () => {
      console.log('disconnected with server');
    });

    socket.on('news', data => {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
