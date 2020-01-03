/*
 * @Author: kuangdan 
 * @Date: 2019-12-25 16:03:25 
 * @Last Modified: 2019-12-25 16:03:25 
 */ 

import { message } from "antd";

/**
 * 在操作之前先校验状态
 * @param type
 * @param status
 */
export const checkStatusBeforeOperate = (type, status) => {
	switch (type) {
		case "mapRelations":
			if (status === "done") {
				return (taskId, name, fn) => fn(taskId);
			}
			return () => message.warning(`集群状态是${status}，无法展示拓扑图!`);
		case "delete":
			if (
				status === "release" ||
				status === "failed" ||
				status === "ready"
			) {
				return (id, name, fn) => fn(id, name);
			}
			return () => message.warning(`集群状态是${status}，无法删除!`);
		case "release":
			if (
				status !== "running" &&
				status !== "release" &&
				status !== "ready"
			) {
				return (taskId, name, fn) => fn(taskId, name);
			}
			return () => message.warning(`集群状态是${status}，不可卸载!`);
		case "deploy":
			if (status === "ready" || status === "failed") {
				return (taskId, name, fn) => fn(taskId);
			}
			return () => message.warning(`集群状态是${status}，不可部署！`);
		case "edit":
			if (status !== "done" && status !== 'running' && status !== 'init') {
				return (taskId, name, fn) => fn(taskId)
			}
			return () => message.warning(`集群状态是${status}，不可编辑`);
		case "monitor":
			if (status === "done") {
				return (id, name, fn) => fn(id, name);
			}
			return () => message.warning(`集群状态是${status}，暂无监控状态`);
		case "extension":
			if (status === "done") { //目前只有redis有扩容
				return (id, taskId, fn) => fn(id, taskId);
			}
			return () => message.warning(`集群状态是${status}, 不可扩容`);
		case "log":
			if (status !== 'ready' && status !== 'init' && status !== 'running') {
				return (id, name, fn) => fn(id)
			}
			return () => message.warning(`集群状态是${status}, 暂无日志输出`);
		default:
			return () => {};
	}
};
