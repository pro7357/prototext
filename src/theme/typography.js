
const families = {
	sans: {
		id: 'IBM Plex Sans',
		default: 'sans-serif'
	},
	serif: {
		id: 'IBM Plex Serif',
		default: 'serif'
	}
}


const weights = {
	normal: 400,
	medium: 500,
	bold  : 700,
}


const styles = {
	normal: 'normal',
	italic: 'italic'
}


const localFonts = [

	// Sans serif:

	// Normal
	{
		family: families.sans,
		weight: weights.normal,
		style: styles.normal,
	},

	// Normal italics
	{
		family: families.sans,
		weight: weights.normal,
		style: styles.italic
	},

	// Bold
	{
		family: families.sans,
		weight: weights.bold,
		style: styles.normal
	},

	// Serif: unused currently
	// {
	// 	family: families.serif,
	// 	weight: weights.bold,
	// 	style: styles.normal
	// }

]


const localFontsCss = localFonts.reduce((done, cur) => {

	let fileName = `${cur.family.id.toLowerCase().replace(/\s/g, '-')}-${cur.weight}-${cur.style}.ttf`

	return done.concat({
		fontFamily: cur.family.id,
		src: `url('./assets/fonts/${fileName}') format('truetype')`,
		fontWeight: cur.weight,
		fontStyle: cur.style,
	})

}, [])


export default {

	localFontsCss,

	fonts: {
		primary: `"${families.sans.id}", ${families.sans.default}`,
		//secondary: `"${families.serif.id}", ${families.serif.default}`,
	},

	sizes: {
		default: 18,
	},

	weights,

}