<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

// Set the recipient email address
$recipient_email = 'j.deku@skynetexpressgh.com';
$from_email = 'noreply@skynetexpressgh.com';
$site_name = 'SkyNet Express Careers';

// Function to sanitize input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to handle file uploads
function handleFileUpload($file, $type = 'resume') {
    $uploadDir = 'uploads/';
    $maxFileSize = 5 * 1024 * 1024; // 5MB
    $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    // Create uploads directory if it doesn't exist
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Check for errors
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'message' => 'File upload error'];
    }
    
    // Check file size
    if ($file['size'] > $maxFileSize) {
        return ['success' => false, 'message' => 'File size exceeds 5MB limit'];
    }
    
    // Check file type
    if (!in_array($file['type'], $allowedTypes)) {
        return ['success' => false, 'message' => 'Only PDF, DOC, and DOCX files are allowed'];
    }
    
    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = $type . '_' . uniqid() . '.' . $extension;
    $destination = $uploadDir . $filename;
    
    // Move uploaded file
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return ['success' => true, 'path' => $destination, 'original_name' => $file['name']];
    } else {
        return ['success' => false, 'message' => 'Failed to move uploaded file'];
    }
}

// Initialize response array
$response = ['success' => false, 'message' => ''];

try {
    // Check if form was submitted
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Determine if this is a job application or general application
    $isJobApplication = isset($_POST['position']);
    
    // Get form data
    $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($phone)) {
        throw new Exception('Name, email, and phone are required fields');
    }
    
    if (!validateEmail($email)) {
        throw new Exception('Please provide a valid email address');
    }

    // Handle file uploads
    $resumePath = '';
    $coverPath = '';
    
    // Process resume upload
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $resumeResult = handleFileUpload($_FILES['resume'], 'resume');
        if (!$resumeResult['success']) {
            throw new Exception($resumeResult['message']);
        }
        $resumePath = $resumeResult['path'];
    } else {
        throw new Exception('Resume/CV is required');
    }
    
    // Process cover letter upload (optional for job applications, not for general)
    if ($isJobApplication && isset($_FILES['cover_letter']) && $_FILES['cover_letter']['error'] === UPLOAD_ERR_OK) {
        $coverResult = handleFileUpload($_FILES['cover_letter'], 'cover');
        if (!$coverResult['success']) {
            throw new Exception($coverResult['message']);
        }
        $coverPath = $coverResult['path'];
    }

    // Prepare email content based on application type
    if ($isJobApplication) {
        // Job application specific data
        $position = isset($_POST['position']) ? sanitizeInput($_POST['position']) : '';
        $location = isset($_POST['location']) ? sanitizeInput($_POST['location']) : '';
        $salary = isset($_POST['salary']) ? sanitizeInput($_POST['salary']) : '';
        $notice = isset($_POST['notice']) ? sanitizeInput($_POST['notice']) : '';
        $portfolio = isset($_POST['portfolio']) ? sanitizeInput($_POST['portfolio']) : '';
        $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
        
        $emailSubject = "Job Application for $position - $name";
        
        $emailBody = "
        <html>
        <head>
            <style>
    body { 
        font-family: Times New Roman, Times, serif; 
        line-height: 1.6; 
        color: #333; 
    }
    .header { 
        color: #f4050b; 
        font-size: 18px; 
        font-weight: bold; 
        margin-bottom: 20px; 
    }
    .section { 
        margin-bottom: 15px; 
    }
    .label { 
        font-weight: bold; 
    }
    .greeting { 
        margin-bottom: 20px; 
    }
</style>
        </head>
        <body>
            <div class='greeting'>
                <p>Dear Hiring Manager,</p>
                <p>I am applying for the position of $position at SkyNet Express Ltd.</p>
            </div>
            
            <div class='header'>Application Details</div>
            
            <div class='section'><span class='label'>Applicant Name:</span> $name</div>
            <div class='section'><span class='label'>Email:</span> $email</div>
            <div class='section'><span class='label'>Phone:</span> $phone</div>
            <div class='section'><span class='label'>Area of Residence:</span> $location</div>
            <div class='section'><span class='label'>Salary Expectation:</span> $salary</div>
            <div class='section'><span class='label'>Notice Period:</span> $notice</div>
        ";
        
        if (!empty($portfolio)) {
            $emailBody .= "<div class='section'><span class='label'>Portfolio/Website:</span> <a href='$portfolio'>$portfolio</a></div>";
        }
        
        if (!empty($message)) {
            $emailBody .= "<div class='section'><span class='label'>Message:</span><br>$message</div>";
        }
        
        $emailBody .= "
            <div class='section'>
                <p>Please find my resume and cover letter attached.</p>
            </div>
            <div class='section'>
                <p>Best regards,<br>$name</p>
            </div>
            <div class='section'>
                <p>This application was submitted via the SkyNet Express Careers Portal.</p>
            </div>
        </body>
        </html>
        ";
    } else {
        // General application specific data
        $preferred_location = isset($_POST['location']) ? sanitizeInput($_POST['location']) : '';
        $department = isset($_POST['department']) ? sanitizeInput($_POST['department']) : '';
        $portfolio = isset($_POST['portfolio']) ? sanitizeInput($_POST['portfolio']) : '';
        $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
        
        $emailSubject = "General Application - $name";
        
        $emailBody = "
        <html>
        <head>
            <style>
    body { 
        font-family: Times New Roman, Times, serif; 
        line-height: 1.6; 
        color: #333; 
    }
    .header { 
        color: #f4050b; 
        font-size: 18px; 
        font-weight: bold; 
        margin-bottom: 20px; 
    }
    .section { 
        margin-bottom: 15px; 
    }
    .label { 
        font-weight: bold; 
    }
    .greeting { 
        margin-bottom: 20px; 
    }
</style>
        </head>
        <body>
            <div class='greeting'>
                <p>Dear Hiring Manager,</p>
                <p>I am submitting my application for consideration at SkyNet Express Ltd.</p>
            </div>
            
            <div class='header'>Application Details</div>
            
            <div class='section'><span class='label'>Applicant Name:</span> $name</div>
            <div class='section'><span class='label'>Email:</span> $email</div>
            <div class='section'><span class='label'>Phone:</span> $phone</div>
            <div class='section'><span class='label'>Preferred Location:</span> " . ucfirst($preferred_location) . "</div>
            <div class='section'><span class='label'>Department of Interest:</span> " . ucfirst($department) . "</div>
        ";
        
        if (!empty($portfolio)) {
            $emailBody .= "<div class='section'><span class='label'>Portfolio/Website:</span> <a href='$portfolio'>$portfolio</a></div>";
        }
        
        if (!empty($message)) {
            $emailBody .= "<div class='section'><span class='label'>About the Applicant:</span><br>$message</div>";
        }
        
        $emailBody .= "
            <div class='section'>
                <p>Please find my resume attached.</p>
            </div>
            <div class='section'>
                <p>Best regards,<br>$name</p>
            </div>
            <div class='section'>
                <p>This application was submitted via the SkyNet Express Careers Portal.</p>
            </div>
        </body>
        </html>
        ";
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF; // Change to DEBUG_SERVER for troubleshooting
        $mail->isSMTP();
        $mail->Host = 'mail.skybridgelogistics.org';
        $mail->SMTPAuth = true;
        $mail->Username = 'inquiries@skybridgelogistics.org';
        $mail->Password = ']9}kJV+%=(}tKo}f';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Use SSL
        $mail->Port = 465; // SSL port
        $mail->Timeout = 30; // 30 seconds timeout
        
        // Recipients
        $mail->setFrom($from_email, $site_name);
        $mail->addAddress($recipient_email);
        $mail->addReplyTo($email, $name);
        
        // Attachments
        $mail->addAttachment($resumePath, 'Resume_' . $name . '.pdf');
        if (!empty($coverPath)) {
            $mail->addAttachment($coverPath, 'Cover_Letter_' . $name . '.pdf');
        }
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $emailSubject;
        $mail->Body = $emailBody;
        $mail->AltBody = strip_tags($emailBody);
        
        if ($mail->send()) {
            $response['success'] = true;
            $response['message'] = $isJobApplication 
                ? 'Your application has been submitted successfully!' 
                : 'Thank you for submitting your resume. We will keep it on file for future opportunities.';
        } else {
            throw new Exception('Failed to send email. Please try again later.');
        }
            
    } catch (Exception $e) {
        error_log('Mailer Error: ' . $e->getMessage());
        throw new Exception('Message could not be sent. Mailer Error: ' . $e->getMessage());
    }

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

// Return JSON response
echo json_encode($response);
?>