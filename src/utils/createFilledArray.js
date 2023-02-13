
export default (len, callback) => {

	let arr = []

	for (let i = 0; i < len; i++) {
        arr.push(callback ? callback(i) : null)
    }

    return arr
}