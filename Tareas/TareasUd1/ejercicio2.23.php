<!DOCTYPE html>
<html>
  <head>
    <title>media</title>
  </head>
  <body>
   <script>
var num1=parseInt(prompt("Introduce un numero"));
var num2=parseInt(prompt("Introduce un numero"));
var cont=0;
var div=num2-num1;
for(i=num1;i<=div;i+=2){
	cont++;
}

alert("La cantidad de numeros pares que hay es " + cont ) 
   </script>
  </body>
</html>