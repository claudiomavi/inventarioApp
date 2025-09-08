import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'

export const InsertarProductos = async (p) => {
	const { error } = await supabase.rpc('insertarproductos', p)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
		})
	}
}

export const MostrarProductos = async (p) => {
	const { data } = await supabase
		.from('productos')
		.select()
		.eq('id_empresa', p.id_empresa)
		.order('id', { ascending: true })

	return data
}

export const EliminarProductos = async (p) => {
	const { error } = await supabase.from('productos').delete().eq('id', p.id)

	if (error) {
		alert('Error al eliminar', error.message)
	}
}

export const EditarProductos = async (p) => {
	const { error } = await supabase.from('productos').update(p).eq('id', p.id)

	if (error) {
		alert('Error al editar producto', error.message)
	}
}

export const BuscarProductos = async (p) => {
	const { data } = await supabase
		.from('productos')
		.select()
		.eq('id_empresa', p.id_empresa)
		.ilike('descripcion', '%' + p.descripcion + '%')

	return data
}
