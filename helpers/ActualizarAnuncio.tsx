import { APIURL } from '../utils/constantes';
import Wredirect from './Wredirect';

const ActualizarAnuncio = async ({
	nombre,
	descripcion,
	url,
	url_name,
	imagen,
	id,
}: any) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			localStorage.removeItem('tken');
			Wredirect();
			return;
		}

		let formData = new FormData();
		nombre && formData.append('nombre', nombre);
		descripcion && formData.append('descripcion', descripcion);
		url && formData.append('url', url);
		url_name && formData.append('url_name', url_name);
		let file = null;
		if (imagen && imagen.length > 0) {
			console.log(imagen);
			file = imagen.item(0);
			formData.append('files[]', file);
		}
		const response = await fetch(APIURL + 'anuncios/' + id, {
			method: 'PUT',
			headers: {
				'x-token': token,
			},
			body: formData,
		});
		const data = await response.json();

		return data;
	} catch (error) {
		console.log(error);
		return { ok: false, msg: 'Error contacte con el administrador*' };
	}
};

export default ActualizarAnuncio;