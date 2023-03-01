import React, { MouseEventHandler } from 'react';

export default function Button({ title, onClick }: { title: string; onClick: MouseEventHandler<HTMLButtonElement> }) {
  return <button onClick={onClick}>{title}</button>;
}
