import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeContextProvider } from './autoBarrell.js'

const queryClient = new QueryClient()

const container = document.getElementById('root')

if (!container._root) {
	container._root = createRoot(container)
}

container._root.render(
	<StrictMode>
		<BrowserRouter>
			<ThemeContextProvider>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ThemeContextProvider>
		</BrowserRouter>
	</StrictMode>
)
