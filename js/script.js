const figuraSelector = {
    props: ['figuras', 'figuraSeleccionada'],
    template: `
        <div>
            <label for="figura" class="form-label">Selecciona una figura:</label>
            <select id="figura" class="form-select" :value="figuraSeleccionada" @input="$emit('update:figuraSeleccionada', $event.target.value)">
                <option v-for="figura in figuras" :value="figura">{{figura}}</option>
            </select>
        </div>
    `,
};




const valoresInput = {
    props: ['figura', 'valores'],
    template: `
    <div v-if="figura" class="mb-3">
        <h4 class="text-center">Dame los valores para calcular el área de un {{figura}}</h4>


        <div v-if="figura == 'circulo'">
            <label for="radio" class="form-label">Radio:</label>
            <input id="radio" type="number" v-model.number="valores.radio" class="form-control">
        </div>



        <div v-if="figura == 'cuadrado'">
            <label for="lado" class="form-label">Lado:</label>
            <input id="lado" type="number" v-model.number="valores.lado" class="form-control">
        </div>



        <div v-if="figura == 'triangulo'">
            <label for="base" class="form-label">Base:</label>
            <input id="base" type="number" v-model.number="valores.base" class="form-control">
            <label for="altura" class="form-label mt-2">Altura:</label>
            <input id="altura" type="number" v-model.number="valores.altura" class="form-control">
        </div>



        <button class="btn btn-primary mt-3" @click="$emit('calcular')">Calcular Área</button>
    </div>
    `,
};




const areaCalcular = {
    components: { figuraSelector, valoresInput },
    data() {
        return {
            figuras: ['circulo', 'cuadrado', 'triangulo'],
            figuraElegida: '',
            valores: {
                radio: 0,
                lado: 0,
                base: 0,
                altura: 0,
            },
            area: null,
        };
    },

    
    methods: {
        calcularA() {
            if (this.figuraElegida === 'circulo') {
                this.area = Math.PI * Math.pow(this.valores.radio, 2);
            } else if (this.figuraElegida === 'triangulo') {
                this.area = (this.valores.base * this.valores.altura) / 2;
            } else if (this.figuraElegida === 'cuadrado') {
                this.area = Math.pow(this.valores.lado, 2);
            }
        },
    },


    template: `
    <div>
        <figura-selector :figuras="figuras" v-model:figuraSeleccionada="figuraElegida"></figura-selector>

        <valores-input :figura="figuraElegida" :valores="valores" @calcular="calcularA"></valores-input>

        <div v-if="area !== null" class="alert alert-success mt-3">
            El área del {{figuraElegida}} es: {{area.toFixed(2)}}
        </div>
    </div>
    `
};

const app = Vue.createApp({
    components: { areaCalcular },
});

app.mount('#app');
