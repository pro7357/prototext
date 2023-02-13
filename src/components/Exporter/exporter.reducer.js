
import fillArrayWithNumbers from 'globalUtils/fillArrayWithNumbers'
import normalizeInitialState from 'globalUtils/normalizeInitialState'

import {
	defOutputDirectory,
	defOutputFilename
} from 'globalConstants'


// key, defaultValue, isFromLocalStorage
const initialState = normalizeInitialState([
	['selectedPages',[],false],
	['pageSelectionToggler',true,false],
	['format',0,true],
	['allowLocales',true,true],
	['allowBlockStyles',true,true],
	['allowMergePages',true,true],
	['outputDirectory',defOutputDirectory,true],
	['outputFilename',defOutputFilename,true],
	['isSchematicPreview',true,true],
])


export default (state = initialState, action) => {

	switch (action.type) {

		case 'setExporterState':
			return {
				...initialState,
				...action.payload,
			}

		case 'setSelectedPages':
			return {
				...state,
				selectedPages: action.payload
			}

		case 'togglePageSelection':
			return {
				...state,
				selectedPages: action.pages.reduce((d,c,i) => {
					let isSelected = state.selectedPages.includes(i)
					if(i === action.targetPageIndex) {
						isSelected = !isSelected
					}
					return isSelected
						? d.concat(i)
						: d
				},[])
			}

		case 'excludePage':
			return {
				...state,
				selectedPages: state.selectedPages.filter(
					page => page !== action.targetPageIndex
				)
			}

		case 'toggleAllPagesSelection':
			return {
				...state,
				pageSelectionToggler: action.selectAll ? false : !state.pageSelectionToggler,
				selectedPages: action.selectAll || state.pageSelectionToggler
					? fillArrayWithNumbers(action.pages.length)
					: []
			}


		case 'setFormat':
			return {
				...state,
				format: action.payload
			}



		case 'setAllowLocales':
			return {
				...state,
				allowLocales: action.payload
			}


		case 'setAllowBlockStyles':
			return {
				...state,
				allowBlockStyles: action.payload
			}


		case 'setAllowMergePages':
			return {
				...state,
				allowMergePages: action.payload
			}


		case 'setOutputDirectory':
			return {
				...state,
				outputDirectory: action.payload
			}


		case 'setOutputFilename':
			return {
				...state,
				outputFilename: action.payload
			}


		case 'setPreview':
			return {
				...state,
				isSchematicPreview: action.payload
			}


		default:
			return state

	}
}

