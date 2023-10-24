<script>

var cena=prompt("Introduce costillas o pescado");

var opcion1 = confirm("has elegido " + cena + " confirmalo ");

var postre=prompt("Introduce si o no postre");

var opcion2 = confirm("has elegido " + postre + " confirmalo ");

alert (opcion2);

if((opcion1==true) && (opcion2==true) && (cena=="costilla")){
	alert("Ceno costilla y postre el total es "+ 26);
}else if(opcion1==true && opcion2==true && cena=="pescado"){
	
	alert("Ceno pescado y postre el total es "+ 18);
}
</script>