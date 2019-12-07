import React, { useState } from 'react';
import {Link} from "react-router-dom";

export default function Join() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join-container">
      <form className="join-container__inner-container">
        <h1 className="join-container__heading">Join</h1>
        <div>
          <input placeholder="Name" className="join-container__name-input" type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="join-container__room-input" type="text" onChange={(e) => setRoom(e.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className="join-container__submit" type="submit">Sign In</button>
        </Link>
      </form>
    </div>
  );
}
