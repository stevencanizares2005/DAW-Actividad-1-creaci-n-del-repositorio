// MIS VARIABLES 
let operacionActual = '';  // Aquí guardo todo el montonero de números y signos que voy tocando (ej: "12+5")
let reiniciarPantalla = false; // Este es un interruptor. Me avisa si debo borrar la pantalla cuando toque un número nuevo después de un igual.

// Agarro la pantalla del HTML usando su ID para poder meterle texto desde aquí
const pantalla = document.getElementById('pantalla');

// 1. FUNCIÓN PARA LOS NÚMEROS
function agregarNumero(numero) {
    // Si en la pantalla hay solo un '0' o si acabo de dar un resultado, limpio la pantalla para poner el nuevo número limpio
    if (pantalla.value === '0' || reiniciarPantalla) {
        pantalla.value = '';
        reiniciarPantalla = false; // Apago el interruptor para que me deje seguir escribiendo normal
    }
    
    pantalla.value += numero;    // Lo pinto en la pantalla del navegador
    operacionActual += numero;   // Lo guardo en mi variable interna para hacer la matemática luego
}

// 2. FUNCIÓN PARA LOS SIGNOS (+, -, *, /)
function agregarOperador(operador) {
    // Seguridad básica: guardo el último caracter que se escribió
    const ultimoCaracter = operacionActual.slice(-1);
    
    // Si el usuario se equivoca y mete dos signos seguidos (como "++" o "+*"), freno la función y no hago nada
    if (['+', '-', '*', '/'].includes(ultimoCaracter)) {
        return; 
    }

    pantalla.value += ' ' + operador + ' '; // Lo muestro en pantalla con espacios a los lados para que se vea ordenado
    operacionActual += operador;            // Lo pego a la operación interna sin espacios para que no falle el cálculo
    reiniciarPantalla = false;
}

// 3. FUNCIÓN PARA BORRAR TODO (Botón C)
function limpiarPantalla() {
    pantalla.value = '0'; // Dejo la pantalla como nueva, en cero
    operacionActual = ''; // Vacío por completo la variable para empezar desde cero
}

// 4. FUNCIÓN PARA HACER LA MAGIA MATEMÁTICA (Botón =)
function calcularResultado() {
    if (operacionActual === '') return; // Si la pantalla está vacía y hunden igual, no hago nada

    try {
        // Uso 'eval()', que es una mina de oro: le pasas un texto como "5+5*2" y te lo resuelve respetando las leyes matemáticas
        let resultado = eval(operacionActual);
        
        pantalla.value = resultado; // Muestro el resultado final en la pantalla
        operacionActual = resultado.toString(); // Dejo el resultado guardado en la variable por si quieren seguir sumándole cosas
        reiniciarPantalla = true;   // Prendo el interruptor para que el siguiente número que toquen borre la pantalla y empiece de nuevo
    } catch (error) {
        // Si el usuario hace una locura y el código explota, le clavo un 'Error' en la pantalla
        pantalla.value = 'Error';
        operacionActual = '';
    }
}