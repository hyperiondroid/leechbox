import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Banner from '../components/Banner';
import Poster from '../components/Poster';
import LogScroll from '../components/LogScroll';
import Row from '../components/Row';
import {searchTitle, searchMagnet, queueTorrent, getArchiveUrl,
   downloadFile, unzipToLibrary, plexScanLibrary } from '../services/Leecher';

const LandingPage = () => {
  
  // State: Realtime Logs of leeching 
  const [logs, setLogs] = useState([]);
  const [query, setQuery] = useState('');

  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const [isLeechInProgress, setIsLeechInProgress] = useState(false);
  const [searchResult, setSearchResult] = useState({});

  let titleInfo;
  let logScroll = [];

  const onQueryChange = (q) =>{
    setQuery(q);
  }

  // Callback when leech query is submitted
  const onSubmit = (event) =>{
    event.preventDefault();
    const q = event.target.elements['query'].value;
    
    startLeach(q);
  }

  const addLog = (log, type = 'text', opts={}) =>{
    console.log(`Adding log: ${log}, ${type}`);
    //logScroll +='\n'+ log;
    // TODO: Add list on logs. Debug state update bug
    //setLogs([logScroll]);
    logScroll.push({'type': type, 'log':log , ...opts});
    setLogs(logScroll);
  }

  const setTitleInfo = (data) => {
    // Update local titleInfo
    titleInfo = data;
  }
  const onSearchFail = () => {
    setLogs([{'log':`No results found.`,'type':'error'}]);
    setSearchResult({});
    setTitleInfo({});
    onLeachComplete({});
  }

  const onSearchSuccess = (data) =>{
    addLog(`Getting magnet for '${data['Title']} (${data['Year']})'...`);
    setSearchResult(data);
    setTitleInfo(data);
  }
  const onSearchComplete = (res)=>{
    setIsSearchInProgress(false);
    if(!res['Title']) {
      onSearchFail();
      return Promise.reject();
    }else{
      onSearchSuccess(res);
      return searchMagnet(res['Title']);
    }
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
      return onSearchComplete(res);
    })
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
    })
    .then(res => {
      const id = (titleInfo['Type'] == 'movie') ? 1 : 2;
      addLog(`Refreshing media library /${id}...`);
      return plexScanLibrary(id);
    })
    .then(res => {
      addLog(`'${titleInfo['Title']} (${titleInfo['Year']})' added to library.`, 'success');
      addLog(`Stream at plex.hyperionprojects.dev`,'link',{'link': 'https://plex.hyperionprojects.dev'});
      onLeachComplete({});
    })
    .catch(res => {
      addLog('Error encountered.');
    })
    
  }

  return (
    <div>
      <Banner/>
      <form onSubmit={onSubmit} autoComplete="off">
        <Row>
          <Input name="query" type="text" handleChange = {onQueryChange} placeholder="Movie/TV" margin="0.5em 1em"/>
          <Button disabled={query.length==0 || isLeechInProgress}>Leech</Button>
        </Row>
      </form>
      <Row wrap='wrap'>
        {(isSearchInProgress || searchResult['Poster']) 
          && <Poster imgSrc={searchResult['Poster']}/>}
        <LogScroll logs ={logs}/>
      </Row>
      
    </div>
    
    );
};

export default LandingPage;
