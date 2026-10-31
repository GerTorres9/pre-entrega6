// ============================================================================
// PRE-ENTREGA 6: INTERACTUANDO CON FUNCIONES DE ORDEN SUPERIOR
// Simulador de Tienda y Cotización — TechCore Hardware & PC
// Integra: Ciclos (M2) + Funciones (M3) + Arrays (M4) + Clases/Objetos (M5)
//          + Funciones de Orden Superior: forEach, find, filter, some, map, reduce (M6)
// ============================================================================

// Constantes globales del sistema
const NOMBRE_TIENDA_HARDWARE = "TechCore Hardware & PC";
const TASA_IVA_MEXICO = 0.16;
const MONTO_MINIMO_ENVIO_GRATIS = 10000;
const TARIFA_ENVIO_ESTANDAR = 250;

// ============================================================================
// 1. CLASE PRINCIPAL DEL SIMULADOR (Módulo 5)
// ============================================================================

class ProductoHardware {
    constructor(id, nombre, categoria, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
        this.disponible = stock > 0;
    }

    vender(cantidadUnidades) {
        if (cantidadUnidades <= 0 || cantidadUnidades > this.stock) {
            return false;
        }
        this.stock -= cantidadUnidades;
        this.disponible = this.stock > 0;
        return true;
    }

    aplicarDescuento(porcentajeDescuento) {
        if (porcentajeDescuento > 0 && porcentajeDescuento < 100) {
            const factor = 1 - porcentajeDescuento / 100;
            this.precio = Math.round(this.precio * factor * 100) / 100;
        }
        return this.precio;
    }

    calcularPrecioConIva(tasaIva = TASA_IVA_MEXICO) {
        return Math.round(this.precio * (1 + tasaIva) * 100) / 100;
    }

    obtenerResumenProducto() {
        const textoStock = this.stock > 0 ? `${this.stock} disp.` : "AGOTADO";
        return `[ID #${this.id}] ${this.nombre} (${this.categoria}) — $${this.precio} MXN | Stock: ${textoStock}`;
    }
}

// ============================================================================
// 2. CREACIÓN DEL ARRAY DE OBJETOS A PARTIR DE LA CLASE
// ============================================================================

const procesadorRyzen = new ProductoHardware(1, "Procesador AMD Ryzen 7 7800X3D", "Procesadores", 8400, 10);
const tarjetaGraficaRtx = new ProductoHardware(2, "Tarjeta Grafica NVIDIA RTX 4070 Super", "Tarjetas de Video", 13900, 6);
const memoriaRamDdr5 = new ProductoHardware(3, "Memoria RAM Kit 32GB DDR5 6000MHz", "Memorias RAM", 2450, 15);
const unidadSsdNvme = new ProductoHardware(4, "Unidad SSD NVMe M.2 Gen4 2TB", "Almacenamiento", 2850, 18);
const monitorGamerQhd = new ProductoHardware(5, "Monitor Gamer 27 QHD 180Hz IPS", "Monitores", 5600, 8);
const fuentePoderGold = new ProductoHardware(6, "Fuente de Poder 850W 80+ Gold Modular", "Fuentes de Poder", 2190, 0);

// Array principal de objetos del simulador
const catalogoProductosHardware = [
    procesadorRyzen,
    tarjetaGraficaRtx,
    memoriaRamDdr5,
    unidadSsdNvme,
    monitorGamerQhd,
    fuentePoderGold
];

// Array de objetos para almacenar los ítems que el usuario agrega al carrito
const carritoComprasCliente = [];

// ============================================================================
// 3. DEMOSTRACIÓN INICIAL EN CONSOLA DE LAS FUNCIONES DE ORDEN SUPERIOR
// ============================================================================

console.log("=== DEMOSTRACIÓN INICIAL DE FUNCIONES DE ORDEN SUPERIOR (MÓDULO 6) ===");

// A) Búsqueda con find: traer un objeto puntual por nombre o id
const productoDestacadoBuscado = catalogoProductosHardware.find(
    (producto) => producto.nombre === "Monitor Gamer 27 QHD 180Hz IPS"
);
console.log("1. [find] Producto puntual encontrado:", productoDestacadoBuscado);

