
import { useState } from 'preact/hooks'
import { createUseStyles } from 'react-jss'
import Form from './Form'
import UIBlock from './UIBlock'
import UIBlockSection from './UIBlockSection'
import UIBlockLabel from './UIBlockLabel'
import UIBlockHint from './UIBlockHint'
import Input from './Input'
import Switch from './Switch'
import Select from './Select'
import normalizeFiledValue from './utils/normalizeFiledValue'
import clsx from 'clsx'


const fieldComponentsByType = {
	input: Input,
	switch: Switch,
	select: Select
}

export default props => {

	const {
		models,
		state,
		onInput,
	} = props

	const [showSecrets, setShowSecrets] = useState(false)

	let secondaryActions =secondaryActions = [].concat(
		{
			label: 'Toggle protected data preview',
			isNotable: true,
			action: () => {
				setShowSecrets(!showSecrets)
			}
		},
		props.secondaryActions
	)

	const classes = useStyles()

	return (
		<Form
			{...props}
			secondaryActions={secondaryActions}
		>
			{models.byGroups.map((group, groupIndex) => {
				return (
					<UIBlock
						label={<b>{group.label}</b>}
						secondaryActions={null}
					>
						{group.content.map((fieldId, fieldIndex) => {

							const field = models.byId[fieldId]

							if(!field) {
								return 'Undefinded field model: '+fieldId
							}

							const type = field.type

							if(!type) {
								return 'Undefinded field type: '+type
							}

							const FieldComponent = fieldComponentsByType[type]

							if(!FieldComponent) {
								return 'Undefinded field component for type: '+type
							}

							const {
								label,
								hint,
								defValue,
								keepInLS
							} = field

							let value = state[fieldId]

							if(typeof value === 'undefined') {
								value = defValue
							}

							return (
								<UIBlockSection>

									{label && (
										<UIBlockLabel>
											{label}
										</UIBlockLabel>
									)}

									<FieldComponent
										{...field}
										value={value}
										showSecrets={showSecrets}
										insideUIBlock
										onInput={(newValue) => {

											newValue = normalizeFiledValue(newValue, field)

											onInput(
												fieldId,
												newValue
											)

											if(keepInLS && newValue) {
												localStorage.setItem(
													fieldId,
													JSON.stringify(newValue)
												)
											}

										}}
									/>

									{hint && (
										<UIBlockHint>
											{hint}
										</UIBlockHint>
									)}

								</UIBlockSection>
							)

						})}
					</UIBlock>
				)
			})}
		</Form>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {

	},


}),{name: 'smart-form'})