const BrowserInfo = {
    install: (app) => {
        let webPrefix = window.$webPrefix;
        app.config.globalProperties.$webPrefix = webPrefix
    }
}



export default BrowserInfo