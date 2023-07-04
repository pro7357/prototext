
import defaultCardActionSlots from './cardActions/intialState'
import cardAction from './cardActions/cardAction'


export default {
	byId: {

		cardActions: {
			type:  'slots',
			slotModels: cardAction,
			defValue: defaultCardActionSlots,
			keepInLS: true,
			statePropertyPath: ['settings','cardActions']
		},

		// The settings are only available in the main menu.
		autoSaveMode: {
			type: 'switch',
			dataType: 'boolean',
			keepInLS: true,
			defValue: false,
		},

	},

	allIds: [
		'cardActions',
		'autoSaveMode',
	],

	byGroups: [
		{
			label: 'Card actions & AI integrations',
			fullWidth: true,
			content: [
				'cardActions',
			]
		},
		// {
		// 	label: 'Other',
		// 	content: []
		// },
	]
}