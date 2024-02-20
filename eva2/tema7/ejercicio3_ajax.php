<?php
	//Adaptada a Español
	header("Content-Type: text/html;charset=utf-8");

	if(empty($_POST)) {
		echo "Error en el método POST";
	}
	if($_POST['queId'] == '') { 
		echo "Error en el dato enviado";
	}
	$queId = addslashes($_REQUEST["queId"]);

	if ($queId == "principal")
		echo "Bienvenidos a la página de una empresa desarrollada con <b>AJAX</b>";
	else if ($queId == "quienes")
		echo "Somos una empresa joven pero con grandes expectativas de futuro en el desarrollo web";
	else if ($queId == "servicios")
		echo "<p>Ofrecemos los siguientes servicios: </p><ul><li>Consultoría web</li><li>Asesoramiento y soporte técnico</li><li>Desarrollo de sitios web</li><li>Tecnologías de servidor PHP y Java</li><li>Programacion cliente con JavaScript y AJAX</li><li>Alojamiento web y DNS</li></ul>";
	else if ($queId == "clientes")
		echo "<p>Una breve lista de nuestros clientes:</p><ol><li>ALSA</li><li>Central Lechera Asturiana</li><li>FEVE</li><li>BMW</li><li>Mercedes</li><li>Audi</li></ol>";
	else if ($queId == "contacto")
		echo "<br><br><p>Sitio web <a href='http://www.miempresa.com'>www.miempresa.com</a></p><p>Correo <a href='mailto:admin@miempresa.com'>admin@miempresa.com</a></p><p>Dirección postal: Fray Paulino s/n 33600 Mieres, ASTURIAS</p>";
?>
