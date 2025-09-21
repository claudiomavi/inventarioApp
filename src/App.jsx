import { ThemeProvider } from 'styled-components'
import {
	AuthContextProvider,
	MyRoutes,
	Light,
	Dark,
	ToggleThemeContext,
} from './autoBarrell'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App() {
	const { theme } = ToggleThemeContext()

	const themeStyle = theme === 'light' ? Light : Dark

	return (
		<>
			<ThemeProvider theme={themeStyle}>
				<AuthContextProvider>
					<MyRoutes />

					<ReactQueryDevtools initialIsOpen={false} />
				</AuthContextProvider>
			</ThemeProvider>
		</>
	)
}
