
const lsGet = (key, fromJson) => {
	let val = localStorage.getItem(key)
	return val !== null
		? fromJson ? JSON.parse(val) : val
		: undefined
}

const lsSet = (key, val, toJson) => {
	if(val === undefined) {
		lsDel(key)
	}
	localStorage.setItem(
		key,
		toJson ? JSON.stringify(val) : val
	)
}

const lsDel = key => localStorage.removeItem(key)

export {
	lsGet,
	lsSet,
	lsDel
}