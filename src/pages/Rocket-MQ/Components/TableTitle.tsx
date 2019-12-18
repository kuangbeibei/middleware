import * as React from 'react';

function TableTitle(props) {
  return(
    <p style={{marginTop: 15, marginBottom: 25, fontSize: 14, ...props.style}}>
      {props.title}:
    </p>
  )
}

export default TableTitle; 