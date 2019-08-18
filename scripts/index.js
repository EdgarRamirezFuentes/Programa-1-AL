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
            this.p = Number((this.a21 * this.a12) - (this.a11 * this.a22));
            this.q = Number((this.a21 * this.b1) - (this.a11 * this.b2));
            this.y = Number(this.q / this.p);
            this.x = Number((this.b1 - (this.a12 * this.y))/this.a11);
            if(this.p != 0){
                var pInicio1 = Number((this.b1/this.a12));
                var pFinalX1 = 0;
                var pFinalY1 = Number((this.b1/this.a12));
                console.log( pInicio1+' '+pFinalY1); 
                var aumentoX1 = Number(this.a12);
                var aumentoY1 = Number((this.a11) * -1);
                if(pInicio1 > this.y){
                    while(pFinalY1 > Number(this.y + aumentoY1)){
                        pFinalY1 = pFinalY1 + aumentoY1;
                        pFinalX1 = pFinalX1 + aumentoX1;
                        console.log( pInicio1+' '+pFinalY1); 
                    }
                }else{
                    var i =0;
                    while(pFinalY1 <= Number(this.y)){
                        i++
                        if(pFinalY1<0){
                            pFinalY1 = pFinalY1 - aumentoY1;
                            pFinalX1 = pFinalX1 - aumentoX1;
                        }else{
                            pFinalY1 = pFinalY1 + aumentoY1;
                            pFinalX1 = pFinalX1 + aumentoX1;
                        }
                        console.log( pInicio2+' '+pFinalY2); 
                        if(i>10){
                            break;
                        }
                    }
                }
                var pInicio2 = Number((this.b2 / this.a22));
                var pFinalX2 = 0;
                var pFinalY2 = Number((this.b2 / this.a22));
                console.log( 'ff'+pInicio2+' '+pFinalY2);
                var aumentoX2 = Number(this.a22);
                var aumentoY2 = Number((this.a21) * -1);
                if(pInicio2 >= this.y){
                    
                    while(pFinalY2 >= (this.y + aumentoY2)){
                        pFinalY2 = pFinalY2 + aumentoY2;
                        pFinalX2 = pFinalX2 + aumentoX2;
                        console.log( pInicio2+' '+pFinalY2); 
                    }
                }else{
                    console.log('Enrté');
                    while(pFinalY2 <= Number(this.y)){
                            pFinalY2 = pFinalY2 - aumentoY2;
                            pFinalX2 = pFinalX2 - aumentoX2;
                        console.log( pInicio2+' '+pFinalY2); 
                    }
                }
                
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
                            { x: 0, y: pInicio1},
                            { x: pFinalX1, y: pFinalY1}
                        ]
                    },
                    {        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: pInicio2},
                            { x: pFinalX2, y: pFinalY2}
                        ]
                    },
                    {        
                        type: "line",       
                        dataPoints: [
                            { x: this.x, y: this.y},
                        ]
                    },
                ],
                    
                });
                chart.render();
                return 'Tiene solución única. X= '+ this.x + ' Y= ' + this.y;
            }else if(this.p == 0 && this.q != 0){
                var pInicio1 = Number((this.b1/this.a12));
                console.log(pInicio1);
                var aumentoX1 = Number(this.a12);
                var aumentoY1 = Number((this.a11) * -1);
                var pFinalX1 = 0 + aumentoX1;
                var pFinalY1 = Number((this.b1/this.a12)) + aumentoY1;
                console.log( pFinalX1+' '+pFinalY1); 
                var pInicio2 = Number((this.b2 / this.a22));
                var aumentoX2 = Number(this.a22);
                var aumentoY2 = Number((this.a21) * -1);
                var pFinalX2 = 0 + aumentoX2;
                var pFinalY2 = Number((this.b2 / this.a22)) + aumentoY2;
                console.log( pFinalX2+' '+pFinalY2); 
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
                            { x: 0, y: pInicio1},
                            { x: pFinalX1, y: pFinalY1}
                        ]
                    },
                    {        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: pInicio2},
                            { x: pFinalX2, y: pFinalY2}
                        ]
                    },
                ],
                    
                });
                chart.render();
                return 'No tiene solución.';
            }else if(this.p == 0 && this.q == 0){
                var pInicio1 = Number((this.b1/this.a12));
                var aumentoX1 = Number(this.a12);
                var aumentoY1 = Number((this.a11) * -1);
                var pFinalX1 = 0 + aumentoX1;
                var pFinalY1 = pInicio1 + aumentoY1;
                console.log( pFinalX1+' '+pFinalY1);  
                var pInicio2 = Number((this.b2 / this.a22));
                var aumentoX2 = Number(this.a22);
                var aumentoY2 = Number((this.a21) * -1);
                var pFinalX2 = 0 + aumentoX2;
                var pFinalY2 = pInicio2 + aumentoY2;
                console.log( pFinalX2+' '+pFinalY2); 
                
                var chart = new CanvasJS.Chart("chart", {
                    animationEnabled: true,
                    theme: "light2",
                    title:{
                        text: "Tiene infinidad de soluciones"
                    },
                    axisY:{
                        includeZero: false
                    },
                    data: [{        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: pInicio1},
                            { x: pFinalX1, y: pFinalY1}
                        ]
                    },
                    {        
                        type: "line",       
                        dataPoints: [
                            { x: 0, y: pInicio2},
                            { x: pFinalX2, y: pFinalY2}
                        ]
                    },
                ],
                    
                });
                chart.render();
                return 'Tiene infinidad de soluciones';
            }
        },
    },
});