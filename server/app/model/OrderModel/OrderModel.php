<?php

class OrderModel
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAllOrder()
    {
        try {
            $sql_query = "SELECT dh.id, nd.ho_va_ten, dh.ma_don_hang, dh.ngay_dat, dh.ngay_giao_hang, 
            dh.trang_thai_don_hang, dh.tong_gia_tri, dh.dia_chi_giao_hang, dh.created_at,
            tt.trang_thai_thanh_toan FROM don_hang AS dh
            INNER JOIN nguoi_dung AS nd ON dh.id_nguoi_dung = nd.id
            LEFT JOIN thanh_toan as tt on tt.id_don_hang = dh.id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return [
                'ER' => 0,
                'message' => 'Lấy danh sách đơn hàng thành công',
                'data' => $result
            ];
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Không thể lấy được đơn hàng ' . $e->getMessage()
            ];
        }
    }

    public function getDetailOrder($id)
    {
        try {
            $sql_query = " SELECT dh.id, nd.ho_va_ten, dh.ma_don_hang, dh.ngay_dat, dh.ngay_giao_hang, ctdh.so_luong,
                            dh.trang_thai_don_hang, dh.tong_gia_tri, dh.dia_chi_giao_hang, 
                            tt.trang_thai_thanh_toan, sp.ten_san_pham, sp.ma_san_pham, sp.gia_ban, tt.so_tien_thanh_toan FROM don_hang AS dh
                            LEFT JOIN nguoi_dung AS nd ON dh.id_nguoi_dung = nd.id
                            LEFT JOIN chi_tiet_don_hang as ctdh on ctdh.id_don_hang = dh.id
                            LEFT JOIN san_pham as sp on sp.id = ctdh.id_san_pham 
                            LEFT JOIN thanh_toan as tt on tt.id_don_hang = dh.id
                            WHERE dh.id = :id ";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return [
                'ER' => 0,
                'message' => 'Lấy chi tiết đơn hàng thành công',
                'data' => $result
            ];
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Không thể lấy được chi tiết đơn hàng ' . $e->getMessage()
            ];
        }
    }

    public function updateOrder($data)
    {
        try {
            $sql_query = "UPDATE don_hang dh 
            LEFT JOIN chi_tiet_don_hang AS ctdh ON ctdh.id_don_hang = dh.id 
            SET 
                dh.trang_thai_don_hang = :trang_thai_don_hang, 
                dh.dia_chi_giao_hang = :dia_chi_giao_hang, 
                ctdh.so_luong = :so_luong, 
                dh.tong_gia_tri = :tong_gia_tri 
            WHERE dh.id = :id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':trang_thai_don_hang', $data['trang_thai_don_hang']);
            $stmt->bindParam(':dia_chi_giao_hang', $data['dia_chi_giao_hang']);
            $stmt->bindParam(':so_luong', $data['so_luong']);
            $stmt->bindParam(':tong_gia_tri', $data['tong_gia_tri']);
            $stmt->bindParam(':id', $data['id']);
            $stmt->execute();
            if ($stmt->rowCount() == 0) {
                return [
                    'ER' => 1,
                    'message' => 'Không tìm thấy đơn hàng'
                ];
            } else {
                return [
                    'ER' => 0,
                    'message' => 'Cập nhật đơn hàng thành công'
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Không thể cập nhật đơn hàng ' . $e->getMessage()
            ];
        }
    }

    public function deleteOrder($id)
    {
        try {
            $sql_query = "DELETE FROM don_hang WHERE id = :id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() == 0) {
                return [
                    'ER' => 1,
                    'message' => 'Không tìm thấy đơn hàng'
                ];
            } else {
                return [
                    'ER' => 0,
                    'message' => 'Xóa đơn hàng thành công'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Không thể xóa đơn hàng ' . $e->getMessage()
            ];
        }
    }

    public function getAllUsers()
    {
        try {
            $sql_query = "SELECT nd.id, nd.ho_va_ten, nd.so_dien_thoai, nd.dia_chi
                          FROM nguoi_dung nd";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($users) {
                return [
                    'ER' => 0,
                    'message' => 'Lấy danh sách người dùng thành công',
                    'data' => $users
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Không tìm thấy người dùng nào'
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Lỗi khi lấy danh sách người dùng: ' . $e->getMessage()
            ];
        }
    }

    public function generateOrderCode()
    {
        try {
            $sql_query = "SELECT ma_don_hang FROM don_hang ORDER BY id DESC LIMIT 1";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            $lastOrder = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($lastOrder) {
                $lastCode = $lastOrder['ma_don_hang'];
                $number = (int)substr($lastCode, 2) + 1; // Giả sử mã có dạng DH001
                $newCode = 'DH' . str_pad($number, 3, '0', STR_PAD_LEFT);
            } else {
                $newCode = 'DH001'; // Mã đầu tiên nếu chưa có đơn hàng nào
            }

            return $newCode;
        } catch (Exception $e) {
            return 'DH001'; // Mặc định nếu có lỗi
        }
    }

    public function addOrder($data)
    {
        try {
            // Bắt đầu transaction
            $this->conn->beginTransaction();

            // Nếu không có ma_don_hang, tự động tạo
            if (empty($data['ma_don_hang'])) {
                $data['ma_don_hang'] = $this->generateOrderCode();
            }

            // Thêm đơn hàng vào bảng don_hang
            $sql_order = "INSERT INTO don_hang (id_nguoi_dung, ma_don_hang, ngay_dat, ngay_giao_hang, trang_thai_don_hang, tong_gia_tri, dia_chi_giao_hang) 
                          VALUES (:id_nguoi_dung, :ma_don_hang, :ngay_dat, null, :trang_thai_don_hang, :tong_gia_tri, :dia_chi_giao_hang)";
            $stmt_order = $this->conn->prepare($sql_order);
            $stmt_order->bindParam(':id_nguoi_dung', $data['id_nguoi_dung']);
            $stmt_order->bindParam(':ma_don_hang', $data['ma_don_hang']);
            $stmt_order->bindParam(':ngay_dat', $data['ngay_dat']);
            $stmt_order->bindParam(':trang_thai_don_hang', $data['trang_thai_don_hang']);
            $stmt_order->bindParam(':tong_gia_tri', $data['tong_gia_tri']);
            $stmt_order->bindParam(':dia_chi_giao_hang', $data['dia_chi_giao_hang']);
            $stmt_order->execute();

            // Lấy ID của đơn hàng vừa thêm
            $orderId = $this->conn->lastInsertId();

            // Thêm chi tiết đơn hàng vào bảng chi_tiet_don_hang
            $sql_detail = "INSERT INTO chi_tiet_don_hang (id_don_hang, id_san_pham, so_luong, gia_ban) 
                           VALUES (:id_don_hang, :id_san_pham, :so_luong, :gia_ban)";
            $stmt_detail = $this->conn->prepare($sql_detail);


            $stmt_detail->bindParam(':id_don_hang', $orderId);
            $stmt_detail->bindParam(':id_san_pham',  $data['id_san_pham']);
            $stmt_detail->bindParam(':so_luong',  $data['so_luong']);
            $stmt_detail->bindParam(':gia_ban',  $data['gia_ban']);
            $stmt_detail->execute();


            // Commit transaction nếu mọi thứ thành công
            $this->conn->commit();

            return [
                'ER' => 0,
                'order_id' => $orderId,
                'message' => 'Thêm đơn hàng và chi tiết đơn hàng thành công'
            ];
        } catch (Exception $e) {
            // Rollback nếu có lỗi
            $this->conn->rollBack();
            return [
                'ER' => 1,
                'message' => 'Không thể thêm đơn hàng và chi tiết: ' . $e->getMessage()
            ];
        }
    }
}
