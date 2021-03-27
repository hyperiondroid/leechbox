import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';
import Banner from '../components/Banner';
import Poster from '../components/Poster';
import {searchTitle, searchMagnet, queueTorrent, getArchiveUrl,
   downloadFile, unzipToLibrary, plexScanLibrary } from '../services/Leecher';

const LandingPage = () => {
  
  // State: Realtime Logs of leeching 
  const [logs, setLogs] = useState(['Awaiting input...']);
  
  // State: Actual query of Movie/TV to search and leech 
  const [query, setQuery] = useState('Okay');

  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [leechResult, setLeechResult] = useState({});

  // Callback when leech query is submitted
  const onSubmit = (event) =>{
    event.preventDefault();
    const q = event.target.elements['query'].value;
    
    // Update state.query here if onChange callback is not passed to child Input.
    setQuery(q);

    startLeach(q);
  }

  const addLog = (log) =>{
    console.log(`Adding log: ${log}`);
    logs.push(log);
    setLogs(logs);
  }

  const onSearchComplete = (data)=>{
    addLog(`Getting magnet for '${data['Title']} (${data['Year']})'...`);
    setIsSearchInProgress(false);
    setLeechResult(data);
  }

  const onSearchStart = (q) =>{
    setIsSearchInProgress(true);
    setLeechResult({});
    addLog(`Searching for '${q}'...`);
  }

  // Start the leech routine
  const startLeach = (q) => {

    let titleInfo;

    onSearchStart(q);
    searchTitle(q)
    .then(res =>{
      if(!res['Title']) {
        onSearchComplete({}); //TODO Update fail scenario
        return;
      }else{
        onSearchComplete(res);
        titleInfo = res;
        return searchMagnet(res['Title']);
      }
    })/*
    .then(res => {
      addLog(`Magnet found. Queueing torrent, this may take a while...`);
      return queueTorrent(res['magnet_uri']);
    })
    .then(res => {
      addLog(`Leeching complete. Generating archive url...`);
      return getArchiveUrl();
    })
    .then(res => {
      addLog(`Fetching archive...`);
      return downloadFile(res['archive_url']);
    })
    .then(res => {
      addLog(`Unpacking...`);
      return unzipToLibrary(res['file']);
    })*/
    .then(res => {
      const id = (titleInfo['Type'] == 'movie') ? 1 : 2;
      addLog(`Refreshing media library /${id}...`);
      return plexScanLibrary(id);
    })
    .then(res => {
      addLog(`${titleInfo['Title']} added to library.`);
      addLog(`Stream at https://plex.hyperionprojects.dev`);
    })
    
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
      <div style={{display: 'flex', flexDirection:'row'}}>
        <Poster imgSrc={leechResult['Poster']}></Poster>
        <div style={{display: 'flex', flexDirection:'column'}}>
          {
            logs.map(log => <Text key={log}>{log}</Text>)
          }
        </div>
      </div>
      
    </div>
    
    );
};

export default LandingPage;
