<?

extract($_POST);

$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Gracias por cotizar con nosotros " . $name . " " . $lastname . ",\r\n";
$mensaje .= "uno de nuestros ejecutivos te llamará al teléfono " . $number . " y enviará un correo a este mail.";

$para = $mail;
$asunto = 'Cotización';

mail($para, $asunto, utf8_decode($mensaje), $header);

echo "<script>location.href='index.html';</script>";

?>