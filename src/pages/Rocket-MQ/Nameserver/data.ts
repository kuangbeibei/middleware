interface Iparams {
    rmqComponentClusterId: number | string,
    version: string,
    ip: string,
    port: number | string,
    user: string,
    pass: string,
    logPath: string,
    moreConf?: string,
}

interface IrmqNameServerPrototype {
    type: string,
    params: Iparams
}

export const rmqNameServerPrototype:IrmqNameServerPrototype = {
    type: "rmqNameServer",
    params: {
        rmqComponentClusterId: "",
        version: "4.4.0",
        moreConf: "",
        ip: "",
        port: "",
        user: "",
        pass: "",
        logPath: ""
    }
}

export const rmqNameServerVersions = ["4.4.0"];
