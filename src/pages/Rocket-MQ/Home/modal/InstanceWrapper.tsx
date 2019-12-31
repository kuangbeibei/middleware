import * as React from 'react';


function InstanceWrapper(props) {

  let { title } = props
  return (
    <div className = "intance-warpper">
      <div className="instance-title">
        <label>{title} </label>
      </div>
      <div className="instance-form-wrapper">
        <div className="header">
          <span>IP地址</span>
          <span>端口</span>
          <span>用户名</span>
          <span>密码</span>
        </div>
        <div className="instance-form-content">
          {props.children}
        </div>
      </div>
    </div>


  )
}

export default InstanceWrapper