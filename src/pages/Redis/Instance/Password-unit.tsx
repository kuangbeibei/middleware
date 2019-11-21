/*
 * @Author: kuangdan
 * @Date: 2019-11-21 16:52:09
 * @Last Modified: 2019-11-21 16:52:09
 */

import * as React from "react";
import { useState, useEffect } from "react";

import { Icon, message } from "antd";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function(props) {
	const { pass } = props;

    const [isPublic, setisPublic] = useState(false);
    const [copied, setcopied] = useState(false)

	const toggleEye = () => {
		setisPublic(!isPublic);
    };
    
    const copyPass = () => {
        setcopied(true);
        message.success("密码复制成功!")
    }

	return (
        <p className="pass-column">
			{!isPublic ? (
				<>
					<span>*******</span>
					<Icon type="eye" theme="twoTone" onClick={toggleEye} />
				</>
			) : (
				<>
                    <span>{pass}</span>
                        
					<Icon
						type="eye-invisible"
						theme="twoTone"
						onClick={toggleEye}
					/>
					<CopyToClipboard text={pass}
                            onCopy={copyPass}>
                        <Icon type="copy" theme="twoTone" />
                    </CopyToClipboard>
				</>
			)}
		</p>
	);
}
