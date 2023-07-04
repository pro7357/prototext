
import parseFilePath from './parseFilePath'


const fetchFile = async (url) => {
	try {
		const response = await fetch(url)
		const data = await response.arrayBuffer()
		return data
	} catch (error) {
		throw new Error('Error fetching file')
	}
}


export const readFileAsBase64 = (fileBlobData, withoutPrefix) => {
	return new Promise((resolve, reject) => {

		const reader = new FileReader()
		reader.onloadend = () => resolve(
			withoutPrefix
				? reader.result.split(';base64,').pop()
				: reader.result
		)
		reader.onerror = reject
		reader.readAsDataURL(fileBlobData)

	})
}


export default async (url, outputType) => {
	try {

		const { base, mime } = parseFilePath(url)
		const fileData = await fetchFile(url)
		const fileBlobData = new Blob([fileData])

		if (outputType === 'base64') {
			return await readFileAsBase64(fileBlobData)
		} else if (outputType === 'blob') {
			return fileBlobData
		} else if(outputType === 'arrayBuffer'){
			return fileData
		} else {
			return new File(
				[fileBlobData],
				base,
				{ type: mime },
			)
		}

	} catch (error) {
		console.log(error)
		throw new Error('Error converting file')
	}
}