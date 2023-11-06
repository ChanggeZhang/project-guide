const Tip = Object.freeze({
    INFO:{
        icon: "circle-info",
        id: "info"
    },
    WARN:{
        icon: "triangle-exclamation",
        id: "warn"
    },
    ERROR: {
        icon: "circle-info",
        id: "error"
    },
    QUESTION: {
        icon: "question",
        id: "question"
    },
    HELP: {
        icon: "circle-info",
        id: "help"
    }
})

const OpType = Object.freeze({
    detail: {
        label: "详情",
        readonly: true
    },
    edit: {
        label: "编辑",
        readonly: false
    },
    add: {
        label: "新增",
        readonly: false
    },
    del: {
        label: "删除",
        readonly: false
    },
    entry: {
        label: "录入",
        readonly: false
    },
    other: {
        label: "其他",
        readonly: false
    }
})

export {
    Tip,OpType
}