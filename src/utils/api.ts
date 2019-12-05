/*
 * @Author: kuangdan 
 * @Date: 2019-11-01 10:32:55 
 * @Last Modified: 2019-11-01 10:32:55 
 */

import axios from "axios";

interface IResult {
	code: string;
	data: any;
	message: string;
}

axios.interceptors.request.use(
	(config: any) => {
		config.timeout = 10000; //设置相应过期时间
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

axios.interceptors.response.use(
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

const request = config => {
	return axios({ ...config })
		.then((response: any) => {
			return response;
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
		url,
		method: "GET",
		params: { ...params },
		...config
	});
};

export const post = (url: string, params?: object, config?: object) => {
	return request({
		url,
		method: "POST",
		data: params,
		...config
	});
};

export const del = (url: string, params?: object, config?: object) => {
	return request({
		url,
		method: "DELETE",
		params: params,
		...config
	});
};

export const put = (url: string, params?: object, config?: object) => {
	return request({
		url,
		method: "PUT",
		data: params,
		...config
	});
};

export const getApi = ProductApiUrl => (url, params?, config?) => get(ProductApiUrl + url, params, config);
export const postApi = ProductApiUrl => (url, params?, config?) => post(ProductApiUrl + url, params, config);
export const delApi = ProductApiUrl => (url, params?, config?) => del(ProductApiUrl + url, params, config);
export const putApi = ProductApiUrl => (url, params?, config?) => put(ProductApiUrl + url, params, config);


