/*
 * @Author: kuangdan 
 * @Date: 2019-12-06 13:57:56 
 * @Last Modified: 2019-12-06 13:57:56 
 */ 

import * as React from "react";
import {
    useState,
    useEffect
} from "react";

import { YhText } from "@styled/Text"
import {
    Icon
} from "antd"

import {
    transEnStatusToChinese
} from "@funcs/Trans.enStatusToChinese";
    
export default function (props) {
    const {
        text
    } = props;

    const showWithStatus = status => {
        const _status = transEnStatusToChinese(status);
        switch (status) {
            case 'done':
                return <YhText type="success">{_status}</YhText>
            case 'failed':
                return <YhText type="fail">{_status}</YhText>;
            case 'ready':
                return <YhText type="ready">{_status}</YhText>;
            case 'release':
                return <YhText type="info">{_status}</YhText>;
            default:
                return <>
                    <Icon type="loading" />
                    <YhText type="info">{_status}</YhText>
                </>
        }
    }

    return (
        <>
            {
                showWithStatus(text)
            }
        </>
    )
}