import { create } from 'zustand'
import {
	BuscarProductos,
	EditarProductos,
	EliminarProductos,
	InsertarProductos,
	MostrarProductos,
	ReportInventarioValorado,
	ReportKardexEntradasSalidas,
	ReportStockBajoMinimo,
	ReportStockPorProducto,
	ReportStockProductosTodos,
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

	reportStockProductosTodos: async (p) => {
		const response = await ReportStockProductosTodos(p)

		return response
	},

	reportStockPorProducto: async (p) => {
		const response = await ReportStockPorProducto(p)

		return response
	},

	reportStockBajoMinimo: async (p) => {
		const response = await ReportStockBajoMinimo(p)

		return response
	},

	reportKardexEntradasSalidas: async (p) => {
		const response = await ReportKardexEntradasSalidas(p)

		return response
	},

	reportInventarioValorado: async (p) => {
		const response = await ReportInventarioValorado(p)

		return response
	},
}))
