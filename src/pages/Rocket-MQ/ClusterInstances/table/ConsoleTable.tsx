import * as React from 'react';
import { YhOp, YhAdd, YhId } from "@styled/Button";
import { useState, useEffect, useCallback } from "react";
import TableTitle from "../../Components/TableTitle";
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
  Divider,
  Menu,
  Dropdown
} from "antd";
import StatusControl from "@com/Status.control";
import { getTopoData as getInstanceList } from '../../Home/service'
import { FormatTime, deepCloneObject } from "@tools";
import Loading from "@com/UI/Loading";
import Password from '@com/Password-unit'

import '../style.less'

function ClusterDetail(props){

  let { tableModalVisibility, setTableModalVisibility, consoleList } = props
  let [ loading, setLoading ] = useState(true)

  let [com, setCom] = useState();






      
  // 监听modal属性的变化
  useEffect(()=>{
    if (!tableModalVisibility.visible && com) {
      setTimeout(() => {
        setCom('')
      }, 0);
    }
  }, [tableModalVisibility.visible])


  useEffect(()=>{
    if (consoleList.length != 0) {
      setLoading(false)
    } else {
      // 模拟一个动态的加载，当传入的数据仍然是一个空数组
      setTimeout(()=>{
        if (loading === true) return
        console.log('---->>>>90909090909090', loading)
        setLoading(loading => !loading)
      }, 500)
    }
  }, [consoleList])

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
      title: "用户名",
      key: 'user',
      dataIndex: 'user'
    },
    {
      title: "密码",
      key: 'pass',
      dataIndex: 'pass',
      render: (val) => {
        return <Password pass={val} />
      }
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (status) => <StatusControl text={status} />
    },
    {
      title: "日志",
      key: 'log',
      render: (item, record) => {
        return (
          <YhOp type="info">
					  <Tooltip placement="top" title={"日志"}>
					    <Button type="link" icon="code" onClick={() => {
                // showLogModal(record.taskId)
                // TODO 显示Console的日志
              }} />
            </Tooltip>
				  </YhOp>
        )
      }
    },
    {
      title: "创建时间",
      key: "createTime",
      dataIndex: 'createTime',
      render: (val) => val ? FormatTime(val): '--'
    },
    {
      title: "更新时间",
      key: "updateTime",
      dataIndex: 'updateTime',
      render: (val) => val ? FormatTime(val): '--'
    },
    {
			title: "操作",
			key: "action",
			width: "8%",
			render: text => {
        // return <OperationControl {...props} text={text} menu={consoleMenu} />;
        return '--'
			}
		} 
  ]

  const addConsole = ()=> {
    import('../modal/Console.modal').then(component => {
      console.log('加载Console的modal框完成');
      if (!com) {
        setCom(<component.default />)
      }
    })
  }

  return (
    <>
      <TableTitle title={'Console 列表'}>
        <YhAdd type="primary" onClick={addConsole}> 添加NameSerever </YhAdd>
      </TableTitle>
      { loading ? 
        <Loading /> 
        :  
        (<Table columns={consoleColumns} dataSource={consoleList} rowKey="id" />) 
      }
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