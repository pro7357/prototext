
import TextButton from 'sharedComponents/TextButton'
import Spinner from 'sharedComponents/Spinner'

export default props => {

	const {
		children,
		isLoading,
		onClick,
	} = props

	return (
		<TextButton
			isSmall
			isMuted
			onClick={e => {
				setTimeout(() => {
					onClick(e)
				}, 0)
			}}
		>
			{children}
			{isLoading && <Spinner isSmall/>}
		</TextButton>
	)

}
