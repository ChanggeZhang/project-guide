const menus = require('@/data/menus.json')
const projectInfo = require('@/data/ProjectInfo.json')

export function getMenus(){

    for (let menuGroupKey in menus) {
        let menuGroup = menus[menuGroupKey]
        menuGroup.map(m => {
            let hasChild = menuGroup.some(mi => mi.pid == m.id)
            m.hasChildren = hasChild
        })
    }

    return menus
}

export function getProjectInfo(){
    return projectInfo;
}

export function toggleMenu(that,menu){
    that.menus.map(m => {
        m.active = false
        showChildrenMenu(menu,m);
    })
    activeParents(menu,that.menus);

    function activeParents(menu,menus){
        menu.active = true;
        let parentMenu = menus.find(m => m.id === menu.pid)
        if(parentMenu){
            activeParents(parentMenu,menus)
        }
    }

    function showChildrenMenu(menu,m){
        m.show = false;
        if(m.pid){
            if((m.pid === menu.id || m.pid === menu.pid) && !m.show){
                m.show = true;
            }
        }
    }
}