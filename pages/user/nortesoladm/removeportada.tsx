import React, { useEffect, useState } from 'react';
import usePortadas from '../../../hooks/usePortadas';
import Volver from '../../../components/general/Volver';
import PortadaMiniatura from '../../../components/nortesoladm/PortadaMiniatura';
import useRemoverPortada from '../../../hooks/useRemoverPortada';

const removeportada = () => {
	const [portadas, setPortadas] = useState([]);
	useEffect(() => {
		usePortadas()
			.then((res) => {
				setPortadas(res.portadas);
			})
			.catch();
	}, []);

	const handdleDelete = (id: '') => {
		if (!id) {
			return;
		}
		useRemoverPortada(id)
			.then((res) => {
				console.log(res);
				if (res.ok) {
					window.location.replace('/user/nortesoladm/removeportada');
					return;
				}
				alert('Hubo un problema contacta al administrador*');
			})
			.catch((er) => {
				alert('Hubo un problema contacta al administrador');
			});
	};
	return (
		<>
			<Volver />
			<div className="index__productos">
				{portadas &&
					portadas.map((p: any, i: any) => (
						<PortadaMiniatura
							key={i}
							imagen={p.imagen}
							id={p.id}
							onDelete={(id: any) => {
								handdleDelete(id);
							}}
						/>
					))}

				{portadas && portadas.length == 0 && (
					<>
						<p>No hay portadas...</p>
					</>
				)}
			</div>
		</>
	);
};

export default removeportada;
