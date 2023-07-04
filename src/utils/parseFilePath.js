
import { isWindows } from './os'

const defMimeType = 'application/octet-stream'

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const commonMimeTypes = {
	bin: defMimeType,
	gif: 'image/gif',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	json: 'application/json',
	mp3: 'audio/mpeg',
	mp4: 'video/mp4',
	mpeg: 'video/mpeg',
	oga: 'audio/ogg',
	png: 'image/png',
	pdf: 'application/pdf',
	svg: 'image/svg+xml',
	txt: 'text/plain',
	csv: 'text/csv',
	wav: 'audio/wav',
	weba: 'audio/webm',
	webm: 'video/webm',
	webp: 'image/webp',
	zip: 'application/zip',
	gz: 'application/gzip',
}



export default filePath => {

	let lastSlashPos = filePath.lastIndexOf(isWindows() ? `\\` : `/`)
	let base = filePath.slice(lastSlashPos+1)
	let lastDotPos = base && base.lastIndexOf('.')
	let ext
	let name

	if(base && lastDotPos > -1) {
		name = base.slice(0,lastDotPos)
		ext = base.slice(lastDotPos+1)
	}

	let mime = commonMimeTypes[ext] || defMimeType

	return {
		fullPath: filePath,
		dir: filePath.slice(0,lastSlashPos+1),
		base,
		name,
		ext,
		mime
	}

}