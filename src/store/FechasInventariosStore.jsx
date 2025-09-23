import { create } from 'zustand'
import {
	BuscarFechasInventarios,
	EditarFechasInventarios,
	EliminarFechasInventarios,
	FechaInventarioActivo,
	InsertarFechasInventarios,
	MostrarFechasInventarios,
} from '../autoBarrell'

export const useFechasInventariosStore = create((set, get) => ({
	buscador: '',
	setBuscador: (p) => {
		set({ buscador: p })
	},

	datafechasinventarios: [],
	fechasinventariosItemSelect: [],
	parametros: {},
	datafechainventrioactivo: [],

	mostrarFechasInventarios: async (p) => {
		const response = await MostrarFechasInventarios(p)

		set({ datafechasinventarios: response })
		set({ fechasinventariosItemSelect: response[0] })
		set({ parametros: p })

		return response
	},

	selectFechasInventarios: (p) => {
		set({ fechasinventariosItemSelect: p })
	},

	insertarFechasInventarios: async (p) => {
		await InsertarFechasInventarios(p)

		const { mostrarFechasInventarios } = get()
		const { parametros } = get()
		set(mostrarFechasInventarios(parametros))
	},

	eliminarFechasInventarios: async (p) => {
		await EliminarFechasInventarios(p)

		const { mostrarFechasInventarios } = get()
		const { parametros } = get()
		set(mostrarFechasInventarios(parametros))
	},

	editarFechasInventarios: async (p) => {
		await EditarFechasInventarios(p)

		const { mostrarFechasInventarios } = get()
		const { parametros } = get()
		set(mostrarFechasInventarios(parametros))
	},

	buscarFechasInventarios: async (p) => {
		const response = await BuscarFechasInventarios(p)

		set({ datafechasinventarios: response })
		return response
	},

	fechaInventarioActivo: async (p) => {
		const response = await FechaInventarioActivo(p)

		set({ datafechainventrioactivo: response })
		return response
	},
}))
