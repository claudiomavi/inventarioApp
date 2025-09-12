import { create } from 'zustand'
import {
	BuscarProductos,
	EditarProductos,
	EliminarProductos,
	InsertarProductos,
	MostrarProductos,
} from '../autoBarrell'

export const useProductosStore = create((set, get) => ({
	buscador: '',
	setBuscador: (p) => {
		set({ buscador: p })
	},

	dataproductos: [],
	productosItemSelect: [],
	parametros: {},

	mostrarProductos: async (p) => {
		const response = await MostrarProductos(p)

		set({ dataproductos: response })
		set({ productosItemSelect: response[0] })
		set({ parametros: p })

		return response
	},

	selectProductos: (p) => {
		set({ productosItemSelect: p })
	},

	insertarProductos: async (p) => {
		await InsertarProductos(p)

		const { mostrarProductos } = get()
		const { parametros } = get()
		set(mostrarProductos(parametros))
	},

	eliminarProductos: async (p) => {
		await EliminarProductos(p)

		const { mostrarProductos } = get()
		const { parametros } = get()
		set(mostrarProductos(parametros))
	},

	editarProductos: async (p) => {
		await EditarProductos(p)

		const { mostrarProductos } = get()
		const { parametros } = get()
		set(mostrarProductos(parametros))
	},

	buscarProductos: async (p) => {
		const response = await BuscarProductos(p)

		set({ dataproductos: response })
		return response
	},
}))
