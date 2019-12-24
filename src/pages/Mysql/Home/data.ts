/*
 * @Author: kuangdan 
 * @Date: 2019-12-16 17:47:03 
 * @Last Modified: 2019-12-16 17:47:03 
 */

interface Iinstances {
    ip: string;
    port: string | number;
    user: string;
    password: string;
    role: string;
}

export interface IPostParams {
    name: string;
    tenantId?: string;
    description?: string;
    type: string;
    rootPassword: string;
    backupStrategy: string;
    backupServer: string;
    backupKeepDays: number
    dbConfiguration?: Object;
    instances: Array<Iinstances>;
}

export const formItemBasicLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 4 }
};

export const formItemBasicLayoutOther = {
	labelCol: { span: 12 },
	wrapperCol: { span: 6 }
}

export const formItemInstanceLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 6 }
};

export const formItemInstanceSshLayout = {
	labelCol: { span: 10 },
	wrapperCol: { span: 6 }
};

export const formAdvancesLayout = {
	labelCol: { span: 11 },
	wrapperCol: { span: 6 }
}

export const dbConfigurationLayout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 20 }
}

export const formAdvancesServerLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 }
}
