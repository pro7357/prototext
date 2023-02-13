
const initialState = null

export default (state = initialState, action) => {

	if(action.type === 'setEcryption') {
		return action.payload
	}

	if(action.type === 'setSecretKey') {
		return {
			secretKey: action.payload
		}
	}

	return state

}