
import requestElectronApi from 'globalUtils/requestElectronApi'

export default filePath => requestElectronApi('revealFileInFinder', filePath)