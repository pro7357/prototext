
import getLsVal from './getLsVal'

/*
	props:
	1. array, then the function will return the normalized Redux state object
	2. The object containing models of fields {Byid: {}, allids: []}
	3. by any other type, then the function will return the normalized value
	The essence of the function is to determine the starting values for Redux state:
	values from browser memory (Localstorage) or by defending (from the model).
*/
export default (props, singleDefVal, isSingleFromLs) => {

	const isArrayMode = Array.isArray(props)
	const modelMode = !isArrayMode && props.byId && props.allIds

	if(isArrayMode || modelMode) {

		return (modelMode ? props.allIds : props).reduce((done,cur,index)=>{
			let key = modelMode ? cur : cur[0]
			let model = modelMode && props.byId[key]
			let defVal = modelMode ? model.defValue : cur[1]
			let isFromLs = modelMode ? model.keepInLS : cur[2]
			done[key] = isFromLs ? getLsVal(key,defVal) : defVal
			return done
		},{})

	} else {

		return isSingleFromLs
			? getLsVal(props, singleDefVal)
			: singleDefVal
	}

}