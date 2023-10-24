<script>
var moneda=parseFloat(prompt("Selecciona 0.cara o 1.cruz"));
var apuesta=parseFloat(prompt("Selecciona la cantidad que quieres apostar"));
var aleatorio = Math.round(Math.random()*1);
alert(aleatorio);
if(moneda==aleatorio){
	alert("Has ganado el doble "+ apuesta*2);
}else{
	alert("Has perdido todo");
}

</script>