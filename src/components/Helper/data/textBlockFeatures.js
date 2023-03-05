
import Shortcut from '../components/Shortcut'

export default (cmdKey) => [
	[
		'[DRAG] the handle [⁝]',
		null,
		'To rearrange cards.',
	],

	[
		'[CLICK] on [⁝]',
		null,
		<>To start the card selection mode. Use <Shortcut isInline>[SHIFT+CLICK]</Shortcut> to quickly select a range of cards, Drag & Drop cards anywhere, <Shortcut isInline>[CMD+C]</Shortcut> to copy content, <Shortcut isInline>[ESC]</Shortcut> to reset selection.</>,
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
		'To remove or merge cards. To delete multiple cards at once, use the key in card selection mode.',
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
		'To switch the app to the normal state. To cancel the card selection, dragging, link creation, and AI mode.',
	],

]