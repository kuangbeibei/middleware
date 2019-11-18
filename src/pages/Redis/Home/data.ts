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
		id: 3,
		name: '3主 - 3从',
		defaultClassName: 'active'
	},
	{
		id: 5,
		name: '5主 - 5从',
		defaultClassName: ''
    },
    {
		id: 7,
		name: '7主 - 7从',
		defaultClassName: ''
    },
    {
		id: 9,
		name: '9主 - 9从',
		defaultClassName: ''
    },
    {
		id: 11,
		name: '11主 - 11从',
		defaultClassName: ''
    },
]