// B) Búsqueda con filter: quedarse solo con los objetos que tienen stock > 0
const productosConStockDisponible = catalogoProductosHardware.filter(
    (producto) => producto.stock > 0
);
console.log("2. [filter] Productos con stock disponible:", productosConStockDisponible);

// C) Búsqueda con some: verificar si existe algún componente agotado
const existeProductoAgotado = catalogoProductosHardware.some(
    (producto) => producto.stock === 0
);
console.log("3. [some] ¿Existe algún producto sin stock en almacén?:", existeProductoAgotado);

// D) Transformación con map: generar nuevo array con precios con IVA incluido (16%)
const listaCatalogoConIva = catalogoProductosHardware.map((producto) => ({
    id: producto.id,
    nombre: producto.nombre,
    categoria: producto.categoria,
    precioBase: producto.precio,
    precioConIva: producto.calcularPrecioConIva(TASA_IVA_MEXICO),
    stock: producto.stock
}));
console.log("4. [map] Catálogo transformado con precio + IVA (16%):", listaCatalogoConIva);

// E) Transformación/Cálculo con reduce: valor total invertido en inventario
const valorTotalInventario = catalogoProductosHardware.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.stock,
    0
);
console.log("5. [reduce] Valor total en stock del almacén: $" + valorTotalInventario + " MXN\n");

// ============================================================================
// 4. FUNCIONES DEL SIMULADOR CON MÉTODOS DE ORDEN SUPERIOR EN CONTEXTO
// ============================================================================

// Función que utiliza forEach() y reduce() para listar los productos disponibles
function mostrarCatalogoDisponibleConForEach(listaProductos) {
    const disponibles = listaProductos.filter((producto) => producto.stock > 0);
    let textoCatalogo = "CATÁLOGO DE HARDWARE CON STOCK DISPONIBLE:\n\n";

    console.log("\n--- LISTADO DE PRODUCTOS DISPONIBLES (forEach) ---");
    disponibles.forEach((producto) => {
        const linea = producto.obtenerResumenProducto();
        console.log(linea);
        textoCatalogo += `${linea}\n`;
    });

    const totalValorStock = disponibles.reduce(
        (acumulador, producto) => acumulador + producto.precio * producto.stock,
        0
    );

    textoCatalogo += `\nValor total del inventario disponible (reduce): $${totalValorStock} MXN`;
    console.log(`Valor total del inventario disponible (reduce): $${totalValorStock} MXN`);
    alert(textoCatalogo);
}

// Función que utiliza map() para transformar los precios agregando IVA y descuento promocional
function consultarListaTransformadaConMap(listaProductos, tasaIva) {
    const catalogoTransformado = listaProductos
        .filter((producto) => producto.stock > 0)
        .map((producto) => {
            const precioConIva = producto.calcularPrecioConIva(tasaIva);
            const precioPromoCyber = Math.round(producto.precio * 0.90 * 100) / 100;
            return {
                id: producto.id,
                nombre: producto.nombre,
                precioLista: producto.precio,
                precioConIva: precioConIva,
                precioPromo10: precioPromoCyber
            };
        });

    console.log("\n--- CATÁLOGO TRANSFORMADO CON map() (Precios con IVA y Promo -10%) ---");
    let mensajeTransformado = "LISTA DE PRECIOS TRANSFORMADA CON map():\n\n";

    catalogoTransformado.forEach((itemTransformado) => {
        const linea =
            `#${itemTransformado.id} ${itemTransformado.nombre}\n` +
            `   Base: $${itemTransformado.precioLista} | Con IVA: $${itemTransformado.precioConIva} | Promo -10%: $${itemTransformado.precioPromo10} MXN`;
        console.log(linea);
        mensajeTransformado += `${linea}\n\n`;
    });

    alert(mensajeTransformado);
}

