<script>
var v1=parseFloat(prompt("Introduce el numero 1"));
var v2=parseFloat(prompt("Introduce un numero 2"));
var v3=parseFloat(prompt("Introduce un numero 3"));
v4=v1+v2+v3;

if(v4==0){
	alert("Todas las variables son 0");
}if(v1>0 && v2>0 && v3>0){
	alert("Todas las variables son positivas");
	alert("Todas las variables tienen el mismo signo");
	}if(v1<0 && v2<0 && v3<0){
		alert("Todas las variables tienen el mismo signo");
	}if(v1==v2 || v1==v3 && v3==v2){
		alert("Dos de sus variables coinciden");
	}if(v1==v2 || v1==v3 || v3==v2){
		alert("Al menos dos de sus variables coinciden");
	}if(v1<v2 && v3>v2){
		alert("v2 está entre v1 y v3");
	}

</script>