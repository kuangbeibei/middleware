import * as React from 'react';


function InstanceWrapper(props) {

  // console.log(props, 'propsss----')
  return (
    <div className="instance-wrapper">
      <div className="header">
        <span>
            IP地址
        </span>
        <span>
            端口
        </span>
        <span>
            用户名
        </span>
        <span>
            密码
        </span>
      </div>

      {
        (
          props.children ? props.children : null
        )
      }
      
     </div> 
  )

  
}

export default InstanceWrapper