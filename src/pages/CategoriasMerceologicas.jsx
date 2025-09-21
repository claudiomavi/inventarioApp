import { useQuery } from '@tanstack/react-query'
import {
	BloqueoPagina,
	CategoriasMerceologicasTemplate,
	SpinnerLoader,
	useEmpresaStore,
	useCategoriasMerceologicasStore,
	useUsuariosStore,
} from '../autoBarrell'

export function CategoriasMerceologicas() {
	const {
		mostrarCategoriasMerceologicas,
		datacategoriasmerceologicas,
		buscarCategoriasMerceologicas,
		buscador,
	} = useCategoriasMerceologicasStore()
	const { dataempresa } = useEmpresaStore()
	const { datapermisos } = useUsuariosStore()

	const statePermiso = datapermisos.some((item) =>
		item.modulos.nombre.includes('Categorias Merceologicas')
	)

	const { isLoading, error } = useQuery({
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
			'buscar categorias merceologicas',
			{ id_empresa: dataempresa.id, descripcion: buscador },
		],
		queryFn: () =>
			buscarCategoriasMerceologicas({
				id_empresa: dataempresa.id,
				descripcion: buscador,
			}),
		enabled: dataempresa.id != null,
	})

	if (!statePermiso) return <BloqueoPagina state={statePermiso} />

	if (isLoading) return <SpinnerLoader />

	if (error) return <span>Error...</span>

	return <CategoriasMerceologicasTemplate data={datacategoriasmerceologicas} />
}
