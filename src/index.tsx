import * as React from 'react'
import * as ReactDom from 'react-dom'
import {
    BrowserRouter as Router,
} from "react-router-dom"

import "./assets/style/reset.less"


import renderAll from "@router/index"

ReactDom.render(
	<Router>
        {renderAll}
    </Router>
, document.getElementById('root'))