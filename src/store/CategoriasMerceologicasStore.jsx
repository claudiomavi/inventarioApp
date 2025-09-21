import { create } from 'zustand'
import {
	BuscarCategoriasMerceologicas,
	EditarCategoriasMerceologicas,
	EliminarCategoriasMerceologicas,
	InsertarCategoriasMerceologicas,
	MostrarCategoriasMerceologicas,
} from '../autoBarrell'

export const useCategoriasMerceologicasStore = create((set, get) => ({
	buscador: '',
	setBuscador: (p) => {
		set({ buscador: p })
	},

	datacategoriasmerceologicas: [],
	categoriasmerceologicasItemSelect: [],
	parametros: {},

	mostrarCategoriasMerceologicas: async (p) => {
		const response = await MostrarCategoriasMerceologicas(p)

		set({ datacategoriasmerceologicas: response })
		set({ categoriasmerceologicasItemSelect: response[0] })
		set({ parametros: p })

		return response
	},

	selectCategoriasMerceologicas: (p) => {
		set({ categoriasmerceologicasItemSelect: p })
	},

	insertarCategoriasMerceologicas: async (p) => {
		await InsertarCategoriasMerceologicas(p)

		const { mostrarCategoriasMerceologicas } = get()
		const { parametros } = get()
		set(mostrarCategoriasMerceologicas(parametros))
	},

	eliminarCategoriasMerceologicas: async (p) => {
		await EliminarCategoriasMerceologicas(p)

		const { mostrarCategoriasMerceologicas } = get()
		const { parametros } = get()
		set(mostrarCategoriasMerceologicas(parametros))
	},

	editarCategoriasMerceologicas: async (p) => {
		await EditarCategoriasMerceologicas(p)

		const { mostrarCategoriasMerceologicas } = get()
		const { parametros } = get()
		set(mostrarCategoriasMerceologicas(parametros))
	},

	buscarCategoriasMerceologicas: async (p) => {
		const response = await BuscarCategoriasMerceologicas(p)

		set({ datacategoriasmerceologicas: response })
		return response
	},
}))
