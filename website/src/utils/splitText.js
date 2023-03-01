
import Link from 'components/Link'

export default text => {

	return (<>
		{text.split('\n').map(p=>{

			if(p) {
				let ap = p.indexOf('(')
				let bp = p.indexOf('[')
				if(ap === 0 && bp > -1) {
					p = <Link isInline isNotable url={p.slice(bp+1,-1)}>{p.slice(1,bp-1)}</Link>
				}
			}

			return (
				<span>
					{p}
				</span>
				)
		})}
	</>)

}