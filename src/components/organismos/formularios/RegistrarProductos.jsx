import styled from 'styled-components'
import {
	InputText,
	Btnsave,
	useProductosStore,
	useEmpresaStore,
	convertirCapitalize,
	ContainerSelector,
	Selector,
	useMarcaStore,
	Btnfiltro,
	RegistrarMarca,
	v as _v,
	ListaGenerica,
	useCategoriasStore,
	RegistrarCategorias,
	Device,
	useCategoriasMerceologicasStore,
	useColoresStore,
	useProductosColoresStore,
	InsertarProductoColor,
	EliminarProductoColoresPorProducto,
} from '../../../autoBarrell'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

export function RegistrarProductos({ onClose, dataSelect, accion }) {
	const [stateMarca, setStateMarca] = useState(false)
	const [stateCategorias, setStateCategorias] = useState(false)
	const [stateCategoriasMerceologicas, setStateCategoriasMerceologicas] =
		useState(false)
	const [openRegistroMarca, setOpenRegistroMarca] = useState(false)
	const [openRegistroCategorias, setOpenRegistroCategorias] = useState(false)
	const [subaccion, setSubaccion] = useState('')

	const [stateListaColores, setStateListaColores] = useState(false)
	const [coloresAsignados, setColoresAsignados] = useState([])
	const [precioColorTemp, setPrecioColorTemp] = useState('')
	const [colorSeleccionadoTemp, setColorSeleccionadoTemp] = useState(null)

	const { insertarProductos, editarProductos } = useProductosStore()
	const { dataempresa } = useEmpresaStore()
	const { marcaItemSelect, datamarca, selectMarca } = useMarcaStore()
	const { categoriasItemSelect, datacategorias, selectCategorias } =
		useCategoriasStore()
	const {
		categoriasmerceologicasItemSelect,
		datacategoriasmerceologicas,
		selectCategoriasMerceologicas,
	} = useCategoriasMerceologicasStore()
	const { datacolores } = useColoresStore()
	const { mostrarProductoColores } = useProductosColoresStore()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	useEffect(() => {
		if (accion === 'Editar' && dataSelect) {
			if (dataSelect.idmarca && datamarca?.length > 0) {
				const marca = datamarca.find((m) => m.id === dataSelect.idmarca)
				if (marca) {
					selectMarca(marca)
				}
			}

			if (dataSelect.id_categoria && datacategorias?.length > 0) {
				const categoria = datacategorias.find(
					(c) => c.id === dataSelect.id_categoria
				)
				if (categoria) {
					selectCategorias(categoria)
				}
			}

			if (
				dataSelect.id_categoria_merceologica &&
				datacategoriasmerceologicas?.length > 0
			) {
				const categoriamerceologica = datacategoriasmerceologicas.find(
					(c) => c.id === dataSelect.id_categoria_merceologica
				)
				if (categoriamerceologica)
					selectCategoriasMerceologicas(categoriamerceologica)
			}

			cargarColoresProducto()
		}
	}, [
		accion,
		dataSelect,
		datamarca,
		datacategorias,
		datacategoriasmerceologicas,
	])

	const cargarColoresProducto = async () => {
		if (dataSelect?.id) {
			const colores = await mostrarProductoColores({
				id_producto: dataSelect.id,
			})
			if (colores) {
				const mapped = colores.map((pc) => ({
					id: pc.id,
					id_color: pc.id_color,
					color: pc.colores?.color || '',
					precio: pc.precio,
				}))
				setColoresAsignados(mapped)
			}
		}
	}

	const agregarColor = () => {
		if (!colorSeleccionadoTemp || !precioColorTemp) return
		const yaExiste = coloresAsignados.some(
			(c) => c.id_color === colorSeleccionadoTemp.id
		)
		if (yaExiste) return

		setColoresAsignados([
			...coloresAsignados,
			{
				id_color: colorSeleccionadoTemp.id,
				color: colorSeleccionadoTemp.color,
				precio: parseFloat(precioColorTemp),
			},
		])
		setColorSeleccionadoTemp(null)
		setPrecioColorTemp('')
	}

	const quitarColor = (id_color) => {
		setColoresAsignados(coloresAsignados.filter((c) => c.id_color !== id_color))
	}

	const actualizarPrecioColor = (id_color, nuevoPrecio) => {
		setColoresAsignados(
			coloresAsignados.map((c) =>
				c.id_color === id_color
					? { ...c, precio: parseFloat(nuevoPrecio) || 0 }
					: c
			)
		)
	}

	const seleccionarColorTemp = (item) => {
		setColorSeleccionadoTemp(item)
	}

	const insertar = async (data) => {
		if (accion === 'Editar') {
			const p = {
				id: dataSelect.id,
				descripcion: convertirCapitalize(data.descripcion),
				idmarca: marcaItemSelect.id,
				codigo: convertirCapitalize(data.codigo),
				preciocompra: parseFloat(data.preciocompra),
				id_categoria: categoriasItemSelect.id,
				id_empresa: dataempresa.id,
				unidad_medida: convertirCapitalize(data.unidad_medida),
				categoria_merceologica: categoriasmerceologicasItemSelect.id,
			}

			await editarProductos(p)

			await EliminarProductoColoresPorProducto({
				id_producto: dataSelect.id,
			})
			for (const c of coloresAsignados) {
				await InsertarProductoColor({
					id_producto: dataSelect.id,
					id_color: c.id_color,
					precio: c.precio,
					id_empresa: dataempresa.id,
				})
			}

			onClose()
		} else {
			const p = {
				_descripcion: convertirCapitalize(data.descripcion),
				_idmarca: marcaItemSelect.id,
				_codigo: convertirCapitalize(data.codigo),
				_preciocompra: parseFloat(data.preciocompra),
				_id_categoria: categoriasItemSelect.id,
				_id_empresa: dataempresa.id,
				_unidad_medida: convertirCapitalize(data.unidad_medida),
				_categoria_merceologica: categoriasmerceologicasItemSelect.id,
			}

			await insertarProductos(p)

			if (coloresAsignados.length > 0) {
				const { dataproductos } = useProductosStore.getState()
				const productoCreado = dataproductos?.[dataproductos.length - 1]
				if (productoCreado?.id) {
					for (const c of coloresAsignados) {
						await InsertarProductoColor({
							id_producto: productoCreado.id,
							id_color: c.id_color,
							precio: c.precio,
							id_empresa: dataempresa.id,
						})
					}
				}
			}

			onClose()
		}
	}

	const nuevoRegistroMarca = () => {
		setOpenRegistroMarca(!openRegistroMarca)
		setSubaccion('Nuevo')
	}

	const nuevoRegistroCategoria = () => {
		setOpenRegistroCategorias(!openRegistroCategorias)
		setSubaccion('Nuevo')
	}

	const coloresDisponibles = datacolores?.filter(
		(c) => !coloresAsignados.some((ca) => ca.id_color === c.id)
	)

	return (
		<Container>
			<div className="sub-contenedor">
				<div className="headers">
					<section>
						<h1>
							{accion == 'Editar'
								? 'Editar productos'
								: 'Registrar nuevo producto'}
						</h1>
					</section>

					<section>
						<span onClick={onClose}>x</span>
					</section>
				</div>

				<form
					className="formulario"
					onSubmit={handleSubmit(insertar)}
				>
					<section className="seccionDerecha">
						<article>
							<InputText icono={<_v.icononombre />}>
								<input
									className="form__field"
									defaultValue={dataSelect.descripcion}
									type="text"
									placeholder=""
									{...register('descripcion', {
										required: true,
									})}
								/>
								<label className="form__label">descripcion</label>
								{errors.descripcion?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
						<ContainerSelector>
							<label>Marca: </label>
							<Selector
								color="#fc6027"
								texto2={marcaItemSelect?.descripcion}
								state={stateMarca}
								funcion={() => setStateMarca(!stateMarca)}
							/>
							{stateMarca && (
								<ListaGenerica
									bottom="-260px"
									data={datamarca}
									scroll="scroll"
									setState={() => setStateMarca(!stateMarca)}
									funcion={selectMarca}
								/>
							)}
							<Btnfiltro
								bgcolor="#f6f3f3"
								textcolor="#353535"
								icono={<_v.agregar />}
								funcion={nuevoRegistroMarca}
							/>
						</ContainerSelector>
						<ContainerSelector>
							<label>Categoria: </label>
							<Selector
								color="#fc6027"
								texto2={categoriasItemSelect?.descripcion}
								state={stateCategorias}
								funcion={() => setStateCategorias(!stateCategorias)}
							/>
							{stateCategorias && (
								<ListaGenerica
									bottom="-260px"
									data={datacategorias}
									scroll="scroll"
									setState={() => setStateCategorias(!stateCategorias)}
									funcion={selectCategorias}
								/>
							)}
							<Btnfiltro
								bgcolor="#f6f3f3"
								textcolor="#353535"
								icono={<_v.agregar />}
								funcion={nuevoRegistroCategoria}
							/>
						</ContainerSelector>
						<ContainerSelector>
							<label>Categoria Merceologica: </label>
							<Selector
								color="#fc6027"
								texto2={categoriasmerceologicasItemSelect?.descripcion}
								state={stateCategoriasMerceologicas}
								funcion={() =>
									setStateCategoriasMerceologicas(!stateCategoriasMerceologicas)
								}
							/>
							{stateCategoriasMerceologicas && (
								<ListaGenerica
									bottom="-260px"
									data={datacategoriasmerceologicas}
									scroll="scroll"
									setState={() =>
										setStateCategoriasMerceologicas(
											!stateCategoriasMerceologicas
										)
									}
									funcion={selectCategoriasMerceologicas}
								/>
							)}
						</ContainerSelector>
					</section>

					<section className="seccionIzquierda">
						<article>
							<InputText icono={<_v.iconocodigobarras />}>
								<input
									className="form__field"
									defaultValue={dataSelect.codigo}
									type="text"
									placeholder=""
									{...register('codigo', {
										required: true,
									})}
								/>
								<label className="form__label">código</label>
								{errors.codigobarras?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
						<article>
							<InputText icono={<_v.iconopreciocompra />}>
								<input
									step="0.01"
									className="form__field"
									defaultValue={dataSelect.preciocompra}
									type="number"
									placeholder=""
									{...register('preciocompra', {
										required: true,
									})}
								/>
								<label className="form__label">precio de compra</label>
								{errors.preciocompra?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
						<article>
							<InputText icono={<_v.iconounidadmedida />}>
								<input
									className="form__field"
									defaultValue={dataSelect.unidad_medida}
									type="text"
									placeholder=""
									{...register('unidad_medida', {
										required: true,
									})}
								/>
								<label className="form__label">unidad de medida</label>
								{errors.unidad_medida?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
					</section>

					<section className="seccionColores">
						<h3>Colores disponibles</h3>
						<div className="agregarColorContent">
							<div className="colorSelectorWrapper">
								<ContainerSelector>
									<label>Color: </label>
									<Selector
										color="#fc6027"
										texto2={colorSeleccionadoTemp?.color || 'Seleccionar'}
										state={stateListaColores}
										funcion={() =>
											setStateListaColores(!stateListaColores)
										}
									/>
									{stateListaColores && (
										<ListaGenerica
											bottom="-260px"
											data={coloresDisponibles}
											scroll="scroll"
											setState={() =>
												setStateListaColores(!stateListaColores)
											}
											funcion={seleccionarColorTemp}
											colorType
										/>
									)}
								</ContainerSelector>
							</div>
							<div className="precioColorWrapper">
								<InputText icono={<_v.iconopreciocompra />}>
									<input
										className="form__field"
										type="number"
										step="0.01"
										placeholder=""
										value={precioColorTemp}
										onChange={(e) => setPrecioColorTemp(e.target.value)}
									/>
									<label className="form__label">precio</label>
								</InputText>
							</div>
							<Btnfiltro
								bgcolor="#52de65"
								textcolor="#fff"
								icono={<_v.agregar />}
								funcion={agregarColor}
							/>
						</div>

						{coloresAsignados.length > 0 && (
							<div className="listaColoresAsignados">
								{coloresAsignados.map((c) => (
									<div
										className="colorAsignadoItem"
										key={c.id_color}
									>
										<span className="colorNombre">{c.color}</span>
										<input
											className="colorPrecioInput"
											type="number"
											step="0.01"
											value={c.precio}
											onChange={(e) =>
												actualizarPrecioColor(c.id_color, e.target.value)
											}
										/>
										<span
											className="colorEliminar"
											onClick={() => quitarColor(c.id_color)}
										>
											x
										</span>
									</div>
								))}
							</div>
						)}
					</section>

					<div className="btnguardarContent">
						<Btnsave
							icono={<_v.iconoguardar />}
							titulo="Guardar"
							bgcolor="#ef552b"
						/>
					</div>
				</form>
				{openRegistroMarca && (
					<RegistrarMarca
						dataSelect={dataSelect}
						onClose={() => setOpenRegistroMarca(!openRegistroMarca)}
						accion={subaccion}
					/>
				)}
				{openRegistroCategorias && (
					<RegistrarCategorias
						dataSelect={dataSelect}
						onClose={() => setOpenRegistroCategorias(!openRegistroCategorias)}
						accion={subaccion}
					/>
				)}
			</div>
		</Container>
	)
}

const Container = styled.div`
	transition: 0.5s;
	top: 0;
	left: 0;
	position: fixed;
	background-color: rgba(10, 9, 9, 0.5);
	display: flex;
	width: 100%;
	min-height: 100vh;
	align-items: center;
	justify-content: center;
	z-index: 1000;

	.sub-contenedor {
		width: 100%;
		max-width: 90%;
		border-radius: 20px;
		background: ${({ theme }) => theme.bgtotal};
		box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
		padding: 13px 36px 20px 36px;
		z-index: 100;
		height: 90vh;
		overflow-y: auto;
		overflow-x: hidden;
		&::-webkit-scrollbar {
			width: 6px;
			border-radius: 10px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: #484848;
			border-radius: 10px;
		}
		.headers {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;

			h1 {
				font-size: 20px;
				font-weight: 500;
			}
			span {
				font-size: 20px;
				cursor: pointer;
			}
		}
		.formulario {
			display: grid;
			grid-template-columns: 1fr;
			gap: 15px;
			@media ${Device.tablet} {
				grid-template-columns: repeat(2, 1fr);
			}
			section {
				gap: 20px;
				display: flex;
				flex-direction: column;
			}
			.seccionColores {
				grid-column: 1 / -1;
				border-top: 1px solid ${({ theme }) => theme.bg4};
				padding-top: 15px;
				h3 {
					font-size: 16px;
					font-weight: 600;
					margin-bottom: 10px;
				}
				.agregarColorContent {
					display: flex;
					align-items: flex-end;
					gap: 10px;
					flex-wrap: wrap;
					.colorSelectorWrapper {
						flex: 1;
						min-width: 150px;
						position: relative;
					}
					.precioColorWrapper {
						width: 150px;
					}
				}
				.listaColoresAsignados {
					margin-top: 15px;
					display: flex;
					flex-direction: column;
					gap: 8px;
					.colorAsignadoItem {
						display: flex;
						align-items: center;
						gap: 15px;
						padding: 8px 12px;
						border-radius: 10px;
						background: ${({ theme }) => theme.bgAlpha};
						.colorNombre {
							flex: 1;
							font-weight: 500;
						}
						.colorPrecioInput {
							width: 90px;
							padding: 4px 8px;
							border: 1px solid ${({ theme }) => theme.bg4};
							border-radius: 6px;
							background: ${({ theme }) => theme.bg};
							color: ${({ theme }) => theme.bg5};
							font-weight: 600;
							font-size: 14px;
							outline: none;
							&:focus {
								border-color: ${({ theme }) => theme.bg5};
							}
						}
						.colorEliminar {
							cursor: pointer;
							color: #F54E41;
							font-weight: 700;
							font-size: 16px;
							padding: 0 5px;
							&:hover {
								opacity: 0.7;
							}
						}
					}
				}
			}
			.btnguardarContent {
				display: flex;
				justify-content: end;
				grid-column: 1;
				@media ${Device.tablet} {
					grid-column: 2;
				}
			}
		}
	}
`

const ContentTitle = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 20px;
	svg {
		font-size: 25px;
	}
	input {
		border: none;
		outline: none;
		background: transparent;
		padding: 2px;
		width: 40px;
		font-size: 28px;
	}
`

const ContainerEmojiPicker = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`
