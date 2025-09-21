import { create } from 'zustand'
import {
	BuscarColores,
	EditarColores,
	EliminarColores,
	InsertarColores,
	MostrarColores,
} from '../autoBarrell'

export const useColoresStore = create((set, get) => ({
	buscador: '',
	setBuscador: (p) => {
		set({ buscador: p })
	},

	datacolores: [],
	coloresItemSelect: [],
	parametros: {},

	mostrarColores: async (p) => {
		const response = await MostrarColores(p)

		set({ datacolores: response })
		set({ coloresItemSelect: response[0] })
		set({ parametros: p })

		return response
	},

	selectColores: (p) => {
		set({ coloresItemSelect: p })
	},

	insertarColores: async (p) => {
		await InsertarColores(p)

		const { mostrarColores } = get()
		const { parametros } = get()
		set(mostrarColores(parametros))
	},

	eliminarColores: async (p) => {
		await EliminarColores(p)

		const { mostrarColores } = get()
		const { parametros } = get()
		set(mostrarColores(parametros))
	},

	editarColores: async (p) => {
		await EditarColores(p)

		const { mostrarColores } = get()
		const { parametros } = get()
		set(mostrarColores(parametros))
	},

	buscarColores: async (p) => {
		const response = await BuscarColores(p)

		set({ datacolores: response })
		return response
	},
}))
