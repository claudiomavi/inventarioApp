import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'

export const InsertarCategorias = async (p) => {
	const { error } = await supabase.rpc('insertarcategorias', p)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
		})
	}
}

export const MostrarCategorias = async (p) => {
	const { data } = await supabase
		.from('categorias')
		.select()
		.eq('id_empresa', p.id_empresa)
		.order('id', { ascending: true })

	return data
}

export const EliminarCategorias = async (p) => {
	const { error } = await supabase.from('categorias').delete().eq('id', p.id)

	if (error) {
		alert('Error al eliminar', error.message)
	}
}

export const EditarCategorias = async (p) => {
	const { error } = await supabase.from('categorias').update(p).eq('id', p.id)

	if (error) {
		alert('Error al editar categorias', error.message)
	}
}

export const BuscarCategorias = async (p) => {
	const { data } = await supabase
		.from('categorias')
		.select()
		.eq('id_empresa', p.id_empresa)
		.ilike('descripcion', '%' + p.descripcion + '%')

	return data
}
