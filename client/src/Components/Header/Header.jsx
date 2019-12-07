import React from "react";

export default function({name, room}) {
  return (
    <header className="header">
      <img src="/img/speech-bubble.svg" alt="speech-bubble" />
      <p className="header__title">Seyfat's Room</p>
      <p className="header__user">User: {name}</p>
      <p className="header__room">Room: {room}</p>

    </header>
  );
};
