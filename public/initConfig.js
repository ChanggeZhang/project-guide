let prefix = '';
// eslint-disable-next-line no-unused-vars
function getWebPrefix() {
    if(window.$webPrefix);
    if(document.body.mozRequestFullscreen){
        window.$webPrefix = "moz"
    }else if(document.msRequestFullscreen){
        window.$webPrefix = "ms"
    }else if(document.webkitRequestFullscreen){
        window.$webPrefix = "webkit"
    }
    window.$webPrefix = prefix
}