const BrowserInfo = {
    install: (app) => {
        let webPrefix = getWebPrefix();
        app.config.globalProperties.$webPrefix = webPrefix
    }
}

function getWebPrefix() {
    let prefix = '';
    if(document.mozFullscreenEnable){
        prefix = "moz"
    }else if(document.msFullscreenEnable){
        prefix = "ms"
    }else if(document.webkitFullscreenEnable){
        prefix = "webkit"
    }
    return prefix
}

export default BrowserInfo