
import request from 'globalUtils/request'
import getActualBlock from 'editorUtils/getActualBlock'

let prevMessageNode

export default async props => {

	const {
		pageIndex,
		localeIndex,
		blockIndex,
		node
	} = props

	const block = getActualBlock({
		pageIndex,
		localeIndex,
		blockIndex,
	})

	let text = block.content

	if(prevMessageNode) {
		prevMessageNode.remove()
	}

	if(!text) {
		return
	}

	text = text.replace(/\n|\t/g,'').trim()

	if(!text) {
		return
	}

	let response

	const formData = new FormData()

	formData.append(
		'chunks',
		text
	)

	let url = 'https://glvrd.ru/api/v0/@proofread/'

	let messageNode

	try {

		messageNode = createMessageBox(
			node.parentNode,
		)

	} catch (error) {
		console.error(error)
	}

	if(!messageNode) {
		alert('Unable to create a text analysis hint.')
		return
	}

	response = await request({
		url,
		method: 'post',
		body: formData,
		isFormData: true
	})

	if(!response || response.status !== 'ok') {
		alert('The text analysis service is not responding.')
		return
	}

	const fragments = response.fragments

	if(fragments) {

		let message = ''
		let uniqueFragments = []

		fragments.flat().forEach(fragment => {

			const hint = response.hints[fragment.hint]
			let targetText = text.slice(fragment.start, fragment.end)

			if(!uniqueFragments.includes(targetText)) {

				let description = hint.description && hint.description.replace(/<a /g,'<a target="_blank" ')

				if(hint) {
					message += `<i>"${targetText}"</i><br/>`
					message += `${description}<br/>`
					// message += `<b>${hint.name}</b><br/>`
					// message += `${hint.short_description}<br/><br/>`
				}

			} else {
				uniqueFragments.puah(targetText)
			}

		})

		setMessage(messageNode, message || 'No comments.')

	}

	// console.log(response)

	prevMessageNode = messageNode

}


const createMessageBox = (parentNode, message) => {

	const messageNode = document.getElementById('TextAnalysisHint')
	const messageNodeClone = messageNode.cloneNode()

	messageNodeClone.style.top = 0
	messageNodeClone.style.display = 'block'

	setMessage(messageNodeClone)

	messageNodeClone.onclick = (e) => {
		if(e.altKey) {
			messageNodeClone.remove()
		}
	}

	parentNode.appendChild(messageNodeClone)

	return messageNodeClone

}


const setMessage = (messageNode, message) => {
	messageNode.innerHTML = message
		? message + '<a href="https://glvrd.ru/" target="_blank">«Checked in GLVRD»</a><br/><small onclick="this.parentNode.remove();">Click here to hide the hint.</small>'
		: 'Loading...'
}