// Función que utiliza some() y filter() según el presupuesto máximo ingresado por el usuario
function filtrarProductosPorPresupuesto(listaProductos) {
    const entradaPresupuesto = prompt(
        "FILTRAR COMPONENTES POR PRESUPUESTO (filter + some)\n\n" +
        "Ingresa tu presupuesto máximo en MXN (ejemplo: 6000):",
        "6000"
    );

    if (entradaPresupuesto === null) {
        return;
    }

    const presupuestoMaximo = parseFloat(entradaPresupuesto);

    if (isNaN(presupuestoMaximo) || presupuestoMaximo <= 0) {
        alert("Por favor ingresa un monto numérico válido mayor a 0.");
        return;
    }

    // Validamos primero con some() si existe al menos un producto dentro de ese presupuesto
    const hayOpcionesEnPresupuesto = listaProductos.some(
        (producto) => producto.stock > 0 && producto.precio <= presupuestoMaximo
    );

    if (!hayOpcionesEnPresupuesto) {
        const mensajeSinResultados = `❌ No se encontraron productos con stock por debajo de $${presupuestoMaximo} MXN.`;
        console.log(mensajeSinResultados);
        alert(mensajeSinResultados);
        return;
    }

    // Filtramos con filter() todos los objetos que cumplen el presupuesto del usuario
    const productosFiltrados = listaProductos.filter(
        (producto) => producto.stock > 0 && producto.precio <= presupuestoMaximo
    );

    console.log(`\n--- RESULTADOS DE filter() CON PRESUPUESTO <= $${presupuestoMaximo} MXN ---`);
    let textoResultado = `Encontramos ${productosFiltrados.length} componente(s) hasta $${presupuestoMaximo} MXN:\n\n`;

    productosFiltrados.forEach((producto) => {
        console.log(producto.obtenerResumenProducto());
        textoResultado += `${producto.obtenerResumenProducto()}\n`;
    });

    alert(textoResultado);
}

// Función que utiliza find() para buscar un objeto por ID o nombre y agregarlo al carrito
function buscarYAgregarProductoConFind(listaProductos, carritoCliente) {
    let resumenMenu = "BUSCAR Y AGREGAR COMPONENTE AL CARRITO (Método find)\n\n";

    listaProductos
        .filter((producto) => producto.stock > 0)
        .forEach((producto) => {
            resumenMenu += `ID ${producto.id}: ${producto.nombre} — $${producto.precio} MXN (Stock: ${producto.stock})\n`;
        });

    resumenMenu += "\nIngresa el ID numérico (ej. 1) o parte del nombre del componente (ej. Ryzen):";

    const criterioBusqueda = prompt(resumenMenu);

    if (criterioBusqueda === null || criterioBusqueda.trim() === "") {
        return;
    }

    const textoLimpio = criterioBusqueda.trim();
    const idPosible = parseInt(textoLimpio, 10);

    // Búsqueda del objeto en el array usando find()
    const productoEncontrado = listaProductos.find((producto) => {
        if (!isNaN(idPosible)) {
            return producto.id === idPosible;
        }
        return producto.nombre.toLowerCase().includes(textoLimpio.toLowerCase());
    });

    if (!productoEncontrado) {
        const avisoNoExiste = `❌ No se encontró ningún componente con el criterio "${textoLimpio}".`;
        console.log(avisoNoExiste);
        alert(avisoNoExiste);
        return;
    }

    console.log("\n--- OBJETO CAPTURADO CON find() ---", productoEncontrado);

    if (productoEncontrado.stock <= 0) {
        alert(`⚠️ El componente "${productoEncontrado.nombre}" está agotado actualmente.`);
        return;
    }

    const entradaUnidades = prompt(
        `Componente encontrado con find():\n` +
        `${productoEncontrado.obtenerResumenProducto()}\n\n` +
        `¿Cuántas unidades deseas agregar al carrito? (1 a ${productoEncontrado.stock}):`,
        "1"
    );

    if (entradaUnidades === null) {
        return;
    }

    const cantidadUnidades = parseInt(entradaUnidades, 10);

    if (isNaN(cantidadUnidades) || cantidadUnidades < 1 || cantidadUnidades > productoEncontrado.stock) {
        alert(`Cantidad inválida. Debes ingresar entre 1 y ${productoEncontrado.stock} unidad(es).`);
        return;
    }

    // Descontamos del objeto original usando su método de instancia vender()
    productoEncontrado.vender(cantidadUnidades);

    // Buscamos con find() si el ítem ya existe dentro del carrito para acumularlo
    const itemExistenteEnCarrito = carritoCliente.find(
        (item) => item.id === productoEncontrado.id
    );

    if (itemExistenteEnCarrito) {
        itemExistenteEnCarrito.cantidad += cantidadUnidades;
        itemExistenteEnCarrito.subtotal =
            Math.round(itemExistenteEnCarrito.cantidad * itemExistenteEnCarrito.precioUnitario * 100) / 100;
    } else {
        carritoCliente.push({
            id: productoEncontrado.id,
            nombre: productoEncontrado.nombre,
            categoria: productoEncontrado.categoria,
            precioUnitario: productoEncontrado.precio,
            cantidad: cantidadUnidades,
            subtotal: Math.round(productoEncontrado.precio * cantidadUnidades * 100) / 100
        });
    }

    // Calculamos el acumulado del carrito en tiempo real usando reduce()
    const totalAcumuladoCarrito = carritoCliente.reduce(
        (acumulador, item) => acumulador + item.subtotal,
        0
    );

    const mensajeConfirmacion =
        `✅ Se agregaron ${cantidadUnidades}x "${productoEncontrado.nombre}" al carrito.\n` +
        `Subtotal acumulado en carrito (calculado con reduce): $${totalAcumuladoCarrito} MXN`;
    console.log(mensajeConfirmacion);
    alert(mensajeConfirmacion);
}

