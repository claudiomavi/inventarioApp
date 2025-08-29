import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'

export const InsertarMarca = async (p) => {
	const { error } = await supabase.rpc('insertarmarca', p)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
			footer: '<a href="">Agregue una nueva descripción</a>',
		})
	}
}

export const MostrarMarca = async (p) => {
	const { data } = await supabase
		.from('marca')
		.select()
		.eq('id_empresa', p.id_empresa)
		.order('id', { ascending: true })

	return data
}

export const EliminarMarca = async (p) => {
	const { error } = await supabase.from('marca').delete().eq('id', p.id)

	if (error) {
		alert('Error al eliminar', error.message)
	}
}

export const EditarMarca = async (p) => {
	const { error } = await supabase.from('marca').update(p).eq('id', p.id)

	if (error) {
		alert('Error al editar marca', error.message)
	}
}

export const BuscarMarca = async (p) => {
	const { data } = await supabase
		.from('marca')
		.select()
		.eq('id_empresa', p.id_empresa)
		.ilike('descripcion', '%' + p.descripcion + '%')

	return data
}
