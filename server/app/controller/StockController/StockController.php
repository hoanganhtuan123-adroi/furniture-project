<?php
class StockController
{
    private $StockModel;
    public function __construct()
    {
        $this->StockModel = new StockModel();
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function getAllStocksController()
    {
        $result = $this->StockModel->getAllStocks();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getDetailStockController($params)
    {
        $id = $params['id'];
        $result = $this->StockModel->getDetailStockById($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function updateStockController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->StockModel->updateStock($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function deleteStockController($params)
    {
        $id = $params['id'];
        $result = $this->StockModel->deleteStock($id);
        if ($result['success']) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function searchStockController($params)
    {
        $name_search = parse_str($params['name_search'], $output);
        $name_search = $output['spt'];
        $result = $this->StockModel->searchStock($name_search);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getProductByCodeController($params)
    {
        $data = $params['id'];
        $id = str_replace("Item", "Item# - ", $data);
        $result = $this->StockModel->getProductByCode($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function importStockController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->StockModel->importStock($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function exportStockController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->StockModel->exportStock($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function takingStockController()
    {
        $result = $this->StockModel->takingStock();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }
}
