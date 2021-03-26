import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import LibraryPlaceholder from '../components/LibraryPlaceholder';
import Banner from '../components/Banner';

const LandingPage = () => {
  
  // State: Realtime Logs of leeching 
  const [log, setLog] = useState('Awaiting commands...');
  
  // State: Actual query of Movie/TV to search and leech 
  const [query, setQuery] = useState('');

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
    fetch('https://xkcd.com/info.0.json')
    .then(data => data.json())
    .then(data => setLog(data['title']));
    return setLog(`Searching for '${q}'...`);
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
      <LibraryPlaceholder/>
    </div>
    
    );
};

export default LandingPage;