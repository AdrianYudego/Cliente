<script>

var numero=parseFloat(prompt("Introduce un numero"));
var cont=0;
for(i=1;i<=numero/2;i++){
	if(numero%i==0){
	cont++;

}

}
if(cont<=2){
alert("el numero es primo");
}else{
alert("el numero no es primo");
}



</script>