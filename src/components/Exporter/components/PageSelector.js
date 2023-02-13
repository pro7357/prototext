
import { connect } from 'react-redux'

import Tags from 'sharedComponents/Tags'
import Tag from 'sharedComponents/Tag'
import UIBlock from 'sharedComponents/UIBlock'

import getPageName from 'sharedUtils/getPageName'

import {
	togglePageSelection,
	toggleAllPagesSelection,
} from 'exporterActions'


export default connect(mapStateToProps)(props => {

	const {
		pages,
		selectedPages,
	} = props

	return (
		<UIBlock
			label='Pages'
			secondaryActions={[
				{
					label: 'Toggle',
					action: () => toggleAllPagesSelection(pages)
				}
			]}
		>
			<Tags>
				{pages.map((page, pageIndex) => {
					let pageName = getPageName(page)
					return (
						<Tag
							isActive={selectedPages.includes(pageIndex)}
							onClick={() => {
								togglePageSelection(pages, pageIndex)
							}}
						>
							{pageName}
						</Tag>
					)
				})}
			</Tags>
		</UIBlock>
	)

})


function mapStateToProps(state, props) {
	return {
		selectedPages: state.exporter.selectedPages,
		pageSelectionToggler:state.exporter.pageSelectionToggler,
	}
}