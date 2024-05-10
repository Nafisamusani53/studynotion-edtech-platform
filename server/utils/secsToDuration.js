exports.secToDuration = (seconds) => {
    let min = Math.floor(seconds/60);
    const sec = Math.floor(seconds%60);
    let hours = 0;
    

    if(min >= 60){
        hours = hours + Math.floor(min/60);
        min = Math.floor(min%60);
    }
    return `${hours}hr ${min}min ${sec}sec`
}