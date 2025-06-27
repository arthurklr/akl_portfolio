<?php
// Configuration
$admin_email = "contact@portfolio.com"; // Remplacez par votre email
$site_name = "Portfolio";

// Fonction pour nettoyer les données
function clean_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Fonction pour valider l'email
function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Initialisation des variables
$name = $email = $subject = $message = $budget = $timeline = "";
$name_err = $email_err = $subject_err = $message_err = "";
$success_message = "";
$error_message = "";

// Traitement du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Validation du nom
    if (empty($_POST["name"])) {
        $name_err = "Le nom est requis";
    } else {
        $name = clean_input($_POST["name"]);
        if (strlen($name) < 2) {
            $name_err = "Le nom doit contenir au moins 2 caractères";
        }
    }
    
    // Validation de l'email
    if (empty($_POST["email"])) {
        $email_err = "L'email est requis";
    } else {
        $email = clean_input($_POST["email"]);
        if (!is_valid_email($email)) {
            $email_err = "Format d'email invalide";
        }
    }
    
    // Validation du sujet
    if (empty($_POST["subject"])) {
        $subject_err = "Le sujet est requis";
    } else {
        $subject = clean_input($_POST["subject"]);
        if (strlen($subject) < 5) {
            $subject_err = "Le sujet doit contenir au moins 5 caractères";
        }
    }
    
    // Validation du message
    if (empty($_POST["message"])) {
        $message_err = "Le message est requis";
    } else {
        $message = clean_input($_POST["message"]);
        if (strlen($message) < 10) {
            $message_err = "Le message doit contenir au moins 10 caractères";
        }
    }
    
    // Récupération des champs optionnels
    $budget = clean_input($_POST["budget"]);
    $timeline = clean_input($_POST["timeline"]);
    
    // Si aucune erreur, envoi de l'email
    if (empty($name_err) && empty($email_err) && empty($subject_err) && empty($message_err)) {
        
        // Préparation du contenu de l'email
        $email_subject = "Nouveau message de contact - $site_name";
        
        $email_body = "Vous avez reçu un nouveau message de contact :\n\n";
        $email_body .= "Nom : $name\n";
        $email_body .= "Email : $email\n";
        $email_body .= "Sujet : $subject\n";
        $email_body .= "Message :\n$message\n\n";
        
        if (!empty($budget)) {
            $email_body .= "Budget : $budget\n";
        }
        
        if (!empty($timeline)) {
            $email_body .= "Délai souhaité : $timeline\n";
        }
        
        $email_body .= "\n---\n";
        $email_body .= "Ce message a été envoyé depuis le formulaire de contact de $site_name\n";
        $email_body .= "IP de l'expéditeur : " . $_SERVER['REMOTE_ADDR'] . "\n";
        $email_body .= "Date : " . date('Y-m-d H:i:s') . "\n";
        
        // En-têtes de l'email
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Tentative d'envoi de l'email
        if (mail($admin_email, $email_subject, $email_body, $headers)) {
            $success_message = "Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.";
            
            // Envoi d'un email de confirmation à l'expéditeur
            $confirmation_subject = "Confirmation de votre message - $site_name";
            $confirmation_body = "Bonjour $name,\n\n";
            $confirmation_body .= "Merci de m'avoir contacté. J'ai bien reçu votre message et je vous répondrai dans les plus brefs délais.\n\n";
            $confirmation_body .= "Récapitulatif de votre message :\n";
            $confirmation_body .= "Sujet : $subject\n";
            $confirmation_body .= "Message : $message\n\n";
            $confirmation_body .= "Cordialement,\n";
            $confirmation_body .= "$site_name";
            
            mail($email, $confirmation_subject, $confirmation_body, "From: $admin_email\r\n");
            
        } else {
            $error_message = "Désolé, une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard.";
        }
    } else {
        $error_message = "Veuillez corriger les erreurs dans le formulaire.";
    }
}

// Redirection avec les messages
$redirect_url = "contact.html";
if (!empty($success_message)) {
    $redirect_url .= "?success=" . urlencode($success_message);
} elseif (!empty($error_message)) {
    $redirect_url .= "?error=" . urlencode($error_message);
}

// Redirection vers la page de contact
header("Location: $redirect_url");
exit();
?> 