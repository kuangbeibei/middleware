export interface INodeData {
	panelId: number;
	begin: string | number;
	end: string | number;
	clusterName: string;
	clusterId: string | number;
	instanceName: string;
	instanceId: string | number;
	url: string;
	col: number;
}

export interface INodeMonitorData {
	[index: number]: INodeData[];
}

export const nodeMonitorBaseUrl =
	"http://10.210.0.144:3000/d-solo/E-qths1Zk/redis-dashboard-for-prometheus-redis-exporter-1-x?orgId=1";

const nodePanels = [
    [
        {
            id: 9,
            col: 3,
        },
        {
            id: 12,
            col: 3,
        },
        {
            id: 11,
            col: 4,
        },
        {
            id: 2,
            col: 7,
        },
        {
            id: 1,
            col: 7,
        },
    ],
    [
        {
            id: 7,
            col: 12,
        },
        {
            id: 10,
            col: 12,
        },
    ],
    [
        {
            id: 5,
            col: 12,
        },
        {
            id: 13,
            col: 12,
        },
    ],
    [
        {
            id: 8,
            col: 12,
        },
        {
            id: 14,
            col: 12,
        }
    ]
];

let nodeMonitorArrayData = nodePanels.map(panel => {
    return panel.map(p => {
        let nodeData:INodeData = {
            panelId: p.id,
            begin: "",
            end: "",
            clusterName: "",
            clusterId: "",
            instanceName: "",
            instanceId: "",
            col: p.col,
            url: nodeMonitorBaseUrl,
        };
        return nodeData
    })
});

export { nodeMonitorArrayData };
