import { create } from 'zustand'
import { InsertarUsuarios, supabase } from '../autoBarrell'

export const useUsuariosStore = create((set, get) => ({
	insertarUsuarioAdmin: async (p) => {
		const { data, error } = await supabase.auth.signUp({
			email: p.correo,
			password: p.pass,
		})
		console.log(data)
		if (error) return
		const datauser = await InsertarUsuarios({
			idauth: data.user.id,
			fecharegistro: new Date(),
			tipouser: 'admin',
		})
		return datauser
	},
}))
