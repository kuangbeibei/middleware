/*
 * @Author: kuangdan 
 * @Date: 2019-11-25 15:06:01 
 * @Last Modified: 2019-11-25 15:06:01 
 */ 

interface Iinstance {
    ip: string;
    port: string | number;
    user: string;
    pass: string;
    slotSources?: any
}

interface IParams {
    redisClusterId: string | number;
    timeout: number;
    slot?: number | string;
    instances: Array<Iinstance>
}

export default interface IextensionFormParams {
    type: string;
    params: IParams 
}