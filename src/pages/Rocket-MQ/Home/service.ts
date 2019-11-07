/*
 * @Author: kuangdan 
 * @Date: 2019-11-06 18:12:08 
 * @Last Modified: 2019-11-06 18:12:08 
 */ 

import { get, post, put, del } from '@api'

export async function getRmqComponentClusterRecords() {
    return get(`/mid/v1/rmq/getRmqComponentClusterRecords/1/100`).then(res => res.data && res.data.data && res.data.data.rmqComponents).catch(e => {
        console.log(e.message)
    })
}

export async function createRmqComponentClusterRecord(data) {
    return post(`/mid/v1/rmq/createRmqComponentClusterRecord`, data).then(() => {}).catch(e => {
        console.log(e.message)
    })
}

export async function deleteRmqComponentClusterRecord(id) {
    return del(`/mid/v1/rmq/deleteRmqComponentClusterRecord/${id}`).then(() => { }).catch(e => {
        console.log(e.message)
    })   
}