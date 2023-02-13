function download(text, name, type) {
	var a = document.getElementById('a')
	var file = new Blob([text], {type: type})
	a.href = URL.createObjectURL(file)
	a.download = name
}

{/* <a
	id='a'
	className={classes.textButton}
	onClick={() => {
		download(
			JSON.stringify(content[targetPageIndex]),
			content[targetPageIndex][0][1].toLowerCase() + '.json',
			'text/plain'
		)
	}}
>
	Download page as JSON
</a> */}