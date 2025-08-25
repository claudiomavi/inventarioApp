import Swal from 'sweetalert2'
import { supabase } from '../autoBarrell'

export const MostrarEmpresa = async (p) => {
	const { data } = await supabase
		.from('asignarempresa')
		.select(`empresa(id, nombre, simbolomoneda)`)
		.eq('id_usuario', p.idusuario)
		.maybeSingle()

	if (data) return data
}

export const ContarUsuariosXempresa = async (p) => {
	const { data, error } = await supabase.rpc('contar_usuarios_por_empresa', {
		_id_empresa: p.id_empresa,
	})

	if (error) {
		return 0
	}

	return data ?? 0
}
