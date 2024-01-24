<<<<<<< HEAD
<script>

var v1=parseFloat(prompt("Introduce el numero 1"));
var v2=parseFloat(prompt("Introduce un numero 2"));
var v3=parseFloat(prompt("Introduce un numero 3"));
var v4=parseFloat(prompt("Introduce un numero 4"));
var e=[v1,v2,v3,v4];
var cont=0;




do{
	
var c1=parseFloat(prompt("Introduce el numero 1"));
var c2=parseFloat(prompt("Introduce un numero 2"));
var c3=parseFloat(prompt("Introduce un numero 3"));
var c4=parseFloat(prompt("Introduce un numero 4"));
var a=[c1,c2,c3,c4];
var muertos=0;
var tocados=0;

	
	for(j=0;j<=3;j++){
	
	if(e[j]==a[j]){
	muertos++;
	}
}


for(j=0;j<=3;j++){
	for(z=0;z<=3;z++){
	 if(e[j]==a[z]){
	 tocados++;
	 
	 }
	}
	
	}
	
	if(tocados-muertos<0){
		tocados=0;
	}if(tocados=>muertos){
		tocados=tocados-muertos;
	}
	
	cont++;
	alert("Muertos " + muertos + " "+ "tocados "+ tocados);
	
}while(muertos!=4 || cont==8);
alert("Enhorabuena has ganado");

=======
<script>

var v1=parseFloat(prompt("Introduce el numero 1"));
var v2=parseFloat(prompt("Introduce un numero 2"));
var v3=parseFloat(prompt("Introduce un numero 3"));
var v4=parseFloat(prompt("Introduce un numero 4"));
var e=[v1,v2,v3,v4];
var cont=0;




do{
	
var c1=parseFloat(prompt("Introduce el numero 1"));
var c2=parseFloat(prompt("Introduce un numero 2"));
var c3=parseFloat(prompt("Introduce un numero 3"));
var c4=parseFloat(prompt("Introduce un numero 4"));
var a=[c1,c2,c3,c4];
var muertos=0;
var tocados=0;

	
	for(j=0;j<=3;j++){
	
	if(e[j]==a[j]){
	muertos++;
	}
}


for(j=0;j<=3;j++){
	for(z=0;z<=3;z++){
	 if(e[j]==a[z]){
	 tocados++;
	 
	 }
	}
	
	}
	
	if(tocados-muertos<0){
		tocados=0;
	}if(tocados=>muertos){
		tocados=tocados-muertos;
	}
	
	cont++;
	alert("Muertos " + muertos + " "+ "tocados "+ tocados);
	
}while(muertos!=4 || cont==8);
alert("Enhorabuena has ganado");

>>>>>>> ad8f80bbb8846b83b597e76e397cd44b195a2b19
</script>