
import TextButton from 'sharedComponents/TextButton'
import handleInternalLinkClick from './utils/handleInternalLinkClick'


export default props => {

	const {
		link,
		side,
		block,
		pageIndex,
		localeIndex,
		blockIndex,
	} = props

	return (
		<TextButton
			extraProps={{'data-depth':4}}
			onClick={e => {
				handleInternalLinkClick({
					e,
					internalLink: link,
					side,
					block,
					targetPageIndex: pageIndex,
					targetLocaleIndex:localeIndex,
					targetBlockIndex: blockIndex,
				})
			}}
			isNotable
		>
			Follow link
		</TextButton>
	)
}