import { create } from 'zustand'
import {
	InsertarProductoColor,
	MostrarProductoColores,
	EliminarProductoColor,
	EliminarProductoColoresPorProducto,
} from '../autoBarrell'

export const useProductosColoresStore = create((set, get) => ({
	dataproductoscolores: [],
	parametros: {},

	mostrarProductoColores: async (p) => {
		const response = await MostrarProductoColores(p)
		set({ dataproductoscolores: response || [] })
		set({ parametros: p })
		return response
	},

	insertarProductoColor: async (p) => {
		await InsertarProductoColor(p)
		const { mostrarProductoColores } = get()
		const { parametros } = get()
		if (parametros.id_producto) {
			await mostrarProductoColores(parametros)
		}
	},

	eliminarProductoColor: async (p) => {
		await EliminarProductoColor(p)
		const { mostrarProductoColores } = get()
		const { parametros } = get()
		if (parametros.id_producto) {
			await mostrarProductoColores(parametros)
		}
	},

	eliminarProductoColoresPorProducto: async (p) => {
		await EliminarProductoColoresPorProducto(p)
	},

	limpiarProductoColores: () => {
		set({ dataproductoscolores: [] })
	},
}))
