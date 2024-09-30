'use client';

import { useState } from 'react';

function Home() {
  const [newJoke, setNewJoke] = useState({});
  const [jokeButton, setJokeButton] = useState('Get a Joke');
  const [hideDelivery, setHideDelivery] = useState(true);

  const [jokeSetup, setJokeSetup] = useState('');
  const [jokeDelivery, setJokeDelivery] = useState('');

  const fetchJoke = async () => {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
    const joke = await response.json();
    setNewJoke(joke);
  };

  const coreButton = () => {
    if (newJoke === true && hideDelivery === true) {
      setJokeButton('Get punchline');
      setJokeSetup(newJoke.setup);
      setHideDelivery(false);
    } else if (newJoke === true && hideDelivery === false) {
      setJokeDelivery(newJoke.delivery);
      setJokeButton('Get another joke');
    } else {
      fetchJoke();
      setHideDelivery(true);
    }
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Joke Generator</h1>

      <div>
        <button className="btn btn-danger" type="button" id="click-me" onClick={coreButton}>
          {' '}
          {jokeButton}{' '}
        </button>
        <hr />

        <div id="setup"> {jokeSetup} </div>
        <div id="delivery"> {jokeDelivery} </div>
      </div>
    </div>
  );
}

export default Home;
