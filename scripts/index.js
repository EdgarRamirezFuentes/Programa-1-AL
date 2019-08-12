const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
var app = new Vue({
    el: '#app',
    data:{
        //Variables toman el valor introducidos en los campos de la interface.
        a11: '', //
        a12: '',
        a21: '',
        a22: '',
        b1: '',
        b2: '',
        p: '',
        q: '',
        x:'',
        y:'',
        validateDataArray: [],
        calculate: false,
    },
    methods: {
        validateFields(a11,a12,b1,a21,a22,b2){
            if(a11 != '' && a12 != '' && b1 != '' && a21 != '' && a22 != '' && b2 != ''){
                this.validateDataArray.push(a11,a12,b1,a21,a22,b2);
                if(!this.validateData()){
                    this.errorAlert('Datos no válidos.');
                    this.calculate = false;
                    this.validateDataArray = [];
                }else{
                    this.calculate = true;
                    this.successAlert('Datos válidos.');
                }
            }else{
                this.errorAlert('Todos los campos son obligatorios.');
            }
        },
        errorAlert(message){
            Toast.fire({
                type: 'error',
                title: message,
            });
        },
        successAlert(message){
            Toast.fire({
                type: 'success',
                title: message,
            });
        },
        validateData(){
            var correctData = true;
            for(data of this.validateDataArray){
                if(this.isInteger(data) /*this.isFraction(data)*/){
                }else{
                    correctData = false;
                    break;
                }
            }
            return correctData;
        },
        /*isFraction(data){
            var regExpFraction = /^-?[0-9]+\/{1}[1-9]+$/;
            return (regExpFraction.test(data)) ? true : false;
        },*/
        isInteger(data){
            var regExpInteger = /^-?[0-9]+$/;
            return (regExpInteger.test(data)) ? true : false;
        },
        restartData(){
            this.a11 = '',
            this.a12 = '',
            this.b1 = '',
            this.a21 = '',
            this.a22 = '',
            this.b2 = '',
            this.calculate = false;
        },
    },
    computed: {
        checkSolutions(){
            this.p = (this.a21 * this.a12) - (this.a11 * this.a22);
            this.q = (this.a21 * this.b1) - (this.a11 * this.b2);
            this.y = this.q / this.p;
            this.x = (this.b1 - (this.a12 * this.y))/this.a11;
            if(this.p != 0){
                var chart = new CanvasJS.Chart("chart", {
                    animationEnabled: true,
                    theme: "light2",
                    title:{
                        text: "Solución única"
                    },
                    axisY:{
                        includeZero: false
                    },
                    data: [{        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: 0},
                            { x: this.x , y: this.y ,indexLabel: '(x: '+this.x+', y: '+this.y+')',markerColor: "red", markerType: "triangle"},
                            {x: this.x+5, y: this.y+5}
                        ]
                    },
                    {        
                        type: "line",       
                        dataPoints: [
                            { x:this.x+10, y: 0},
                            { x: this.x , y: this.y,indexLabel: '(x: '+this.x+', y: '+this.y+')',markerColor: "red", markerType: "triangle"},
                            {x: this.x-5, y: this.y+4}
                        ]
                    }
                ],
                    
                });
                chart.render();
                return 'Tiene solución única. X= '+ this.x + ' Y= ' + this.y;
            }else if(this.p == 0 && this.q != 0){
                return 'No tiene solución.';
            }else if(this.p == 0 && this.q == 0){
                return 'Tiene infinidad de soluciones.';
            }
        },
    },
});