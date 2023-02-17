
export default cmdKey => [
	[
		`[${cmdKey}+1]`,
		'One Page view.',
		'Initial workspace to edit content of a single page.'
	],

	[
		`[${cmdKey}+2]`,
		'Two Pages view.',
		'Splitted workspace to compare and edit two pages at the same time, to move content blocks between pages. You can open two different pages or one page twice, but in a different scrolling position.'
	],

	[
		`[${cmdKey}+3]`,
		'Localization view.',
		[
			'Splitted workspace to translate pages into other languages.',
			'Localized content blocks are inextricably linked to the original blocks: LEFT <- RIGHT.',
			'The right sidebar here performs the editing of locales & navigation between them.',
			'Click on the button in the right sidebar at the bottom to add, delete, rearrange languages.',
			'Note: The number of locales is always the same for all pages!'
		]
	],

	[
		`[${cmdKey}+P]`,
		'Presentation view.',
		'A visual representation of the content of the current page, or all pages, or a selection of pages in two different design layouts: "Flow" and "Slides". Use the arrow keys to switch the slides.'
	],

	[
		`[${cmdKey}+F]`,
		'Search panel',
		'To filter blocks by text, content styling, tags, locally or globally for all pages, case-sensitive or not.'
	],

	[
		'[DRAG & DROP] inside',
		'Left & Right Sidebars',
		'To rearrange pages & locales.',
	],

]