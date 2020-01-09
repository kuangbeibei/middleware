import * as React from 'react';
import { YhOp, YhAdd, YhId } from "@styled/Button";
import { useState, useEffect, useCallback } from "react";
import TableTitle from "../../Components/TableTitle";
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
import StatusControl from "@com/Status.control";
import { getTopoData as getInstanceList } from '../../Home/service'
import { FormatTime, deepCloneObject } from "@tools";
import Loading from "@com/UI/Loading";
import '../style.less'

function ClusterDetail(props){

  let { tableModalVisibility, setTableModalVisibility, brokerList, tenantList, clusterId, getInstancesList } = props
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
    // console.log('====???>', brokerList.length)
    if (brokerList.length != 0) {
      setLoading(false)
    } else {
      if (loading === true) return
      // 模拟一个动态的加载，当传入的数据仍然是一个空数组
      setTimeout(()=>{
        console.log('---->>>>90909090909090', loading)
        setLoading(loading => !loading)
      }, 500)
    }
    // setTimeout(()=>{
    //   if (loading === false) return
    //   setLoading(loading => !loading)
    // }, 500)

  }, [brokerList])

  const addBroker = ()=> {
    import('../modal/Broker.modal').then((component: any) => {
      console.log('加载Broker的modal框完成');
      console.log(tenantList, 'abcd')
      if (!com) {
        setCom(<component.default getInstancesList = {getInstancesList} clusterId = { clusterId } tenantList = { tenantList }/>)
      }
    })
  }




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
      render: (val, record, index)=>{
        let add = (index % 2 == 0) ? '主': '备'
        return `${val}(${add})`
      }
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
    // {
    //   title: "Broker Id",
    //   key: 'bId',
    //   dataIndex: 'bId'
    // },
    {
      title: "Broker Name",
      key: 'brokerName',
      dataIndex: 'brokerName'
    },
    {
      title: "Broker 角色",
      key: 'brokerRole',
      dataIndex: 'brokerRole'
    },
    // {
		// 	title: "状态",
		// 	key: "status",
		// 	dataIndex: "status",      
    // },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (status) => <StatusControl text={status} />
      // render: ()=> 'abc'

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
                // TODO 显示broker的日志
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
      // render: (val) => FormatTime(val)
      render: (val) => val ? FormatTime(val): '--'
    },
    {
			title: "操作",
			key: "action",
      width: "8%",
			// render: text => {
			// 	return <OperationControl {...props} text={text} menu={brokerMenu} />;
      // }
      render: (val, row, index) => {
        const obj = {
          children:  <OperationControl {...props} text={val} menu={brokerMenu} />,
          props: {} as any,
        }
        if (index % 2 ===0) {
          obj.props.rowSpan = 2
          obj.props.className = 'broker-merge-cell'
          if (index === brokerList.length - 2) {
            obj.props.className= 'broker-merge-cell without-border'
          }
        }
        else {
          obj.props.rowSpan = 0
        }
        return obj
      }
		}    
  ]

  return (
    <>


      <TableTitle title={'Broker列表'}>
        <YhAdd type="primary" onClick={addBroker}> 添加Broker </YhAdd>
      </TableTitle>
      {loading}
      { loading ? 
        <Loading /> 
        : 
        (<Table 
          pagination={
            {
              defaultCurrent: 1,
              defaultPageSize: 6
            }
          }
          
          className="broker-table"  columns={brokerColumns}  dataSource={brokerList} rowKey="id" />) 
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