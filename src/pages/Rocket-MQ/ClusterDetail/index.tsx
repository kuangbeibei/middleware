import * as React from 'react';
import { YhOp, YhAdd, YhId } from "@styled/Button";
import { useState, useEffect } from "react";
import TableTitle from "../Components/TableTitle";
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


  let [nameServerList, setNameServerLsit] = useState([]);
  let [brokerList, setBrokerList] = useState([]);

  const addNameServer = ()=>{

  }

  const addBroker = ()=> {

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
        <div>实时 | 全部</div>
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
            <span>执行部署</span> 
            <span>释放资源</span>
            <span>删除</span>
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
      render: () => {
        return '实时 | 全部'
      }
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
      render: () => {
        return (
            <div>
              <span>执行部署</span>
              <span>释放资源</span>
              <span>删除</span>
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


    </>
  )

}

export default ClusterDetail;