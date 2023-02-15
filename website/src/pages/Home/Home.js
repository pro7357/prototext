
import Intro from './components/Intro'
import Download from './components/Download'
import Features from './components/Features'
import Examples from './components/Examples'
import Manifest from './components/Manifest'
import Invest from './components/Invest'

import publicData from './components/data/public'

export default props => {

	return (
		<>

			<Intro/>

			<Download/>

			<Features/>

			<Examples publicData={publicData}/>

			<Manifest/>

			<Invest publicData={publicData}/>

		</>
	)
}