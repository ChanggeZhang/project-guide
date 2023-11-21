import {API, Schema} from "@/api/http/API";
import Web3 from "web3";

export const Web3Proxy = Object.freeze({
    async login(that){
        const provider = Web3Proxy.loadProvider()
        if (!window.web3 && provider === window.ethereum) {
            try {
                await window.ethereum.enable()
            } catch (e) {
                if (e.code !== -32002) {
                    that.$layer.error("登陆失败，需要MetaMask已运行？")
                    return;
                }else{
                    if(!await Web3Proxy.reconnect()){
                        that.$layer.error("登陆失败，确认MetaMask已运行？")
                        return
                    }
                }
            }
        }
        window.web3 = new Web3(provider)
    },
    async getWeb3Accounts(that){
        const accounts = await new Web3(window.web3.currentProvider).eth.getAccounts()
        if(!accounts || !accounts.length){
            that.$layer.error("当前账户没有钱包账户或登陆失败，需要创建钱包");
            return
        }
        const publicAddress = accounts.map(c => c.toLowerCase())
        let model = {
            publicAddress
        }
        if(model){
            localStorage.setItem("login.user",JSON.stringify(model))
        }
    },
    async reconnect(){
        try {
            await window.ethereum.request({
                method: 'wallet_requestPermissions',
                params: [{
                    eth_accounts: {}
                }]
            })
            return true;
        } catch (e) {
            console.error(e)
            return false;
        }
    },
    loadProvider(){
        if(window.web3) return window.web3.currentProvider
        const service = API.WEB3_SERVICE_URI
        if (service && service.url) {
            const fullUrl = service.schema + service.url;
            if(service.schema === Schema.HTTP || service.schema === Schema.HTTPS){
                return new Web3.providers.HttpProvider(fullUrl)
            }else if(service.schema === Schema.WEBSOCKET){
                return new Web3.providers.WebsocketProvider(fullUrl)
            }else if(service.schema === Schema.IPC){
                return new Web3.providers.IpcProvider(fullUrl)
            }
        }else{
            return window.ethereum
        }
    }
})