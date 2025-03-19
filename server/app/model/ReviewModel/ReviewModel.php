<?php
class ReviewModel
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAllReviews()
    {
        try {
            $sql_query = "SELECT dg.id, nd.ho_va_ten, sp.ma_san_pham,sp.ten_san_pham,dg.so_sao, dg.noi_dung, dg.so_luot_thich FROM danh_gia AS dg 
                            INNER JOIN san_pham AS sp ON sp.id = dg.id_san_pham
                            INNER JOIN nguoi_dung AS nd ON nd.id = dg.id_nguoi_dung";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return [
                    'success' => true,
                    'message' => 'Lấy danh sách đánh giá thành công',
                    'data' => $result
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Không có đánh giá nào'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Không thể lấy được đánh giá ' . $e->getMessage()
            ];
        }
    }

    public function deleteReview($id)
    {
        try {
            $sql_query = "DELETE FROM danh_gia WHERE id = :id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [
                    'success' => true,
                    'message' => 'Xóa đánh giá thành công'
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Không thể xóa đánh giá'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Không thể xóa đánh giá ' . $e->getMessage()
            ];
        }
    }
}
