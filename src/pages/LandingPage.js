import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import Banner from '../components/Banner';
import Poster from '../components/Poster';

const LandingPage = () => {
  
  // State: Realtime Logs of leeching 
  const [log, setLog] = useState('Awaiting commands...');
  
  // State: Actual query of Movie/TV to search and leech 
  const [query, setQuery] = useState('');

  const [isLeechInProgress, setIsLeechInProgress] = useState(false);
  const [leechResult, setLeechResult] = useState({});

  // Callback when leech query is submitted
  const onSubmit = (event) =>{
    event.preventDefault();
    const q = event.target.elements['query'].value;
    
    // Update state.query here if onChange callback is not passed to child Input.
    setQuery(q);

    startLeach(q);
  }

  // Start the leech routine
  const startLeach = (q) => {
    setIsLeechInProgress(true);
    setLeechResult({});
    setLog(`Searching for '${q}'...`);
    fetch(`https://www.omdbapi.com/?apikey=f17fea1c&t=${q}`)
    .then(data => data.json())
    .then(data => {
      setLog(data['Title']);
      setIsLeechInProgress(false);
      setLeechResult(data);
    });
    
  }

  // Callback to update state.query from child Input. 
  // Passed to Input component if onChange callbacks are required.
  const onQueryChange = (q) => {
    setQuery(q);
  }

  return (
    <div>
      <Banner/>
      <form onSubmit={onSubmit} autoComplete="off">
        <Input name="query" type="text" placeholder="Movie/TV" margin="0.5em 1em"/>
        <Button>Leech</Button>
      </form>
      <Text>{log}</Text>
      <Poster imgSrc={leechResult['Poster']}></Poster>
    </div>
    
    );
};

export default LandingPage;
