import Mysql from "@pages/Mysql"
import Redis from "@pages/Redis"
import Rocketmq from "@pages/Rocket-MQ"

const middlewareRouteMap:IRoute[] = [
    {
        path: '/',
        page: Mysql,
        key: 'mysql',
        name: 'mysql',
        isExact: true
    },
    {
        path: '/redis',
        page: Redis,
        key: 'redis',
        name: 'redis',
        isExact: false
    },
    {
        path: '/rocketmq',
        page: Rocketmq,
        key: 'rocketmq',
        name: 'rocketmq',
        isExact: false
    }
]

export default middlewareRouteMap