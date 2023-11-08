const prefix = window.$webPrefix;

const ScreenShift = {
    exitRequestFullscreen(){
        try {
            if (prefix == 'moz') {
                document.mozExitFullscreen()
            } else if (prefix == 'ms') {
                document.msExitFullscreen()
            } else if (prefix == 'webkit') {
                document.webkitExitFullscreen()
            } else {
                document.exitFullscreen()
            }
            return true;
        } catch (e) {
            return false;
        }
    },
    alreadyFull(){
        return (
            document.mozFullscreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement ||
            document.fullscreenElement
        )
    },

    requestFullscreen(dom){
        try {
            if (prefix == 'moz') {
                dom.mozRequestFullscreen()
            } else if (prefix == 'ms') {
                dom.msRequestFullscreen()
            } else if (prefix == 'webkit') {
                dom.webkitRequestFullscreen()
            } else {
                dom.requestFullscreen()
            }
            return true;
        } catch (e) {
            return false;
        }
    },
    listenFullChange(fullscreenChange){
        document.onfullscreenchange = () => {
            fullscreenChange()
        }
        document.onmozfullscreenchange = () => {
            fullscreenChange()
        }
        document.onwebkitfullscreenchange = () => {
            fullscreenChange()
        }
        document.onMSFullscreenChange = () => {
            fullscreenChange()
        }
    }
}

export default ScreenShift