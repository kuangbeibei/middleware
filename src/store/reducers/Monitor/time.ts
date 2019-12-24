import {
	MYSQL_MONITOR_SELECT_START_DATE,
	MYSQL_MONITOR_SELECT_END_DATE
} from "../../action-types";

interface IMonitorDate {
	start: string,
	end: string
}

const initDrawerVisibility:IMonitorDate = {
	start: '',
	end: ''
}

export default (state = initDrawerVisibility, action) => {
	switch (action.type) {
		case MYSQL_MONITOR_SELECT_START_DATE:
			return {
				...state,
				start: action.payload
			};
		case MYSQL_MONITOR_SELECT_END_DATE:
			return {
				...state,
				end: action.payload
			};
		default:
			return state;
	}
};
