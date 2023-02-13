
import  * as linkTypes from 'sharedUtils/blockTypes'
import LinkedBlock from './LinkedBlock'
import LinkedFile from './LinkedFile'
import LinkingControls from './LinkingControls'
import LinkedWebResource from './LinkedWebResource'
import Tags from './Tags'

export default props => {

	const {
		blockProps
	} = props

	const {
		block,
		pageIndex,
		localeIndex,
		blockIndex,
		currentDoc,
		side,
		linkMode,
	} = blockProps

	const {
		style,
		content = '',
		link,
		backLinks,
	} = block

	const isEmpty = !content

	const isInternalLink = linkTypes.isInternalLink(link)
	const isWebLink = linkTypes.isWebLink(link, content)
	const isFileLink = linkTypes.isFileLink(link)
	const isTags = linkTypes.isTags(content, true, isInternalLink, isWebLink, isFileLink)


	return (
		<div
			data-depth={3}
		>

			{isEmpty && (
				<LinkingControls
					linkMode={linkMode}
					block={block}
					pageIndex={pageIndex}
					localeIndex={localeIndex}
					blockIndex={blockIndex}
					currentDoc={currentDoc}
				/>
			)}

			{isWebLink && (
				<LinkedWebResource
					savedSrc={content}
					pageIndex={pageIndex}
					localeIndex={localeIndex}
					blockIndex={blockIndex}
				/>
			)}

			{isFileLink && (
				<LinkedFile
					label={content}
					filePath={link.filePath}
					currentDoc={currentDoc}
				/>
			)}

			{isInternalLink && (
				<LinkedBlock
					link={link}
					side={side}
					block={block}
					pageIndex={pageIndex}
					localeIndex={localeIndex}
					blockIndex={blockIndex}
				/>
			)}

			{isTags && (
				<Tags
					pageIndex={pageIndex}
					localeIndex={localeIndex}
					blockIndex={blockIndex}
				/>
			)}

		</div>
	)
}