import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	ProductosTemplate,
	SpinnerLoader,
	useCategoriasMerceologicasStore,
	useCategoriasStore,
	useEmpresaStore,
	useMarcaStore,
	useProductosStore,
	useUsuariosStore,
} from '../autoBarrell'

export function Productos() {
	const { mostrarProductos, buscarProductos, buscador, dataproductos } =
		useProductosStore()
	const { mostrarMarca } = useMarcaStore()
	const { mostrarCategorias } = useCategoriasStore()
	const { mostrarCategoriasMerceologicas, datacategoriasmerceologicas } =
		useCategoriasMerceologicasStore()
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Productos')
	)

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar productos', { _id_empresa: dataempresa?.id }],
		queryFn: () => mostrarProductos({ _id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null && !!datacategoriasmerceologicas?.length,
	})

	const { data: _datamarcas } = useQuery({
		queryKey: ['mostrar marca', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarMarca({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _datacategorias } = useQuery({
		queryKey: ['mostrar categorias', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarCategorias({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _datacategoriasmerceologicas } = useQuery({
		queryKey: [
			'mostrar categorias merceologicas',
			{ id_empresa: dataempresa?.id },
		],
		queryFn: () =>
			mostrarCategoriasMerceologicas({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _buscardata } = useQuery({
		queryKey: [
			'buscar productos',
			{ id_empresa: dataempresa.id, descripcion: buscador },
		],
		queryFn: () =>
			buscarProductos({ id_empresa: dataempresa.id, descripcion: buscador }),
		enabled: dataempresa.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <ProductosTemplate data={dataproductos} />
}
