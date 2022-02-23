import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import Volver from '../../../../../components/general/Volver';
import ProductoHead from '../../../../../components/venta/ProductoHead';
import ProductoBody from '../../../../../components/venta/ProductoBody';
import ProductoRelacionados from '../../../../../components/venta/ProductoRelacionados';
import EditarProductoBTN from '../../../../../components/general/EditarProductoBTN';
import Capitalize from '../../../../../utils/capitalize';
import PonerProductoCarrito from '../../../../../helpers/PonerProductoCarrito';
import GetCantidadProductoCarrito from '../../../../../helpers/GetCantidadProductoCarrito';
import VentanaModal from '../../../../../components/general/VentanaModal';
import BotonFAColores1 from '../../../../../components/general/BotonFAColores1';
import GetProductos from '../../../../../helpers/GetProductos';
import Link from 'next/link';
import Wredirect from '../../../../../helpers/Wredirect';

const ProductoDes = ({ me, auth }: any) => {
	const router = useRouter();
	const { nombre_url_prod_des: nombre_url } = router.query;

	const [producto, setProducto] = useState<any>(false);
	const [cantidad, setCantidad] = useState(1);
	const [cantLlevada, setCantLlevada] = useState(0);
	const [relacionados, setRelacionados] = useState(0);
	const [carritoLleno, setCarritoLleno] = useState(false);

	useEffect(() => {
		if (!me.admin) return;
		nombre_url &&
			//@ts-ignore
			GetProductos({ nombre_url }, true)
				.then((res) => {
					if (!res.ok) {
						Wredirect();
						return;
					}
					const resProducto = res.productos.docs[0];

					setProducto(resProducto);
					setCantLlevada(GetCantidadProductoCarrito(resProducto.pid));
					//seleccionando una categoria al azar
					const categorias_names = resProducto.categorias_names;
					GetProductos({ limit: 7, categorias: categorias_names }, true)
						.then((resRel) => {
							const prodRelacionados = resRel.productos.docs.filter(
								(p: any) => p.nombre_url != resProducto.nombre_url
							);
							setRelacionados(prodRelacionados);
						})
						.catch();
				})
				.catch((e) => {
					console.log(e);
					alert('aca');
					Wredirect();
					return;
				});
	}, [nombre_url]);
	if (!me.admin) {
		Wredirect();
		return null;
	}
	return (
		<>
			{producto ? (
				<>
					{me.admin && (
						<EditarProductoBTN
							id_edit_prod={producto.nombre_url}
							desabilitado
						/>
					)}
					<Volver cantPagesBack={2} />
					<h1 className="producto__titulo">{Capitalize(producto.nombre)}</h1>
					<ProductoHead
						precio={producto.precio}
						imagenes={producto.detalle_producto.imagenes}
						cantidad_disponible={producto.cantidad}
						cantidad_carrito={cantLlevada}
						irCarritoUrl="/carrito"
						onChangeCantidad={(c: number) => {
							setCantidad(c);
						}}
						descuento={producto.descuento}
					/>
					<ProductoBody contenido={producto.detalle_producto.descripcion} />
					<ProductoRelacionados productosRel={relacionados} desabilitados />
					<br />
					{carritoLleno && (
						<VentanaModal
							titulo={'Carrito Lleno!'}
							onClose={() => {
								setCarritoLleno(false);
							}}
						>
							Ya llevas demasiados productos en el carrito.
							<br />
							<br />
							<Link passHref href="/carrito">
								<BotonFAColores1 backgroundColor="#f9423a">
									<i className="fas fa-shopping-cart"></i>
									Ir al carrito
								</BotonFAColores1>
							</Link>
						</VentanaModal>
					)}
				</>
			) : (
				<p className="CENTERABSOLUTE">Cargando...</p>
			)}
		</>
	);
};

export default ProductoDes;
