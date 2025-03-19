<?php
class OrderController
{
    private $OrderModel;
    public function __construct()
    {
        $this->OrderModel = new OrderModel();
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function getAllOrderController()
    {
        $result = $this->OrderModel->getAllOrder();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getDetailOrderController($params)
    {
        $id = $params['id'];
        $result = $this->OrderModel->getDetailOrder($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function updateOrderController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->OrderModel->updateOrder($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function deleteOrderController($params)
    {
        $id = $params['id'];
        $result = $this->OrderModel->deleteOrder($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getAllUsersController()
    {
        $result = $this->OrderModel->getAllUsers();

        if (isset($result) && !empty($result) && $result['ER'] === 0) {
            $this->sendResponse($result, 200); // 200: OK
        } else {
            $this->sendResponse($result, 404); // 404: Not Found
        }
    }


    public function addOrderController($params)
    {
        $data = json_decode(file_get_contents("php://input"), true); // Lấy dữ liệu từ body request

        // Nếu không có ma_don_hang, gọi generateOrderCode
        if (empty($data['ma_don_hang'])) {
            $data['ma_don_hang'] = $this->OrderModel->generateOrderCode();
        }

        $result = $this->OrderModel->addOrder($data);

        if (isset($result) && !empty($result) && $result['ER'] === 0) {
            $this->sendResponse($result, 201); // 201: Created
        } else {
            $this->sendResponse($result, 400); // 400: Bad Request
        }
    }
}
