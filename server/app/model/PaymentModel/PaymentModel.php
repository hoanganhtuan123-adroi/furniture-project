<?php
class PaymentModel
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAllPayments()
    {
        try {
            $sql_query = "SELECT tt.id, tt.ma_thanh_toan as ma_hoa_don, tt.ngay_thanh_toan, tt.so_tien_thanh_toan as khach_da_tra, dh.tong_gia_tri, tt.trang_thai_thanh_toan, 
                            tt.phuong_thuc_thanh_toan, dh.ma_don_hang, sp.ten_san_pham, nd.ho_va_ten, ctdh.so_luong
                            FROM thanh_toan AS tt 
                            LEFT JOIN don_hang AS dh on dh.id = tt.id_don_hang
                            LEFT JOIN chi_tiet_don_hang AS ctdh on ctdh.id_don_hang = dh.id
                            LEFT JOIN san_pham AS sp on sp.id = ctdh.id_san_pham
                            LEFT JOIN nguoi_dung AS nd ON nd.id = dh.id_nguoi_dung
                            ";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            if ($stmt->rowCount() !== 0) {
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return [
                    'ER' => 0,
                    'message' => 'Lấy dữ liệu thành công',
                    'data' => $data
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Không có dữ liệu'
                ];
            }
        } catch (Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }

    public function getDetailPayments($id)
    {
        try {
            $sql_query = "SELECT tt.id as id_thanh_toan, tt.id_don_hang as id_don_hang, nd.ho_va_ten, nd.so_dien_thoai, dh.ma_don_hang, tt.ngay_thanh_toan, tt.trang_thai_thanh_toan, tt.ma_thanh_toan, tt.so_tien_thanh_toan, sp.ma_san_pham, sp.ten_san_pham, dh.tong_gia_tri FROM thanh_toan tt 
                            INNER JOIN don_hang dh ON dh.id = tt.id_don_hang
                            INNER JOIN chi_tiet_don_hang ctdh ON ctdh.id_don_hang = dh.id
                            INNER JOIN san_pham sp ON sp.id = ctdh.id_san_pham
                            INNER JOIN nguoi_dung nd ON nd.id = dh.id_nguoi_dung
                            WHERE tt.id =:id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() !== 0) {
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return [
                    'success' => True,
                    'message' => 'Lấy dữ liệu thành công',
                    'data' => $data
                ];
            } else {
                return [
                    'success' => False,
                    'message' => 'Không có dữ liệu'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => False,
                'message' => "Không thể lấy được thanh toán " . $e->getMessage()
            ];
        }
    }

    public function updatePayment($data)
    {
        try {
            $sql_query = "UPDATE thanh_toan SET ngay_thanh_toan =:ngay_thanh_toan, trang_thai_thanh_toan =:trang_thai_thanh_toan, phuong_thuc_thanh_toan=:phuong_thuc_thanh_toan WHERE id=:id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':ngay_thanh_toan', $data['ngay_thanh_toan']);
            $stmt->bindParam(':trang_thai_thanh_toan', $data['trang_thai_thanh_toan']);
            $stmt->bindParam(':phuong_thuc_thanh_toan', $data['phuong_thuc_thanh_toan']);
            $stmt->bindParam(':id', $data['id']);
            $stmt->execute();


            if ($stmt->rowCount() !== 0) {
                return [
                    'ER' => 0,
                    'message' => 'Cập nhật thành công'
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Cập nhật thất bại'
                ];
            }
        } catch (Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }

    public function deletePayment($id)
    {
        try {
            // $sql_create_trigger = "
            //     CREATE TRIGGER update_don_hang_trang_thai
            //     AFTER DELETE ON thanh_toan
            //     FOR EACH ROW
            //     BEGIN
            //         -- Cập nhật trạng thái thanh toán của đơn hàng
            //         UPDATE don_hang
            //         SET trang_thai_thanh_toan = 'Chưa thanh toán'
            //         WHERE id = OLD.id_don_hang;
            //     END;
            // ";
            // $stmt_create_trigger = $this->conn->prepare($sql_create_trigger);
            // $stmt_create_trigger->execute();

            $sql_query = "DELETE FROM thanh_toan WHERE id=:id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() !== 0) {
                return [
                    'ER' => 0,
                    'message' => 'Xóa thành công'
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Xóa thất bại'
                ];
            }
        } catch (Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }


    // public function createMoMoPayment($orderData)
    // {
    //     try {
    //         $this->conn->beginTransaction();

    //         // Thêm bản ghi thanh toán
    //         $sql = "INSERT INTO thanh_toan (
    //             id_don_hang, 
    //             ma_thanh_toan,
    //             so_tien_thanh_toan,
    //             phuong_thuc_thanh_toan,
    //             trang_thai_thanh_toan,
    //             ngay_tao
    //         ) VALUES (
    //             :order_id,
    //             :payment_code,
    //             :amount,
    //             'MoMo',
    //             'PENDING',
    //             NOW()
    //         )";

    //         $paymentCode = 'MOMO_' . time();

    //         $stmt = $this->conn->prepare($sql);
    //         $stmt->execute([
    //             ':order_id' => $orderData['order_id'],
    //             ':payment_code' => $paymentCode,
    //             ':amount' => $orderData['amount']
    //         ]);

    //         $this->conn->commit();

    //         return [
    //             'success' => true,
    //             'payment_code' => $paymentCode
    //         ];
    //     } catch (Exception $e) {
    //         $this->conn->rollBack();
    //         return [
    //             'success' => false,
    //             'message' => 'Tạo thanh toán thất bại: ' . $e->getMessage()
    //         ];
    //     }
    // }

    // public function handleMoMoIPN($paymentData)
    // {
    //     try {
    //         $status = ($paymentData['resultCode'] == 0) ? 'SUCCESS' : 'FAILED';

    //         // Cập nhật thanh toán
    //         $sql = "UPDATE thanh_toan 
    //                SET trang_thai_thanh_toan = :status,
    //                    ma_giao_dich = :transaction_id,
    //                    ngay_thanh_toan = NOW()
    //                WHERE ma_thanh_toan = :payment_code";

    //         $stmt = $this->conn->prepare($sql);
    //         $stmt->execute([
    //             ':status' => $status,
    //             ':transaction_id' => $paymentData['transId'],
    //             ':payment_code' => $paymentData['orderId']
    //         ]);

    //         // Cập nhật đơn hàng
    //         $orderStatus = ($status == 'SUCCESS') ? 'Đã thanh toán' : 'Thanh toán thất bại';
    //         $updateOrder = "UPDATE don_hang 
    //                        SET trang_thai_thanh_toan = :status
    //                        WHERE id = (SELECT id_don_hang FROM thanh_toan WHERE ma_thanh_toan = :payment_code)";

    //         $stmt = $this->conn->prepare($updateOrder);
    //         $stmt->execute([
    //             ':status' => $orderStatus,
    //             ':payment_code' => $paymentData['orderId']
    //         ]);

    //         return [
    //             'success' => true,
    //             'message' => 'Cập nhật trạng thái thành công'
    //         ];
    //     } catch (Exception $e) {
    //         return [
    //             'success' => false,
    //             'message' => 'Xử lý IPN thất bại: ' . $e->getMessage()
    //         ];
    //     }
    // }
}
