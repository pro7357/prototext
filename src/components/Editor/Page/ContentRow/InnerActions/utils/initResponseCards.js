
import createBlock from 'editorUtils/createBlock'
import { addBlock } from 'editorActions'


export default props => {

	const {
		responsePageIndex,
		responseBlockIndex
	} = props

	const responseBlock = createBlock(
		`Loading. Please wait...`,
		{
			style: 5,
			isLoading: true
		}
	)

	addBlock(
		responseBlock,
		responsePageIndex,
		responseBlockIndex,
	)

	return responseBlock

}