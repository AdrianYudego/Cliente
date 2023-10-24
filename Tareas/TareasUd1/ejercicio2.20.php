<!DOCTYPE html>
<html>
  <head>
    <title>grados</title>
  </head>
  <body>
   <script>

do{
	alert("1.Salir" + "\n" +
		"2.Sumatorio" + "\n" +
		"3.Factorial");
var num=prompt("Elige un numero del 1 al 3");
switch(parseFloat(num)){
	case 1:
	alert("Fin del programa");
	break;
	case 2:
	var num2=parseFloat(prompt("Introduce un numero"));
	var sum=0;
	for(i=1;i<=num2;i++){
		sum+=i;
	}
	alert("Sumatorio"+ " "+ sum);
	break;
	case 3:
	var num2=parseFloat(prompt("Introduce un numero"));
	var fact=1;
	for(i=1;i<=num2;i++){
		fact=fact*i;
	}
	alert("Sumatorio"+ " "+ fact);
	break;
	default:
	alert("opcion incorrecta");
}
}while(num!=1);


   </script>
  </body>
</html>