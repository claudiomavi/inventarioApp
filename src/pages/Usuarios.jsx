import { useQuery } from '@tanstack/react-query'
import {
	UsuariosTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useUsuariosStore,
	BloqueoPagina,
} from '../autoBarrell'

export function Usuarios() {
	const {
		mostrarUsuariosTodos,
		buscarUsuarios,
		datausuarios,
		buscador,
		mostrarModulos,
		datapermisos,
	} = useUsuariosStore()
	const { dataempresa } = useEmpresaStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Marca de productos')
	)

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar usuarios todos'],
		queryFn: () => mostrarUsuariosTodos({ _id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _buscarusuarios } = useQuery({
		queryKey: [
			'buscar usuarios',
			{ _id_empresa: dataempresa?.id, buscador: buscador },
		],
		queryFn: () =>
			buscarUsuarios({ _id_empresa: dataempresa?.id, buscador: buscador }),
		enabled: dataempresa.id != null,
	})

	const { data: _datamodulos } = useQuery({
		queryKey: ['mostrar modulos'],
		queryFn: mostrarModulos,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <UsuariosTemplate data={datausuarios} />
}
