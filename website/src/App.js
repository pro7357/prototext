
import { store } from 'store'
import { Provider as ReduxProvider } from 'react-redux'

import { JssProvider } from 'react-jss'
import ThemeProvider from './theme/ThemeProvider'

import Layout from './components/Layout'
import Home from './pages/Home/Home'

export default () => {
	return (
		<ReduxProvider store={store}>
			<JssProvider>
				<ThemeProvider>
					<Layout>
						<Home/>
					</Layout>
				</ThemeProvider>
			</JssProvider>
		</ReduxProvider>
	)
}