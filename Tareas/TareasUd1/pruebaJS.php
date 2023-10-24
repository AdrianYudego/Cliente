<!DOCTYPE html>
<html>
  <head>
    <title>Ejercicio de prueba con JavaScript</title>
  </head>
  <body>
   <script>


var numero=parseFloat(prompt("Introduce un número"));

do{

var w=true;

if(isNaN(numero)){
        w=false;
        numero=parseFloat(prompt("Introduce un numero válido"));
}

numero=numero%23;

}while(w==false);

var letras=["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
    
        alert("La letra correspondiente a su DNI es " + letras[numero]);
   
   
   </script>
  </body>
</html>