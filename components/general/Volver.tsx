import React from "react";
import { useRouter } from "next/router";

const Volver = () => {
  const router = useRouter();
  return (
    <div className="volverBoton NOSELECT" onClick={() => router.back()}>
      <i className="fas fa-level-up-alt" />
      <span>Volver</span>
    </div>
  );
};

export default Volver;
