<!DOCTYPE html>
<html>
  <head>
    <title>cruzados</title>
  </head>
  <body>
   <script>

var numero=parseFloat(prompt("Introduce un número"));
var numero2=parseFloat(prompt("Introduce otro número"));

while(numero>50 || numero2>50){
	numero=parseFloat(prompt("Introduce un número"));
	numero2=parseFloat(prompt("Introduce otro número"));
}

while(numero!=numero2){
	if(numero>numero2){
		numero2+=5;
		numero-=2;	
		alert(numero);
		alert(numero2);
			
		}if(numero2>numero){
			numero+=5;
			numero2-=2;		
			alert(numero);
			alert(numero2);
		}
			
}
alert("Cruzados");


	

   </script>
  </body>
</html>