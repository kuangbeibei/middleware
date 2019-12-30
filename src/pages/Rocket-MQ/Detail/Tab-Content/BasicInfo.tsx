import * as React from 'react';
import { useEffect, useState } from 'react';
import { Descriptions } from "antd";
import PasswordColumn from "@com/Password-unit";



import { getClusterConfigInfo } from '../service'
function BasicInfo (props) {

  let { match: { params: { id: clusterId } } } = props
  let [clusterConfig, setClusterConfig] = useState([])


  const processPass = pass => {
		return <PasswordColumn pass={pass} />;
	};


  const processInstancesData = val => {
		return val.reduce(
			(prev, cur, idx) => {
        let curInfo = (
          <div key={cur.ip}>
            <span>{cur.ip}:{cur.port}    用户名: {cur.user} </span>   密码: <PasswordColumn pass={cur.pass} />
          </div>
        )
        prev.push(curInfo)
        return prev
      },
			[]
		);
	};

  useEffect(()=>{
    getClusterConfigInfo(clusterId).then(data => {
      console.log(data, 'data')
      setClusterConfig(data)
    })
  }, [clusterId])
  

  return (
    <Descriptions  column={1}  bordered>


      {

        clusterConfig.map((item:any) => {
          let val
          if (typeof item.value === 'string') {
						val = item.value.replace(/\n/g, "\n");
          }
          if (Array.isArray(item.value)) {
            val = processInstancesData(item.value)
          }

          return (
            <Descriptions.Item label={item.name} key={item.value}>

              {
                Array.isArray(item.value) ? <div className="instances-td" > {val} </div> : <pre> {val || '--'} </pre>

              }

            </Descriptions.Item>
          )

        })


      }




  </Descriptions>
  )
}

export default BasicInfo;