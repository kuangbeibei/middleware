import * as React from 'react';
import { YhOp, YhAdd, YhId } from "@styled/Button";
import { useState, useEffect } from "react";
import TableTitle from "../Components/TableTitle";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
import OperationControl from "@com/Operation.control";
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
  Divider,
  Menu,
  Dropdown
} from "antd";

function ClusterDetail(props){

  let { tableModalVisibility, setTableModalVisibility } = props

  let [com, setCom] = useState();
  let [nameServerList, setNameServerLsit] = useState(Array());
  let [consoleList, setConsoleList] = useState(Array());
  let [brokerList, setBrokerList] = useState(Array());

  useEffect(()=>{
    // fake data
    console.log('设置假数据');
    setNameServerLsit([
      {
        id: '001',
        ip: '192.168.3.93',
        port: '9903',
        detail: '详情信息',
        status: 'done',
        log: '',
        createTime: '2019-12-03 12:34:32',
        updateTime: '2019-12-04 09:09:32'
      },
      {
        id: '002',
        ip: '192.168.5.93',
        port: '8803',
        detail: 'detail info',
        status: 'pending',
        log: '',
        createTime: '2019-12-03 12:34:32',
        updateTime: '2019-12-04 09:09:32'
      }      

    ])

    // fake Data
    setBrokerList([
      {
        id: '002',
        ip: '192.167.9.4',
        port: '998',
        bId: 'broke001',
        bName: 'broker op',
        role: 'manger',
        status: 'pending',
        createTime: '2019-12-02 09:02:04',
        updateTime: '2019-12-05 08:08:32'
      },
      {
        id: '003',
        ip: '192.167.23.4',
        port: '9909',
        bId: 'broke002',
        bName: 'broker op',
        role: 'manger',
        status: 'pending',
        createTime: '2019-12-02 09:02:04',
        updateTime: '2019-12-05 08:08:32'
      },
    ])


    formatFakeConsoleList()
  }, []); // 加上[]只会执行一次，不然会造成死循环。

  function formatFakeConsoleList(){
    setConsoleList([
      {
        id: '1',
        ip: '192.167.9.09',
        port: '8800',
        status: '准备部署',
        createTime: '2019-12-02 09:02:04',
        updateTime: '2019-12-05 08:08:32',
        domain: 'http://xxx.xxx.xx.xx'
      },
      {
        id: '2',
        ip: '192.167.9.08',
        port: '8900',
        status: '准备部署',
        createTime: '2019-12-02 09:02:04',
        updateTime: '2019-12-05 08:08:32',
        domain: 'http://xxx.xxx.xx.xx'
      },
    ])
  }
      
  // 监听modal属性的变化
  useEffect(()=>{
    if (!tableModalVisibility.visible && com) {
      setTimeout(() => {
        setCom('')
      }, 0);
    }
  }, [tableModalVisibility.visible])

  const addNameServer = ()=>{
    import('./modal/NameServer.modal').then(component => {
      console.log('加载NameServer的modal框完成');
      if (!com) {
        setCom(<component.default />)
      }
    })
  }

  const addBroker = ()=> {
    import('./modal/Broker.modal').then(component => {
      console.log('加载Broker的modal框完成');
      if (!com) {
        setCom(<component.default />)
      }
    })
  }

  const addConsole = ()=> {
    import('./modal/Console.modal').then(component => {
      console.log('加载Console的modal框完成');
      if (!com) {
        setCom(<component.default />)
      }
    })
  }

  const getRealTimeLog = ()=> {
    console.log('显示实时日志---->>>')
  }


  const nameServerMenu = text => {
		return (
			<Menu>
				<Menu.Item key="1">
					<a onClick={() => {}}>部署</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() => {
							// showFormModal(text.id);
						}}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<Popconfirm
						placement="topRight"
						title={`确定卸载集群${text.name}?`}
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
						<a>卸载</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="4">
					<Popconfirm
						placement="topRight"
						title={`确定删除集群${text.name}?`}
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
						<a>删除</a>
					</Popconfirm>
				</Menu.Item>
			</Menu>
		);
	};


  const nameServerColumns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: "IP",
      key: 'ip',
      dataIndex: 'ip'
    },
    {
      title: "监听端口",
      key: 'port',
      dataIndex: 'port'
    },
    {
      title: "详情",
      key: 'detail',
      dataIndex: 'detail'
    },
    {
      title: "状态",
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: "部署日志",
      // key: 'summary',
      // dataIndex: 'summary'
      render: ()=> (
        <div>
            {/* <YhOp onClick={getRealTimeLog} color={'#0070cc'}>
              实时
            </YhOp> */}
            <YhOp color={'#0070cc'}>
              实时
            </YhOp>
        </div>
      )
    },
    {
			title: "创建时间",
			key: "createTime",
			dataIndex: "createTime",
      // render: text => (text ? FormatTime(text) : "")
      
    },
    {
      title: "更新时间",
      key:"updateTime",
      dataIndex: 'updateTime'
      // render: time => (time ? FormatTime(time): "")
    },
    {
			title: "操作",
			key: "action",
			width: "8%",
			render: text => {
				return <OperationControl {...props} text={text} menu={nameServerMenu} />;
			}
		}
  ]


  const consoleMenu = text => {
		return (
			<Menu>
				<Menu.Item key="1">
					<a onClick={() => {}}>部署</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() => {
							// showFormModal(text.id);
						}}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<Popconfirm
						placement="topRight"
						title={`确定卸载集群${text.name}?`}
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
						<a>卸载</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="4">
					<Popconfirm
						placement="topRight"
						title={`确定删除集群${text.name}?`}
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
						<a>删除</a>
					</Popconfirm>
				</Menu.Item>
			</Menu>
		);
	};

  const consoleColumns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: "IP",
      key: 'ip',
      dataIndex: 'ip'
    },
    {
      title: "监听端口",
      key: 'port',
      dataIndex: 'port'
    },
    {
			title: "状态",
			key: "status",
			dataIndex: "status",      
    },
    {
      title: "部署日志",
      key:"log",
      dataIndex: 'log',
      render: ()=> (
        <div>
            <YhOp onClick={getRealTimeLog} color={'#0070cc'}>
              实时
            </YhOp>
            {/* <YhOp color={'#0070cc'}>
              全部
            </YhOp> */}
        </div>
      )
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: 'createTime'
    },
    {
      title: "更新时间",
      key: "updateTime",
      dataIndex: 'updateTime'
    },
    {
      title: "访问",
      key: "domain",
      dataIndex: "domain"
    },
    {
			title: "操作",
			key: "action",
			width: "8%",
			render: text => {
				return <OperationControl {...props} text={text} menu={consoleMenu} />;
			}
		} 
  ]


  const brokerMenu = text => {
		return (
			<Menu>
				<Menu.Item key="1">
					<a onClick={() => {}}>部署</a>
				</Menu.Item>
				<Menu.Item key="2">
					<a
						onClick={() => {
							// showFormModal(text.id);
						}}
					>
						编辑
					</a>
				</Menu.Item>
				<Menu.Item key="3">
					<Popconfirm
						placement="topRight"
						title={`确定卸载集群${text.name}?`}
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
						<a>卸载</a>
					</Popconfirm>
				</Menu.Item>
				<Menu.Item key="4">
					<Popconfirm
						placement="topRight"
						title={`确定删除集群${text.name}?`}
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
						<a>删除</a>
					</Popconfirm>
				</Menu.Item>
			</Menu>
		);
	};

  const brokerColumns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: "IP",
      key: 'ip',
      dataIndex: 'ip'
    },
    {
      title: "监听端口",
      key: 'port',
      dataIndex: 'port'
    },
    {
      title: "Broker Id",
      key: 'bId',
      dataIndex: 'bId'
    },
    {
      title: "Broker Name",
      key: 'bName',
      dataIndex: 'bName'
    },
    {
      title: "Broker 角色",
      key: 'role',
      dataIndex: 'role'
    },
    {
			title: "状态",
			key: "status",
			dataIndex: "status",      
    },
    {
      title: "部署日志",
      key:"log",
      dataIndex: 'log',
      render: ()=> (
        <div>
            {/* <YhOp onClick={getRealTimeLog} color={'#0070cc'}>
              实时
            </YhOp> */}
            <YhOp color={'#0070cc'}>
              历史
            </YhOp>
        </div>
      )
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: 'createTime'
    },
    {
      title: "更新时间",
      key: "updateTime",
      dataIndex: 'updateTime'
    },
    {
			title: "操作",
			key: "action",
			width: "8%",
			render: text => {
				return <OperationControl {...props} text={text} menu={brokerMenu} />;
			}
		}    
  ]

  return (
    <>

      <Divider />

      <TableTitle title={'Broker列表'}>
        <YhAdd type="primary" onClick={addBroker}> 添加Broker </YhAdd>
      </TableTitle>
      <Table columns={brokerColumns} dataSource={brokerList} rowKey="id" />

      <TableTitle title={'NameServer列表'}>
        <YhAdd type="primary" onClick={addNameServer}> 添加NameSerever </YhAdd>
      </TableTitle>
      <Table columns={nameServerColumns} dataSource={nameServerList} rowKey="id" />
      
      <TableTitle title={'console列表'}>
        <YhAdd type="primary" onClick={addConsole}> 添加Console </YhAdd>
      </TableTitle>
      <Table columns={consoleColumns} dataSource={consoleList} rowKey="id" />




      

      {
        com
      }

    </>
  )

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
)(ClusterDetail);