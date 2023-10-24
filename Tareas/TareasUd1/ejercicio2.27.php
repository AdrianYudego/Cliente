<script>
	var dia=parseInt(prompt("Introduce el primer numero"));
	var mes=parseInt(prompt("Introduce el segundo numero"));
	var year=parseInt(prompt("Introduce el tercer numero"));
	var cor= true;
	var maxdia=0;
	switch(mes){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			maxdia=31;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
		maxdia=30;
			break;
		case 2:
			if(year%4==0){
				
					if(year%400==0){
						maxdia=29;
					}else{
						maxdia=28;
					}
			}else{
				maxdia=28;
			}
			break;
		default:
			cor=false;
			break;
	}
	if(dia>0 && dia<=maxdia && cor){
		alert("El " + dia + "/" + mes + "/" + year +" existe");
	}else{
		alert("El " + dia + "/" + mes + "/" + year +" no existe");
	}
</script>
