import * as React from 'react';
import { YhOp, YhAdd, YhId } from "@styled/Button";
import { useState, useEffect, useCallback } from "react";
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
import { getClusterConfigInfo as getInstanceList } from '../Detail/service'
import BrokerTable from './table/BrokerTable'
import NameServerTable from './table/NameServerTable';
import ConsoleTable from './table/ConsoleTable';
import useTenants from "@hooks/use-tenants";
import './style.less'


// const RmqInstancesDispatch = React.createContext(null)

// const rmqInstancessReducer = (state, action) => {
//   switch(action.typee) {
//     case 'Get_Instances'


//   }

// }

function ClusterDetail(props){

  let { tableModalVisibility, setTableModalVisibility, match: { params: { id: clusterId } } } = props

  let [com, setCom] = useState();
  let [nameServerList, setNameServerList] = useState(Array());
  let [consoleList, setConsoleList] = useState(Array());
  let [brokerList, setBrokerList] = useState(Array());

  let tenantList = useTenants()


  // const [  ]


  const getInstancesList = useCallback(async ()=>{
    try {
      let res = await getInstanceList(clusterId)
      let nameServers = res.filter(item =>item.enName == 'nameServers')
      let brokers = res.filter(item =>item.enName == 'brokers')
      let consoles = res.filter(item =>item.enName == 'consoles')

      console.log(brokers)
      setBrokerList(brokers[0].value)
      // setBrokerList([])
      setNameServerList(nameServers[0].value)
      setConsoleList(consoles[0].value || [])
      // setNameServerList()
    }catch (error) {
      console.error(error)
    }
  }, [clusterId])



  useEffect(()=>{
    getInstancesList()
  }, [clusterId]); // 加上[]只会执行一次，不然会造成死循环。


      
  // 监听modal属性的变化
  useEffect(()=>{
    if (!tableModalVisibility.visible && com) {
      setTimeout(() => {
        setCom('')
      }, 0);
    }
  }, [tableModalVisibility.visible])




  

  return (
    <>

      <Divider />


      <BrokerTable getInstancesList={getInstancesList} clusterId ={clusterId} tenantList={ tenantList } brokerList={ brokerList } />

      <NameServerTable clusterId = {clusterId} tenantList= { tenantList } nameServerList={ nameServerList } />
  
      <ConsoleTable clusterId= {clusterId} tenantList={ tenantList }  consoleList={ consoleList }/>

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