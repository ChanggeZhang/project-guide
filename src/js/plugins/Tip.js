import {createVNode, render} from "vue";
import ConfirmLayer from "@/components/common/ConfirmLayer.vue";

let layerDom = document.querySelector('div.layer-container')
if(!layerDom){
    layerDom = document.createElement('div')
    layerDom.classList = ['layer-container']
    document.body.appendChild(layerDom)
}

export default (options = {}) => {
    return new Promise(() => {
        options.show = true
        options.showTitle = false
        options.delayClose = true
        options.btns = []
        const vNode = createVNode(ConfirmLayer,{...options})
        render(vNode,layerDom)
    })
}