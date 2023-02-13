
import TextButton from 'sharedComponents/TextButton'
import { activateSearchByTags } from 'topbarActions'
import getActualBlock from 'editorUtils/getActualBlock'

export default props => {

	const {
		pageIndex,
		localeIndex,
		blockIndex
	} = props

	return (
		<TextButton
			extraProps={{'data-depth':4}}
			onClick={e => {
				const block = getActualBlock({
					pageIndex,
					localeIndex,
					blockIndex
				})
				if(block && block.content) {
					activateSearchByTags(block.content)
				}
			}}
			isNotable
		>
			Search by tags
		</TextButton>
	)
}