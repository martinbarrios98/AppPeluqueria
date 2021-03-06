let pagina = 1;

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
});

function iniciarApp (){

    let listadoServicios = document.querySelector('#servicios');
    mostrarServicios(listadoServicios);

    //Mostrar Seccion Actual y tab button actual

    mostrarSeccion();

    //Cambiar Seccion y tab button actual
    cambiarSeccion();

    
}

async function mostrarServicios (lista){

    let consulta = await fetch('servicios.json');
    let db = await consulta.json();
    let { servicios } = await db;

    servicios.forEach( servicio => {
        
        let { id, nombre, precio } = servicio;

        //Doom Scripting

            //Div servicio
            let contenedor = document.createElement('div');
            contenedor.classList.add('servicio');
            contenedor.dataset.idServicio = id;
                //Evento Seleccionado 
                contenedor.onclick = seleccionarServicio;
            //Parrafo Nombre
            let nodoNombre = document.createElement('p');
            nodoNombre.classList.add('nombre-servicio');
            nodoNombre.textContent = `${nombre}`;
            //Parrafo Precio
            let nodoPrecio = document.createElement('p');
            nodoPrecio.classList.add('precio-servicio');
            nodoPrecio.textContent = `$   ${precio}`;

            //Appends

            contenedor.appendChild(nodoNombre);
            contenedor.appendChild(nodoPrecio);

            //Append al HTML
            lista.appendChild(contenedor);

    });

}

function seleccionarServicio (e){
    
    let elemento;

    if(e.target.tagName === 'DIV'){
        elemento = e.target;
    }else{
        elemento = e.target.parentElement;
    }

    if(elemento.classList.contains('seleccionado')){
        elemento.classList.remove('seleccionado')
    }else{
        elemento.classList.add('seleccionado')
    }

}

function mostrarSeccion (){

    let seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    let tabActual = document.querySelector(`[data-paso="${pagina}"]`);
    tabActual.classList.add('tab-actual');


}

function cambiarSeccion (){
    
    let tabs = document.querySelectorAll('.tabs button');

    tabs.forEach( tab => {

        tab.addEventListener('click', e => {
            
            pagina = parseInt(e.target.dataset.paso);

            //Eliminar class(mostrar-seccion) de la actual seccion mostrada

            document.querySelector('.mostrar-seccion').classList.remove('mostrar-seccion')

            const seccion = document.querySelector(`#paso-${pagina}`);
            seccion.classList.add('mostrar-seccion');

            //Eliminar class(tab-actual) del tab actual

            document.querySelector('.tab-actual').classList.remove('tab-actual');

            const tab = document.querySelector(`[data-paso="${pagina}"]`);
            tab.classList.add('tab-actual')

        })


    })


}