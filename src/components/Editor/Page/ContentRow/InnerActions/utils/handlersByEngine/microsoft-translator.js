
import requestElectronApi from 'globalUtils/requestElectronApi'
import translationActionManager from '../translationActionManager'


export default async props => {

	translationActionManager({
		...props,
		translate: async props => {

			const {
				originalText,
				srcLang,
				dstLang
			} = props

			return await requestElectronApi('translate', {
				text: originalText,
				srcLang,
				dstLang
			})

		}
	})

}