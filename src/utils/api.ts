/*
 * @Author: kuangdan
 * @Date: 2019-11-01 10:32:55
 * @Last Modified: 2019-11-01 10:32:55
 */

import axios from "axios";
import { getCookie } from "@utils/tools";
import { message } from "antd";

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
		if (err.response.status === 401) {
			if (location.hostname === "127.0.0.1") {
				// 开发中自动登陆
				let loginInfo = "yh_username=css&yh_password=123456";
				let headers = {
					"Content-Type":
						"application/x-www-form-urlencoded; charset=UTF-8"
				};
				postApi("/api/user/login")("", loginInfo, { headers }).then(
					res => {
						if (res.code == "S200") {
							location.reload()
						}
					}
				);
			} else {
				location.href = `${location.origin}/login`;
			}

			return;
		} else {
			console.log('interceptors.response,', err);
			alert(err);
			message.error(err.message)
			return Promise.reject(err);
		}
	}
);

const request = config => {
	return axios({ ...config })
		.then((response: any) => {
			return response;
		})
		.catch(err => {
			console.log('request err,', err)
			return Promise.reject(err);
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

export const getApi = ProductApiUrl => (url, params?, config?) =>
	get(ProductApiUrl + url, params, config);
export const postApi = ProductApiUrl => (url, params?, config?) =>
	post(ProductApiUrl + url, params, config);
export const delApi = ProductApiUrl => (url, params?, config?) =>
	del(ProductApiUrl + url, params, config);
export const putApi = ProductApiUrl => (url, params?, config?) =>
	put(ProductApiUrl + url, params, config);
