
export default isFrameless => (isFrameless
	? {
		'-webkit-app-region': 'drag',
		cursor: 'grab'
	}
	: {}
)
