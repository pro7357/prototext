
export default (i) => ({
	left: (isHidden, isInside) => ({
		'&:before': {
			content: '" "',
			position: 'absolute',
			zIndex: 2,
			display: 'block',
			width: 20,
			height: '100%',
			top: isInside ? -4 : 0,
			left: isInside ? 10 : -20,
			bottom: 0,
			opacity: isHidden ? 0 : 1,
			cursor: 'grab',
		}
	}),
	right: (isHidden, isInside) => ({
		'&:after': {
			content: '" "',
			position: 'absolute',
			zIndex: 2,
			width: 20,
			height: '100%',
			top: isInside ? -4 : 0,
			right: isInside ? 10 : -20,
			bottom: 0,
			opacity: isHidden ? 0 : 1,
			cursor: 'pointer',
		}
	})
})