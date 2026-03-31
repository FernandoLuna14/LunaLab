<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = strip_tags(trim($_POST["name"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $asunto = strip_tags(trim($_POST["subject"] ?? ''));
    $mensaje = strip_tags(trim($_POST["message"] ?? ''));

    // Validar los datos requeridos
    if (empty($nombre) || empty($email) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Datos inválidos o incompletos"]);
        exit;
    }

    // Correo al que se enviará la información
    $destinatario = "ferherlun@gmail.com"; 
    
    $asunto_correo = "Nuevo mensaje de contacto: $asunto";
    
    $cuerpo = "Has recibido un nuevo mensaje de tu sitio web.\n\n";
    $cuerpo .= "Nombre: $nombre\n";
    $cuerpo .= "Correo: $email\n";
    $cuerpo .= "Asunto: $asunto\n";
    $cuerpo .= "Mensaje:\n$mensaje\n";
    
    // Configuración de encabezados
    // Se recomienda usar un correo de tu dominio (ej. contacto@tudominio.com) en "From" para evitar filtros de spam.
    $headers = "From: no-reply@tusitio.com\r\n"; 
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
               
    // Intentar enviar el correo
    if (mail($destinatario, $asunto_correo, $cuerpo, $headers)) {
        echo json_encode(["status" => "success", "message" => "Mensaje enviado exitosamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo. Por favor, verifica la configuración del servidor de correo."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}
?>
