import Swal from 'sweetalert2'
import { ObtenerIdAuthSupabase, supabase } from '../autoBarrell'

export const InsertarUsuarios = async (p) => {
	const { data, error } = await supabase
		.from('usuarios')
		.insert(p)
		.select()
		.maybeSingle()
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Error al insertar usuario ' + error.message,
		})
	}
	if (data) return data
}

export const MostrarUsuarios = async () => {
	const idAuthSupabase = await ObtenerIdAuthSupabase()
	const { data } = await supabase
		.from('usuarios')
		.select()
		.eq('idauth', idAuthSupabase)
		.maybeSingle()

	if (data) return data
}

export const MostrarUsuariosTodos = async (p) => {
	const { data } = await supabase.rpc('mostrarpersonal', p)

	if (data) return data
}

export const EliminarUsuarios = async (p) => {
	const { error } = await supabase.from('usuarios').delete().eq('id', p.id)

	if (error) {
		alert('Error al eliminar', error.message)
	}
}

export const EditarUsuarios = async (p) => {
	const { error } = await supabase.from('usuarios').update(p).eq('id', p.id)

	if (error) {
		alert('Error al editar usuarios', error.message)
	}
}

export const BuscarUsuarios = async (p) => {
	const { data } = await supabase.rpc('buscarpersonal', p)

	return data
}

// tabla asignaciones
export const InsertarAsignaciones = async (p) => {
	const { error } = await supabase.from('asignarempresa').insert(p)
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Error al asignar usuario ' + error.message,
		})
	}
}

// tabla permisos
export const InsertarPermisos = async (p) => {
	const { error } = await supabase.from('permisos').insert(p)
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Error al asignar permisos ' + error.message,
		})
	}
}

export const MostrarPermisos = async (p) => {
	const { data } = await supabase
		.from('permisos')
		.select(`id, id_usuario, idmodulo, modulos(nombre)`)
		.eq('id_usuario', p.id_usuario)

	return data
}

export const EliminarPermisos = async (p) => {
	const { error } = await supabase
		.from('permisos')
		.delete()
		.eq('id_usuario', p.id_usuario)

	if (error) return alert('Error al eliminar', error)
}

export const MostrarModulos = async () => {
	const { data } = await supabase.from('modulos').select()
	return data
}
