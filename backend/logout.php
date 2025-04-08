<?php
session_start();
session_unset();
session_destroy();
header("Location: ../html/login.html"); // Redirige a la página de login (o a donde prefieras)
exit();
?>
