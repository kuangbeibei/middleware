/*
 * @Author: kuangdan 
 * @Date: 2019-12-06 14:35:24 
 * @Last Modified: 2019-12-06 14:35:24 
 */ 

import * as React from "react";
import {
    useState,
    useEffect
} from "react";

import {
    Button,
    Dropdown,
    Icon
} from "antd"

export default function (props) {
    const {
        text,
        menu
    } = props;

    const [btnLoading, setbtnLoading] = useState(false);

    useEffect(() => {
        const {
            status
        } = text;
        if (status === 'running') {
            setbtnLoading(true);
        } else {
            setbtnLoading(false);
        }
    }, [text.status])

    return (
        <Dropdown
            overlay={() => menu(text)}
            trigger={["click"]}
        >
            <Button
                shape="circle"
                // type="default"
                size="small"
                loading = {btnLoading}
            >
                <a className="ant-dropdown-link">
                    <Icon type="more" />
                </a>
            </Button>
        </Dropdown>
    )
}