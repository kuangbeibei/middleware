/*
 * @Author: kuangdan
 * @Date: 2019-11-07 18:47:37
 * @Last Modified: 2019-11-07 18:47:37
 */

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
	Button,
	Table,
	Input,
	Popconfirm,
	message,
	Select,
	Icon,
	Popover,
  Tooltip, 
  Menu,
  Dropdown
} from "antd";

import { YhOp, YhAdd, YhId } from "@styled/Button";
import Loading from "@com/UI/Loading";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import OperationControl from "@com/Operation.control";
import StatusControl from "@com/Status.control";


import { FormatTime, deepCloneObject } from "@tools";
import { rmqTypes, rmqDataPrototype } from "./data";


import { getRmqClustListByPage, getRmqCluster, runRmqClusterTask, deleteCluster, releaseCluster, getDeployTaskOutput, getTopoData } from './service'
import useTenants from "@hooks/use-tenants";
import { checkStatusBeforeOperate } from "@funcs/Check-status-before-action";


let addFlag = false;

function RocketMqHome(props) {
	// let [loadingListCount, setLoadListCount] = useState(0);
  let [tableList, setTableList] = useState(Array());
  let [pageInfo, setPageInfo] = useState();
	let [newItemName, setNewItemName] = useState("");
	let [newItemType, setNewItemType] = useState("");
	let [loading, setloading] = useState(true);
	// let [delLoading, setDelLoading] = useState(false);
  // let [addLoading, setAddLoading] = useState(false);
  
  let tenantList = useTenants()

  let {
    tableModalVisibility,
    setTableModalVisibility
  } = props;

  
  let [com, setCom] = useState()


  useEffect(()=> {
    getRmqList()
    // getTenantList()
  }, [])

  // 获取列表
  const getRmqList = ()=> {
    getRmqClustListByPage().then(data=>{
      setPageInfo(data.pageInfo)
      setTableList(data.rmqClusters)
      setloading(false)
    })
  }

	/**
	 * 删除一个未创建的RMQ类型
	 */
	const delRmqType = () => {
		if (addFlag) {
			addFlag = false;
			setTableList(tableList => tableList.slice(0, -1)); // 对数组的操作一定要返回新的值
		}
	};

	/**
	 *  添加RMQ类型
	 */
	const addRmqType = () => {
		if (!addFlag) {
			addFlag = true;
			setTableList(setTableList => [
				...setTableList,
				deepCloneObject(rmqDataPrototype)
			]);
		}
	};


	/**
	 * 获取newItemName
	 */
	const getNameWhenBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewItemName(event.currentTarget.value);
	};

	/**
	 * 获取newItemType
	 */
	const getTypeWhenChange = value => {
		setNewItemType(value);
	};

	/**
	 * 前往二级列表页
	 */
	const gotoNameServerList = (id, type) => {
		addFlag = false;
		type = type.toLowerCase();
		props.history.push(`/middleware/rocketmq/${type}/${id}`);
	};

  const gotToRocketMQInstancesDetail = (id) => {
    addFlag = false;
		props.history.push(`/middleware/rocketmq/instances/${id}`);
  }


  const gotToRocketMQDetail = (id) => {
		props.history.push(`/middleware/rocketmq/detail/${id}`);
  }
  
	/**
	 * table列表的展示表头
	 */
	const columns = [
		{
			title: "ID",
      key: "id",
      dataIndex: 'id',
			render: text => text || ""
		},
		{
			title: "名称",
			dataIndex: "businessName",
			key: "businessName",
			width: 150,
			render: (name, record) =>
				name ? (
					<YhOp
            color = {'#0070cc'}
						onClick={() => {
              gotToRocketMQDetail(record.id)
						}}
					>
						{name}
					</YhOp>
				) : (
					<Input
						placeholder="请输入集群名称"
						onBlur={getNameWhenBlur}
					/>
				)
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (status) => <StatusControl text={status} />
    },
    {
      title: "描述",
      key: 'summary',
      dataIndex: 'summary'
    },
    { 
      title: "实例个数",
      key: "instance",
      dataIndex: 'instance',
      render: (instance, record) => {
        return (
          <YhOp
          color = {'#0070cc'}
          onClick={() => {
            gotToRocketMQInstancesDetail(record.id);
          }}
        >
          NameServer:{record.nameServerNum}  Broker:{record.brokerNum}
        </YhOp>
        )
      }
    },
    {
      title: "拓扑",
      key: "topo",
      render: (item, record) => (
				<YhOp
				>
					<Tooltip placement="top" title={"集群拓扑"}>
						<Button
							type="link"
							icon="apartment"
							onClick={() =>{ showTopoModal(record.id) }}
						/>
					</Tooltip>
				</YhOp>
      )
    },
    {
      title: "日志",
      key: 'log',
      render: (item, record) => {
        return (
          <YhOp type="info">
					  <Tooltip placement="top" title={"日志"}>
					    <Button type="link" icon="code" onClick={() => {
                showLogModal(record.taskId)
              }} />
            </Tooltip>
				  </YhOp>
        )
      }
    },
    {
      title: "租户",
      key: "tenantName",
      dataIndex: 'tenantName'
    },
		{
			title: "创建时间",
			key: "createTime",
			dataIndex: "createTime",
      render: time => (time ? FormatTime(time) : "---")
      
    },
    {
      title: "更新时间",
      key:"updateTime",
      dataIndex: 'updateTime',
      render: time => (time ? FormatTime(time): "---")
    },
		{
			title: "操作",
			key: "action",
			width: "10%",
			render: text => {
				return <OperationControl {...props} text={text} menu={menu} />;
			}
		}
  ];


  
  // 部署rmq集群
  const runRmqTask = async (taksId) => {
    runRmqClusterTask(taksId).then(data => {
      message.success('部署成功')
    }).catch(err=>{
      message.success('部署失败')
    })
  }

  // 删除rmq集群
  const deleteRmqTask = async (taskId) => {
    deleteCluster(taskId).then(data=> {
      message.success('删除集群成功')
      getRmqList()
    }).catch(err => {
      message.warning('删除集群失败')
    })
  }

  // 释放资源
  const releaseRmqTask = async (taskId) => {
    releaseCluster(taskId).then(data => {
      message.success('释放资源成功')
    }).catch(err => {
      message.warning('释放资源失败')
    })
  }

  
	const menu = item => {
		return (
			<Menu>
				<Menu.Item key="1">
					<a onClick={() => {
            checkStatusBeforeOperate('deploy', item.status)(
              item.taskId,
              item.name,
              runRmqTask
            )

          }}>部署</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() => {
							showFormModal(item.taskId);
						}}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<Popconfirm
						placement="topRight"
						title={`确定卸载集群?`}
						onConfirm={() => {
              checkStatusBeforeOperate('release', item.status)(
                item.taskId,
                item.name,
                releaseRmqTask
              )
            }}
						okText="是"
						cancelText="否"
					>
						<a>卸载</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="4">
					<Popconfirm
						placement="topRight"
						title={`确定删除集群?`}
						onConfirm={() => {
              checkStatusBeforeOperate("delete", item.status)(
								item.id,
								item.name,
								deleteRmqTask
							)
            }}
						okText="是"
						cancelText="否"
					>
						<a>删除</a>
					</Popconfirm>
				</Menu.Item>
			</Menu>
		);
	};




  useEffect(()=> {
    if (!tableModalVisibility.visible && com) {
      setTimeout(()=>{
        // 隐藏组件之后销毁组件
        setCom("");
      }, 0)
    }
  }, [tableModalVisibility.visible]) // 监听store里面的visible元素


  // 集群信息新增编辑弹框
  const showFormModal = async (id) => {
    // 新增
    if (!id) {
      import("./modal/Cluster.modal").then((component:any) => {
        setCom(
          <component.default  tenantList={tenantList} getRmqList={getRmqList} />
        )
      }).catch(e => message.error(e.message))
      return 
    }

    // 编辑
    getRmqCluster(id).then(data => {
      import("./modal/Cluster.modal").then((component:any) => {
        setCom(
          <component.default  id={id} clusterData={data} tenantList={tenantList} getRmqList={getRmqList} />
        )
      }).catch(e => message.error(e.message))
    })
  }


  // 拓扑图弹框
  const showTopoModal = async (id) => {
    getTopoData(id).then(data => {
      if (data) {
        import("./modal/Topo.modal").then((component:any) => {
          setCom(
            <component.default data={data} history = {props.history} />
          )
        }).catch(e => message.error(e.message))
      } else {

      }
    })
  }


  const showLogModal =  (taskId) =>{
    getDeployTaskOutput(taskId).then((data) => {
      if (data && data.length >= 1) {
        import ("./modal/Log.modal").then((component)=> {
          setCom(<component.default logInfo={data} />)
        })
      } else {
        message.warning('暂无日志')
      }
    })

  }

  const changeList = (pagination, y, z)=>{
    let { current, pageSize } = pagination
    // 获取列表
    const getRmqList = ()=> {
      getRmqClustListByPage(current, pageSize).then(data=>{
        setPageInfo(data.pageInfo)
        setTableList(data.rmqClusters)
        setloading(false)
      })
    }
  }

	return (
		<>
			<YhAdd
				type="primary"
				// icon="plus"
				onClick={() => {showFormModal(null) }}
				style={{ marginBottom: 10 }}
			>
        添加
      </YhAdd>
			{loading ? (
				<Loading />
			) : (
        <Table
          onChange= { changeList }
          pagination={
            {
              defaultCurrent: 1,
              defaultPageSize: 10,
              total: pageInfo.totalCount
            }
          }
          columns={columns} dataSource={tableList} rowKey="id" />
      )}
      
      {
        com
      }
		</>
	);
}

export default connect(
  (state: any) => ({
		tableModalVisibility: state.tableModalVisibility,
		drawerVisibility: state.drawerVisibility
	}),
  dispatch => ({
		setTableModalVisibility: bindActionCreators(
			setTableModalVisibility,
			dispatch
		)
	})
)(RocketMqHome);
