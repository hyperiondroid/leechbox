import React from 'react';
import Button from '../components/Button'
import Input from '../components/Input';

const LandingPage = () => {
  return (
    <div>
      <h3>A Simple Landing Page</h3>
      <Input type="text" spellCheck="false"/>
      <Button>Leech!</Button>
    </div>
    
    );
};

export default LandingPage;