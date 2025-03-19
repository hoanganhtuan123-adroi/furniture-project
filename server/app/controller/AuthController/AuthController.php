<?php
class AuthController
{
    private $authModel;

    public function __construct()
    {
        $this->authModel = new AuthModel();
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }


    public function loginController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->authModel->login($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }
}



// public function register()
// {
//     // Get POST data
//     $data = json_decode(file_get_contents('php://input'), true);

//     // Validate input
//     if (!$this->validateRegisterInput($data)) {
//         return $this->sendResponse([
//             'success' => false,
//             'message' => 'Invalid input data'
//         ], 400);
//     }

//     // Register user
//     $result = $this->authModel->register(
//         $data['username'],
//         $data['email'],
//         $data['password']
//     );

//     $statusCode = $result['success'] ? 201 : 400;
//     $this->sendResponse($result, $statusCode);
// }





  // private function validateRegisterInput($data)
    // {
    //     return (
    //         isset($data['username']) &&
    //         isset($data['email']) &&
    //         isset($data['password']) &&
    //         filter_var($data['email'], FILTER_VALIDATE_EMAIL) &&
    //         strlen($data['password']) >= 6 &&
    //         strlen($data['username']) >= 3
    //     );
    // }

    // private function validateLoginInput($data)
    // {
    //     return (
    //         isset($data['email']) &&
    //         isset($data['password']) &&
    //         filter_var($data['email'], FILTER_VALIDATE_EMAIL)
    //     );
    // }

    // private function sendResponse($data, $statusCode = 200)
    // {
    //     header('Content-Type: application/json');
    //     http_response_code($statusCode);
    //     echo json_encode($data);
    // }