// Función que utiliza reduce(), map() y forEach() para cerrar la compra y calcular totales
function finalizarCompraConReduce(nombreTienda, nombreCliente, carritoCliente, tasaIva, minimoEnvioGratis, tarifaEnvio) {
    if (carritoCliente.length === 0) {
        alert("Tu carrito de compras aún está vacío. Primero agrega al menos un componente (Opción 3).");
        return false;
    }

    // Cálculo del subtotal bruto y total de unidades mediante reduce()
    const subtotalBruto = carritoCliente.reduce(
        (acumulador, item) => acumulador + item.subtotal,
        0
    );
    const totalUnidades = carritoCliente.reduce(
        (acumulador, item) => acumulador + item.cantidad,
        0
    );

    // Transformación de las líneas del carrito a formato texto con map()
    const lineasDetalleCarrito = carritoCliente.map(
        (item) => `- ${item.cantidad}x ${item.nombre} ($${item.precioUnitario} c/u) = $${item.subtotal} MXN`
    );

    const entradaCupon = prompt(
        `Tienes ${totalUnidades} unidad(es) en tu carrito por un subtotal de $${subtotalBruto} MXN.\n\n` +
        "Ingresa un cupón de descuento (TECH10 para 10% o GAMER15 para 15%) o deja vacío:"
    );
    const codigoCupon = entradaCupon !== null ? entradaCupon.trim().toUpperCase() : "";

    let porcentajeDescuento = totalUnidades >= 3 ? 0.05 : 0;
    if (codigoCupon === "TECH10") {
        porcentajeDescuento += 0.10;
    } else if (codigoCupon === "GAMER15") {
        porcentajeDescuento += 0.15;
    }

    const montoDescuento = Math.round(subtotalBruto * porcentajeDescuento * 100) / 100;
    const subtotalNeto = Math.round((subtotalBruto - montoDescuento) * 100) / 100;
    const montoIva = Math.round(subtotalNeto * tasaIva * 100) / 100;
    const costoEnvio = subtotalNeto >= minimoEnvioGratis ? 0 : tarifaEnvio;
    const totalFinal = Math.round((subtotalNeto + montoIva + costoEnvio) * 100) / 100;

    const ticketFinal =
        "==================================================\n" +
        ` TICKET DE COMPRA — ${nombreTienda}\n` +
        "==================================================\n" +
        `Cliente: ${nombreCliente}\n` +
        `Total de artículos (reduce): ${totalUnidades}\n\n` +
        "Artículos adquiridos (map):\n" +
        lineasDetalleCarrito.join("\n") + "\n" +
        "--------------------------------------------------\n" +
        `Subtotal Bruto (reduce): $${subtotalBruto} MXN\n` +
        `Descuento Aplicado:     -$${montoDescuento} MXN\n` +
        `Subtotal Neto:           $${subtotalNeto} MXN\n` +
        `IVA (16%):              +$${montoIva} MXN\n` +
        `Costo de Envío:         +$${costoEnvio} MXN\n` +
        "--------------------------------------------------\n" +
        `TOTAL FINAL A PAGAR:     $${totalFinal} MXN\n` +
        "==================================================";

    console.log("\n" + ticketFinal);
    alert(ticketFinal);
    return true;
}

