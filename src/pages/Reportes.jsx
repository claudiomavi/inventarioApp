import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	MarcaTemplate,
	ReportesTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useKardexStore,
	useUsuariosStore,
} from '../autoBarrell'

export function Reportes() {
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()
	const { mostrarKardex } = useKardexStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Marca de productos')
	)

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar kardex', { _id_empresa: dataempresa?.id }],
		queryFn: () => mostrarKardex({ _id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <ReportesTemplate />
}
