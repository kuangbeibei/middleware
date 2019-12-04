/*
 * @Author: kuangdan 
 * @Date: 2019-11-01 10:32:55 
 * @Last Modified: 2019-11-01 10:32:55 
 */

import axios from "axios";
import {
	setCookie
} from "./tools"

var instance = axios["create"]();

interface IResult {
	code: string;
	data: any;
	message: string;
}

//curl "http://10.216.155.24:31380/v1/supplier?name=lys-yh&region=china-sh"

axios.interceptors.request.use(
	(config: any) => {
		setCookie('yh-manager-session', 's%3ARo3Vk9KXhw5MiFR0WJc2j2iP453H50S_.eZYs7s6He61CViSg7mdQcMbPbpWMjfLAwyChwS9F2iM', 100)
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
