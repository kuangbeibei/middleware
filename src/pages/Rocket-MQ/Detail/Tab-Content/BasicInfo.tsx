import * as React from 'react';
import { Component } from 'react';
import { Descriptions } from "antd";

function BasicInfo (props) {





  return (
    <Descriptions  column={1}  bordered>
      <Descriptions.Item label="名称">Cloud Database</Descriptions.Item>
      <Descriptions.Item label="版本">4.0.14</Descriptions.Item>
      <Descriptions.Item label="密码">*****</Descriptions.Item>
      <Descriptions.Item label="实例列表">
        10.254.192.3:6379 <br />
        10.254.192.4:6379 <br />
        10.254.192.8:6379 <br />
        10.254.192.13:6379 <br />
        10.254.192.14:6379 <br />
        10.254.192.15:6379 <br />
      </Descriptions.Item>


      <Descriptions.Item label="更多配置">
        cluster-node-timeout 6000
      </Descriptions.Item>
      <Descriptions.Item label="默认配置">
          
        bind 0.0.0.0 <br />
        cluster-enabled yes <br />
        cluster-config-file nodes.conf <br />
        cluster-node-timeout 5000 <br />
        appendonly yes <br />
        aof-use-rdb-preamble yes <br />
        daemonize yes <br />

      </Descriptions.Item>
  </Descriptions>
  )
}

export default BasicInfo;