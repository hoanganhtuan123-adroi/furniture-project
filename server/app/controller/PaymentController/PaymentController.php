<?php

class PaymentController
{
    private $paymentModel;
    public function __construct()
    {
        $this->paymentModel = new PaymentModel();
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function getAllPaymentsController()
    {
        $result = $this->paymentModel->getAllPayments();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getDetailPaymentController($params) {}

    public function updatePaymentController($params)
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->paymentModel->updatePayment($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function deletePaymentController($params)
    {
        $result = $this->paymentModel->deletePayment($params['id']);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    // public function processMoMoPayment()
    // {
    //     try {
    //         $data = json_decode(file_get_contents('php://input'), true);

    //         // Validate input
    //         if (!isset($data['order_id']) || !isset($data['amount'])) {
    //             throw new Exception('Thiếu thông tin đơn hàng');
    //         }

    //         // Tạo bản ghi thanh toán
    //         $paymentResult = $this->paymentModel->createMoMoPayment([
    //             'order_id' => $data['order_id'],
    //             'amount' => $data['amount']
    //         ]);

    //         if (!$paymentResult['success']) {
    //             throw new Exception($paymentResult['message']);
    //         }

    //         // Cấu hình MoMo
    //         $momoConfig = [
    //             'partnerCode' => 'MOMOBKUN20180529',
    //             'accessKey' => 'klm05TvNBzhg7h7j',
    //             'secretKey' => 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa',
    //             'redirectUrl' => 'https://your-domain.com/payment/return',
    //             'ipnUrl' => 'https://your-domain.com/api/payments/momo/ipn'
    //         ];

    //         // Chuẩn bị dữ liệu
    //         $requestData = [
    //             'partnerCode' => $momoConfig['partnerCode'],
    //             'partnerName' => "Your Store",
    //             'storeId' => "MomoTestStore",
    //             'requestId' => time() . "",
    //             'amount' => $data['amount'],
    //             'orderId' => $paymentResult['payment_code'],
    //             'orderInfo' => 'Thanh toán đơn hàng ' . $data['order_id'],
    //             'redirectUrl' => $momoConfig['redirectUrl'],
    //             'ipnUrl' => $momoConfig['ipnUrl'],
    //             'lang' => 'vi',
    //             'requestType' => 'captureWallet',
    //             'extraData' => json_encode(['order_id' => $data['order_id']])
    //         ];

    //         // Tạo chữ ký
    //         $rawHash = "accessKey=" . $momoConfig['accessKey'] .
    //             "&amount=" . $requestData['amount'] .
    //             "&extraData=" . $requestData['extraData'] .
    //             "&ipnUrl=" . $momoConfig['ipnUrl'] .
    //             "&orderId=" . $requestData['orderId'] .
    //             "&orderInfo=" . $requestData['orderInfo'] .
    //             "&partnerCode=" . $momoConfig['partnerCode'] .
    //             "&redirectUrl=" . $momoConfig['redirectUrl'] .
    //             "&requestId=" . $requestData['requestId'] .
    //             "&requestType=" . $requestData['requestType'];

    //         $requestData['signature'] = hash_hmac('sha256', $rawHash, $momoConfig['secretKey']);

    //         // Gọi API MoMo
    //         $response = $this->callMoMoAPI($requestData);

    //         $this->sendResponse([
    //             'success' => true,
    //             'payment_url' => $response['payUrl']
    //         ]);
    //     } catch (Exception $e) {
    //         $this->sendResponse([
    //             'success' => false,
    //             'message' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    // public function handleMoMoIPN()
    // {
    //     try {
    //         $ipnData = json_decode(file_get_contents('php://input'), true);

    //         // Xác thực chữ ký
    //         $isValid = $this->verifyMoMoSignature($ipnData);

    //         if (!$isValid) {
    //             throw new Exception('Chữ ký không hợp lệ');
    //         }

    //         // Xử lý dữ liệu IPN
    //         $result = $this->paymentModel->handleMoMoIPN([
    //             'orderId' => $ipnData['orderId'],
    //             'transId' => $ipnData['transId'],
    //             'resultCode' => $ipnData['resultCode']
    //         ]);

    //         $this->sendResponse($result);
    //     } catch (Exception $e) {
    //         $this->sendResponse([
    //             'success' => false,
    //             'message' => $e->getMessage()
    //         ], 400);
    //     }
    // }

    // private function verifyMoMoSignature($data)
    // {
    //     $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
    //     $rawHash = "accessKey=" . $data['accessKey'] .
    //         "&amount=" . $data['amount'] .
    //         "&extraData=" . $data['extraData'] .
    //         "&message=" . $data['message'] .
    //         "&orderId=" . $data['orderId'] .
    //         "&orderInfo=" . $data['orderInfo'] .
    //         "&orderType=" . $data['orderType'] .
    //         "&partnerCode=" . $data['partnerCode'] .
    //         "&payType=" . $data['payType'] .
    //         "&requestId=" . $data['requestId'] .
    //         "&responseTime=" . $data['responseTime'] .
    //         "&resultCode=" . $data['resultCode'] .
    //         "&transId=" . $data['transId'];

    //     return hash_hmac('sha256', $rawHash, $secretKey) === $data['signature'];
    // }
}
