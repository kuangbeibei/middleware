/*
 * 创建扩容页
 * @Author: kuangdan
 * @Date: 2019-11-25 10:36:06
 * @Last Modified: 2019-11-25 10:36:06
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";

import {
	Button,
	Table,
	Popconfirm,
	message,
	Icon,
	Popover,
	Tooltip,
	Divider,
	Menu,
	Dropdown
} from "antd";

import { YhOp, YhAdd } from "@styled/Button";

import Loading from "@com/UI/Loading";

import { FormatTime } from "@tools";
import { useIntervalWithCondition } from "@hooks/use-interval";

import FormModal from "./Form.modal"
import StatusControl from "@com/Status.control"
import OperationControl from "@com/Operation.control"

import {
	deployTaskOutput,
	checkStatus,
} from "../Home/service";

import {
    getRedisExtendList,
    deployExtensionInstance,
    deleteExtensionInstance
} from "./service"

function ExtensionList(props) {

    const {
        match: {
            params: {
                id
            }
        },
        setTableModalVisibility,
        tableModalVisibility
    } = props;

    let [loading, setloading] = useState(true);
	let [loadingListCount, setLoadListCount] = useState(0);
	let [tableList, setTableList] = useState(Array());
    let [com, setCom] = useState();
	let [taskId, setTaskId] = useState("");
	const [statusTaskId, setStatusTaskId] = useState("");

    useEffect(() => {
		getRedisExtendList(id)
            .then(data => {
                setTableList(data);
                setloading(false);
			})
            .catch(e => message.error(e.message))
    }, [loadingListCount]);

    useEffect(() => {
		if (!tableModalVisibility.visible && com) {
			removeLayer();
        }
        setLoadListCount(loadListCount => loadListCount + 1);
	}, [tableModalVisibility.visible]);
	
	/**
	 * 当添加或释放集群时，轮询状态
	 */
	useIntervalWithCondition((timer, rely) => {
		if (timer) {
			checkStatus(rely).then(res => {
				setLoadListCount(loadListCount => loadListCount + 1);
				const {
					data: {
						status
					}
				} = res;
				if (
					status === "done" ||
					status === "failed"
				) {
					clearInterval(timer);
					timer = null;
					setStatusTaskId("")
				}
			});
		}
	}, statusTaskId);
    
    const removeLayer = () => {
		setTimeout(() => {
			setCom("");
		}, 400);
	};
    
        
    /**
     * 添加 / 编辑是打开modal
     * @param taskId 
     */
	const showFormModal = async (taskId?) => {
		if (taskId) {
            setTaskId(taskId)
        } else {
            setTaskId("")
        }
        setTableModalVisibility();
    };

    /**
	 * 删除集群
	 * @param id
	 */
	const deleteCluster = (id, name?) => {
		deleteExtensionInstance(id)
			.then(res => {
				if (res) {
					setLoadListCount(loadListCount => loadListCount + 1);
					message.success(`删除${id}成功!`);
				} else {
					message.error(`删除${id}失败! `);
				}
			})
			.catch(e => message.error(e.message));
    };

    /**
	 * 部署redis集群
	 * @param taskId
	 */
	const deployCluster = taskId => {
		message.success("正在部署...", 5);
		deployExtensionInstance(taskId)
			.then(res => {
				setStatusTaskId(taskId)
			})
			.catch(e => message.error(e.message));
    };
    
    /**
	 * 获取日志打印数据
	 * @param taskId
	 */
	const getOutput = taskId => {
		deployTaskOutput(taskId)
			.then(data => {
				if (data.loginfo) {
					import("../Home/Log.modal").then(component => {
						setCom(<component.default {...data} />);
					});
				} else {
					return message.info('无日志信息');
				}
			})
			.catch(e => message.error(e.message));
	};
    
    
    /**
	 * 在操作前校验status
	 * @param type
	 * @param status
	 */
    const checkStatusBeforeOperate = (type, status) => {
        switch (type) {
            case "delete":
                if (
                    status === "failed" ||
                    status === "ready"
                ) {
                    return (id, name) => deleteCluster(id, name);
                }
                return () => message.info(`集群状态是${status}，无法删除!`);
            case "deploy":
                if (status === "ready" || status === "failed") {
                    return taskId => deployCluster(taskId);
                }
                return () => message.info(`集群状态是${status}，不可部署！`);
            case "edit":
                if (status !== "done") {
                    return taskId => showFormModal(taskId);
                }
                return () => message.info(`集群状态是${status}，不可编辑`);
            default:
                return () => { };
        }
    };


    const menu = text => {
		return (
			<Menu>
				<Menu.Item key="1">
					<a
						onClick={() =>
							checkStatusBeforeOperate("deploy", text.status)(
								text.taskId,
								text.name
							)
						}
					>
						部署
					</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() =>
							checkStatusBeforeOperate("edit", text.status)(
								text.taskId,
								text.name
							)
						}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<Popconfirm
						placement="topRight"
						title={`确定删除${text.id}?`}
						onConfirm={() =>
							checkStatusBeforeOperate("delete", text.status)(
								text.id,
								text.name
							)
						}
						okText="是"
						cancelText="否"
					>
						<a>删除</a>
					</Popconfirm>
				</Menu.Item>
			</Menu>
		);
	};

    const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			render: text => text
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			render: text => <StatusControl text={text} />
        },
        {
            title: "实例个数",
            dataIndex: "instances",
            key: "instances",
            render: text => {
                let num = (JSON.parse(text)).length / 2;
                return `${num}主${num}从`
            }
        },
		{
			title: "部署日志",
			key: "log",
			render: text => (
				<YhOp type="info" onClick={() => getOutput(text.taskId)}>
					查看
				</YhOp>
			)
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			key: "createTime",
			render: text => FormatTime(text)
		},
		{
			title: "操作",
			key: "action",
			render: text => {
				return  <OperationControl {...props} text={text} menu={menu} />
			}
		}
	];
    
	return (
		<>
			<YhAdd
				type="primary"
				onClick={() => showFormModal()}
				style={{ marginBottom: 10 }}
			>扩容</YhAdd>

			{loading ? (
				<Loading />
			) : (
				<Table columns={columns} dataSource={tableList} rowKey="id" />
			)}

            <FormModal taskId={taskId} {...props} />
            
            {
                com
            }
		</>
	);
}

export default connect(
	(state: any) => ({
		tableModalVisibility: state.tableModalVisibility
	}),
	dispatch => ({
		setTableModalVisibility: bindActionCreators(
			setTableModalVisibility,
			dispatch
		)
	})
)(ExtensionList);