// ============================================================================
// 5. CICLO INTERACTIVO PRINCIPAL DEL SIMULADOR
// ============================================================================

function iniciarSimuladorOrdenSuperior(
    nombreTienda,
    catalogoProductos,
    carritoCliente,
    tasaIva,
    minimoEnvioGratis,
    tarifaEnvio
) {
    const entradaNombre = prompt(
        `Bienvenido a ${nombreTienda}.\n` +
        "Ingresa tu nombre para interactuar con el simulador de hardware:"
    );
    const nombreCliente = entradaNombre !== null && entradaNombre.trim() !== ""
        ? entradaNombre.trim()
        : "Cliente Invitado";

    let simuladorActivo = true;

    while (simuladorActivo) {
        const subtotalCarritoActual = carritoCliente.reduce(
            (acumulador, item) => acumulador + item.subtotal,
            0
        );

        const opcionMenu = prompt(
            `SIMULADOR ${nombreTienda} — Cliente: ${nombreCliente}\n` +
            `Carrito actual: ${carritoCliente.length} producto(s) | Subtotal: $${subtotalCarritoActual} MXN\n\n` +
            "Elige la operación que deseas realizar:\n" +
            "1. Ver catálogo con stock y valor de inventario (filter + forEach + reduce)\n" +
            "2. Filtrar componentes por presupuesto máximo (some + filter)\n" +
            "3. Buscar componente por ID o nombre y agregar al carrito (find)\n" +
            "4. Ver tabla de precios transformada con IVA y Promo -10% (map)\n" +
            "5. Finalizar compra y emitir ticket (reduce + map)\n" +
            "0. Salir del simulador"
        );

        if (opcionMenu === null || opcionMenu.trim() === "0") {
            simuladorActivo = false;
            console.log(`Gracias por visitar ${nombreTienda}, ${nombreCliente}.`);
        } else {
            switch (opcionMenu.trim()) {
                case "1":
                    mostrarCatalogoDisponibleConForEach(catalogoProductos);
                    break;
                case "2":
                    filtrarProductosPorPresupuesto(catalogoProductos);
                    break;
                case "3":
                    buscarYAgregarProductoConFind(catalogoProductos, carritoCliente);
                    break;
                case "4":
                    consultarListaTransformadaConMap(catalogoProductos, tasaIva);
                    break;
                case "5": {
                    const compraCerrada = finalizarCompraConReduce(
                        nombreTienda,
                        nombreCliente,
                        carritoCliente,
                        tasaIva,
                        minimoEnvioGratis,
                        tarifaEnvio
                    );
                    if (compraCerrada) {
                        simuladorActivo = false;
                    }
                    break;
                }
                default:
                    alert("Opción no válida. Por favor elige una opción del 1 al 5, o 0 para salir.");
                    break;
            }
        }
    }
}

// Ejecución del simulador
iniciarSimuladorOrdenSuperior(
    NOMBRE_TIENDA_HARDWARE,
    catalogoProductosHardware,
    carritoComprasCliente,
    TASA_IVA_MEXICO,
    MONTO_MINIMO_ENVIO_GRATIS,
    TARIFA_ENVIO_ESTANDAR
);
