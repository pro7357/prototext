
export default (array, fromIndex, toIndex) => {

	if (
		fromIndex === toIndex ||
		fromIndex < 0 ||
		fromIndex >= array.length ||
		toIndex < 0 ||
		toIndex >= array.length
	) return array

	array.splice(toIndex, 0, array.splice(fromIndex, 1)[0])

	return array

 }