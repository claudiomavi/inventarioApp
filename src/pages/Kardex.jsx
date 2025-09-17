import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	KardexTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useKardexStore,
	useProductosStore,
	useUsuariosStore,
} from '../autoBarrell'

export function Kardex() {
	const {
		mostrarKardex,
		datakardex,
		buscarKardex,
		buscador: buscadorkardex,
	} = useKardexStore()
	const { buscarProductos, buscador: buscadorproductos } = useProductosStore()
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Marca de productos')
	)

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar kardex', { _id_empresa: dataempresa?.id }],
		queryFn: () => mostrarKardex({ _id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _buscarproductos } = useQuery({
		queryKey: [
			'buscar productos',
			{ id_empresa: dataempresa.id, descripcion: buscadorproductos },
		],
		queryFn: () =>
			buscarProductos({
				_id_empresa: dataempresa.id,
				buscador: buscadorproductos,
			}),
		enabled: dataempresa.id != null,
	})

	const { data: _buscarkardex } = useQuery({
		queryKey: [
			'buscar kardex',
			{ _id_empresa: dataempresa.id, buscador: buscadorkardex },
		],
		queryFn: () =>
			buscarKardex({
				_id_empresa: dataempresa.id,
				buscador: buscadorkardex,
			}),
		enabled: dataempresa.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <KardexTemplate data={datakardex} />
}
