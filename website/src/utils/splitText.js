

export default text => text
	? text.indexOf('\n') > -1
		? <>{text.split('\n').map(p=><div>{p}</div>)}</>
		: text
	: null