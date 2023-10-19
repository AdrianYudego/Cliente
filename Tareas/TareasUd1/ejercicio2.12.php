<!DOCTYPE html>
<html>
  <head>
    <title>for</title>
  </head>
  <body>
   <script>
var cadena="";
var numero=parseFloat(prompt("Introduce un numero"));
for(i=1; i<=numero; i++){
	for(j=1;j<=numero;j++){
		cadena += "*";
	}
	cadena += "\n";
}
alert(cadena);

   </script>
  </body>
</html>

