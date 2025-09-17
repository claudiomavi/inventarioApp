import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'

export const InsertarKardex = async (p) => {
	const { error } = await supabase.from('kardex').insert(p)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
		})
	}
}

export const MostrarKardex = async (p) => {
	const { data } = await supabase
		.rpc('mostrarkardexempresa', p)
		.order('id', { ascending: false })

	return data
}

export const EliminarKardex = async (p) => {
	const { error } = await supabase.from('kardex').delete().eq('id', p.id)

	if (error) {
		alert('Error al eliminar', error.message)
	}
}

export const EditarKardex = async (p) => {
	const { error } = await supabase.from('kardex').update(p).eq('id', p.id)

	if (error) {
		alert('Error al editar kardex', error.message)
	}
}

export const BuscarKardex = async (p) => {
	const { data } = await supabase.rpc('buscarkardexempresa', p)

	return data
}
