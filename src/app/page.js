'use client';

import { useState } from 'react';

function Home() {
  const [jokeButton, setJokeButton] = useState('Get a Joke');
  const [hideDelivery, setHideDelivery] = useState(true);
  const [jokeStatus, setJokeStatus] = useState(false);
  const [jokeSetup, setJokeSetup] = useState('');
  const [jokeDelivery, setJokeDelivery] = useState('');

  const fetchJoke = async () => {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
    const joke = await response.json();
    setJokeSetup(joke.setup);
    setJokeDelivery(joke.delivery);
  };

  const coreButton = () => {
    if (!jokeStatus && hideDelivery) {
      fetchJoke();
      setJokeButton('Get punchline');
      setJokeStatus(true);
    } else if (jokeStatus && hideDelivery) {
      setHideDelivery(false);
      setJokeButton('Get another joke');
    } else if (jokeStatus === true && hideDelivery === false) {
      setHideDelivery(true);
      fetchJoke();
      setJokeButton('Get punchline');
      setJokeStatus(true);
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
          {jokeButton}
        </button>
        <hr />

        <div id="setup"> {jokeSetup} </div>
        {!hideDelivery && <div id="delivery"> {jokeDelivery} </div>}
      </div>
    </div>
  );
}

export default Home;
