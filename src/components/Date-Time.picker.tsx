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

const locale = {
	lang: {
		now: "现在",
		ok: "确定",
		timeSelect: "选择时间",
		dateSelect: "选择日期",
		yearFormat: "YYYY",
		dateFormat: "M/D/YYYY",
		dayFormat: "D",
		dateTimeFormat: "M/D/YYYY HH:mm:ss"
	},
	dateFormat: "YYYY-MM-DD",
	dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
	weekFormat: "YYYY-wo",
	monthFormat: "YYYY-MM"
};

function DateTimePickerWrap(props) {
    const {
        visibility,
        monitorTime: {
			start,
			end
		},
		dispatchMonitorTime: {
			setStartDate,
			setEndDate
		}
    } = props;
    
	const [mode, setmode] = useState();
	const [startValue, setstartValue] = useState();
	const [endValue, setendValue] = useState();
    const [endOpen, setendOpen] = useState();
    
    useEffect(() => {
        if (visibility === 'none') {
            setStartDate({
                payload: ''
            })
            setEndDate({
                payload: ''
            })
        }
    }, [visibility])

	const disabledStartDate = startValue => {
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

    const disabledEndDate = endValue => {
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf() || endValue.valueOf() >= new Date().getTime();
	};

	const onStartChange = value => {
        setstartValue(value);
        setStartDate({
            payload: value.valueOf()
        })
	};

	const onEndChange = value => {
        setendValue(value);
        setEndDate({
            payload: value.valueOf()
        })
	};

	const handleStartOpenChange = open => {
		if (!open) {
			setendOpen(true);
		}
	};

	const handleEndOpenChange = open => {
        if (open) {
            setendOpen(true);
        } else {
            setendOpen(false);
        }
    };

	return (
		<div style={{marginBottom: '20px', marginLeft: '50px', display: visibility}}>
            <DatePicker
                value={startValue}
				mode={mode}
				disabledDate={disabledStartDate}
				showTime
				onChange={onStartChange}
				onOpenChange={handleStartOpenChange}
				locale={locale}
                placeholder="开始时间"
                style={{marginRight: '5px'}}
			/>
            <DatePicker
                value={endValue}
				mode={mode}
				disabledDate={disabledEndDate}
				showTime
				onChange={onEndChange}
				open={endOpen}
				onOpenChange={handleEndOpenChange}
				locale={locale}
				placeholder="结束时间"
			/>
		</div>
	);
}

export default connect(
	(state: any) => ({
		monitorTime: state.monitorTime
	}),
	dispatch => ({
		dispatchMonitorTime: bindActionCreators(
			MonitorTime,
			dispatch
		)
	})
)(DateTimePickerWrap);
