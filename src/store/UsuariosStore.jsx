import { create } from 'zustand'
import {
	BuscarUsuarios,
	EditarUsuarios,
	EliminarUsuarios,
	InsertarAsignaciones,
	InsertarPermisos,
	InsertarUsuarios,
	MostrarModulos,
	MostrarPermisos,
	MostrarUsuarios,
	MostrarUsuariosTodos,
	supabase,
} from '../autoBarrell'

export const useUsuariosStore = create((set, get) => ({
	datausuarios: [],
	datamodulos: [],
	datapermisos: [],

	usuariosItemSelect: [],
	parametros: {},
	idusuario: 0,

	insertarUsuarioAdmin: async (p) => {
		const { data, error } = await supabase.auth.signUp({
			email: p.correo,
			password: p.pass,
		})
		if (error) return
		const datauser = await InsertarUsuarios({
			idauth: data.user.id,
			fecharegistro: new Date(),
			tipouser: 'admin',
		})
		return datauser
	},

	mostrarUsuarios: async () => {
		const response = await MostrarUsuarios()
		set({ idusuario: response.id })
		return response
	},
	buscador: '',
	setBuscador: (p) => {
		set({ buscador: p })
	},

	mostrarUsuariosTodos: async (p) => {
		const response = await MostrarUsuariosTodos(p)

		set({ datausuarios: response })
		set({ usuariosItemSelect: response[0] })
		set({ parametros: p })

		return response
	},

	selectUsuarios: (p) => {
		set({ usuariosItemSelect: p })
	},

	insertarUsuarios: async (parametrosAuth, p, datacheckpermisos) => {
		const { data, error } = await supabase.auth.signUp({
			email: parametrosAuth.correo,
			password: parametrosAuth.password,
		})
		if (error) return null

		const dataUserNew = await InsertarUsuarios({
			nombres: p.nombres,
			nro_doc: p.nrodoc,
			telefono: p.telefono,
			direccion: p.direccion,
			fecharegistro: new Date(),
			estado: 'activo',
			idauth: data.user.id,
			tipouser: p.tipouser,
			tipodoc: p.tipodoc,
		})

		await InsertarAsignaciones({
			id_empresa: p.id_empresa,
			id_usuario: dataUserNew.id,
		})

		datacheckpermisos.forEach(async (item) => {
			if (item.check) {
				let parametrospermisos = {
					id_usuario: dataUserNew.id,
					idmodulo: item.id,
				}
				await InsertarPermisos(parametrospermisos)
			}
		})

		await supabase.auth.signOut()
	},

	eliminarUsuarios: async (p) => {
		await EliminarUsuarios(p)

		const { mostrarUsuarios } = get()
		const { parametros } = get()
		set(mostrarUsuarios(parametros))
	},

	editarUsuarios: async (p) => {
		await EditarUsuarios(p)

		const { mostrarUsuarios } = get()
		const { parametros } = get()
		set(mostrarUsuarios(parametros))
	},

	buscarUsuarios: async (p) => {
		const response = await BuscarUsuarios(p)

		set({ datausuarios: response })
		return response
	},

	mostrarModulos: async () => {
		const response = await MostrarModulos()

		set({ datamodulos: response })
		return response
	},

	mostrarPermisos: async (p) => {
		const response = await MostrarPermisos(p)

		set({ datapermisos: response })
		return response
	},
}))
