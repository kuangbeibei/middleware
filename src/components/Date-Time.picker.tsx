/*
 * 日期&时间选择
 * @Date: 2019-12-24 11:29:22
 * @Last Modified: 2019-12-24 11:29:22
 */

import * as React from "react";
import { useState, useEffect } from "react";
import { DatePicker } from "antd";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MonitorTime from "@actions/Monitor/time";
import { dateLocale } from "@utils/data";


function DateTimePickerWrap(props) {
	const {
		visibility,
		dispatchMonitorTime: { setStartDate, setEndDate }
	} = props;

	useEffect(() => {
		if (visibility === "none") {
			setStartDate({
				payload: ""
			});
			setEndDate({
				payload: ""
			});
		}
    }, [visibility]);
    
    const chooseDates = values => {
        setStartDate({
			payload: values[0] && values[0].valueOf()
        });
        setEndDate({
            payload: values[1] && values[1].valueOf()
        })
    }

	const disabledEndDate = endValue => {
		return endValue && (endValue.valueOf() > new Date().getTime())
	};

	return (
		<div
			style={{
				marginBottom: "20px",
				marginLeft: "50px",
				display: visibility
			}}
		>
			<DatePicker.RangePicker onChange={chooseDates} showTime locale={dateLocale} disabledDate={disabledEndDate} />
		</div>
	);
}

export default connect(
	(state: any) => ({
		monitorTime: state.monitorTime
	}),
	dispatch => ({
		dispatchMonitorTime: bindActionCreators(MonitorTime, dispatch)
	})
)(DateTimePickerWrap);
