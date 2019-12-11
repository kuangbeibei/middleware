export interface IData {
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
	[index: number]: IData[];
}

const nodeMonitorBaseUrl =
	"http://10.210.0.144:3000/d-solo/E-qths1Zk/redis-dashboard-for-prometheus-redis-exporter-1-x?orgId=1";

const nodePanels = [
    [ // 按照行数来放置
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
    return generatePanelItem(panel, nodeMonitorBaseUrl)
});


const machineMonitorBaseUrl = "http://10.210.0.144:3000/d-solo/uE7cwEkZz/node-metrics?orgId=1";

const machinePanels = [
    [
        {
            id: 15,
            col: 3,
        },
        {
            id: 14,
            col: 3,
        },
        {
            id: 75,
            col: 3,
        },
        {
            id: 167,
            col: 3,
        },
        {
            id: 20,
            col: 3,
        },
        {
            id: 172,
            col: 3,
        },
        {
            id: 16,
            col: 3,
        },
        {
            id: 166,
            col: 3,
        },
        {
            id: 154,
            col: 3,
        }
    ],
    [
        {
            id: 13,
            col: 10,
        },
        {
            id: 171,
            col: 6,
        },
        {
            id: 164,
            col: 8,
        }
    ],
    [
        {
            id: 7,
            col: 16,
        },
        {
            id: 156,
            col: 8,
        }
    ],
    [
        {
            id: 161,
            col: 8,
        },
        {
            id: 168,
            col: 8,
        },
        {
            id: 160,
            col: 8,
        }
    ],
    [
        {
            id: 157,
            col: 12,
        },
        {
            id: 158,
            col: 12,
        }
    ]
];

let machineMonitorArrayData = machinePanels.map(panel => {
    return generatePanelItem(panel, machineMonitorBaseUrl)
})

export function generatePanelItem(panel, url) {
    return panel.map(p => {
        let nodeData:IData = {
            panelId: p.id,
            begin: "",
            end: "",
            clusterName: "",
            clusterId: "",
            instanceName: "",
            instanceId: "",
            col: p.col,
            url,
        };
        return nodeData
    })
}

export { nodeMonitorArrayData, machineMonitorArrayData };
