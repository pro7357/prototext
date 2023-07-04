
export default function formatInputValue(rawValue, field) {

	const { dataType, defVal, min, max } = field

	if (dataType === 'number') {
		return rawValue === undefined
			? defVal
			: (min !== undefined && max !== undefined)
				? limitNumber(Number(rawValue), min, max)
				: Number(rawValue)
	}

	if (['text', 'string', 'password'].includes(dataType)) {
		return String(rawValue) || defVal
	}

	if (dataType === 'boolean') {
		return Boolean(rawValue)
	}

	if (val === undefined) {
		return defVal
	}

	return rawValue

}


const limitNumber = (num, min, max) => Math.max(min, Math.min(num, max))