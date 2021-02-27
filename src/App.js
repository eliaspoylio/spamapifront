import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function getAll() {
  return fetch('https://spamapi.azurewebsites.net/api/Messages/')
    .then(data => data.json())
}

function getId(id) {
  return fetch('https://spamapi.azurewebsites.net/api/Messages/' + id)
    .then(data => data.json())
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function App() {

  const [all, setAll] = useState([])
  const [searchedName, setSearchedName] = useState([]);
  const [sum, setSum] = useState([]);
  const [rand, setRand] = useState(1);

  useEffect(() => {
    let mounted = true
    getAll()
      .then(names => {
        if (mounted) {
          setAll(names)
        }
      })
    return () => mounted = false
  }, [])

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setSum(all.length)
    }
  }, [all])


  const handleSubmit = (e) => {
    e.preventDefault()
    let mounted = true
    getId(rand)
      .then(name => {
        if (mounted) {
          setSearchedName(name)
        }
      })
    return () => mounted = false
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          I'm collecting junk mail data for future purposes. This page makes requests to an API serving a portion of that data.
        </p>
        <p>
          One future purpose for the API could be f.ex. to serve as a tool for training a neural network for spam detection. There's some "finnish" spamming included so there's a certain lingual aspect to this.
        </p>
        <p>
          There's {sum} entries in the DB.
        </p>
        <form onSubmit={handleSubmit}>
            <button onClick={() => setRand(getRandomIntInclusive(1,sum))}>Display a random spammer</button>
          </form>
      </header>
      <div className="App-item">
          <p>{searchedName.messageFrom}</p>
      </div>
    </div>
  );
}

export default App;
