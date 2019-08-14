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
                    document.getElementById('chart').style.display='block';
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
            document.getElementById('chart').style.display='none';
        },
    },
    computed: {
        checkSolutions(){
            this.p = (this.a21 * this.a12) - (this.a11 * this.a22);
            this.q = (this.a21 * this.b1) - (this.a11 * this.b2);
            this.y = this.q / this.p;
            this.x = (this.b1 - (this.a12 * this.y))/this.a11;
            if(this.p != 0){
                var x1 = (this.b1 / this.a11); //Posición recta 1, primer punto X= 0 y Y= Cálculo.
                var y1 = (this.b1 / this.a12*6);// Posición recta 1, segundo punto X= Cálculo Y= 0;
                var x2 = (this.b2 / this.a22);//Posición recta 2, primer punto X= 0 y Y= Cálculo.
                var y2 = (Number(this.b2) + Number(((this.a21 * 6) * -1))) / this.a22; //Posición recta 2, primer punto X= 0 y Y= Cálculo.
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
                            { x: 0, y: y1},
                            { x: x1, y: 0}
                        ]
                    },
                    {        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: x2},
                            { x: 6, y: y2}
                        ]
                    }
                ],
                    
                });
                chart.render();
                return 'Tiene solución única. X= '+ this.x + ' Y= ' + this.y;
            }else if(this.p == 0 && this.q != 0){
                var x1 = (this.b1 / this.a11); //Posición recta 1, primer punto X= 0 y Y= Cálculo.
                var y1 = (this.b1 / this.a12);// Posición recta 1, segundo punto X= Cálculo Y= 0;
                var x2 = (this.b2 / this.a22);//Posición recta 2, primer punto X= 0 y Y= Cálculo.
                var y2 = (Number(this.b2) + Number(((this.a21 * 6) * -1))) / this.a22; //Posición recta 2, primer punto X= 0 y Y= Cálculo.
                var chart = new CanvasJS.Chart("chart", {
                    animationEnabled: true,
                    theme: "light2",
                    title:{
                        text: "No tiene solución"
                    },
                    axisY:{
                        includeZero: false
                    },
                    data: [{        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: y1},
                            { x: x1, y: 0}
                        ]
                    },
                    {        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: x2},
                            { x: 6, y: y2}
                        ]
                    }
                ],
                    
                });
                chart.render();
                return 'No tiene solución.';
            }else if(this.p == 0 && this.q == 0){
                var x1 = (this.b1 / this.a11); //Posición recta 1, primer punto X= 0 y Y= Cálculo.
                var y1 = (this.b1 / this.a12*6);// Posición recta 1, segundo punto X= Cálculo Y= 0;
                var x2 = (this.b2 / this.a22);//Posición recta 2, primer punto X= 0 y Y= Cálculo.
                var y2 = (Number(this.b2) + Number(((this.a21 * 3) * -1))) / this.a22; //Posición recta 2, primer punto X= 0 y Y= Cálculo.
                var chart = new CanvasJS.Chart("chart", {
                    animationEnabled: true,
                    theme: "light2",
                    title:{
                        text: "Infinidad de soluciones"
                    },
                    axisY:{
                        includeZero: false
                    },
                    data: [{        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: y1},
                            { x: x1, y: 0}
                        ]
                    },
                    {        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: x2},
                            { x: 3, y: y2}
                        ]
                    }
                ],
                    
                });
                chart.render();
                return 'Tiene infinidad de soluciones.  Despejado = ' + this.b2 + ' + (' + (this.a21 * -1) + 'x) / ' + this.a22;
            }
        },
    },
});