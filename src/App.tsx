import * as React from "react";
import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from "react-router-dom";

import PageIndex from "@pages/Index";
import Nomatch from "@pages/No-match";
import { postApi } from "@api";

declare var NODE_ENV: string;
const App: React.SFC = props => {

  useEffect(()=> {
    // 在本地开发，模拟一次登录操作
    if (NODE_ENV == 'DEV') {
      let loginInfo = "yh_username=css&yh_password=123456"
      let headers = { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", }
      postApi('/api/user/login')('', loginInfo, {headers} ).then((res) => {
        if (res.code == 'S200') { console.log('login success') }
      })
      return 
    }
  }, [])

	return (
		<Router>
			<Switch>
				
				<Route exact path="/middleware" render={() => <Redirect to="/middleware/mysql" push />} />
				
				{/* Page */}
				<PageIndex {...props} />

				{/* Login */}

				{/* 页面路由级别404 nomatch */}
				<Redirect to="/" />
			</Switch>
		</Router>
	);
};

export default App;
