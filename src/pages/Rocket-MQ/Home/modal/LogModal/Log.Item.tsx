import * as React from 'react';
import { useState, useEffect } from 'react';
import {Icon} from 'antd'

// const LogItem = ({children, ...props})=>{
const LogItem = (props)=>{

  let {isUnFold} = props
  // 默认不展开
  let [unFold, setUnfold] = useState(false)

  useEffect(()=>{
    console.log(isUnFold, 'ddd')
    setUnfold(isUnFold)
  }, [isUnFold])

  return(
    <>

        <div className="log-header"
        onClick= {()=> { setUnfold(pre => !pre)  }}
        style={{
          backgroundColor: '#2b2b2b',
          cursor: 'pointer',
          paddingTop: 5,
          paddingBottom: 4,
          paddingLeft: 4
        }}
        >
          <span style={{marginRight: 20}}>
            { unFold ?  <Icon type="caret-down" />:    <Icon type="caret-right" />  }
          </span>
          
          2020-09-10 10:20:22

        </div>
        <div style={{
            padding: 0,
            display: unFold? 'block': 'none'

        }}>

          {props.children}


        </div>

    </>
  )
}

export default LogItem;