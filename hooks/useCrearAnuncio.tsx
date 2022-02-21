import { APIURL } from '../utils/constantes';

const useCrearAnuncio = async ({
	nombre,
	descripcion,
	url,
	url_name,
	imagen,
}: any) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			localStorage.removeItem('tken');
			window.location.href = '/';
			return;
		}

		let formData = new FormData();
		nombre && formData.append('nombre', nombre);
		descripcion && formData.append('descripcion', descripcion);
		url && formData.append('url', url);
		url_name && formData.append('url_name', url_name);
		let file = null;
		if (imagen && imagen.length > 0) {
			file = imagen.item(0);
			formData.append('files[]', file);
		}
		const response = await fetch(APIURL + 'anuncios', {
			method: 'POST',
			headers: {
				'x-token': token,
			},
			body: formData,
		});
		const data = await response.json();

		return data;
	} catch (error) {
		return { ok: false, msg: 'Error contacte con el administrador*' };
	}
};

export default useCrearAnuncio;
