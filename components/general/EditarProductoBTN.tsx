import { useRouter } from 'next/router';

const EditarProductoBTN = ({ id_edit_prod = '' }) => {
	const router = useRouter();
	return (
		<div className="editarBTN NOSELECT">
			<span
				onClick={() => {
					window.location.href = '/user/nortesoladm/' + id_edit_prod;
				}}
			>
				<i className="fas fa-pencil" />
				<span>Editar</span>
			</span>
		</div>
	);
};

export default EditarProductoBTN;
