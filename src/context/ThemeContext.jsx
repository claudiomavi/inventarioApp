import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState('dark')

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const ToggleThemeContext = () => {
	return useContext(ThemeContext)
}
