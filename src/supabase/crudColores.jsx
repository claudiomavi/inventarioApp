import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'

export const InsertarColores = async (p) => {
	const { error } = await supabase.from('colores').insert(p)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
		})
	}
}

export const MostrarColores = async (p) => {
	const { data } = await supabase
		.from('colores')
		.select()
		.eq('id_empresa', p.id_empresa)
		.order('id', { ascending: true })

	return data
}

export const EliminarColores = async (p) => {
	const { error } = await supabase.from('colores').delete().eq('id', p.id)

	if (error) {
		alert('Error al eliminar', error.message)
	}
}

export const EditarColores = async (p) => {
	const { error } = await supabase.from('colores').update(p).eq('id', p.id)

	if (error) {
		alert('Error al editar colores', error.message)
	}
}

export const BuscarColores = async (p) => {
	const { data } = await supabase
		.from('colores')
		.select()
		.eq('id_empresa', p.id_empresa)
		.ilike('color', '%' + p.color + '%')

	return data
}
