<?php
class ProductController
{
    private $ProductModel;
    public function __construct()
    {
        $this->ProductModel = new ProductModel();
    }

    public function getAllProducts()
    {
        // Get POST data
        $result = $this->ProductModel->getAllProduct();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }
}
