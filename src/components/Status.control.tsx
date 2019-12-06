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
} from "@utils/tools"
    
export default function (props) {
    const {
        text
    } = props;

    const showWithStatus = status => {
        switch (status) {
            case 'done':
                return <YhText type="success">{status}</YhText>
            case 'failed':
                return <YhText type="fail">{status}</YhText>;
            case 'ready':
                return <YhText type="ready">{status}</YhText>;
            case 'release':
                return <YhText type="info">{status}</YhText>;
            default:
                return <Icon type="loading" />
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