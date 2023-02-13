
import requestElectronApi from 'globalUtils/requestElectronApi'

export default async props => await requestElectronApi('exportData', props)