
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import SmartForm from 'sharedComponents/SmartForm'
import TextButton from 'sharedComponents/TextButton'
import Input from 'sharedComponents/Input'


// Nested dynamic groups of fields: [slot1] [slot2] [+].
// For example, card actions & AI integrations.
export default props => {

	const {
		id,
		slotModels: models,
		onInput,
		defValue,
		value,
		className
	} = props

	const onSlotInput = (fieldId, newFieldValue, slotIndex) => {
		onInput(
			value.reduce((done, cur, index) => {
				return done.concat(
					index === slotIndex
						? {
							...cur,
							[fieldId]: newFieldValue
						}
						: cur
				)
			},[])
		)
	}

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				className
			)}
		>
			{value && value.map((slotValue, slotIndex) => {

				let label = (
					<Input
						dataType='text'
						value={slotValue.label || ''}
						onInput={(newFieldValue) => {
							onSlotInput(
								'label',
								newFieldValue,
								slotIndex
							)
						}}
						placeholder={`Slot #${slotIndex+1}`}
						className={classes.slotTitleInput}
					/>
				)

				return (
					<div className={clsx(classes.slot)}>

						<SmartForm
							isNestedForm
							title={label}
							secondaryActions={[
								{
									label: '×',
									isSemiDangerous: true,
									action: () => {
										onInput(
											value.filter((item, index) => index !== slotIndex)
										)
									}
								}
							]}
							models={models}
							state={value[slotIndex]}
							onInput={(fieldId, newFieldValue) => {
								onSlotInput(
									fieldId,
									newFieldValue,
									slotIndex
								)
							}}
						/>

					</div>
				)
			})}
			<div className={clsx(classes.slot)}>
				<TextButton
					isNotable
					onClick={() => {
						onInput(
							[].concat(
								value,
								models.blankIds.reduce((done,cur,index) => {
									done[cur] = models.byId[cur].defValue
									return done
								},{})
							)
						)
					}}
				>
					Create a new slot
				</TextButton>
			</div>
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		cursor: 'default',
		textAlign: 'left',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		gap: 16,
		position: 'relative'
	},

	slot: {
		backgroundColor: theme.background.default,
		padding: [16, 16, 16, 16],
		borderRadius: theme.rounded,
		width: 'calc(25% - 12px)',
	},

	slotTitleInput: {
		backgroundColor: 'transparent',
		padding: 0,
		border: 'none',
		fontSize: 20
	}

}),{name: 'ui-slots'})