new Vue({
    el: '#app',
    data: {
        recetas: [],
        ingredientes: [],
        platilloSeleccionado: '',
        ingredientesPosibles: [],
        ingredientesSeleccionados: [],
        mensaje: '',
        receta: null
    },
    created() {
        fetch('app/js/ingredientes.json')
            .then(response => response.json())
            .then(data => {
                this.recetas = data.recetas;
                this.ingredientes = data.ingredientes;
            });
    },
    methods: {
        actualizarIngredientes() {
            const recetaSeleccionada = this.recetas.find(receta => receta.titulo === this.platilloSeleccionado);
            if (recetaSeleccionada) {
                this.ingredientesPosibles = recetaSeleccionada.ingredientes;
                this.ingredientesSeleccionados = [];
                this.receta = null;
                this.mensaje = '';
            }
        },
        cocinar() {
            const recetaSeleccionada = this.recetas.find(receta => receta.titulo === this.platilloSeleccionado);
            if (recetaSeleccionada) {
                const ingredientesCorrectos = recetaSeleccionada.ingredientes.every(ing => this.ingredientesSeleccionados.includes(ing)) &&
                                              this.ingredientesSeleccionados.every(ing => recetaSeleccionada.ingredientes.includes(ing));
                if (ingredientesCorrectos) {
                    this.receta = recetaSeleccionada;
                    this.mensaje = '';
                } else {
                    this.receta = null;
                    this.mensaje = 'NO hay resultados';
                }
            }
        }
    }
});
