interface IRoute {
    path: string,
    page: any,
    key: string,
    name: string,
    isExact: boolean
}

interface IRouteMap {
    [index: number]: IRoute[]
}