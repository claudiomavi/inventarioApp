import { create } from 'zustand'
import {
	BuscarUsuarios,
	DataModulosConfiguracion,
	EditarUsuarios,
	EliminarPermisos,
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
	datapermisosedit: [],

	usuariosItemSelect: [],
	parametros: {},
	idusuario: 0,

	buscador: '',
	setBuscador: (p) => {
		set({ buscador: p })
	},

	insertarUsuarioAdmin: async (p) => {
		const { data, error } = await supabase.auth.signUp({
			email: p.correo,
			password: p.pass,
		})
		if (error) return
		const datauser = await InsertarUsuarios({
			idauth: data.user.id,
			fecharegistro: new Date(),
			tipouser: 'superadmin',
		})
		return datauser
	},

	mostrarUsuarios: async () => {
		const response = await MostrarUsuarios()
		set({ idusuario: response.id })
		return response
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
			fecharegistro: new Date(),
			estado: 'activo',
			idauth: data.user.id,
			tipouser: p.tipouser,
			correo: p.correo,
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

	editarUsuarios: async (p, datacheckpermisos, id_empresa) => {
		await EditarUsuarios(p)
		await EliminarPermisos({ id_usuario: p.id })

		datacheckpermisos.forEach(async (item) => {
			if (item.check) {
				let parametrospermisos = {
					id_usuario: p.id,
					idmodulo: item.id,
				}
				await InsertarPermisos(parametrospermisos)
			}
		})

		const { mostrarUsuariosTodos } = get()
		set(mostrarUsuariosTodos({ _id_empresa: id_empresa }))
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

		let allDocs = []

		DataModulosConfiguracion.map((item) => {
			const statePermiso = response.some((element) =>
				element.modulos.nombre.includes(item.title)
			)
			if (statePermiso) {
				allDocs.push({ ...item, state: true })
			} else {
				allDocs.push({ ...item, state: false })
			}
		})

		DataModulosConfiguracion.splice(0, DataModulosConfiguracion.length)
		DataModulosConfiguracion.push(...allDocs)

		return response
	},

	mostrarPermisosEditando: async (p) => {
		const response = await MostrarPermisos(p)

		set({ datapermisosedit: response })
		return response
	},
}))
