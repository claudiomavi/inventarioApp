import styled, { ThemeProvider } from 'styled-components'
import {
	AuthContextProvider,
	ThemeContext,
	MyRoutes,
	Light,
	Dark,
	Sidebar,
	MenuHambur,
} from './autoBarrell'
import { Device } from './styles/breackpoints'
import { useState } from 'react'

export default function App() {
	const [themeuse, setTheme] = useState('dark')
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const theme = themeuse === 'light' ? 'light' : 'dark'

	const themeStyle = theme === 'light' ? Light : Dark

	return (
		<>
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<ThemeProvider theme={themeStyle}>
					<AuthContextProvider>
						<Container className={sidebarOpen ? 'active' : ''}>
							<section className="ContentSidebar">
								<Sidebar
									state={sidebarOpen}
									setState={() => setSidebarOpen(!sidebarOpen)}
								/>
							</section>
							<section className="ContentMenuambur">
								<MenuHambur />
							</section>
							<section className="ContentRoutes">
								<MyRoutes />
							</section>
						</Container>
					</AuthContextProvider>
				</ThemeProvider>
			</ThemeContext.Provider>
		</>
	)
}

const Container = styled.main`
	display: grid;
	grid-template-columns: 1fr;
	background-color: ${({ theme }) => theme.bgtotal};
	.ContentSidebar {
		display: none;
	}
	.ContentMenuambur {
		display: block;
		position: absolute;
		left: 20px;
	}
	@media ${Device.tablet} {
		grid-template-columns: 65px 1fr;
		&.active {
			grid-template-columns: 220px 1fr;
		}
		.ContentSidebar {
			display: initial;
		}
		.ContentMenuambur {
			display: none;
		}
	}
	.ContentRoutes {
		grid-column: 1;
		width: 100%;
		@media ${Device.tablet} {
			grid-column: 2;
		}
	}
`
