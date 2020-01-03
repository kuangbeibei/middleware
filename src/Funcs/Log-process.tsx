/*
 * 颜色处理output
 * @Date: 2020-01-03 15:26:03
 * @Last Modified: 2020-01-03 15:26:03
 */

import * as React from "react";

import { YhText } from "@styled/Text";

/**
 * @param output
 */
export const processLog = loginfo => {
	let _output;
	if (loginfo) {
		_output = loginfo.split(/\n/g);
		let resOutput = _output.reduce((prev, cur) => {
			return (
				<>
					{prev}
					<YhText
						type={
							cur.startsWith("ok")
								? "success"
								: cur.startsWith("changed")
								? "warning"
								: cur.startsWith("warning")
								? "warning"
								: cur.startsWith("fatal")
								? "fatal"
								: ""
						}
					>
						{cur}
					</YhText>
					<br />
				</>
			);
		}, "");
		return <>{resOutput}</>;
	} else {
		return null;
	}
};
