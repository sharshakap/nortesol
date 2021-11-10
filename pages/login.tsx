import React, { useState } from "react";
import BotonFAColores1 from "../components/general/BotonFAColores1";
import Link from "next/link";
import useValidacion from "../hooks/useValidation";
import validarLogin from "../validations/validarLogin";
import { useRouter } from "next/router";
const initialState = {
  email: "",
  password: "",
};

const Ingresar = ({ auth, fb }: any) => {
  const router = useRouter();
  if (auth) router.push("/");
  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion(initialState, validarLogin, ingresar);
  const [ingresoInvalido, setIngresoInvalido] = useState(false);
  async function ingresar() {
    try {
      await fb.login(valores.email, valores.password);
      router.push("/");
    } catch (error) {
      setIngresoInvalido(true);
    }
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h3 className="login__titulo">Ingresar</h3>
        <div className="login__correo">
          <label htmlFor="correo" className="fas fa-user"></label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Correo"
            onChange={(e) => {
              handleChange(e, true);
              setIngresoInvalido(false);
            }}
            onBlur={handleBlur}
          />
          {errores.email && <i className="far fa-hand-pointer" />}
        </div>
        <div className="login__contrasena">
          <label htmlFor="contrasena" className="fas fa-key"></label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            onChange={(e) => {
              handleChange(e, true);
              setIngresoInvalido(false);
            }}
            onBlur={handleBlur}
          ></input>
          {errores.password && <i className="far fa-hand-pointer" />}
        </div>
        <div className="ERRFORM">
          <ul className="register__errores">
            {errores.email && (
              <li>
                <i className="fas fa-exclamation-circle" />
                {errores.email}
              </li>
            )}
            {errores.password && (
              <li>
                <i className="fas fa-exclamation-circle" />
                {errores.password}
              </li>
            )}
            {ingresoInvalido && (
              <li>
                <i className="fas fa-exclamation-circle" />
                Usuario o contraseña incorrectos
              </li>
            )}
          </ul>
        </div>

        <BotonFAColores1>Ingresar</BotonFAColores1>
        <span className="login__mensajeOlvido">¿Olvidó su contraseña?</span>
      </form>
      <div className="login__irRegistro">
        <h3 className="login__titulo">Registrarse</h3>
        <Link passHref href="/register">
          <div>
            <BotonFAColores1>Crear Cuenta</BotonFAColores1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Ingresar;
