import { useState, useEffect, useCallback, useMemo } from "react";
import { getApi } from "@api";
import { ProductApiUrl } from "@utils/data";

const { ProductUumApiUrl } = ProductApiUrl;

// 把接口调用单独提出来，只调用一次即可
const getTenantList = (async () => {
	let res = await getApi(ProductUumApiUrl)(`/tenant/os/list`)
		.then(res => {
			try {
				if (res.data && Array.isArray(res.data)) {
					return res.data;
				}
			} catch (e) {
				return res;
			}
		})
		.catch(e => Promise.reject(e));
	return res;
})();

function useTenants() {
	let [tenants, setTenants] = useState<Array<any>>([]);

	let getlist = useCallback(() => {
		getTenantList.then(list => {
			// console.log('list,', list);
			setTenants(list);
		});
	}, []);
	// console.log('memo list,', tenants);
	// console.log('getlist,', getlist);

	useEffect(() => getlist, []);

	return tenants;
}

export default useTenants;
