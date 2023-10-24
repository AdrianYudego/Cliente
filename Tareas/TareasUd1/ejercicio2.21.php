<!DOCTYPE html>
<html>
  <head>
    <title>grados</title>
  </head>
  <body>
   <script>
var h=0.0;
var m=0.0;
var personas=parseFloat(prompt("Cuantas personas hay en clase"));
for(i=1;i<=personas;i++){
	var sexo=prompt("h o m");
	if(sexo=="h"){
		h++;
	}else{
		m++;
	}
}
alert("El porcentaje de hombres es "+ (h/personas)*100 +"%" +" el porcentaje de mujeres es "+ (m/personas)*100+"%");

   </script>
  </body>
</html>