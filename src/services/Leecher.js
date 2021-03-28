
export const searchTitle = (query) => {
    return fetch(`https://leecher.hyperionprojects.dev/plexbot/api/searchTitle?q=${query}`,{
        method: 'GET', 
        // mode: 'no-cors', // no-cors, *cors, same-origin
    })
    .then(data => data.json())
    .then(data => data['data'])
}

export const searchMagnet = (query) => {
    
    let formData = new FormData();
    formData.append('query', query);

    return fetch(`https://leecher.hyperionprojects.dev/plexbot/api/searchMagnet`,{
        method: 'POST', 
        body: formData,
      })
    .then(data => data.json())
}

export const queueTorrent = (magnetUri) => {
    
    let formData = new FormData();
    formData.append('magnetUri', magnetUri);

    return fetch(`https://leecher.hyperionprojects.dev/plexbot/api/queueTorrent`,{
        method: 'POST', 
        body: formData
      })
    .then(data => data.json())
}

export const getArchiveUrl = () => {
    
    return fetch(`https://leecher.hyperionprojects.dev/plexbot/api/getArchiveUrl`)
    .then(data => data.json())
}

export const downloadFile = (dlLink) => {
    
    let formData = new FormData();
    formData.append('dlLink', dlLink);

    return fetch(`https://leecher.hyperionprojects.dev/plexbot/api/downloadFile`,{
        method: 'POST', 
        body: formData
      })
    .then(data => data.json())
}

export const unzipToLibrary = (archive) => {
    
    let formData = new FormData();
    formData.append('archive', archive);

    return fetch(`https://leecher.hyperionprojects.dev/plexbot/api/unzipToLibrary`,{
        method: 'POST', 
        body: formData
      })
    .then(data => data.json())
}

export const plexScanLibrary = (id) => {
    
    let formData = new FormData();
    formData.append('id', id);

    return fetch(`https://leecher.hyperionprojects.dev/plexbot/api/plexScanLibrary`,{
        method: 'POST', 
        body: formData
      })
    .then(data => data.json())
}