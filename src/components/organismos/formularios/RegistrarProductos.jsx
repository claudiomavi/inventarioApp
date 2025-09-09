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
	v,
	ListaGenerica,
	useCategoriasStore,
	RegistrarCategorias,
	Device,
} from '../../../autoBarrell'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

export function RegistrarProductos({ onClose, dataSelect, accion }) {
	const [stateMarca, setStateMarca] = useState(false)
	const [stateCategorias, setStateCategorias] = useState(false)
	const [openRegistroMarca, setOpenRegistroMarca] = useState(false)
	const [openRegistroCategorias, setOpenRegistroCategorias] = useState(false)
	const [subaccion, setSubaccion] = useState('')

	const { insertarProductos, editarProductos } = useProductosStore()
	const { dataempresa } = useEmpresaStore()
	const { marcaItemSelect, datamarca, selectMarca } = useMarcaStore()
	const { categoriasItemSelect, datacategorias, selectCategorias } =
		useCategoriasStore()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	// para que si se cambia de página en el navegador no vuelvan los valores por defecto en el desplegable de marca y categorias
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
		}
	}, [accion, dataSelect, datamarca, datacategorias])

	const insertar = async (data) => {
		if (accion === 'Editar') {
			const p = {
				id: dataSelect.id,
				descripcion: convertirCapitalize(data.descripcion),
				idmarca: marcaItemSelect.id,
				stock: parseFloat(data.stock),
				stock_minimo: parseFloat(data.stockminimo),
				codigobarras: data.codigobarras,
				codigointerno: data.codigointerno,
				precioventa: parseFloat(data.precioventa),
				preciocompra: parseFloat(data.preciocompra),
				id_categoria: categoriasItemSelect.id,
				id_empresa: dataempresa.id,
			}

			await editarProductos(p)
			onClose()
		} else {
			const p = {
				_descripcion: convertirCapitalize(data.descripcion),
				_idmarca: marcaItemSelect.id,
				_stock: parseFloat(data.stock),
				_stock_minimo: parseFloat(data.stockminimo),
				_codigobarras: data.codigobarras,
				_codigointerno: data.codigointerno,
				_precioventa: parseFloat(data.precioventa),
				_preciocompra: parseFloat(data.preciocompra),
				_id_categoria: categoriasItemSelect.id,
				_id_empresa: dataempresa.id,
			}

			await insertarProductos(p)
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
							<InputText icono={<v.icononombre />}>
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
								// texto1="🍿"
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
								icono={<v.agregar />}
								funcion={nuevoRegistroMarca}
							/>
						</ContainerSelector>
						<article>
							<InputText icono={<v.iconostock />}>
								<input
									className="form__field"
									defaultValue={dataSelect.stock}
									type="number"
									step="0.01"
									placeholder=""
									{...register('stock', {
										required: true,
									})}
								/>
								<label className="form__label">stock</label>
								{errors.stock?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>
						<article>
							<InputText icono={<v.iconostockminimo />}>
								<input
									className="form__field"
									defaultValue={dataSelect.stock_minimo}
									type="number"
									step="0.01"
									placeholder=""
									{...register('stockminimo', {
										required: true,
									})}
								/>
								<label className="form__label">stock minimo</label>
								{errors.stockminimo?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
						<ContainerSelector>
							<label>Categoria: </label>
							<Selector
								color="#fc6027"
								// texto1="🍿"
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
								icono={<v.agregar />}
								funcion={nuevoRegistroCategoria}
							/>
						</ContainerSelector>
					</section>

					<section className="seccionIzquierda">
						<article>
							<InputText icono={<v.iconocodigobarras />}>
								<input
									className="form__field"
									defaultValue={dataSelect.codigobarras}
									type="text"
									placeholder=""
									{...register('codigobarras', {
										required: true,
									})}
								/>
								<label className="form__label">codigo de barras</label>
								{errors.codigobarras?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
						<article>
							<InputText icono={<v.iconocodigointerno />}>
								<input
									className="form__field"
									defaultValue={dataSelect.codigointerno}
									type="text"
									placeholder=""
									{...register('codigointerno', {
										required: true,
									})}
								/>
								<label className="form__label">codigo interno</label>
								{errors.codigointerno?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
						<article>
							<InputText icono={<v.iconoprecioventa />}>
								<input
									className="form__field"
									defaultValue={dataSelect.precioventa}
									type="number"
									placeholder=""
									{...register('precioventa', {
										required: true,
									})}
								/>
								<label className="form__label">precio de venta</label>
								{errors.precioventa?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
						<article>
							<InputText icono={<v.iconopreciocompra />}>
								<input
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
					</section>

					<div className="btnguardarContent">
						<Btnsave
							icono={<v.iconoguardar />}
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
