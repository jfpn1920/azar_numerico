/*-------------------------------------*/
/*--|funcionalidad_elementos_del_dom|--*/
/*-------------------------------------*/
const numero = document.getElementById("numero");
const botonGenerar = document.getElementById("generar");
const botonRestablecer = document.getElementById("restablecer");
const listaNumeros = document.getElementById("listaNumeros");
const cantidad = document.getElementById("cantidad");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");
/*----------------------------------*/
/*--|cargando_los_datos_iniciales|--*/
/*----------------------------------*/
const datosIniciales = {
    ultimoNumero: null, historial: []
};
/*-----------------------------------------------------*/
/*--|obtener_y_guardar_los_datos_usando_localstorage|--*/
/*-----------------------------------------------------*/
function obtenerDatos() {
    const datosGuardados = localStorage.getItem("azar_numerico");
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales;
}
function guardarDatos(datos) {
    localStorage.setItem("azar_numerico", JSON.stringify(datos));
}
/*-----------------------*/
/*--|generar_el_numero|--*/
/*-----------------------*/
function generarNumero() {
    const datos = obtenerDatos();
    const numeroGenerado = Math.floor(Math.random() * 10) + 1;
    datos.ultimoNumero = numeroGenerado;
    datos.historial.push(numeroGenerado);
    guardarDatos(datos);
    mostrarNumero(datos);
    mostrarHistorial(datos);
    mensaje.textContent = "Se ha generado un nuevo número.";
}
/*-----------------------*/
/*--|mostrar_el_numero|--*/
/*-----------------------*/
function mostrarNumero(datos) {
    if (datos.ultimoNumero === null) {
        numero.textContent = "?";
        return;
    }
    numero.textContent = datos.ultimoNumero;
}
/*--------------------------*/
/*--|mostrar_el_historial|--*/
/*--------------------------*/
function mostrarHistorial(datos) {
    listaNumeros.innerHTML = "";
    if (datos.historial.length === 0) {
        listaNumeros.innerHTML = `
            <p class="sin_datos">Todavía no has generado números.</p>
        `;
    }
    datos.historial.forEach((valor) => {
        const elemento = document.createElement("span");
        elemento.className = "numero_historial";
        elemento.textContent = valor;
        listaNumeros.appendChild(elemento);
    });
    actualizarInformacion(datos);
}
/*-------------------------------*/
/*--|actualizar_la_informacion|--*/
/*-------------------------------*/
function actualizarInformacion(datos) {
    cantidad.textContent = datos.historial.length;
    const cantidadNumeros = datos.historial.length;
    total.textContent = `${cantidadNumeros} números`;
}
/*--------------------------------------------*/
/*--|restablecer_los_datos_con_localstorage|--*/
/*--------------------------------------------*/
function restablecerDatos() {
    const confirmar = confirm("¿Deseas eliminar el historial y comenzar nuevamente?");
    if (confirmar) {
        localStorage.removeItem("azar_numerico");
        mostrarNumero(datosIniciales);
        mostrarHistorial(datosIniciales);
        mensaje.textContent = "Los datos fueron restablecidos.";
    }
}
/*---------------------------------------------*/
/*--|evento_generar_y_restablecer_a_un_click|--*/
/*---------------------------------------------*/
botonGenerar.addEventListener("click", generarNumero);
botonRestablecer.addEventListener("click", restablecerDatos);
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
function cargarDatos() {
    const datos = obtenerDatos();
    mostrarNumero(datos);
    mostrarHistorial(datos);
}
cargarDatos();