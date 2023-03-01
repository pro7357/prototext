
import Shortcut from '../components/Shortcut'

export default (cmdKey) => [
	[
		'[DRAG] the handle [⁝]',
		null,
		'To rearrange cards.',
	],

	[
		'[CLICK] on [×]',
		null,
		'To remove a card. If the card contains an asset, the app will ask you about deleting the linked file.',
	],

	[
		`[${cmdKey}+D]`,
		null,
		'To clone a card.',
	],

	[
		'[ENTER]',
		null,
		'To create or breaks cards.',
	],

	[
		'[SHIFT+ENTER]',
		null,
		'To break the current text line.',
	],

	[
		'[BACKSPACE]',
		null,
		'To remove or merge cards.',
	],

	<>The behavior of the <Shortcut isInline>[ENTER]</Shortcut> and <Shortcut isInline>[BACKSPACE]</Shortcut>keys depends on the content of the card and the cursor position. Just experiment to understand the principles.</>,

	'Splitting and merging cards is not directly available for secondary localizations.',

	[
		'[TAB] or [SHIFT+TAB]',
		null,
		'To navigate between cards.',
	],

	[
		'[SHIFT + DOUBLE CLICK]',
		null,
		'To copy the entire content of a card to the clipboard.',
	],

	[
		'[ESC]',
		null,
		'To switch the app to the normal state. To cancel the card dragging, link creation, and task selection for AI.',
	],

]