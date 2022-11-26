import React from 'react';

export default function Form() {
  return (
    <>
      <fieldset>
        <legend>방 생성</legend>
        <form action="http://localhost:3001/room" method="post">
          <div>
            <input type="text" name="title" placeholder="방 제목" />
          </div>
          <div>
            <button type="submit">생성</button>
          </div>
        </form>
      </fieldset>
    </>
  );
}
