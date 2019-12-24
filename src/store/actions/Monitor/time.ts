import {
	MYSQL_MONITOR_SELECT_START_DATE,
	MYSQL_MONITOR_SELECT_END_DATE
} from "../../action-types";

export default {
	setStartDate: ({ payload }) => {
		return async dispatch => {
			dispatch({
				type: MYSQL_MONITOR_SELECT_START_DATE,
				payload
			});
		};
	},
	setEndDate: ({ payload }) => {
		return async dispatch => {
			dispatch({
				type: MYSQL_MONITOR_SELECT_END_DATE,
				payload
			});
		};
	}
};
