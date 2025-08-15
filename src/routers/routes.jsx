import { Routes, Route } from 'react-router-dom'
import { Home } from '../autoBarrell'

export function MyRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
		</Routes>
	)
}
