interface IRoute {
    path: string,
    page: Function,
    key: string,
    name: string,
    isExact: boolean
}

interface IRouteMap {
    map(arg0: (route: IRoute) => JSX.Element): React.ReactNode;
    [index: number]: IRoute[]
}