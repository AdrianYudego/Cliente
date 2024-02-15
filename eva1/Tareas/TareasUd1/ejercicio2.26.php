<<<<<<< HEAD
<script>
var num1=parseFloat(prompt("Introduce un numero"));
var num2=parseFloat(prompt("Introduce un numero"));
var num3=parseFloat(prompt("Introduce un numero"));
var arrayNumbers=[num1,num2,num3]

Array.prototype.sortNumbers = function(){
    return this.sort(
        function(a,b){
            return a - b
        }
    );
}

alert(arrayNumbers.sortNumbers())



=======
<script>
var num1=parseFloat(prompt("Introduce un numero"));
var num2=parseFloat(prompt("Introduce un numero"));
var num3=parseFloat(prompt("Introduce un numero"));
var arrayNumbers=[num1,num2,num3]

Array.prototype.sortNumbers = function(){
    return this.sort(
        function(a,b){
            return a - b
        }
    );
}

alert(arrayNumbers.sortNumbers())



>>>>>>> ad8f80bbb8846b83b597e76e397cd44b195a2b19
</script>