<?php
	//Adaptada a Español
	header("Content-Type: text/html;charset=utf-8");

	if(empty($_POST)) {
		echo "Error en el método POST";
	}
$n1=$_POST['n1'];
$n2=$_POST['n2'];

$suma=$n1+$n2;
echo $suma;

    
	?>