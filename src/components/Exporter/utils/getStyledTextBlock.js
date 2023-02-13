
import { styles } from 'sharedUtils/blockStyling'

export default props => {

	const {
		visual,  // = schematicPreview with color styling
		styleIndex,
		useIndexAsKey,
		content,
		linkedFile,
		ext
	} = props

	let styleRule = styles[styleIndex]

	if(!styleRule) return content

	let kFnVisual = styleRule.kFnVisual && styleRule.kFnVisual[ext]
	let kFnOutput = styleRule.kFnOutput && styleRule.kFnOutput[ext]
	let vFnVisual = styleRule.vFnVisual && styleRule.vFnVisual[ext]
	let vFnOutput = styleRule.vFnOutput && styleRule.vFnOutput[ext]

	let key = useIndexAsKey ? styleIndex + 1 : styleRule.key
	let tag = styleRule.tag

	let keyMarkup = key
	let valueMarkup = content
		? content
		: visual
			? styleRule.sample
			: ''

	if(visual) {

		// The Schematic preview.

		// Markup of the key.
		if(kFnVisual) {
			// Special case, to use a function.
			keyMarkup = kFnVisual(key)
		} else {
			// General case.
			if(ext === 'md' || ext === 'js') {
				keyMarkup = coloredKey(key,tag)
			} else if(ext === 'txt') {
				if(styleRule.txtKey) {
					keyMarkup = styleRule.txtKey
				}
				keyMarkup += ' '
			}
		}

		// Markup of the value.
		if(vFnVisual) {
			valueMarkup = vFnVisual(valueMarkup)
		}

	} else {

		// Result output.

		// Markup of the key.
		if(kFnOutput) {
			// Special case, to use a function.
			keyMarkup = kFnOutput(key)
		} else {
			// General case.
			if(ext === 'md') {
				keyMarkup = coloredKey(key,tag)
			} else if(ext === 'txt') {
				keyMarkup += ' '
			}
		}

		// Markup of the value.
		if(vFnOutput) {
			valueMarkup = vFnOutput(valueMarkup, linkedFile)
		}

		// ??
		// if(linkedFile) {
		// 	valueMarkup += `\nLinked file: ${linkedFile}`
		// }

	}

	return `${keyMarkup}${valueMarkup}`

}


const coloredKey = (key,tag) => `<${tag}>${key}</${tag}>`