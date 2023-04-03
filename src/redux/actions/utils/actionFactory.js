
import { store } from 'store'

/*

	Universal function to create Redux actions.

	Usage example:

		File:
			settings.actions.js

		actionFactory(
			'autoSaveMode',
			true,
			'Settings',
			{autoSaveMode:{keepInLS: true, defValue: false}}
		)

		Final action:
			setSettingsProperty('autoSaveMode', true)

*/
export default (propId, payload, groupId, models) => {

	const model = models.byId[propId]

	store.dispatch({
		type: `set${groupId}Property`,
		lsKey: model && model.keepInLS ? propId : undefined,
		propId,
		payload
	})

}