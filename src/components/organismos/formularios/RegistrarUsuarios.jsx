import styled from 'styled-components'
import {
	InputText,
	Btnsave,
	useUsuariosStore,
	useEmpresaStore,
	ContainerSelector,
	Selector,
	v,
	ListaGenerica,
	Device,
	TipoDocData,
	TipouserData,
	ListaModulos,
} from '../../../autoBarrell'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export function RegistrarUsuarios({ onClose, dataSelect, accion }) {
	const [tipoDoc, setTipoDoc] = useState({ icono: '', descripcion: 'otros' })
	const [stateTipoDoc, setStateTipoDoc] = useState(false)
	const [tipoUser, setTipoUser] = useState({
		icono: '',
		descripcion: 'empleado',
	})
	const [stateTipoUser, setStateTipoUser] = useState(false)
	const [checkbox, setCheckbox] = useState([])

	const { insertarUsuarios, editarUsuarios } = useUsuariosStore()
	const { dataempresa } = useEmpresaStore()

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const insertar = async (data) => {
		if (accion === 'Editar') {
			const p = {
				nombres: data.nombres,
				correo: data.correo,
				nro_doc: data.nrodoc,
				telefono: data.telefono,
				direccion: data.direccion,
				tipouser: tipoUser.descripcion,
				tipodoc: tipoDoc.descripcion,
			}

			await editarUsuarios(p)
			onClose()
		} else {
			const p = {
				nombres: data.nombres,
				correo: data.correo,
				nro_doc: data.nrodoc,
				telefono: data.telefono,
				direccion: data.direccion,
				tipouser: tipoUser.descripcion,
				tipodoc: tipoDoc.descripcion,
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
							<InputText icono={<v.iconoemail />}>
								<input
									className="form__field"
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
						<article>
							<InputText icono={<v.iconopass />}>
								<input
									className="form__field"
									defaultValue={dataSelect.pass}
									type="text"
									placeholder=""
									{...register('pass', {
										required: true,
									})}
								/>
								<label className="form__label">password</label>
								{errors.pass?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>
						<article>
							<InputText icono={<v.icononombre />}>
								<input
									className="form__field"
									defaultValue={dataSelect.icononombre}
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
							<label>Tipo doc: </label>
							<Selector
								color="#fc6027"
								texto2={tipoDoc.descripcion}
								funcion={() => setStateTipoDoc(!stateTipoDoc)}
							/>
							{stateTipoDoc && (
								<ListaGenerica
									data={TipoDocData}
									setState={() => setStateTipoDoc(!stateTipoDoc)}
									scroll="scroll"
									bottom="-260px"
									funcion={(p) => setTipoDoc(p)}
								/>
							)}
						</ContainerSelector>
						<article>
							<InputText icono={<v.icononrodoc />}>
								<input
									className="form__field"
									defaultValue={dataSelect.nro_doc}
									type="text"
									placeholder=""
									{...register('nro_doc', {
										required: true,
									})}
								/>
								<label className="form__label">nro. doc</label>
								{errors.nro_doc?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>
						<article>
							<InputText icono={<v.iconotelefono />}>
								<input
									className="form__field"
									defaultValue={dataSelect.telefono}
									type="number"
									placeholder=""
									{...register('telefono', {
										required: true,
									})}
								/>
								<label className="form__label">telefono</label>
								{errors.telefono?.type === 'required' && <p>Campo requerido</p>}
							</InputText>
						</article>
						<article>
							<InputText icono={<v.iconodireccion />}>
								<input
									className="form__field"
									defaultValue={dataSelect.direccion}
									type="text"
									placeholder=""
									{...register('direccion', {
										required: true,
									})}
								/>
								<label className="form__label">direccion</label>
								{errors.direccion?.type === 'required' && (
									<p>Campo requerido</p>
								)}
							</InputText>
						</article>
					</section>

					<section className="seccionDerecha">
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
						PERMISOS: 🔐
						<ListaModulos
							checkbox={checkbox}
							setCheckbox={setCheckbox}
							accion={accion}
						/>
					</section>

					<div className="btnguardarContent">
						<Btnsave
							icono={<v.iconoguardar />}
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
