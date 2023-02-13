
import { css } from 'sharedUtils/blockStyling'
import getStylingSamples from './getStylingSamples'

const pg = (f,i) => mute(`// ${f?`File. `:``}Page ${i}`)
const locale = (i,suffix) => mute(`// ${i>0?`Locale ${i}`:`Original locale`}${suffix||``}`)
const p = (i,q) => `${q}Paragraph ${i}${q}`
const sp = (i,q) => `{ ${q}s${q}:s, ${q}v${q}:${p(i,q)} }`
const mute = (c) => `<span>${c}</span>`
const t = mute(`...`)


const styleSamplesIntro =
`Unstyled text presented as a string.

Styled text presented as an object.
s - style, type: number.
v - text value, type: string.

Available style options:`

const stylingSamples = getStylingSamples({
	useIndexAsKey: true,
	ext:'js' // & json
})

const sInh = `Only the first locale contain styling data. It's assumed that other locales inherit these rules by default.`

const sl = styleSamplesIntro + `\n\n` + stylingSamples+ css(true)


export default {


'0-0-0':(q,prefix)=>
`${pg(true,1)}
${prefix}[
	${p(1,q)},
	${p(2,q)},
	${p(3,q)},
	${t}
]

${pg(true,2)}
${prefix}[${t}]`,



'1-0-0':(q,prefix)=>
`${pg(true,1)}
${prefix}[

	${locale(1)}
	[
		${p(1,q)},
		${p(2,q)},
		${t}
	],

	${locale(2)}
	[
		${p(1,q)},
		${p(2,q)},
		${t}
	],

]

${pg(true,2)}
${prefix}[${t}]`,



'0-1-0':(q,prefix)=>
`${pg(true,1)}
${prefix}[
	${p(1,q)},
	${sp(2,q)},
	${sp(3,q)},
	${t}
]

${pg(true,2)}
${prefix}[${t}]

${sl}`,



'0-0-1':(q,prefix)=>
`${prefix}[

	${pg(false,1)}
	[
		${p(1,q)},
		${p(2,q)},
		${p(3,q)},
		${t}
	],

	${pg(false,2)}
	[${t}]

]`,



'1-1-0':(q,prefix)=>
`${pg(true,1)}
${prefix}[

	${locale(1)}
	[
		${p(1,q)},
		${sp(2,q)},
		${sp(3,q)},
		${t}
	],

	${locale(2)}
	[
		${p(1,q)},
		${p(2,q)},
		${p(3,q)},
		${t}
	],

]

${pg(true,2)}
${prefix}[${t}]

${sInh}

${sl}`,



'0-1-1':(q,prefix)=>
`${prefix}[

	${pg(false,1)}
	[
		${p(1,q)},
		${sp(2,q)},
		${t}
	],

	${pg(false,2)}
	[
		${sp(1,q)},
		${sp(2,q)},
		${t}
	],

]

${sl}`,



'1-0-1':(q,prefix)=>
`${prefix}[

	${pg(false,1)}
	[

		${locale(1)}
		[
			${p(1,q)},
			${p(2,q)},
			${t}
		],

		${locale(2)}
		[
			${p(1,q)},
			${p(2,q)},
			${t}
		],

	],

	${pg(false,2)}
	[${t}]

]
`,



'1-1-1':(q,prefix)=>
`${prefix}[

	${pg(false,1)}
	[

		${locale(1)}
		[
			${p(1,q)},
			${sp(2,q)},
			${sp(3,q)},
			${t}
		],

		${locale(2)}
		[
			${p(1,q)},
			${p(2,q)},
			${p(3,q)},
			${t}
		],

	],

	${pg(false,2)}
	[${t}]

]

${sInh}

${sl}`,


}