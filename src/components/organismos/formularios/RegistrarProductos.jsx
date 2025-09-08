import styled from 'styled-components'
import { v } from '../../../styles/variables'
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
} from '../../../autoBarrell'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export function RegistrarProductos({ onClose, dataSelect, accion }) {
	const [stateMarca, setStateMarca] = useState(false)
	const [openRegistroMarca, setOpenRegistroMarca] = useState(false)
	const [subaccion, setSubaccion] = useState('')

	const { insertarProductos, editarProductos } = useProductosStore()
	const { dataempresa } = useEmpresaStore()
	const { marcaItemSelect } = useMarcaStore()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const insertar = async (data) => {
		if (accion === 'Editar') {
			const p = {
				id: dataSelect.id,
				descripcion: convertirCapitalize(data.nombre),
			}

			await editarProductos(p)
			onClose()
		} else {
			const p = {
				_idempresa: dataempresa.id,
				_descripcion: convertirCapitalize(data.nombre),
			}

			await insertarProductos(p)
			onClose()
		}
	}

	const nuevoRegistroMarca = () => {
		setOpenRegistroMarca(!openRegistroMarca)
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
					<section>
						<article>
							<InputText icono={<v.icononombre />}>
								<input
									className="form__field"
									defaultValue={dataSelect.descripcion}
									type="text"
									placeholder=""
									{...register('nombre', {
										required: true,
									})}
								/>
								<label className="form__label">descripcion</label>
								{errors.nombre?.type === 'required' && <p>Campo requerido</p>}
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
							<Btnfiltro
								bgcolor="#f6f3f3"
								textcolor="#353535"
								icono={<v.agregar />}
								funcion={nuevoRegistroMarca}
							/>
						</ContainerSelector>

						<div className="btnguardarContent">
							<Btnsave
								icono={<v.iconoguardar />}
								titulo="Guardar"
								bgcolor="#ef552b"
							/>
						</div>
					</section>
				</form>
				{openRegistroMarca && (
					<RegistrarMarca
						dataSelect={dataSelect}
						onClose={() => setOpenRegistroMarca(!openRegistroMarca)}
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
		width: 500px;
		max-width: 85%;
		border-radius: 20px;
		background: ${({ theme }) => theme.bgtotal};
		box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
		padding: 13px 36px 20px 36px;
		z-index: 100;

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
