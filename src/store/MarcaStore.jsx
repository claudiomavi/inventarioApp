import { create } from 'zustand'
import {
	BuscarMarca,
	EditarMarca,
	EliminarMarca,
	InsertarMarca,
	MostrarMarca,
} from '../autoBarrell'

export const useMarcaStore = create((set, get) => ({
	buscador: '',
	setBuscador: (p) => {
		set({ buscador: p })
	},

	datamarca: [],
	marcaItemSelect: [],
	parametros: {},

	mostrarMarca: async (p) => {
		const response = await MostrarMarca(p)

		set({ datamarca: response })
		set({ marcaItemSelect: response[0] })
		set({ parametros: p })

		return response
	},

	selectMarca: (p) => {
		set({ marcaItemSelect: p })
	},

	insertarMarca: async (p) => {
		await InsertarMarca(p)

		const { mostrarMarca } = get()
		const { parametros } = get()
		set(mostrarMarca(parametros))
	},

	eliminarMarca: async (p) => {
		await EliminarMarca(p)

		const { mostrarMarca } = get()
		const { parametros } = get()
		set(mostrarMarca(parametros))
	},

	editarMarca: async (p) => {
		await EditarMarca(p)

		const { mostrarMarca } = get()
		const { parametros } = get()
		set(mostrarMarca(parametros))
	},

	buscarMarca: async (p) => {
		const response = await BuscarMarca(p)

		set({ datamarca: response })
		return response
	},
}))
