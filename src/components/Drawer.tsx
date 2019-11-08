import * as React from "react";
import { Descriptions, Drawer } from "antd";

export default function (props) {
    const {
        configVisibility,
        showConfigDetailInfo,
        closeDrawer
    } = props;
	return (
		<Drawer
			title="配置信息"
			placement="right"
			width="700px"
			closable={false}
			onClose={closeDrawer}
			visible={configVisibility}
		>
			<Descriptions bordered column={1}>
				{showConfigDetailInfo()}
			</Descriptions>
		</Drawer>
	);
}
