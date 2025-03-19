<?php

class UserController
{
    private $userModel;
    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function getAllCustomersController()
    {
        $result = $this->userModel->getAllCustomers();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function updateCustomerController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->userModel->updateCustomer($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function createCustomerController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->userModel->createCustomer($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function deleteCustomerController($params)
    {
        $id = $params['id'];
        $result = $this->userModel->deleteCustomer($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function addToCartController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->userModel->addToCart($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getCartController($params)
    {
        $id = $params['id'];
        $result = $this->userModel->getCart($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function deleteItemFromCartController($params)
    {
        $id = $params['id'];
        $result = $this->userModel->deleteOrderInCart($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function payOrderController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->userModel->payOrder($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getUserOrdersWithDetailsController($params)
    {
        $id = $params['id'];
        $result = $this->userModel->getUserOrdersWithDetails($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    // ATM 
    public function payOrderControllerATM()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->userModel->payOrder($data);

        if ($result['ER'] === 0) {
            // Tích hợp MoMo nếu thanh toán thành công
            $partnerCode = 'MOMOBKUN20180529';
            $accessKey = 'klm05TvNBzhg7h7j';
            $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
            $orderInfo = "Thanh toán qua MoMo";
            $amount = $data['so_tien_thanh_toan'];
            $orderId = isset($data['ma_don_hang']) ? $data['ma_don_hang'] : $this->userModel->generateRandomOrderId(); // Sử dụng mã đơn hàng từ payOrder
            $redirectUrl = "http://localhost:3000/myorders"; // URL sau khi thanh toán thành công
            $ipnUrl = "https://your-site.com/momo-ipn"; // URL để MoMo gửi thông báo
            $extraData = "";

            $requestId = time() . "";
            $requestType = "payWithATM";

            // Tạo chữ ký (signature)
            $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
            $signature = hash_hmac("sha256", $rawHash, $secretKey);

            // Dữ liệu gửi tới MoMo
            $momoData = array(
                'partnerCode' => $partnerCode,
                'partnerName' => "Test",
                "storeId" => "MomoTestStore",
                'requestId' => $requestId,
                'amount' => $amount,
                'orderId' => $orderId,
                'orderInfo' => $orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl' => $ipnUrl,
                'lang' => 'vi',
                'extraData' => $extraData,
                'requestType' => $requestType,
                'signature' => $signature
            );

            // Gọi API MoMo
            $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
            $resultMomo = $this->execPostRequest($endpoint, json_encode($momoData));
            $jsonResult = json_decode($resultMomo, true);

            if (isset($jsonResult['payUrl'])) {
                // Trả về payUrl để client chuyển hướng
                $this->sendResponse([
                    "ER" => 0,
                    "message" => "Đặt đơn và tạo link thanh toán thành công!",
                    "payUrl" => $jsonResult['payUrl']
                ], 200);
            } else {
                $this->sendResponse([
                    "ER" => 1,
                    "message" => "Không thể tạo link thanh toán MoMo",
                    "error" => $jsonResult
                ], 500);
            }
        } else {
            $this->sendResponse($result, 404);
        }
    }

    // Thêm hàm execPostRequest vào UserController
    private function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public function momoIpnController()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Xác minh chữ ký từ MoMo
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $rawHash = "accessKey=" . $data['accessKey'] . "&amount=" . $data['amount'] . "&extraData=" . $data['extraData'] . "&message=" . $data['message'] . "&orderId=" . $data['orderId'] . "&orderInfo=" . $data['orderInfo'] . "&orderType=" . $data['orderType'] . "&partnerCode=" . $data['partnerCode'] . "&payType=" . $data['payType'] . "&requestId=" . $data['requestId'] . "&responseTime=" . $data['responseTime'] . "&resultCode=" . $data['resultCode'] . "&transId=" . $data['transId'];
        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        if ($signature === $data['signature']) {
            // Chữ ký hợp lệ, cập nhật trạng thái thanh toán
            $result = $this->userModel->updatePaymentStatus($data['orderId'], $data['resultCode']);
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse([
                "ER" => 1,
                "message" => "Chữ ký không hợp lệ"
            ], 400);
        }
    }
}
