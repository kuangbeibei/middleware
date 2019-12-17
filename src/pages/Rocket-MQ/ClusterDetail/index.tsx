import * as React from 'react';
import { YhOp, YhAdd, YhId } from "@styled/Button";
import { useState, useEffect } from "react";
import TableTitle from "../Components/TableTitle";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setTableModalVisibility from "@actions/setModalVisibility";
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
  Divider
} from "antd";

function ClusterDetail(props){

  let { tableModalVisibility, setTableModalVisibility } = props

  let [com, setCom] = useState();
  let [nameServerList, setNameServerLsit] = useState(Array());
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

  }, []); // 加上[]只会执行一次，不然会造成死循环。


      
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

  const getRealTimeLog = ()=> {
    console.log('显示实时日志---->>>')
  }

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
            <YhOp onClick={getRealTimeLog} color={'#0070cc'}>
              实时
            </YhOp><YhOp color={'#0070cc'}>
              全部
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
      key: "operation",
      render: ()=>{
        return (
          <div>
            <YhOp color={'#0070cc'}>
              执行部署
            </YhOp>
            <YhOp color={'#0070cc'}>
              释放资源
            </YhOp>
            <YhOp color={'#0070cc'}>
              删除
            </YhOp>
          </div>
        )
      }
    }
  ]

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
            <YhOp onClick={getRealTimeLog} color={'#0070cc'}>
              实时
            </YhOp><YhOp color={'#0070cc'}>
              全部
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
      key: "operation",
      render: ()=>{
        return (
          <div>
            <YhOp color={'#0070cc'}>
              执行部署
            </YhOp>
            <YhOp color={'#0070cc'}>
              释放资源
            </YhOp>
            <YhOp color={'#0070cc'}>
              删除
            </YhOp>
          </div>
        )
      }
    }    
  ]

  return (
    <>

      <YhAdd
				type="primary"
				// icon="plus"
				onClick={addNameServer}
				style={{ marginBottom: 5, marginRight: 20, marginTop: 10}}
			>
        添加NameServer
      </YhAdd>

      <YhAdd
				type="primary"
				// icon="plus"
				onClick={addBroker}
				style={{ marginBottom: 5 }}
			>
        添加Broker
      </YhAdd>
      <Divider />
      <TableTitle title={'NameServer列表'}/>
      <Table columns={nameServerColumns} dataSource={nameServerList} rowKey="id" />
      
      <TableTitle title={'Broker列表'} style= {{marginTop: 30}} />
      <Table columns={brokerColumns} dataSource={brokerList} rowKey="id" />

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