import React from 'react';

export default function List({ rooms }: { rooms: any }) {
  return (
    <>
      <h1>GIF 채팅방</h1>
      <fieldset>
        <legend>채팅방 목록</legend>
        <table>
          <thead>
            <tr>
              <th>방 제목</th>
              <th>방장</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room: any) => (
              <tr key={room.title}>
                <td>{room.title}</td>
                <td>{room.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </>
  );
}
