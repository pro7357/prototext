
export default props => {

	const {
		e,
		slideIndex,
		slidesAmount,
		setSlideIndex,
	} = props

	let key = e.key
	let keyCode = e.keyCode
	let withAlt = e.altKey
	let withShift = e.shiftKey
	let withComand = e.metaKey
	let arrowDown = key === 'ArrowDown'
	let arrowLeft = key === 'ArrowLeft'
	let arrowRight = key === 'ArrowRight'
	let arrowUp = key === 'ArrowUp'
	let isArrow = key.indexOf('Arrow') > -1

	// console.log('e',e)

	if(isArrow && !withComand) {

		// Slides switching with the help of arrows keys.

		if(e.preventDefault) e.preventDefault()

		let direction = arrowDown || arrowRight ? 1 : -1
		let newTargetSlideIndex = slideIndex + direction

		if(newTargetSlideIndex >= slidesAmount || newTargetSlideIndex < 0) {
			return
		}

		setSlideIndex(newTargetSlideIndex)

	}

}