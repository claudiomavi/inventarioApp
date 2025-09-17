import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	MarcaTemplate,
	ReportesTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useMarcaStore,
	useUsuariosStore,
} from '../autoBarrell'

export function Reportes() {
	const { mostrarMarca, datamarca, buscarMarca, buscador } = useMarcaStore()
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Marca de productos')
	)

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar marca', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarMarca({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _buscardata } = useQuery({
		queryKey: [
			'buscar marca',
			{ id_empresa: dataempresa.id, descripcion: buscador },
		],
		queryFn: () =>
			buscarMarca({ id_empresa: dataempresa.id, descripcion: buscador }),
		enabled: dataempresa.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <ReportesTemplate data={datamarca} />
}
