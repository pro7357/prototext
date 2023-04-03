
import requestElectronApi from './requestElectronApi'

const notify = props => {
	requestElectronApi(
		'showNotification',
		props
	)
}

export const error = (primaryMessage, secondaryMessage) => {
	notify({
		type: 'error',
		primaryMessage,
		secondaryMessage
	})
}