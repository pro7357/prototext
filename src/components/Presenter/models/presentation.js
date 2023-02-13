
import { setPresenterLocale } from 'presenterActions'
import { localesDict} from 'globalUtils/allLocaleOptions'

export default {
	byId: {

		tagFilterMode: {
			type: 'switch',
			label: 'Tag filter',
			defValue: false,
		},

		exposeLinkedContent: {
			type: 'switch',
			label: 'Expose links',
			defValue: false,
		},

		allPagesMode: {
			type: 'switch',
			label: 'All pages',
			defValue: false,
		},

		slideMode: {
			type: 'switch',
			label: 'Slide mode',
			defValue: true,
		},

		fitImgMode: {
			type: 'switch',
			label: 'Fit images into the frame',
			defValue: true,
			displayCondition: {
				id: 'slideMode',
				value: true
			},
		},

		fullWidthImgMode: {
			type: 'switch',
			label: 'Stretch images',
			defValue: false,
			displayCondition: {
				id: 'slideMode',
				value: false
			},
		},

		sharpImgMode: {
			type: 'switch',
			label: 'Sharp image rendering',
			defValue: true,
		},

		contrastDarkMode: {
			type: 'switch',
			label: 'High contrast dark theme',
			defValue: false,
		},

		locale: {
			label: 'Locale',
			type: 'select',
			getValue: (presenter,editor) => presenter.locale,
			getOptions: (presenter,editor) => {
				return editor.localeOptions
			},
			optionValueHandler: (option, index) => index,
			optionLabelHandler: (option) => {
				return localesDict[option].name
			},
			onChange: value => setPresenterLocale(Number(value)),
			isTransparent: true,
			defValue: 0
		},

	},
	allIds: [
		'allPagesMode',
		'tagFilterMode',
		'exposeLinkedContent',
		'locale',
		'slideMode',
		'fitImgMode',
		'fullWidthImgMode',
		'contrastDarkMode',
		'sharpImgMode',
	],
	byGroups: [
		{
			label: 'Content',
			content: [
				'allPagesMode',
				'tagFilterMode',
				'exposeLinkedContent',
				'locale'
			]
		},
		{
			label: 'Design',
			content: [
				'slideMode',
				'fullWidthImgMode',
				'fitImgMode',
				'contrastDarkMode',
				'sharpImgMode',
			]
		},
	]
}