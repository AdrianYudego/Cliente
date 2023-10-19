<!DOCTYPE html>
<html>
  <head>
    <title>grados</title>
  </head>
  <body>
   <script>
var media=0.0;
var cont=0.0;
do{
var numero=parseFloat(prompt("Introduce un numero"));
media+=numero;
cont++;
}while(numero!=0);
alert("La media es " +media/cont);
   </script>
  </body>
</html>