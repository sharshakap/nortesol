const useCantidadTotalCarrito = () => {
	try {
		const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
		let cantidad = 0;
		carrito.forEach((producto: any) => {
			cantidad += producto.c;
		});
		return cantidad;
	} catch (error) {
		localStorage.removeItem('carrito');
		window.location.replace('/');
	}
};

export default useCantidadTotalCarrito;
