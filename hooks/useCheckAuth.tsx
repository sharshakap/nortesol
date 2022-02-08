/**
 * Este componente sirve para checar si el token y id en el storage es valido.
 */
import JWT from 'jsonwebtoken';
import { APIURL } from '../utils/constantes';

const useCheckAuth = async () => {
	const token = localStorage.getItem('tken');
	if (!token) {
		return false;
	}
	const checkToken = await fetch(APIURL + 'auth', {
		method: 'GET',
		headers: {
			['x-token']: `${token}`,
			'Content-Type': 'application/json',
		},
	});
	if (!checkToken.ok) {
		localStorage.clear();
		return false;
	}
	const decToken: any = JWT.decode(token);
	const miID = decToken.check;
	localStorage.setItem('me', miID);
	return true;
};

export default useCheckAuth;
