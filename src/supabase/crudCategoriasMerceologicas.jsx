import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'

export const InsertarCategoriasMerceologicas = async (p) => {
	const { error } = await supabase.from('categorias_merceologicas').insert(p)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
		})
	}
}

export const MostrarCategoriasMerceologicas = async (p) => {
	const { data } = await supabase
		.from('categorias_merceologicas')
		.select()
		.eq('id_empresa', p.id_empresa)
		.order('id', { ascending: true })

	return data
}

export const EliminarCategoriasMerceologicas = async (p) => {
	const { error } = await supabase
		.from('categorias_merceologicas')
		.delete()
		.eq('id', p.id)

	if (error) {
		alert('Error al eliminar', error.message)
	}
}

export const EditarCategoriasMerceologicas = async (p) => {
	const { error } = await supabase
		.from('categorias_merceologicas')
		.update(p)
		.eq('id', p.id)

	if (error) {
		alert('Error al editar categorias merceologicas', error.message)
	}
}

export const BuscarCategoriasMerceologicas = async (p) => {
	const { data } = await supabase
		.from('categorias_merceologicas')
		.select()
		.eq('id_empresa', p.id_empresa)
		.ilike('descripcion', '%' + p.descripcion + '%')

	return data
}
