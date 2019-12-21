import * as React from 'react';
import { YHSmallFormItem, YHFlexDiv } from "@styled/Form";

function TableTitle(props) {
  return(
    <YHFlexDiv style={{alignItems: 'baseline', marginTop: 30, marginBottom: 15}}>
      {props.title}:

      {
        props.children ? 
        (
            <div style={{float: 'right'}}>
              {props.children}
            </div>
        ) : null
      }

    </YHFlexDiv>
  )
}

export default TableTitle; 