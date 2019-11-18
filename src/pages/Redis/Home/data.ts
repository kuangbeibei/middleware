interface Iinstances {
	ip: string,
	port: string,
	user: string,
	pass: string
}

interface Iparams {
	name: string,
	version: any,
	redisPass: any,
	moreConf: string,
	instances: Array<Iinstances>
}

export default interface IPostParams {
	params: Iparams,
	type: string
}

export const initInstancesType = [
	{
		id: 1,
		name: '6机器-6实例',
		defaultClassName: 'active'
	},
	{
		id: 2,
		name: '3机器-6实例',
		defaultClassName: ''
	}
]
