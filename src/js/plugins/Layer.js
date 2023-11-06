import ConfirmLayer from "@/components/common/ConfirmLayer.vue";
import {createVNode, render} from "vue";

let layerDom = document.querySelector('div.layer-container')
if(!layerDom){
    layerDom = document.createElement('div')
    layerDom.classList = ['layer-container']
    document.body.appendChild(layerDom)
}

const Layer = {
    close: () => {
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
                    cls: "primary",
                    id: "ok",
                    click: () => {
                        render(null,layerDom)
                        resolve()
                    }
                },{
                    label: "取消",
                    type: "button",
                    cls: "default",
                    id: "cancel",
                    click: () => {
                        render(null,layerDom)
                        resolve()
                    }
                }]
            }
            const vNode = createVNode(ConfirmLayer,{...options})
            render(vNode,layerDom)
        })
    }
}

export default Layer