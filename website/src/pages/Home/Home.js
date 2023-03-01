
import Intro from './components/Intro2'
import Download from './components/Download'
import Features from './components/Features'
import UseCases from './components/UseCases'
import SharedDosc from './components/SharedDosc'
import Manifest from './components/Manifest'
import Invest from './components/Invest'
import QA from './components/QA'

import publicData from './components/data/public'


export default props => {

	return (
		<>

			<Intro/>

			<Download/>

			<Features/>

			<UseCases publicData={publicData}/>

			<Manifest/>

			<Invest publicData={publicData}/>

			<SharedDosc publicData={publicData}/>

			<QA/>

		</>
	)
}