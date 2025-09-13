import { useQuery } from '@tanstack/react-query'
import {
	CategoriasTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useCategoriasStore,
	useUsuariosStore,
	BloqueoPagina,
} from '../autoBarrell'

export function Categorias() {
	const { mostrarCategorias, datacategorias, buscarCategorias, buscador } =
		useCategoriasStore()
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Categoria de productos')
	)

	const { isLoading, error } = useQuery({
		queryKey: ['mostrar categorias', { id_empresa: dataempresa?.id }],
		queryFn: () => mostrarCategorias({ id_empresa: dataempresa?.id }),
		enabled: dataempresa?.id != null,
	})

	const { data: _buscardata } = useQuery({
		queryKey: [
			'buscar categorias',
			{ id_empresa: dataempresa.id, descripcion: buscador },
		],
		queryFn: () =>
			buscarCategorias({ id_empresa: dataempresa.id, descripcion: buscador }),
		enabled: dataempresa.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <CategoriasTemplate data={datacategorias} />
}
