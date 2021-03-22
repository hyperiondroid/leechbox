import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import LibraryPlaceholder from '../components/LibraryPlaceholder';
import Banner from '../components/Banner';

const LandingPage = () => {
  
  const [log, setLog] = useState('Awaiting commands...');
  const [query, setQuery] = useState('');

  const startLeach = () => {
    return setLog('Searching for ' + query);
  }

  const onQueryChange = (q) => {
    setQuery(q);
  }

  return (
    <div>
      <Banner/>
      <Input type="text" spellCheck="false" margin="0.5em 1em" handleChange={onQueryChange}/>
      <Button onClick = {startLeach}>Leech!</Button>
      <Text>{log}</Text>
      <LibraryPlaceholder/>
    </div>
    
    );
};

export default LandingPage;