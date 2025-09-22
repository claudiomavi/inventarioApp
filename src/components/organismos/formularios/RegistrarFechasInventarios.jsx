import styled from 'styled-components'
import {
	InputText,
	Btnsave,
	useFechasInventariosStore,
	useEmpresaStore,
	convertirFecha,
	convertirFechaReversa,
	v as _v,
} from '../../../autoBarrell'
import { useForm } from 'react-hook-form'

export function RegistrarFechasInventarios({ onClose, dataSelect, accion }) {
	const { insertarFechasInventarios, editarFechasInventarios } =
		useFechasInventariosStore()
	const { dataempresa } = useEmpresaStore()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const insertar = async (data) => {
		if (accion === 'Editar') {
			const p = {
				id: dataSelect.id,
				fecha: convertirFecha(data.fecha),
				activo: data.activo,
			}

			await editarFechasInventarios(p)
			onClose()
		} else {
			const p = {
				fecha: convertirFecha(data.fecha),
				id_empresa: dataempresa.id,
				activo: data.activo,
			}

			await insertarFechasInventarios(p)
			onClose()
		}
	}

	return (
		<Container>
			<div className="sub-contenedor">
				<div className="headers">
					<section>
						<h1>
							{accion == 'Editar'
								? 'Editar fecha inventario'
								: 'Registrar nueva fecha inventario'}
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
							<InputText icono={<_v.iconofecha />}>
								<input
									className="form__field"
									defaultValue={convertirFechaReversa(dataSelect.fecha)}
									type="date"
									placeholder=""
									{...register('fecha', {
										required: true,
									})}
								/>
								<label className="form__label">fecha</label>
								{errors.nombre?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>
						<article>
							<InputText icono={<_v.iconoboolean />}>
								<input
									className="form__field"
									defaultChecked={dataSelect.activo}
									type="checkbox"
									placeholder=""
									{...register('activo')}
								/>
								<label className="form__label">activo</label>
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
