
import TextButton from 'sharedComponents/TextButton'

export default props => {

	const {
		label,
		action,
	} = props

	return (
		<TextButton
			isSmall
			isMuted
			onClick={e => {
				setTimeout(() => {
					action(e)
				}, 0)
			}}
		>
			{label}
		</TextButton>
	)

}
