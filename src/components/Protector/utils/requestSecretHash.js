
import requestElectronApi from 'globalUtils/requestElectronApi'

export default async secret => await requestElectronApi('requestSecretHash', secret)