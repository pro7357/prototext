
import Link from 'sharedComponents/Link'

const displayCondition = {
	fieldId: 'engine',
	fieldValues: ['custom-script']
}

export default {
	byId: {

		// Unused yet.
		customScriptFilePath: {
			type: 'input',
			dataType: 'text',
			label: 'Path to a local JS file',
			defValue: '',
			keepInLS: true,
			hint: <Link isExternal url='https://bitbucket.org/svgsprite/prototext/src/master/scripts/custom-script-demo.js'>
				Download the demo file
			</Link>,
			displayCondition
		},

		customScript: {
			label: 'Script data',
			type: 'textarea',
			dataType: 'text',
			keepInLS: true,
			isRequired: true,
			defValue:`TEXT = TEXT.toUpperCase();\nSTYLE = 5;`,
			hint: <div>
				Describe how to change the target card content.
				<div>
					<b>Format:</b> JS.
				</div>
				<div>
					<b>Variables:</b>
				</div>
				<div>
					<div><span>TEXT</span> - text of the current card.</div>
					<div><span>STYLE</span> - style of the current card, allowable values: 0-9.</div>
				</div>
				<div>
					<b>Example:</b>
				</div>
				<div>
					<div>
						{`TEXT = TEXT.toUpperCase();\nSTYLE = 6;`}
					</div>
				</div>
			</div>,
			displayCondition
		}

	},
	allIds: [
		// 'customScriptFilePath',
		'customScript',
	]
}