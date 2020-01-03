import * as React from 'react';
import { useState, useEffect } from 'react';
import {Icon} from 'antd'
import './log.group.less'


const LogGroup = (props)=>{

  let {isUnFold, title} = props
  // 默认不展开
  let [unFold, setUnfold] = useState(false)

  useEffect(()=>{
    setUnfold(isUnFold)
  }, [isUnFold])

  return(
    <>
      <div className="log-header" onClick={() => { setUnfold(pre => !pre) }}>
        <span className="fold-status-icon">
          {unFold ? <Icon type="caret-down" /> : <Icon type="caret-right" />}
        </span>
        <span>{title}</span>
      </div>

      <div className="log-content-wrapper" style={{ display: unFold ? 'block' : 'none'}}>
        {props.children}
      </div>
    </>
  )
}

export default LogGroup;