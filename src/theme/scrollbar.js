
import palette from './palette'

export default  i => ({
	scrollbarWidth: 'thin',
	overscrollBehavior: 'contain',
	'&::-webkit-scrollbar': {
		background: i === 0
			? palette.blueGrey.qw
			: palette.indigoGrey.np,
		width: 10,
	},
	'&::-webkit-scrollbar-thumb': {
		background: i === 0
			? palette.blueGrey.oi
			: palette.indigoGrey.tv
	}
})
