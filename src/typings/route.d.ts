/*
 * @Author: kuangdan 
 * @Date: 2019-10-31 15:42:23 
 * @Last Modified: 2019-10-31 15:42:23 
 */ 
interface IRoute {
    key: string,
    name: string,
    breadcrumbTitle?: string,
    component?: string,
    isExact?: boolean,
    subs?: IRoute[],
    auth?: string,
    login?: boolean,
    navname?: string
    menus?: IRoute[] & {
        icon?: string
    }
}

interface IRouteMap {
    [index: number]: IRoute[]
}