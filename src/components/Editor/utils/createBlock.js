
import getUID from 'globalUtils/getUID'

export default (payload = '', specialProps) => {

	let newBlock = specialProps || {}

	if(payload && typeof payload === 'object') {
		newBlock = payload
	} else {
		newBlock.content = payload
	}

	if(!newBlock.id) {
		newBlock.id = getUID()
	}

	return newBlock

}