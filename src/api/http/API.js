const API = Object.freeze({
    __schema: process.env.SCHEMA,
    __host: process.env.HOST,
    __port: process.env.PORT,
    __context: process.env.CONTEXT,


    toString() {
        return `${API.schema || 'http'}://${API.host || 'localhost'}${API.port ? (':' + API.port) : ''}${API.context || '/'}`
    }
})

export default API.toString()