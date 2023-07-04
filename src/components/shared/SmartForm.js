
import { useState } from 'preact/hooks'
import Form from './Form'
import UIBlock from './UIBlock'
import UIBlockSection from './UIBlockSection'
import UIBlockLabel from './UIBlockLabel'
import UIBlockHint from './UIBlockHint'
import SmartFormSlots from './SmartFormSlots'
import Input from './Input'
import Textarea from './Textarea'
import Switch from './Switch'
import Select from './Select'
import normalizeFiledValue from './utils/normalizeFiledValue'
import clsx from 'clsx'


const fieldComponentsByType = {
	input: Input,
	textarea: Textarea,
	switch: Switch,
	select: Select,
	slots: SmartFormSlots
}

export default props => {

	const {
		models,
		state,
		onInput,
		withSecrets,
		isNestedForm,
	} = props

	const [showSecrets, setShowSecrets] = useState(false)

	let secondaryActions = props.secondaryActions

	if(withSecrets) {
		secondaryActions = [].concat(
			{
				label: 'Toggle protected data preview',
				isNotable: true,
				action: () => {
					setShowSecrets(!showSecrets)
				}
			},
			secondaryActions
		)
	}

	let groups = models.byGroups ||
		[{
			label: null,
			content: models.allIds
		}]


	return (
		<Form
			{...props}
			secondaryActions={secondaryActions}
		>
			{groups.map((group, groupIndex) => {
				return (
					<UIBlock
						label={group.label ? <b>{group.label}</b> : null}
						secondaryActions={null}
						isSuperCompact={isNestedForm}
						isTransparent={isNestedForm}
					>
						{group.content.map((fieldId, fieldIndex) => {

							const field = models.byId[fieldId]

							if(!field) {
								return 'Undefinded field model: '+fieldId
							}

							const type = field.type

							if(type === 'hidden') {
								return
							}

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
								keepInLS,
								displayCondition,
								displayAsLink,
							} = field

							let value = state[fieldId]

							if(displayCondition) {

								const refFieldModel = models.byId[displayCondition.fieldId]

								if(refFieldModel) {

									const refFieldDefValue = refFieldModel.defValue
									const refFieldValue = state[displayCondition.fieldId]

									const refFieldFinalValue = typeof refFieldValue === 'undefined'
										? refFieldDefValue
										: refFieldValue

									if(
										!displayCondition.fieldValues.includes(
											refFieldFinalValue
										)
										) {
											return null
									}
								} else {
									console.log('Error. There is no reference field!')
								}

							}

							if(typeof value === 'undefined') {
								value = defValue
							}

							let withoutLabel = type === 'switch'

							let fieldActions = null

							if(displayAsLink && value) {
								fieldActions = [{
									label: 'Follow link',
									action: () => {
										window.open(value, '_blank')
									}
								}]
							}

							return (
								<UIBlockSection>

									{(label && !withoutLabel) && (
										<UIBlockLabel
											hint={isNestedForm ? hint : null}
											isCompact={isNestedForm}
											secondaryActions={fieldActions}
										>
											{label}
										</UIBlockLabel>
									)}

									<FieldComponent
										{...field}
										id={fieldId}
										value={value}
										showSecrets={showSecrets}
										insideUIBlock={!isNestedForm}
										onInput={(newValue) => {

											newValue = type === 'slots'
												? newValue
												: normalizeFiledValue(newValue, field)

											onInput(
												fieldId,
												newValue
											)

										}}
									/>

									{(hint && !isNestedForm) && (
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