import styled from 'styled-components'
import {
	InputText,
	Btnsave,
	useEmpresaStore,
	v as _v,
	Buscador,
	ListaGenerica,
	useProductosStore,
	CardProductoSelect,
	useKardexStore,
	useUsuariosStore,
	useFechasInventariosStore,
	useColoresStore,
} from '../../../autoBarrell'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

export function RegistrarKardex({ onClose, accion, dataSelect }) {
	const [stateListaProd, setStateListaProd] = useState(false)
	const [stateListaColores, setStateListaColores] = useState(false)

	const { insertarKardex, editarKardex } = useKardexStore()
	const { dataempresa } = useEmpresaStore()
	const {
		dataproductos,
		setBuscador: setBuscadorProductos,
		selectProductos,
		productosItemSelect,
	} = useProductosStore()
	const {
		datacolores,
		setBuscador: setBuscadorColores,
		selectColores,
		coloresItemSelect,
	} = useColoresStore()
	const { idusuario } = useUsuariosStore()
	const { datafechainventrioactivo } = useFechasInventariosStore()

	useEffect(() => {
		if (accion === 'Editar' && dataSelect) {
			selectProductos({
				id: dataSelect.id_producto,
				descripcion: dataSelect.descripcion,
				codigo: dataSelect.codigo,
				unidad_medida: dataSelect.unidad_medida,
			})
			selectColores({ id: dataSelect.id_color, color: dataSelect.color })
		}
	}, [accion, dataSelect])

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const insertar = async (data) => {
		if (accion === 'Editar') {
			const p = {
				id: dataSelect.id,
				cantidad: parseFloat(data.cantidad),
				id_usuario: idusuario,
				id_producto: productosItemSelect.id,
				id_empresa: dataempresa.id,
				id_color: coloresItemSelect.id,
				id_fecha_inventario: datafechainventrioactivo.id,
			}

			await editarKardex(p)
			onClose()
		} else {
			const p = {
				cantidad: parseFloat(data.cantidad),
				id_usuario: idusuario,
				id_producto: productosItemSelect.id,
				id_empresa: dataempresa.id,
				id_color: coloresItemSelect.id,
				id_fecha_inventario: datafechainventrioactivo.id,
			}

			await insertarKardex(p)
			onClose()
		}
	}

	return (
		<Container>
			<div className="sub-contenedor">
				<div className="headers">
					<section>
						<h1>{accion === 'Editar' ? 'Editar ingreso' : 'Nuevo ingreso'}</h1>
					</section>

					<section>
						<span onClick={onClose}>x</span>
					</section>
				</div>
				<article>
					<InputText icono={<_v.iconofecha />}>
						<input
							disabled
							className="form__field disabled"
							style={{ marginBottom: '10px' }}
							defaultValue={
								datafechainventrioactivo ? datafechainventrioactivo.fecha : ''
							}
							type="text"
							placeholder=""
							{...register('fecha_inventario', {
								required: true,
							})}
						/>
						<label className="form__label">Fecha inventario</label>
						{errors.fecha_inventario?.type === 'required' && (
							<p>Hace falta que el admin seleccione una fecha</p>
						)}
					</InputText>
				</article>
				<div className="contentBuscador">
					<div onClick={() => setStateListaProd(!stateListaProd)}>
						<Buscador
							setBuscador={setBuscadorProductos}
							placeholderText="...buscar producto"
						/>
					</div>
					{stateListaProd && (
						<ListaGenerica
							data={dataproductos}
							setState={() => setStateListaProd(!stateListaProd)}
							bottom="-250px"
							scroll="scroll"
							funcion={selectProductos}
							showCodigo
						/>
					)}
				</div>
				{productosItemSelect && (
					<CardProductoSelect
						text1={productosItemSelect.descripcion}
						text2={productosItemSelect.codigo}
					/>
				)}
				<div className="contentBuscador">
					<div onClick={() => setStateListaColores(!stateListaColores)}>
						<Buscador
							setBuscador={setBuscadorColores}
							placeholderText="...buscar color"
						/>
					</div>
					{stateListaColores && (
						<ListaGenerica
							data={datacolores}
							setState={() => setStateListaColores(!stateListaColores)}
							bottom="-250px"
							scroll="scroll"
							funcion={selectColores}
							colorType
						/>
					)}
				</div>
				{coloresItemSelect && (
					<CardProductoSelect text1={coloresItemSelect.color} />
				)}

				<form
					className="formulario"
					onSubmit={handleSubmit(insertar)}
				>
					<section>
						<article>
							<InputText icono={<_v.iconofecha />}>
								<input
									disabled
									className="form__field disabled"
									value={productosItemSelect?.unidad_medida || ''}
									type="text"
									placeholder=""
									{...register('unidad_medida', {
										required: true,
									})}
								/>
								<label className="form__label">Unidad medida</label>
								{errors.cantidad?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>
						<article>
							<InputText icono={<_v.iconocalculadora />}>
								<input
									className="form__field"
									defaultValue={dataSelect.cantidad}
									type="number"
									placeholder=""
									{...register('cantidad', {
										required: true,
									})}
								/>
								<label className="form__label">cantidad</label>
								{errors.cantidad?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>

						<div className="btnguardarContent">
							<Btnsave
								icono={<_v.iconoguardar />}
								titulo="Guardar"
								bgcolor="#ef552b"
							/>
						</div>
					</section>
				</form>
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
		width: 500px;
		max-width: 85%;
		border-radius: 20px;
		background: ${({ theme }) => theme.bgtotal};
		box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
		padding: 13px 36px 20px 36px;
		z-index: 100;
		.contentBuscador {
			position: relative;
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
			section {
				gap: 20px;
				display: flex;
				flex-direction: column;
				.colorContainer {
					.colorPickerContent {
						padding-top: 15px;
						min-height: 50px;
					}
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
