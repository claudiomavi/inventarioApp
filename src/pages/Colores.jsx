import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	ColoresTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useColoresStore,
	useUsuariosStore,
} from '../autoBarrell'

export function Colores() {
	const { mostrarColores, datacolores, buscarColores, buscador } =
		useColoresStore()
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Colores')
	)

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar colores', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarColores({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _buscardata } = useQuery({
		queryKey: [
			'buscar colores',
			{ id_empresa: dataempresa.id, color: buscador },
		],
		queryFn: () =>
			buscarColores({ id_empresa: dataempresa.id, color: buscador }),
		enabled: dataempresa.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <ColoresTemplate data={datacolores} />
}
