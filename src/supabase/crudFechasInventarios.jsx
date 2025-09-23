import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'

export const InsertarFechasInventarios = async (p) => {
	const { error } = await supabase.from('fechas-inventarios').insert(p)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Error al insertar...',
			text: error.message,
		})
	}
}

export const MostrarFechasInventarios = async (p) => {
	const { data } = await supabase
		.from('fechas-inventarios')
		.select()
		.eq('id_empresa', p.id_empresa)
		.order('id', { ascending: false })

	return data
}

export const EliminarFechasInventarios = async (p) => {
	const { error } = await supabase
		.from('fechas-inventarios')
		.delete()
		.eq('id', p.id)

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Error al eliminar...',
			text: error.message,
		})
	}
}

export const EditarFechasInventarios = async (p) => {
	const { error } = await supabase
		.from('fechas-inventarios')
		.update(p)
		.eq('id', p.id)

	if (error) {
		Swal.fire({
			icon: 'Error al editar',
			title: 'Oops...',
			text: error.message,
		})
	}
}

export const BuscarFechasInventarios = async (p) => {
	const { data } = await supabase
		.from('fechas-inventarios')
		.select()
		.eq('id_empresa', p.id_empresa)
		.ilike('fecha', '%' + p.fecha + '%')

	return data
}

export const FechaInventarioActivo = async (p) => {
	const { data, error } = await supabase
		.from('fechas-inventarios')
		.select('*')
		.eq('id_empresa', p.id_empresa)
		.eq('activo', true)
		.single()

	if (error) return

	return data
}
