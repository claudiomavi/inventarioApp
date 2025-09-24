import { supabase } from '../autoBarrell'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx'

export const ExportarInventarios = async (p) => {
	const { data, error } = await supabase.rpc('exportarinventario', {
		_id_empresa: p._id_empresa,
		_id_fecha_inventario: p.id_fecha_inventario,
	})

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Error exportando...',
			text: error.message,
		})
		return
	}

	if (!data || !data.length) {
		Swal.fire({
			icon: 'warning',
			title: 'No hay datos para exportar...',
			text: 'Selecciona una fecha de inventario con datos',
		})
		return
	}

	// Crear hoja de Excel
	const ws = XLSX.utils.json_to_sheet(data)
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, 'Inventario')

	// Descargar
	XLSX.writeFile(wb, `inventario_${p.fecha_inventario}.xlsx`)
}
