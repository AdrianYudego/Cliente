
   <script>
   
      var num=parseFloat(prompt("Introduce el numero del mes"));
   
switch(parseFloat(num)){
	case 1:
	case 3:
	case 5:
	case 7:
	case 8:
	case 10:
	case 12:
	
	alert("31 días");
	
	break;
	case 4:
	case 6:
	case 9:
	case 11:
		
	alert("30 días");
	
	break;
	case 2:
		
	alert("28 días");
	break;
	default:
	alert("no existe");
}
	
   </script>
