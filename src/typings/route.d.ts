interface IRoute {
    path: string,
    page: Function,
    key: string,
    name: string,
    isExact: boolean
}

interface IRouteMap {
    [index: number]: IRoute[]
}