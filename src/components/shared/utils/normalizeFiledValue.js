
export default (rawValue, field) => {

	const {
		// type, filedType, e.g. select, input, switch
		dataType,
		defVal,
		min,
		max
	} = field

	return dataType === 'number'
		? typeof rawValue === 'undefined'
			? defVal
			: limitNumber(Number(rawValue), min, max)
		: ['text','string','password'].includes(dataType)
			? String(rawValue) || defVal
			: typeof val === 'undefined'
				? defVal
				: rawValue

}


const limitNumber = (num, min, max) => Math.max(min, Math.min(num, max))