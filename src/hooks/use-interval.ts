import {useEffect, useRef} from  'react';

export function useIntervalWithCondition(callback, rely) {
	useEffect(() => {
		let timerId
		function tick(timerId, rely) {
			callback(timerId, rely);
		}
		if (rely) {
			timerId = setInterval(() => {
				tick(timerId, rely)
			}, 5000);
		}
		
		return () => clearInterval(timerId);
	}, [rely]);
}