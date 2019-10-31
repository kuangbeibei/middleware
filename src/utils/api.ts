import * as axios from "axios";

var instance = axios["create"]();

interface IResult {
	code: string;
	data: any;
	message: string;
}

//curl "http://10.216.155.24:31380/v1/supplier?name=lys-yh&region=china-sh"

instance.interceptors.request.use(
	(config: any) => {
		config.timeout = 10000; //设置相应过期时间
		config.headers = {
			//request header 设置
			"yh-tenant-id": "lystest"
		};
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

instance.interceptors.response.use(
	(response: any) => {
		if (response.status === 200) {
			return response.data;
		} else {
			return Promise.reject(response);
		}
	},
	err => {
		return Promise.reject(err);
	}
);

export const request = config => {
	return instance
		.request({ ...config })
		.then((response: any) => {
			const data: IResult = {
				//等后段结构改好注视
				code: "S200",
				data: response,
				message: "success"
			};
			if (data.code === "S200") {
				return data;
			} else {
				return;
			}
		})
		.catch(err => {
			return err;
		});
};

export const get = (
	url: string,
	params?: object,
	config?: object
): Promise<any> => {
	return request({
		url: url,
		method: "GET",
		params: { ...params },
		...config
	});
};
export const post = (url: string, params?: object, config?: object) => {
	return request({
		url: url,
		method: "POST",
		data: params,
		...config
	});
};
export const del = (url: string, params?: object, config?: object) => {
	return request({
		url: url,
		method: "DELETE",
		params: params,
		...config
	});
};
export const put = (url: string, params?: object, config?: object) => {
	return request({
		url: url,
		method: "PUT",
		data: params,
		...config
	});
};
