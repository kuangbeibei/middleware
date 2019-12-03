/*
 * @Author: kuangdan
 * @Date: 2019-11-27 16:23:45
 * @Last Modified: 2019-11-27 16:23:45
 */

import * as React from "react";
import Iframe from "react-iframe";

export default function (props) {
	const {
		basicData,
		history: {
			location: {
				state: {
					query: {
						id
					}
				}
			}
		}
	} = props;
	
	let nameData = basicData.find(d => d.enName === 'name');

	return (
		<Iframe
			url={`http://10.210.0.144:3000/d-solo/QmihNwJZz/redisji-qun-tong-ji-xin-xi?orgId=1&from=1574394266859&to=1574415866859&var-cluster=fzzj_redis_${nameData.value}_${id}&theme=light&panelId=7`}
			width="450"
			height="200"
		/>
	);
}
