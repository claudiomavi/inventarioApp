import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'

export const InsertarProductoColor = async (p) => {
	const { error } = await supabase.from('productos_colores').insert(p)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
		})
	}
}

export const MostrarProductoColores = async (p) => {
	const { data } = await supabase
		.from('productos_colores')
		.select(`id, id_producto, id_color, precio, id_empresa, colores(id, color)`)
		.eq('id_producto', p.id_producto)
		.order('id', { ascending: true })

	return data
}

export const EliminarProductoColor = async (p) => {
	const { error } = await supabase
		.from('productos_colores')
		.delete()
		.eq('id', p.id)

	if (error) {
		alert('Error al eliminar', error.message)
	}
}

export const EliminarProductoColoresPorProducto = async (p) => {
	const { error } = await supabase
		.from('productos_colores')
		.delete()
		.eq('id_producto', p.id_producto)

	if (error) {
		alert('Error al eliminar colores del producto', error.message)
	}
}

export const EditarProductoColor = async (p) => {
	const { error } = await supabase
		.from('productos_colores')
		.update({ precio: p.precio })
		.eq('id', p.id)

	if (error) {
		alert('Error al editar color del producto', error.message)
	}
}
