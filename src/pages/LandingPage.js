import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Banner from '../components/Banner';
import Poster from '../components/Poster';
import LogScroll from '../components/LogScroll';
import {searchTitle, searchMagnet, queueTorrent, getArchiveUrl,
   downloadFile, unzipToLibrary, plexScanLibrary } from '../services/Leecher';

const LandingPage = () => {
  
  // State: Realtime Logs of leeching 
  const [logs, setLogs] = useState(['']);

  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [isLeechInProgress, setIsLeechInProgress] = useState(false);
  const [searchResult, setSearchResult] = useState({});

  let titleInfo;
  let logScroll = '';

  // Callback when leech query is submitted
  const onSubmit = (event) =>{
    event.preventDefault();
    const q = event.target.elements['query'].value;
    
    startLeach(q);
  }

  const addLog = (log) =>{
    console.log(`Adding log: ${log}`);
    logScroll +='\n'+ log;
    // TODO: Add list on logs. Debug state update bug
    setLogs([logScroll]);
  }

  const setTitleInfo = (data) => {
    // Update local titleInfo
    titleInfo = data;
  }

  const onSearchComplete = (data)=>{
    setIsSearchInProgress(false);
    setSearchResult(data);
    setTitleInfo(data);
  }

  const onSearchStart = (q) =>{
    setIsSearchInProgress(true);
    setSearchResult({});
    setTitleInfo({});
    addLog(`Searching for '${q}'...`);
  }

  const onLeachStart = (q) =>{
    onSearchStart(q);
    setIsLeechInProgress(true);
  }
  const onLeachComplete = (res)=>{
    setIsLeechInProgress(false);
  }

  // Start the leech routine
  const startLeach = (q) => {

    onLeachStart(q);
    searchTitle(q)
    .then(res =>{
      if(!res['Title']) {
        addLog(`No results found for '${q}.`);
        onSearchComplete({});
        onLeachComplete({});
        return Promise.reject();
      }else{
        addLog(`Getting magnet for '${res['Title']} (${res['Year']})'...`);
        onSearchComplete(res);
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
      onLeachComplete({});
    })
    
  }

  return (
    <div>
      <Banner/>
      <form onSubmit={onSubmit} autoComplete="off">
        <Input name="query" type="text" placeholder="Movie/TV" margin="0.5em 1em"/>
        <Button disabled={isLeechInProgress}>Leech</Button>
      </form>
      <div style={{display: 'flex', flexDirection:'row'}}>
        {(isSearchInProgress || searchResult['Poster']) 
          && <Poster imgSrc={searchResult['Poster']}></Poster>}
        <LogScroll logs ={logs}/>
      </div>
      
    </div>
    
    );
};

export default LandingPage;
