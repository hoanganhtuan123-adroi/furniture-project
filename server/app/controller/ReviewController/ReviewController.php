<?php
class ReviewController
{
    private $ReviewModel;
    public function __construct()
    {
        $this->ReviewModel = new ReviewModel();
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function getAllReviewsController()
    {
        $result = $this->ReviewModel->getAllReviews();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function deleteReviewController($params)
    {
        $id = $params['id'];
        $result = $this->ReviewModel->deleteReview($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }
}
