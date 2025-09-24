import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	MarcaTemplate,
	ReportesTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useFechasInventariosStore,
	useUsuariosStore,
} from '../autoBarrell'

export function Reportes() {
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()
	const { mostrarFechasInventarios } = useFechasInventariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Reportes')
	)

	const { data, isLoading, error } = useQuery({
		queryKey: ['mostrar fechas inventarios', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarFechasInventarios({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return (
		<ReportesTemplate
			data={data}
			dataempresa={dataempresa}
		/>
	)
}
