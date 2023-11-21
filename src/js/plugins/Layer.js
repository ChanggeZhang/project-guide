import ConfirmLayer from "@/components/common/ConfirmLayer.vue";
import {createVNode, render} from "vue";
import {Tip} from "@/js/enums";

let layerDom = document.querySelector('div.layer-container')
if(!layerDom){
    layerDom = document.createElement('div')
    layerDom.classList = ['layer-container']
    document.body.appendChild(layerDom)
}

const Layer = {
    __data: {
        vNode: null
    },
    close: () => {
        if(Layer.__data.vNode){
            Layer.__data.vNode.type.methods.close()
        }
        render(null,layerDom)
    },
    layer: (options = {}) => {
        return new Promise((resolve) => {
            options.show = true
            options.showTitle = true
            options.delayClose = false
            if(!options.btns || !options.btns.length) {
                options.btns = [{
                    label: "确认",
                    type: "button",
                    cls: "btn-primary",
                    id: "ok",
                    click: () => {
                        Layer.close()
                        resolve()
                    }
                },{
                    label: "取消",
                    type: "button",
                    cls: "btn-default",
                    id: "cancel",
                    click: () => {
                        Layer.close()
                        resolve()
                    }
                }]
            }
            Layer.__data.vNode = createVNode(ConfirmLayer,{...options})
            render(Layer.__data.vNode,layerDom)
        })
    },
    info: (msg,title = "提示") => {
        return tip(Tip.INFO,{
            message: msg,
            title
        })
    },
    help: (msg,title = "帮助") => {
        return tip(Tip.HELP,{
            message: msg,
            title
        })
    },
    question: (msg,title = "疑问") => {
        return tip(Tip.QUESTION,{
            message: msg,
            title
        })
    },
    error: (msg,title = "错误") => {
        return tip(Tip.ERROR,{
            message: msg,
            title
        })
    },
    warn: (msg,title = "警告") => {
        return tip(Tip.WARN,{
            message: msg,
            title
        })
    },
    loading: (msg = "加载中") => {
        return new Promise(() => {
            Layer.__data.vNode = createVNode(ConfirmLayer,{
                show: true,
                showTitle: false,
                delayClose: false,
                btns: [],
                message: msg,
                type: Tip.LOADING,
                width: '260px',
                height: "1.5rem"
            })
            render(Layer.__data.vNode,layerDom)
        })
    }
}

function tip(type = Tip.INFO,options = {}) {
    return new Promise(() => {
        options.show = true
        options.type = type
        options.showTitle = false
        options.delayClose = true
        options.btns = []
        const vNode = createVNode(ConfirmLayer,{...options})
        render(vNode,layerDom)
    })
}

export default Layer