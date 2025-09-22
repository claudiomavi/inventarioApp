import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	SpinnerLoader,
	useEmpresaStore,
	useFechasInventariosStore,
	useUsuariosStore,
	FechasInventariosTemplate,
} from '../autoBarrell'

export function FechasInventarios() {
	const {
		mostrarFechasInventarios,
		datafechasinventarios,
		buscarFechasInventarios,
		buscador,
	} = useFechasInventariosStore()
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Fechas inventarios')
	)

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar fechas inventarios', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarFechasInventarios({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _buscardata } = useQuery({
		queryKey: [
			'buscar fechas inventarios',
			{ id_empresa: dataempresa.id, fecha: buscador },
		],
		queryFn: () =>
			buscarFechasInventarios({ id_empresa: dataempresa.id, fecha: buscador }),
		enabled: dataempresa.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <FechasInventariosTemplate data={datafechasinventarios} />
}
