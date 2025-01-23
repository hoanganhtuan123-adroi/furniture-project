<?php

class AuthController
{
    private $authModel;

    public function __construct()
    {
        $this->authModel = new AuthModel();
    }

    public function register()
    {
        // Get POST data
        $data = json_decode(file_get_contents('php://input'), true);

        // Validate input
        if (!$this->validateRegisterInput($data)) {
            return $this->sendResponse([
                'success' => false,
                'message' => 'Invalid input data'
            ], 400);
        }

        // Register user
        $result = $this->authModel->register(
            $data['username'],
            $data['email'],
            $data['password']
        );

        $statusCode = $result['success'] ? 201 : 400;
        $this->sendResponse($result, $statusCode);
    }

    public function login()
    {
        // Get POST data
        $data = json_decode(file_get_contents('php://input'), true);

        // Validate input
        if (!$this->validateLoginInput($data)) {
            return $this->sendResponse([
                'success' => false,
                'message' => 'Invalid input data'
            ], 400);
        }

        // Login user
        $result = $this->authModel->login(
            $data['email'],
            $data['password']
        );

        $statusCode = $result['success'] ? 200 : 401;
        $this->sendResponse($result, $statusCode);
    }

    private function validateRegisterInput($data)
    {
        return (
            isset($data['username']) &&
            isset($data['email']) &&
            isset($data['password']) &&
            filter_var($data['email'], FILTER_VALIDATE_EMAIL) &&
            strlen($data['password']) >= 6 &&
            strlen($data['username']) >= 3
        );
    }

    private function validateLoginInput($data)
    {
        return (
            isset($data['email']) &&
            isset($data['password']) &&
            filter_var($data['email'], FILTER_VALIDATE_EMAIL)
        );
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json');
        http_response_code($statusCode);
        echo json_encode($data);
    }
}
