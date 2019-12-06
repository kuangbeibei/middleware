import {useEffect, useRef} from  'react';

export function useIntervalWithCondition(callback, rely, t?) {
	useEffect(() => {
		let timerId
		function tick(timerId, rely) {
			callback(timerId, rely);
		}
		if (rely) {
			timerId = setInterval(() => {
				tick(timerId, rely)
			}, t || 2000);
		}
		
		return () => clearInterval(timerId);
	}, [rely]);
}