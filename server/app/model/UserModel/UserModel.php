<?php

class UserModel
{
    private $conn;
    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAllCustomers()
    {
        try {
            $sql_query = "SELECT nd.id as id_nguoi_dung, nd.ho_va_ten, 
                        nd.ngay_sinh, nd.so_dien_thoai, nd.dia_chi, nd.anh, tk.id as id_tai_khoan, 
                        tk.username, tk.email, tk.password
                        FROM nguoi_dung as nd 
                        INNER JOIN tai_khoan as tk on tk.id = nd.id_tai_khoan";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return [
                    "ER" => 0,
                    "message" => "Lấy danh sách khách hàng thành công",
                    "data" => $result
                ];
            } else {
                return [
                    "ER" => 1,
                    "message" => "Không có khách hàng nào"
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Không thể lấy danh sách khách hàng" . $e->getMessage()
            ];
        }
    }

    public function updateCustomer($data)
    {
        try {
            $sql = "UPDATE nguoi_dung SET ho_va_ten = :ho_va_ten, ngay_sinh = :ngay_sinh, so_dien_thoai = :so_dien_thoai, dia_chi = :dia_chi, anh = :anh WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $data['id_nguoi_dung']);
            $stmt->bindParam(':ho_va_ten', $data['ho_va_ten']);
            $stmt->bindParam(':ngay_sinh', $data['ngay_sinh']);
            $stmt->bindParam(':so_dien_thoai', $data['so_dien_thoai']);
            $stmt->bindParam(':dia_chi', $data['dia_chi']);
            $stmt->bindParam(':anh', $data['anh']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $sql_taikhoan = "UPDATE tai_khoan SET username = :username, email = :email, password =:password, updated_at = NOW() WHERE id = :id_tai_khoan";
                $stmt_taikhoan = $this->conn->prepare($sql_taikhoan);
                $stmt_taikhoan->bindParam(':id_tai_khoan', $data['id_tai_khoan']);
                $stmt_taikhoan->bindParam(':username', $data['username']);
                $stmt_taikhoan->bindParam(':email', $data['email']);
                $stmt_taikhoan->bindParam(':password', $data['mat_khau']);
                $stmt_taikhoan->execute();
                if ($stmt_taikhoan->rowCount() > 0) {
                    return [
                        "ER" => 0,
                        "message" => "Cập nhật thông tin khách hàng thành công"
                    ];
                } else {
                    return [
                        "ER" => 1,
                        "message" => "Không thể cập nhật thông tin tài khoản khách hàng"
                    ];
                }
            } else {
                return [
                    "ER"   => 1,
                    "message" => "Không thể cập nhật thông tin khách hàng"
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Không thể tạo khách hàng mới" . $e->getMessage()
            ];
        }
    }

    public function createCustomer($data)
    {
        try {
            // Insert tài khoản vào bảng tai_khoan
            $sql_taikhoan = "INSERT INTO tai_khoan (username, email, password, created_at) 
                             VALUES (:username, :email, :password, NOW())";
            $stmt_taikhoan = $this->conn->prepare($sql_taikhoan);
            $stmt_taikhoan->bindParam(':username', $data['username']);
            $stmt_taikhoan->bindParam(':email', $data['email']);
            $stmt_taikhoan->bindParam(':password', $data['mat_khau']);
            $stmt_taikhoan->execute();

            // Lấy id của tài khoản vừa tạo
            $id_tai_khoan = $this->conn->lastInsertId();

            if ($stmt_taikhoan->rowCount() > 0) {
                // Insert dữ liệu khách hàng vào bảng nguoi_dung
                $sql = "INSERT INTO nguoi_dung (ho_va_ten, ngay_sinh, so_dien_thoai, dia_chi, anh, id_tai_khoan) 
                        VALUES (:ho_va_ten, :ngay_sinh, :so_dien_thoai, :dia_chi, :anh, :id_tai_khoan)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':ho_va_ten', $data['ho_va_ten']);
                $stmt->bindParam(':ngay_sinh', $data['ngay_sinh']);
                $stmt->bindParam(':so_dien_thoai', $data['so_dien_thoai']);
                $stmt->bindParam(':dia_chi', $data['dia_chi']);
                $stmt->bindParam(':anh', $data['anh']);
                $stmt->bindParam(':id_tai_khoan', $id_tai_khoan);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    return [
                        "ER" => 0,
                        "message" => "Tạo khách hàng và tài khoản thành công"
                    ];
                } else {
                    return [
                        "ER" => 1,
                        "message" => "Không thể tạo thông tin khách hàng"
                    ];
                }
            } else {
                return [
                    "ER" => 1,
                    "message" => "Không thể tạo tài khoản khách hàng"
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Không thể tạo khách hàng mới: " . $e->getMessage()
            ];
        }
    }

    public function deleteCustomer($id)
    {
        try {
            $sql = "DELETE FROM nguoi_dung WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [
                    "ER" => 0,
                    "message" => "Xóa khách hàng thành công"
                ];
            } else {
                return [
                    "ER" => 1,
                    "message" => "Không thể xóa khách hàng"
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Không thể xóa khách hàng" . $e->getMessage()
            ];
        }
    }

    public function addToCart($data)
    {
        try {
            $this->conn->beginTransaction(); // Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu

            // Kiểm tra người dùng tồn tại
            $sql_isExist_user = "SELECT * FROM nguoi_dung WHERE id = :id";
            $stmt = $this->conn->prepare($sql_isExist_user);
            $stmt->bindParam(':id', $data['id_nguoi_dung']);
            $stmt->execute();
            if ($stmt->rowCount() === 0) {
                return [
                    "ER" => 1,
                    "message" => "Người dùng không tồn tại!"
                ];
            }

            // Kiểm tra sản phẩm tồn tại
            $sql_isExist_product = "SELECT * FROM san_pham WHERE id = :id";
            $stmt = $this->conn->prepare($sql_isExist_product);
            $stmt->bindParam(':id', $data['id_san_pham']);
            $stmt->execute();
            if ($stmt->rowCount() === 0) {
                return [
                    "ER" => 1,
                    "message" => "Sản phẩm không tồn tại!"
                ];
            }
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            // Kiểm tra tồn kho
            $sql_check_stock = "SELECT so_luong_ton_kho FROM kho_hang WHERE id_san_pham = :id_san_pham";
            $stmt = $this->conn->prepare($sql_check_stock);
            $stmt->bindParam(':id_san_pham', $data['id_san_pham']);
            $stmt->execute();
            if ($stmt->rowCount() === 0) {
                return [
                    "ER" => 1,
                    "message" => "Sản phẩm không có trong kho!"
                ];
            }
            $stock = $stmt->fetch(PDO::FETCH_ASSOC)['so_luong_ton_kho'];
            if ($stock < $data['so_luong']) {
                return [
                    "ER" => 1,
                    "message" => "Số lượng yêu cầu vượt quá tồn kho!"
                ];
            }

            // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
            $sql_isExist_inCart = "SELECT * FROM gio_hang WHERE id_nguoi_dung = :id_nguoi_dung AND id_san_pham = :id_san_pham";
            $stmt = $this->conn->prepare($sql_isExist_inCart);
            $stmt->bindParam(':id_nguoi_dung', $data['id_nguoi_dung']);
            $stmt->bindParam(':id_san_pham', $data['id_san_pham']);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                // Cập nhật số lượng trong giỏ hàng
                $newQuantity = $data['so_luong'] + $stmt->fetch(PDO::FETCH_ASSOC)['so_luong'];
                $sql_update_quantity = "UPDATE gio_hang SET so_luong = :so_luong WHERE id_nguoi_dung = :id_nguoi_dung AND id_san_pham = :id_san_pham";
                $stmt = $this->conn->prepare($sql_update_quantity);
                $stmt->bindParam(':so_luong', $newQuantity);
                $stmt->bindParam(':id_nguoi_dung', $data['id_nguoi_dung']);
                $stmt->bindParam(':id_san_pham', $data['id_san_pham']);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    $this->conn->commit();
                    return [
                        "ER" => 0,
                        "message" => "Cập nhật giỏ hàng thành công!"
                    ];
                }
            } else {
                // Thêm mới vào giỏ hàng
                $sql_add_to_cart = "INSERT INTO gio_hang (id_nguoi_dung, id_san_pham, so_luong) VALUES (:id_nguoi_dung, :id_san_pham, :so_luong)";
                $stmt = $this->conn->prepare($sql_add_to_cart);
                $stmt->bindParam(':id_nguoi_dung', $data['id_nguoi_dung']);
                $stmt->bindParam(':id_san_pham', $data['id_san_pham']);
                $stmt->bindParam(':so_luong', $data['so_luong']);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    // Giảm tồn kho
                    $newStock = $stock - $data['so_luong'];
                    $sql_update_stock = "UPDATE kho_hang SET so_luong_ton_kho = :so_luong_ton_kho WHERE id_san_pham = :id_san_pham";
                    $stmt = $this->conn->prepare($sql_update_stock);
                    $stmt->bindParam(':so_luong_ton_kho', $newStock);
                    $stmt->bindParam(':id_san_pham', $data['id_san_pham']);
                    $stmt->execute();
                    $this->conn->commit();
                    return [
                        "ER" => 0,
                        "message" => "Thêm sản phẩm vào giỏ hàng thành công!"
                    ];
                }
            }

            $this->conn->rollBack();
            return [
                "ER" => 1,
                "message" => "Thao tác thất bại!"
            ];
        } catch (Exception $e) {
            $this->conn->rollBack();
            return [
                "ER" => 1,
                "message" => $e->getMessage()
            ];
        }
    }

    public function getCart($id)
    {
        try {
            $sql_query = "SELECT gh.id, gh.so_luong, gh.id_san_pham, sp.ten_san_pham, sp.gia_ban, kh.ten_anh, kh.duong_dan, gg.phan_tram_giam 
                            FROM gio_hang gh 
                            INNER JOIN san_pham sp ON sp.id = gh.id_san_pham 
                            INNER JOIN (
                                SELECT id_san_pham, ten_anh, duong_dan,
                                    ROW_NUMBER() OVER (PARTITION BY id_san_pham ORDER BY id) AS rn
                                FROM kho_anh
                            ) kh ON kh.id_san_pham = sp.id AND kh.rn = 1
                            INNER JOIN giam_gia gg ON gg.id = sp.id_giam_gia
                            WHERE gh.id_nguoi_dung =:id_nguoi_dung;";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(":id_nguoi_dung", $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (isset($result)) {
                    return [
                        "ER" => 0,
                        "message" => "Lấy giỏ hàng thành công",
                        "data" => $result
                    ];
                } else {
                    return [
                        "ER" => 0,
                        "message" => "Người dùng chưa thêm sản phẩm!",
                        "data" => []
                    ];
                }
            } else {
                return [
                    "ER" => 0,
                    "message" => "Người dùng chưa thêm sản phẩm!",
                    "data" => []
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Lỗi lấy giỏ hàng"
            ];
        }
    }

    public function deleteOrderInCart($id)
    {
        try {
            $sql_delete = "DELETE FROM gio_hang gh WHERE gh.id=:id";
            $stmt = $this->conn->prepare($sql_delete);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [
                    "ER" => 0,
                    "message" => "Gỡ sản phẩm thành công!",
                ];
            } else {
                return [
                    "ER" => 1,
                    "message" => "Không thể xóa sản phẩm"
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Loi " . $e
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


    public function payOrder($data)
    {
        try {
            $ma_don_hang = $this->generateOrderCode();
            $sql_query = "INSERT INTO don_hang (id_nguoi_dung, ma_don_hang, ngay_dat, ngay_giao_hang , trang_thai_don_hang, tong_gia_tri, dia_chi_giao_hang) VALUES (:id_nguoi_dung, :ma_don_hang, NOW(), DATE_ADD(NOW(), INTERVAL 2 DAY), 'Đang xử lý', :tong_gia_tri, :dia_chi_giao_hang)";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(":id_nguoi_dung", $data['id_nguoi_dung']);
            $stmt->bindParam(":ma_don_hang", $ma_don_hang);
            $stmt->bindParam(":tong_gia_tri", $data['tong_gia_tri']);
            $stmt->bindParam(":dia_chi_giao_hang", $data['dia_chi_giao_hang']);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                // Get the last inserted order ID
                $isSuccess = false;
                $id_don_hang = $this->conn->lastInsertId();
                for ($x = 0; $x < count($data['id_san_pham']); $x++) {
                    $sql_query_detail = "INSERT INTO chi_tiet_don_hang (id_don_hang, id_san_pham, so_luong, gia_ban) VALUES (:id_don_hang, :id_san_pham, :so_luong, :gia_ban)";
                    $stmt = $this->conn->prepare($sql_query_detail);
                    $stmt->bindParam(":id_don_hang", $id_don_hang);
                    $stmt->bindParam(":id_san_pham", $data['id_san_pham'][$x]);
                    $stmt->bindParam(":so_luong", $data['so_luong'][$x]);
                    $stmt->bindParam(":gia_ban", $data['gia_ban'][$x]);
                    $stmt->execute();
                    if ($stmt->rowCount() > 0) {
                        $isSuccess = true;
                    }
                }
                if ($isSuccess) {
                    $sql_query_payment = "INSERT INTO thanh_toan (id_don_hang, ma_thanh_toan, ngay_thanh_toan ,trang_thai_thanh_toan, phuong_thuc_thanh_toan, so_tien_thanh_toan) VALUES (:id_don_hang, :ma_thanh_toan, DATE_ADD(NOW(), INTERVAL 2 DAY) ,'Chưa thanh toán', :phuong_thuc_thanh_toan, :so_tien_thanh_toan)";
                    $stmt = $this->conn->prepare($sql_query_payment);
                    $stmt->bindParam(":id_don_hang", $id_don_hang);
                    $stmt->bindParam(":ma_thanh_toan", $ma_don_hang);
                    $stmt->bindParam(":phuong_thuc_thanh_toan", $data['phuong_thuc_thanh_toan']);
                    $stmt->bindParam(":so_tien_thanh_toan", $data['so_tien_thanh_toan']);
                    $stmt->execute();
                    if ($stmt->rowCount() > 0) {
                        return [
                            "ER" => 0,
                            "message" => "Đặt đơn thành công!"
                        ];
                    }
                }
                return [
                    "ER" => 0,
                    "message" => "Thanh toán thành công!"
                ];
            }
            return [
                "ER" => 1,
                "message" => "Lỗi thanh toán"
            ];
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => $e->getMessage()
            ];
        }
    }

    function getUserOrdersWithDetails($nguoiDungId)
    {
        try {
            // Kiểm tra tham số đầu vào
            if (!$nguoiDungId) return [];

            // Lấy danh sách đơn hàng của người dùng
            $sql = "SELECT dh.id, dh.ma_don_hang, dh.ngay_dat, dh.ngay_giao_hang, dh.trang_thai_don_hang, dh.tong_gia_tri, dh.dia_chi_giao_hang
                    FROM don_hang dh 
                    WHERE dh.id_nguoi_dung = :id_nguoi_dung 
                    ORDER BY dh.ngay_dat DESC";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id_nguoi_dung', $nguoiDungId);
            $stmt->execute();
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Lấy chi tiết cho từng đơn hàng
            foreach ($orders as &$order) {
                $orderId = $order['id'];
                $sqlDetails = "SELECT ctdh.id_san_pham, ctdh.so_luong, ctdh.gia_ban, 
                                    sp.ten_san_pham, 
                                    ka.duong_dan 
                                FROM chi_tiet_don_hang ctdh 
                                JOIN san_pham sp ON sp.id = ctdh.id_san_pham 
                                LEFT JOIN (
                                    SELECT id_san_pham, duong_dan,
                                        ROW_NUMBER() OVER (PARTITION BY id_san_pham ORDER BY id) AS rn
                                    FROM kho_anh
                                ) ka ON ka.id_san_pham = sp.id AND ka.rn = 1
                                WHERE ctdh.id_don_hang =:id_don_hang;";
                $stmtDetails = $this->conn->prepare($sqlDetails);
                $stmtDetails->bindParam(':id_don_hang', $orderId);
                $stmtDetails->execute();
                $details = $stmtDetails->fetchAll(PDO::FETCH_ASSOC);

                // Parse duong_dan từ chuỗi JSON
                // foreach ($details as &$detail) {
                //     $detail['duong_dan'] = json_decode($detail['duong_dan'])[0] ?? '';
                // }

                // Gắn chi tiết đơn hàng vào đơn hàng tương ứng
                $order['details'] = $details;
            }

            return [
                "ER" => 0,
                "message" => "Lấy đơn hàng thành công",
                "data" => $orders
            ];
        } catch (Exception $e) {
            return [];
        }
    }


    public function updatePaymentStatus($orderId, $resultCode)
    {
        try {
            $status = $resultCode == 0 ? 'Đã thanh toán' : 'Thanh toán thất bại';
            $sql = "UPDATE thanh_toan SET trang_thai_thanh_toan = :status WHERE ma_thanh_toan = :ma_thanh_toan";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(":status", $status);
            $stmt->bindParam(":ma_thanh_toan", $orderId);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                return [
                    "ER" => 0,
                    "message" => "Cập nhật trạng thái thanh toán thành công"
                ];
            } else {
                return [
                    "ER" => 1,
                    "message" => "Không thể cập nhật trạng thái thanh toán"
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => $e->getMessage()
            ];
        }
    }

    public function generateRandomOrderId()
    {
        $prefix = "LHP"; // Tiền tố cố định
        $randomNumber = mt_rand(1000, 9999); // Sinh số ngẫu nhiên từ 1000 đến 9999
        $orderId = $prefix . $randomNumber; // Kết hợp tiền tố và số ngẫu nhiên

        // Kiểm tra xem mã đã tồn tại trong cơ sở dữ liệu chưa
        $sql = "SELECT COUNT(*) FROM don_hang WHERE ma_don_hang = :ma_don_hang";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":ma_don_hang", $orderId);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        // Nếu mã đã tồn tại, thử tạo lại mã mới
        while ($count > 0) {
            $randomNumber = mt_rand(1000, 9999);
            $orderId = $prefix . $randomNumber;
            $stmt->bindParam(":ma_don_hang", $orderId);
            $stmt->execute();
            $count = $stmt->fetchColumn();
        }

        return $orderId;
    }
}
