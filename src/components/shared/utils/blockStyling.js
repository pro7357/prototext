
import { isImage } from 'globalUtils/fileTypes'

export const styles = [
	{
		index: 1,
		sample: `Important`,
		key: `!`,
		tag: `red`,
		kFnVisual: null,
		kFnOutput: null,
		vFnVisual: null,
		vFnOutput: null
	},
	{
		index: 2,
		sample: `Question`,
		key: `?`,
		tag: `orange`,
		kFnVisual: null,
		kFnOutput: null,
		vFnVisual: null,
		vFnOutput: null
	},
	{
		index: 3,
		sample: `Positive`,
		key: `+`,
		tag: `green`,
		kFnVisual: null,
		kFnOutput: null,
		vFnVisual: null,
		vFnOutput: null
	},
	{
		index: 4,
		sample: `Negative`,
		key: `-`,
		tag: `blue`,
		kFnVisual: null,
		kFnOutput: null,
		vFnVisual: null,
		vFnOutput: null
	},
	{
		index: 5,
		sample: `Muted`,
		key: `/`,
		txtKey: `⨯`,
		keyCode: 73, // CMD + I
		tag: `gray`,
		kFnVisual: {
			md: key => ``,
		},
		kFnOutput: {
			md: key => ``,
		},
		vFnVisual: {
			md: v => `<span>${v}</span>`,
		},
		vFnOutput:  {
			md: v => `<gray>${v}</gray>`,
		},
	},
	{
		index: 6,
		sample: `Bold`,
		key: `*`,
		keyCode: 66, // CMD + B
		tag: `bold`,
		kFnVisual: {
			md: key => ``,
		},
		kFnOutput: {
			md: key => ``,
		},
		vFnVisual: {
			md: v => `<b>**${v}**</b>`,
		},
		vFnOutput:  {
			md: v => `**${v}**`,
		},
	},
	{
		index: 7,
		sample: `Heading`,
		key: `#`,
		keyCode: 51,
		tag: `h`,
		kFnVisual: {
			md: key => ``
		},
		kFnOutput: {
			md: key => `###`,
		},
		vFnVisual: {
			md: v => `### ${v}`,
		},
		vFnOutput:  {
			md: v => v,
		},
	},
	{
		index: 8,
		sample: `Link`,
		key: `@`,
		tag: `a`,
		isComplex: true,
		kFnVisual: {
			md: key => ``
		},
		kFnOutput: {
			md: key => ``,
		},
		vFnOutput: {
			md: (v,linkedFile) => {
				let link = linkedFile || v
				let isLinkImage = isImage(link)
				return `${isLinkImage?`!`:``}[${v}](${linkedFile||v})`
			},
			txt: (v,linkedFile) => `${v}\nLinked file: ${linkedFile}`
		},
	},
	{
		index: 9,
		key: ``,
		tag: `normal`,
		sample: `AI's response`,
		isHidden: true,
		kFnVisual: {
			md: key => ``,
			txt: key => ``,
		},
		kFnOutput: {
			md: key => ``,
			txt: key => ``,
		},
		vFnVisual: {
			md: v => `<normal>${v}</normal>`,
		},
	}
]

// Array of stylization keys including the zero option on demand.
export const getStyleKeys  = (includeZeroStyle) => {
	return (includeZeroStyle?['']:[]).concat(styles.reduce((done,cur,index) => {
		if(cur.isHidden) return done
		return done.concat(cur.key)
	},[]))
}


export const css = (visual) =>
`<style>

	${visual?`h,bold,a,gray,normal,`:``}red, orange, green, blue {
		display: inline-block;
		margin-right: 10px;
	}

	red    {color:red}
	orange {color:orange}
	green  {color:green}
	blue   {color:#0059ff}

	gray   {opacity:0.4; fontStyle: italic}
	${visual?`bold{font-weight:bold}`:``}
</style>`