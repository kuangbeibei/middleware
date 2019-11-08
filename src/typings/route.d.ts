/*
 * @Author: kuangdan 
 * @Date: 2019-10-31 15:42:23 
 * @Last Modified: 2019-10-31 15:42:23 
 */ 
interface IRoute {
    path: string,
    page: any,
    key: string,
    name: string,
    isExact: boolean,
    children?: IRoute[],
}

interface IRouteMap {
    [index: number]: IRoute[]
}