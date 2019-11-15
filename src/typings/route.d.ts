/*
 * @Author: kuangdan 
 * @Date: 2019-10-31 15:42:23 
 * @Last Modified: 2019-10-31 15:42:23 
 */ 
interface IRoute {
    key: string;
    name: string;
    breadcrumbTitle?: string;
    component?: string;
    isExact?: boolean;
    auth?: string;
    login?: boolean;
    navname?: string;
    icon?: string;
    menus?: IRoute[]; // 侧边栏菜单项
    subs?: IRoute[]; // 子路由
}

interface IRouteMap {
    [index: number]: IRoute[]
}