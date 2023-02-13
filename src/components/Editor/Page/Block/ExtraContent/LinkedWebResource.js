
import TextButton from 'sharedComponents/TextButton'
import getActualBlock from 'editorUtils/getActualBlock'
import { isYouTubeVideo } from 'sharedUtils/blockTypes'
import LinkedWebVideo from './LinkedWebVideo'

export default props => {

	const {
		savedSrc,
		pageIndex,
		localeIndex,
		blockIndex
	} = props

	if(isYouTubeVideo(true, savedSrc)) {
		return (
			<LinkedWebVideo
				src={savedSrc}
				isYouTube
			/>
		)
	}

	return (
		<TextButton
			extraProps={{'data-depth':4}}
			onClick={() => {
				const block = getActualBlock({
					pageIndex,
					localeIndex,
					blockIndex
				})
				window.open(block.content, '_blank')
			}}
			isNotable
		>
			Follow link
		</TextButton>
	)

}