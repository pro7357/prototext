
import models from './models/settings'
import actionFactory from 'globalActions/utils/actionFactory'

export default (propId, payload) => actionFactory(
	propId,
	payload,
	'Settings',
	models
)