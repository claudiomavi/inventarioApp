import { create } from 'zustand'
import {
	BuscarCategorias,
	EditarCategorias,
	EliminarCategorias,
	InsertarCategorias,
	MostrarCategorias,
} from '../autoBarrell'

export const useCategoriasStore = create((set, get) => ({
	buscador: '',
	setBuscador: (p) => {
		set({ buscador: p })
	},

	datacategorias: [],
	categoriasItemSelect: [],
	parametros: {},

	mostrarCategorias: async (p) => {
		const response = await MostrarCategorias(p)

		set({ datacategorias: response })
		set({ categoriasItemSelect: response[0] })
		set({ parametros: p })

		return response
	},

	selectCategorias: (p) => {
		set({ categoriasItemSelect: p })
	},

	insertarCategorias: async (p) => {
		await InsertarCategorias(p)

		const { mostrarCategorias } = get()
		const { parametros } = get()
		set(mostrarCategorias(parametros))
	},

	eliminarCategorias: async (p) => {
		await EliminarCategorias(p)

		const { mostrarCategorias } = get()
		const { parametros } = get()
		set(mostrarCategorias(parametros))
	},

	editarCategorias: async (p) => {
		await EditarCategorias(p)

		const { mostrarCategorias } = get()
		const { parametros } = get()
		set(mostrarCategorias(parametros))
	},

	buscarCategorias: async (p) => {
		const response = await BuscarCategorias(p)

		set({ datacategorias: response })
	},
}))
