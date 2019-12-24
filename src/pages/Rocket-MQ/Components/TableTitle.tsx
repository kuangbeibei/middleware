import * as React from 'react';
import { YHSmallFormItem, YHFlexSpaceBetwenDiv } from "@styled/Form";

function TableTitle(props) {
  return(
    <YHFlexSpaceBetwenDiv style={{alignItems: 'baseline', marginTop: 30, marginBottom: 15}}>
      {props.title}:

      {
        props.children ? 
        (
            <div style={{float: 'right'}}>
              {props.children}
            </div>
        ) : null
      }

    </YHFlexSpaceBetwenDiv>
  )
}

export default TableTitle; 