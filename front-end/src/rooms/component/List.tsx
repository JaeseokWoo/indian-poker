import { useNavigate } from 'react-router-dom';

import Button from './Button';

export default function List({ rooms }: { rooms: any }) {
  const navigate = useNavigate();
  return (
    <>
      <h1>GIF 채팅방</h1>
      <fieldset>
        <legend>채팅방 목록</legend>
        <table>
          <thead>
            <tr>
              <th>방 ID</th>
              <th>방 제목</th>
              <th>방장</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room: any) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.title}</td>
                <td>{room.owner}</td>
                <td>
                  <Button
                    title="참가하기"
                    onClick={() => {
                      navigate(`/room/${room.id}`);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </>
  );
}
