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
	const { data } = await supabase.rpc('mostrarproductos', p)

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
	const { data } = await supabase.rpc('buscarproductos', {
		_id_empresa: p.id_empresa,
		buscador: p.descripcion,
	})

	return data
}

// reportes
export const ReportStockProductosTodos = async (p) => {
	const { data, error } = await supabase
		.from('productos')
		.select()
		.eq('id_empresa', p.id_empresa)

	if (error) return
	return data
}

export const ReportStockPorProducto = async (p) => {
	const { data, error } = await supabase
		.from('productos')
		.select()
		.eq('id_empresa', p.id_empresa)
		.eq('id', p.id)

	if (error) return
	return data
}

export const ReportStockBajoMinimo = async (p) => {
	const { data, error } = await supabase.rpc('mostrarkardexbajominimo', {
		_id_empresa: p.id_empresa,
	})

	if (error) return
	return data
}

export const ReportKardexEntradasSalidas = async (p) => {
	const { data, error } = await supabase.rpc('mostrarkardexempresa', p)

	if (error) return
	return data
}

export const ReportInventarioValorado = async (p) => {
	const { data, error } = await supabase.rpc('inventariovalorado', p)

	if (error) return
	return data
}
