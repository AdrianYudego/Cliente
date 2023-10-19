<script>

var numero=parseFloat(prompt("Introduce un numero"));
var numero2=parseFloat(prompt("Introduce un numero"));

var coc=0;
while(numero>numero2){
numero-=numero2;
coc++;
}

alert("cociente es "+coc+ " el resto es igual a "+numero);





</script>