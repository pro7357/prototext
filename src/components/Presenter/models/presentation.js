
import { store } from 'store'
import { setPresenterLocale } from 'presenterActions'
import { localesDict} from 'globalUtils/allLocaleOptions'

export default {
	byId: {

		tagFilterMode: {
			type: 'switch',
			dataType: 'boolean',
			isSmall: true,
			label: 'Tag filter',
			defValue: false,
		},

		exposeLinkedContent: {
			type: 'switch',
			dataType: 'boolean',
			isSmall: true,
			label: 'Expose links',
			defValue: false,
		},

		allPagesMode: {
			type: 'switch',
			dataType: 'boolean',
			isSmall: true,
			label: 'All pages',
			defValue: false,
		},

		slideMode: {
			type: 'switch',
			dataType: 'boolean',
			isSmall: true,
			label: 'Slide mode',
			defValue: true,
		},

		fitImgMode: {
			type: 'switch',
			dataType: 'boolean',
			isSmall: true,
			label: 'Fit images into the frame',
			defValue: true,
			displayCondition: {
				fieldId: 'slideMode',
				fieldValues: [true]
			},
		},

		fullWidthImgMode: {
			type: 'switch',
			dataType: 'boolean',
			isSmall: true,
			label: 'Stretch images',
			defValue: false,
			displayCondition: {
				fieldId: 'slideMode',
				fieldValues: [false]
			},
		},

		sharpImgMode: {
			type: 'switch',
			dataType: 'boolean',
			isSmall: true,
			label: 'Sharp image rendering',
			defValue: true,
		},

		contrastDarkMode: {
			type: 'switch',
			dataType: 'boolean',
			isSmall: true,
			label: 'High contrast dark theme',
			defValue: false,
		},

		locale: {
			type: 'select',
			getValue: (presenter,editor) => {
				return store.getState().presenter.locale
			},
			getOptions: () => {
				return store.getState().editor.localeOptions
			},
			optionValueHandler: (option, index) => index,
			optionLabelHandler: (option) => {
				return localesDict[option].name
			},
			onChange: value => setPresenterLocale(Number(value)),
			defValue: 0
		},

		textHeadingSize: {
			label: 'Heading size, px',
			type: 'input',
			dataType: 'number',
			defValue: 100,
			min: 1,
			max: 999
		},

		textSubheadingSize: {
			label: 'Subheading size, px',
			type: 'input',
			dataType: 'number',
			defValue: 48,
			min: 1,
			max: 999
		},

		textNormalSize: {
			label: 'Normal text size, px',
			type: 'input',
			dataType: 'number',
			defValue: 28,
			min: 1,
			max: 999
		},

		textWidthLimit: {
			label: 'Text width limit, %',
			type: 'input',
			dataType: 'number',
			defValue: 50,
			min: 1,
			max: 100
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
		'textHeadingSize',
		'textSubheadingSize',
		'textNormalSize',
		'textWidthLimit',
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
				'textHeadingSize',
				'textSubheadingSize',
				'textNormalSize',
				'textWidthLimit',
			]
		},
	]
}