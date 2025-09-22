export const convertirCapitalize = (input) => {
	return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
}

export const convertirFecha = (input) => {
	const date = new Date(input)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()

	return `${day}/${month}/${year}`
}

export const convertirFechaReversa = (input) => {
	if (input === undefined) return null

	const [day, month, year] = input.split('/')

	return `${year}-${month}-${day}`
}
