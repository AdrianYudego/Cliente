<!DOCTYPE html>
<html>
  <head>
    <title>media</title>
  </head>
  <body>
   <script>
var media=0;
var cont=-1;
var numero=0;
do{
cont++;
numero=parseFloat(prompt("Introduce un numero"));
media=numero+media;

}while(numero!=0);
alert("La media es " +media/cont);
   </script>
  </body>
</html>