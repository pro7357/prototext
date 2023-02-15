
const handleOpen = require('./handleMenuFileOpen')
const handleMenuFileSave = require('./handleMenuFileSave')
const handleMenuFileImport = require('./handleMenuFileImport')



module.exports = ({ windows, app, getTargetWindow, isMac }) => [
	...(isMac
		? [
				{
					label: app.name,
					submenu: [
						{ role: 'about', label: 'About' },
						{ type: 'separator' },
						{
							label: 'Settings',
							click: () => getTargetWindow().webContents.send('showSettings'),
						},
						{ type: 'separator' },
						{ role: 'hide' },
						{ role: 'hideOthers' },
						{ role: 'unhide' },
						{ type: 'separator' },
						{ role: 'quit' }
					],
				}
		  ]
		: []),
	{
		label: 'File',
		submenu: [
			{
				label: 'New Window',
				accelerator: isMac ? 'Cmd+N' : 'CTRL+N',
				click: () => {
					require('./createWindow')({windows, app})
				},
			},
			{ type: 'separator' },
			{
				label: 'Open',
				accelerator: isMac ? 'Cmd+O' : 'CTRL+O',
				click: () => {
					handleOpen(getTargetWindow(),app)
				},
			},
			{
				"label":"Open Recent",
				"role":"recentdocuments",
				"submenu":[
					{
						"label":"Clear",
						"role":"clearrecentdocuments"
					}
				]
			},
			{
				"label":"Import",
				"submenu":[
					{
						"label":"Another PTXT file (without protection)",
						click: () => {
							handleMenuFileImport(getTargetWindow(), app, 'ptxt')
						},
					}
				]
			},
			{
				type: 'separator',
			},
			{
				label: 'Save',
				accelerator: isMac ? 'Cmd+S' : 'CTRL+S',
				click: () => {
					handleMenuFileSave(false, getTargetWindow(), app)
				},
			},
			{
				label: 'Save As...',
				accelerator: isMac ? 'Shift+Cmd+S' : 'Shift+CTRL+S',
				click: () => {
					handleMenuFileSave(true, getTargetWindow())
				},
			},
			{ type: 'separator' },
			{
				label: 'Protect Data',
				click: () => getTargetWindow().webContents.send('showProtector'),
			},
			{ type: 'separator' },
			{
				label: 'Export Data',
				accelerator: isMac ? 'Cmd+E' : 'CTRL+E',
				click: () => getTargetWindow().webContents.send('showExporter'),
			},
			{ type: 'separator' },
			{
				label: 'Reset',
				click: () => {
					let targetWindow = getTargetWindow()
					targetWindow.filePath = null
					targetWindow.webContents.send('reset')
				},
			},
			{ type: 'separator' },
			{ role: 'close' },
			...(!isMac
				? [
					{ type: 'separator' },
					{
						label: 'Settings',
						click: () => getTargetWindow().webContents.send('showSettings'),
					},
				]
				: []
			)
		],
	},
	{
		label: 'Edit',
		submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			...(isMac
				? [
						{ role: 'delete' },
						{ role: 'selectAll' },
						{ type: 'separator' },
						{
							label: 'Speech',
							submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
						},
				  ]
				: [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
			{ type: 'separator' },
			{
				label: 'Find & Filter content',
				accelerator: isMac ? 'Cmd+F' : 'CTRL+F',
				click: () => getTargetWindow().webContents.send('showEditorTopbar'),
			},
			{ type: 'separator' },
			{
				label: 'Toggle Spellchecker',
				click: () => getTargetWindow().webContents.send('toggleSpellchecker'),
			}
		],
	},
	{
		label: 'View',
		submenu: [
			{
				role: 'resetzoom',
			},
			{
				role: 'zoomin',
			},
			{
				role: 'zoomout',
			},
			{
				label: 'Full Screen',
				role: 'togglefullscreen',
			},
			{
				type: 'separator',
			},
			{
				label: 'Toggle Theme',
				accelerator: isMac ? 'Cmd+T' : 'CTRL+T',
				click: () => getTargetWindow().webContents.send('toggleTheme'),
			},
			{
				label: 'Toggle Scrollbars',
				click: () => getTargetWindow().webContents.send('toggleScrollbarsMode'),
			},
			{
				label: 'Toggle Menu design',
				click: () => getTargetWindow().webContents.send('toggleCompactMenuMode'),
			},
			{type: 'separator'},
			{
				type: 'radio',
				label: 'One Page view',
				accelerator: isMac ? 'Cmd+1' : 'CTRL+1',
				checked: true,
				click: () => getTargetWindow().webContents.send('switchPageView',0),
			},
			{
				type: 'radio',
				label: 'Two Pages view',
				accelerator: isMac ? 'Cmd+2' : 'CTRL+2',
				click: () => getTargetWindow().webContents.send('switchPageView',1),
			},
			{
				type: 'radio',
				label: 'Localization view',
				accelerator: isMac ? 'Cmd+3' : 'CTRL+3',
				click: () => getTargetWindow().webContents.send('switchPageView',2),
			},
			{type: 'separator'},
			{
				label: 'Presentation mode',
				accelerator: isMac ? 'Cmd+P' : 'CTRL+P',
				click: () => getTargetWindow().webContents.send('togglePresenter'),
			},
		],
	},
	 {
		label: 'Help',
		submenu: [
			{
				role: 'reload',
				label: 'Restart App',
				accelerator: isMac ? 'Shift+Cmd+R' : 'Shift+CTRL+R',
			},
			{
				role: 'toggledevtools',
			},
			{
				type: 'separator',
			},
			{
				label: 'Help and Shortcuts map',
				accelerator: isMac ? 'Cmd+H' : 'CTRL+H',
				click: () => getTargetWindow().webContents.send('showHelper'),
			},
		]
	 }
]