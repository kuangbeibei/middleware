export const tabs = [
	{
		name: "集群基本信息",
		key: "1"
	},
	{
		name: "监控",
		key: "2"
	},
	{
		name: "告警",
		key: "3"
	}
];

export const clusterPanels = [
	[
		{
			id: 7,
			col: 3
		},
		{
			id: 3,
			col: 3
		},
		{
			id: 4,
			col: 3
		},
		{
			id: 2,
			col: 3
		},
	],
	[
		{
			id: 8,
			col: 3
		},
		{
			id: 9,
			col: 3
		},
		{
			id: 6,
			col: 3
		}
	]
];

import { generatePanelItem } from "../Instance-Monitor/data";
const clusterMonitorBaseUrl = "http://10.210.0.144:3000/d-solo/QmihNwJZz/redisji-qun-tong-ji-xin-xi?orgId=1";

let clustersMonitorArrayData = clusterPanels.map(panel => {
	return generatePanelItem(
		panel,
		clusterMonitorBaseUrl
	);
});

export { clustersMonitorArrayData };
