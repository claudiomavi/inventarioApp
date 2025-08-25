import { create } from 'zustand'
import { ContarUsuariosXempresa, MostrarEmpresa } from '../autoBarrell'

export const useEmpresaStore = create((set) => ({
	contadorusuarios: 0,
	dataempresa: [],
	mostrarEmpresa: async (p) => {
		const response = await MostrarEmpresa(p)
		set({ dataempresa: response })
		return response
	},
	contarusuariosXempresa: async (p) => {
		const response = await ContarUsuariosXempresa(p)
		set({ contadorusuarios: response })
		return response
	},
}))
