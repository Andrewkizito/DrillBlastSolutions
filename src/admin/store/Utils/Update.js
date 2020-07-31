export const updateState = (field,update,value) => {
    update(prevState => {
        return {
            ...prevState,
            [field]: value
        }
    })
}
// eslint-disable-next-line
export const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const msToTime = (duration) => {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24 + 3);
  
    hours = (hours < 10) ? "0" + hours  : hours ;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return {
       time: hours + ":" + minutes + ":" + seconds,
       hours: parseInt(hours),
       minutes: parseInt(minutes),
       seconds: parseInt(seconds)
    }
}