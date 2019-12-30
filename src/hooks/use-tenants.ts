import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { getApi } from '@api'
import { ProductApiUrl } from "@utils/data"

const { ProductUumApiUrl } = ProductApiUrl;

function useTenants() {
  let [tenants, setTenants] = useState<Array<any>>([])


  const retrieveTenants = useCallback(()=>{
    getApi(ProductUumApiUrl)(`/tenant/os/list`).then(res => {
      try {
        if (res.data && Array.isArray(res.data)) {
          setTenants(res.data)
        }
      } catch (e) {
        return res
      }
    }).catch(e => Promise.reject(e))
  }, [])


  useEffect(()=> {
    retrieveTenants()
  }, [])
  return tenants
}

export default useTenants