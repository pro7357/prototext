
import { styles } from 'sharedUtils/blockStyling'
import getStyledTextBlock from './getStyledTextBlock'

export default ({ext, useIndexAsKey}) => {
	return styles.reduce((done,cur,i)=> {

		return done.concat(getStyledTextBlock({
			visual: true,  // = schematicPreview
			styleIndex: i,
			useIndexAsKey,
			content: null,
			ext
		})

	)},[]).join('\n\n')
}