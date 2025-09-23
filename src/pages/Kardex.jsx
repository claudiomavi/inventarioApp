import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	KardexTemplate,
	SpinnerLoader,
	useColoresStore,
	useEmpresaStore,
	useFechasInventariosStore,
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
	const {
		buscarProductos,
		buscador: buscadorproductos,
		mostrarProductos,
	} = useProductosStore()
	const {
		mostrarColores,
		buscador: buscadorcolores,
		buscarColores,
	} = useColoresStore()
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()
	const { fechaInventarioActivo } = useFechasInventariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Kardex')
	)

	const { data: dataproductos } = useQuery({
		queryKey: ['mostrar productos', { _id_empresa: dataempresa?.id }],
		queryFn: () => mostrarProductos({ _id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	// se concatena con la dataproductos que hay arriba para que se ejecute solo cuando ya exista
	const { isLoading, error } = useQuery({
		queryKey: ['mostrar kardex', { _id_empresa: dataempresa?.id }],
		queryFn: () => mostrarKardex({ _id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null && !!dataproductos?.length,
	})

	const { data: _datacolores } = useQuery({
		queryKey: ['mostrar colores', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarColores({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _buscarproductos } = useQuery({
		queryKey: [
			'buscar productos',
			{ id_empresa: dataempresa.id, descripcion: buscadorproductos },
		],
		queryFn: () =>
			buscarProductos({
				id_empresa: dataempresa.id,
				descripcion: buscadorproductos,
			}),
		enabled: dataempresa.id != null,
	})

	const { data: _buscarcolores } = useQuery({
		queryKey: [
			'buscar colores',
			{ id_empresa: dataempresa.id, color: buscadorcolores },
		],
		queryFn: () =>
			buscarColores({ id_empresa: dataempresa.id, color: buscadorcolores }),
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

	const { data: _inventarioactivo } = useQuery({
		queryKey: ['fecha inventario activo', { id_empresa: dataempresa.id }],
		queryFn: () =>
			fechaInventarioActivo({
				id_empresa: dataempresa.id,
			}),
		enabled: dataempresa.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <KardexTemplate data={datakardex} />
}
