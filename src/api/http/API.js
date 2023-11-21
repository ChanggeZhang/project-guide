export const Schema = Object.freeze({
    WEBSOCKET: "ws://", // ws://localhost:8546
    HTTP: "http://", // http://localhost:8551
    HTTPS: "https://", // https://localhost:8551
    IPC: "" // /users/myuser/.ethereum/geth.ipc
})

export const API = Object.freeze({
    __schema__: process.env.SCHEMA,
    __host__: process.env.HOST,
    __port__: process.env.PORT,
    __context__: process.env.CONTEXT,
    WEB3_SERVICE_URI: Object.freeze({
        // url: "localhost:8546",
        schema: Schema.WEBSOCKET
    }),
    toString() {
        return `${API.schema || 'http'}://${API.host || 'localhost'}${API.port ? (':' + API.port) : ''}${API.context || '/'}`
    }
})