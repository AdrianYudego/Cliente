<!DOCTYPE html>
<html lang="es">
<head>
    <title>Calculadora</title>
    <style>
     
      
    </style>
</head>
<body>
    
    <div id="calculadora">
        <input type="text" id="caja">
        <br>
        <button onclick="anadir('7')">7</button>
        <button onclick="anadir('8')">8</button>
        <button onclick="anadir('9')">9</button>
        <button onclick="anadir('*')">*</button>
        <br>
        <button onclick="anadir('4')">4</button>
        <button onclick="anadir('5')">5</button>
        <button onclick="anadir('6')">6</button>
        <button onclick="anadir('-')">-</button>
        <br>
        <button onclick="anadir('1')">1</button>
        <button onclick="anadir('2')">2</button>
        <button onclick="anadir('3')">3</button>
        <button onclick="anadir('+')">+</button>
        <br>
        <button onclick="elegirFuncion('c')">C</button>
        <button onclick="anadir('0')"> 0</button>
        <button onclick="elegirFuncion('=')">=</button>
        <button onclick="anadir('/')">/</button>
       
    </div>
    
    <script>
        var num1="",num2="",resultado=0,calc=document.getElementById("caja");
        
        function anadir(num){
      
        calc.value+=num;
            
        }

        function elegirFuncion(x){
            var contar=0;
            if(x=='='){
            
            var arr =Array.from(calc.value);
            for(var i=0;i<arr.length;i++){

                if(arr[i]=='*' || arr[i]=='/' || arr[i]=='+' || arr[i]=='-'){
                   contar++;
                   simbolo=arr[i];
                   var posicion=i;
                }
            }
            
            for(var i=0;i<posicion;i++){
                num1=num1+arr[i];
                alert(num1);
            }
            for(var i=posicion;i<arr.length;i++){
                num2=num2+arr[i];
                alert(num2);
            }
            
    if(contar==1){
        switch(simbolo){
           
           case '*':
               resultado=num1*num2;
               calc.value=resultado;
               break;
           case '/':
               resultado=num1/num2;
               calc.value=resultado;
               break;
           case '+':
               resultado=num1+num2;
               calc.value=resultado;
               break;
           case '-':
               resultado=num1-num2;
               calc.value=resultado;
               break;
         }
        }else{
            var arr2 =Array.from(num2);
            for(var i=0;i<arr2.length;i++){

                if(arr2[i]=='*' || arr2[i]=='/' || arr2[i]=='+' || arr2[i]=='-'){
                   simbolo2=arr2[i];
                   var posicion=i;
                }
            }
            
            for(var i=0;i<posicion;i++){
                num3=num3+arr2[i];
                
            }
            for(var i=posicion;i<arr2.length;i++){
                num4=num4+arr2[i];
                
            }
        }
        }
    }
    if(simbolo=='/' || simbolo=='*'){
        switch(simbolo){
            case '/':
                resultado=num1/num3;
                break;
            case '*':
                resultado=num1*num3;
                break;
        }switch(simbolo2){
            case '+':
                resultado=resultado+num4;
                calc.value=resultado;
                break;
            case '-':
                resultado=resultado-num4;
                calc.value=resultado;
                break;
                
        }

    }else if(simbolo2=='/' || simbolo2=='*'){
            switch(simbolo2){
            case '/':
                resultado=num3/num4;
                break;
            case '*':
                resultado=num3*num4;
                break;
                switch(simbolo){
            case '+':
                resultado=num1+resultado;
                calc.value=resultado;
                break;
            case '-':
                resultado=num1-resultado;
                calc.value=resultado;
                break;
        }
                
        }
    }else if(simbolo!='/' && simbolo!='*' && simbolo2!='/' && simbolo2!='*' ){
        switch(simbolo){
           case '+':
               resultado=num1+num3;
               break;
           case '-':
               resultado=num1-num3;
               break;
         }
         swtich(simbolo2){
            case '+':
               resultado=resultado+num4;
               calc.value=resultado;
               break;
           case '-':
               resultado=resultado-num4;
               calc.value=resultado;
               break;
         }
    }

        
    </script>
</body>
</html>

