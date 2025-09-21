import styled from 'styled-components'
import {
	InputText,
	Btnsave,
	useUsuariosStore,
	useEmpresaStore,
	ContainerSelector,
	Selector,
	v as _v,
	ListaGenerica,
	Device,
	TipoDocData,
	TipouserData,
	ListaModulos,
} from '../../../autoBarrell'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export function RegistrarUsuarios({ onClose, dataSelect, accion }) {
	const [tipoDoc, setTipoDoc] = useState({ icono: '', descripcion: 'otros' })
	const [stateTipoDoc, setStateTipoDoc] = useState(false)
	const [tipoUser, setTipoUser] = useState({
		icono: '',
		descripcion: 'empleado',
	})
	const [stateTipoUser, setStateTipoUser] = useState(false)
	const [checkbox, setCheckbox] = useState([])

	const { insertarUsuarios, editarUsuarios, mostrarPermisosEditando } =
		useUsuariosStore()
	const { dataempresa } = useEmpresaStore()

	const { isLoading } = useQuery({
		queryKey: ['mostrar usuario editando', { id_usuario: dataSelect.id }],
		queryFn: () => mostrarPermisosEditando({ id_usuario: dataSelect.id }),
	})

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const insertar = async (data) => {
		if (accion === 'Editar') {
			const p = {
				id: dataSelect.id,
				nombres: data.nombres,
				correo: data.correo,
				tipouser: tipoUser.descripcion,
			}

			await editarUsuarios(p, checkbox, dataempresa.id)
			onClose()
		} else {
			const p = {
				id: dataSelect.id,
				nombres: data.nombres,
				correo: data.correo,
				tipouser: tipoUser.descripcion,
				id_empresa: dataempresa.id,
			}

			const parametrosAuth = {
				correo: data.correo,
				password: data.pass,
			}

			await insertarUsuarios(parametrosAuth, p, checkbox)
			onClose()
		}
	}

	useEffect(() => {
		if (accion === 'Editar') {
			setTipoDoc({ icono: '', descripcion: dataSelect.tipodoc })
			setTipoUser({ icono: '', descripcion: dataSelect.tipouser })
		}
	}, [])

	if (isLoading) return <span>cargando...</span>

	return (
		<Container>
			<div className="sub-contenedor">
				<div className="headers">
					<section>
						<h1>
							{accion == 'Editar'
								? 'Editar usuario'
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
					<section className="seccionIzquierda">
						<article>
							<InputText icono={<_v.iconoemail />}>
								<input
									disabled={accion === 'Editar' && true}
									className={
										accion === 'Editar' ? 'form__field disabled' : 'form__field'
									}
									defaultValue={dataSelect.correo}
									type="text"
									placeholder=""
									{...register('correo', {
										required: true,
									})}
								/>
								<label className="form__label">correo</label>
								{errors.correo?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>
						{accion !== 'Editar' && (
							<article>
								<InputText icono={<_v.iconopass />}>
									<input
										className="form__field"
										defaultValue={dataSelect.pass}
										type="text"
										placeholder=""
										{...register('pass', {
											required: true,
											minLength: 8,
										})}
									/>
									<label className="form__label">password</label>
									{errors.pass?.type === 'required' && <p>Campo requerido</p>}
									{errors.pass?.type === 'minLength' && (
										<p>minimo 8 caracteres</p>
									)}
								</InputText>
							</article>
						)}

						<article>
							<InputText icono={<_v.icononombre />}>
								<input
									className="form__field"
									defaultValue={dataSelect.nombres}
									type="text"
									placeholder=""
									{...register('nombres', {
										required: true,
									})}
								/>
								<label className="form__label">nombres</label>
								{errors.nombres?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>
						<ContainerSelector>
							<label>Tipo usuario: </label>
							<Selector
								color="#fc6027"
								funcion={() => setStateTipoUser(!stateTipoUser)}
								texto2={tipoUser.descripcion}
							/>
							{stateTipoUser && (
								<ListaGenerica
									data={TipouserData}
									setState={() => setStateTipoUser(!stateTipoUser)}
									scroll="scroll"
									bottom="-260px"
									funcion={(p) => setTipoUser(p)}
								/>
							)}
						</ContainerSelector>
					</section>

					<section className="seccionDerecha">
						PERMISOS: 🔐
						<ListaModulos
							checkbox={checkbox}
							setCheckbox={setCheckbox}
							accion={accion}
						/>
					</section>

					<div className="btnguardarContent">
						<Btnsave
							icono={<_v.iconoguardar />}
							titulo="Guardar"
							bgcolor="#ef552b"
						/>
					</div>
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
