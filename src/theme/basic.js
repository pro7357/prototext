
import palette from './palette'

export default i => ({

	background: {
		bottom: [
			palette.blueGrey.qw,
			palette.indigoGrey.np,
		][i],
		default: [
			palette.blueGrey.vb,
			palette.white
		][i],
		top: [
			palette.blueGrey.oi,
			palette.brown.xu
		][i],
		lockScreen: 'rgba(0,0,0,0.7)',
		rainbowGradient: palette.rainbowGradient,
		warmGradient: palette.warmGradient,
		coldGradient: palette.coldGradient
	},


	text: {
		active: [
			palette.white,
			palette.indigoGrey.qe,
		][i],
		default: [
			palette.blueGrey.mn,
			palette.indigoGrey.fw,
		][i],
		muted: [
			palette.blueGrey.df,
			palette.indigoGrey.sp
		][i],
		semiMuted: [
			palette.blueGrey.df,
			palette.indigoGrey.mm
		][i]
	},


	shadow: {
		default: [
			palette.blueGrey.nv,
			`rgba(130, 122, 157, 0.27)`
		][i],
		rainbow: palette.rainbowGradient
	},


	menuItem: {
		background: [
			palette.blueGrey.oi,
			palette.indigoGrey.np,
		][i],
		active: {
			background: [
				palette.blueGrey.lp,
				palette.indigoGrey.tv
			][i],
		}
	},


	icon: [
		palette.blueGrey.ax,
		palette.indigoGrey.bs,
	][i],


	block: {
		background: [
			palette.blueGrey.qw,
			palette.indigoGrey.np,
		][i],
		prompt: {
			background: [
				palette.blueGrey.qw,
				palette.white
			][i],
		},
		link: {
			default: {
				shadow: [
					palette.blueGrey.nv,
					palette.indigoGrey.tv,
				][i]
			},
			active:{
				shadow: [
					palette.blue.bt,
					palette.blue.fr,
				][i]
			},
			focused:{
				shadow: [
					palette.green.fr,
					palette.green.lv,
				][i]
			},
		},
	},


	styledBlock: {
		quest: palette.gold.fr,
		alert: palette.red.fr,
		negative: palette.blue.fr,
		positive: palette.green.fr,
	},


	button: {
		background: [
			palette.blueGrey.oi,
			palette.indigoGrey.np,
		][i],
		focused: {
			background: [
				palette.blueGrey.lp,
				palette.brown.vf,
			][i],
		},
		notable: {
			color: palette.white,
			background: [
				palette.blue.bt,
				palette.blue.fr,
			][i],
			focused: {
				background: [
					palette.blue.ro,
					palette.blue.lv,
				][i],
			}
		},
		dangerous: {
			color: palette.white,
			background: palette.red.fr,
			focused: {
				background: palette.red.lv,
			}
		},
	},


	textButton: {
		color: [
			palette.blueGrey.oi,
			palette.indigoGrey.np,
		][i],
		active: {
			color: palette.green.fr,
		},
		notable: {
			color: [
				palette.blue.bt,
				palette.blue.fr,
			][i],
		},
		dangerous: {
			color: [
				palette.red.fr,
				palette.red.lv,
			][i],
		},
	},


	switch: {
		background: [
			palette.blueGrey.oi,
			palette.indigoGrey.tv,
		][i],
		focused: {
			background: [
				palette.blueGrey.lp,
				palette.brown.vf,
			][i],
		},
		active: {
			background: [
				palette.green.fr,
				palette.brown.ak,
			][i],
		},
	},


	tag: {
		background: [
			palette.blueGrey.oi,
			palette.indigoGrey.tv,
		][i],
		focused: {
			background: [
				palette.blueGrey.lp,
				palette.brown.vf,
			][i],
		},
		active: {
			background: [
				palette.green.fr,
				palette.brown.ak,
			][i],
		},
	},


	buttonGroup: {
		background: [
			palette.blueGrey.oi,
			palette.indigoGrey.tv,
		][i],
		focused: {
			background: [
				palette.blueGrey.lp,
				palette.brown.vf,
			][i],
		},
		active: {
			background: [
				palette.green.fr,
				palette.brown.ak,
			][i],
		},
	},


	input: {
		background: [
			palette.blueGrey.qw,
			palette.indigoGrey.np,
		][i],
		insideUIBlock: {
			background:[
				palette.blueGrey.nv,
				palette.indigoGrey.tv,
			][i],
		},
		focused: {
			background: [
				palette.blueGrey.lp,
				palette.brown.vf,
			][i],
		},
		wrongValue: {
			color: [
				palette.red.fr,
				palette.red.lv,
			][i],
		}
	},


	textAnalysisHint: {
		background: [
			palette.gold.bb,
			palette.gold.br,
		][i],
		color: palette.gold.dr,
	},


	selection: {
		background: [
			palette.gold.bb,
			palette.gold.br,
		][i],
		color: palette.black,
	},


	// The area is visible in Drag & Drop mode.
	// In other words: a "target" between the blocks.
	mda: [
		palette.blueGrey.ax,
		palette.green.lv,
	][i],

	fakeScrollbar: [
		palette.blueGrey.qw,
		palette.indigoGrey.np,
	][i],

	rounded: 4,
	round: 32,

})