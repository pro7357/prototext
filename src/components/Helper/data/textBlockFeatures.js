
import Shortcut from '../components/Shortcut'

export default [
	[
		'[DRAG] the handle [⁝]',
		null,
		'To rearrange blocks.',
	],

	[
		'[CLICK] on [×]',
		null,
		'To remove a block. If the block contains an asset, the app will ask you about deleting the linked file.',
	],

	[
		'[CMD+D]',
		null,
		'To clone a block.',
	],

	[
		'[ENTER]',
		null,
		'To create or breaks blocks.',
	],

	[
		'[SHIFT+ENTER]',
		null,
		'To break the current text line.',
	],

	[
		'[BACKSPACE]',
		null,
		'To remove or merge blocks.',
	],

	<>The behavior of the <Shortcut isInline>[ENTER]</Shortcut> and <Shortcut isInline>[BACKSPACE]</Shortcut>keys depends on the content of the block and the cursor position. Just experiment to understand the principles.</>,

	'Splitting and merging blocks is not directly available for secondary localizations.',

	[
		'[TAB] or [SHIFT+TAB]',
		null,
		'To navigate between blocks.',
	],

	[
		'[SHIFT + DOUBLE CLICK]',
		null,
		'To copy the entire content of a block to the clipboard.',
	],

	[
		'[ESC]',
		null,
		'To switch the app to the normal state. To cancel the block dragging, link creation, and task selection for AI.',
	],

]