import React from "react";
/*
Este componente es un boton que puede recibir un icono de fontawesome como children
tiene las misma propidedaes que un boton normal.
  Recibe:
  -children = icono de fontawesome (opcional) + texto
  -backgroundColor = color de fondo del boton (por defecto: #ea5c90)
  -className = clase extra (opcional)
  -onClick = funcion que se ejecuta al hacer click (opcional)
  -otras props de button
*/

const BotonFAColores1 = (
  { children, backgroundColor, className, onClick }: any,
  props: any
) => {
  return (
    <button
      className={`botonColores1 ${className}`}
      style={{ backgroundColor }}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default BotonFAColores1;
