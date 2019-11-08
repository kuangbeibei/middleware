export const rmqTypes = ["rmqNameServer", "rmqBroker", "rmqConsole"];

interface IrmqDataPrototype {
    id: string,
    businessName: string,
    componentType: string,
    createTime: string
}

export const rmqDataPrototype:IrmqDataPrototype = {
    id: '',
    businessName: '',
    componentType: '',
    createTime: '',
}
