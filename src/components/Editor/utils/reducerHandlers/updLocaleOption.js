
export default (initialState, state, action) => ({
	...state,
	localeOptions: state.localeOptions.reduce((done, cur, index) => {
		return done.concat(
			index === action.index
				? action.value
				: cur
		)
	},[])
})