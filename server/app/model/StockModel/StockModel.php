<?php
class StockModel
{
    private $conn;
    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAllStocks()
    {
        try {
            $sql_query = "SELECT 
                            kh.id, 
                            sp.ten_san_pham, 
                            sp.ma_san_pham, 
                            GROUP_CONCAT(DISTINCT img.ten_anh) AS ten_anh, 
                            GROUP_CONCAT(img.duong_dan SEPARATOR ', ') AS duong_dan, 
                            kh.so_luong_nhap, 
                            kh.so_luong_ton_kho, 
                            kh.so_luong_ban_ra, 
                            kh.lo_hang,
                            kh.created_at 
                        FROM kho_hang AS kh
                        INNER JOIN san_pham AS sp ON sp.id = kh.id_san_pham
                        LEFT JOIN kho_anh AS img ON img.id_san_pham = sp.id
                        GROUP BY kh.id, sp.ten_san_pham, sp.ma_san_pham, kh.so_luong_nhap, kh.so_luong_ton_kho, kh.so_luong_ban_ra, kh.created_at;
                        ";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return [
                    'ER' => 0,
                    'message' => 'Lấy danh sách kho thành công',
                    'data' => $result
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Hiện tại không có sản phẩm nào trong kho'
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Không thể lấy được danh sách kho ' . $e->getMessage()
            ];
        }
    }

    public function getDetailStockById($id)
    {
        try {
            if ($this->isIdExists($id, 'kho_hang')) {
                $sql_query = "SELECT 
                kh.id, 
                sp.ten_san_pham, 
                sp.ma_san_pham, 
                GROUP_CONCAT(DISTINCT img.ten_anh) AS ten_anh, 
                GROUP_CONCAT(img.duong_dan SEPARATOR ', ') AS duong_dan, 
                kh.so_luong_nhap, 
                kh.so_luong_ton_kho, 
                kh.so_luong_ban_ra, 
                 kh.lo_hang,
                kh.created_at 
                FROM kho_hang AS kh
                INNER JOIN san_pham AS sp ON sp.id = kh.id_san_pham
                LEFT JOIN kho_anh AS img ON img.id_san_pham = sp.id
                WHERE kh.id=:id
                GROUP BY kh.id, sp.ten_san_pham, sp.ma_san_pham, kh.so_luong_nhap, kh.so_luong_ton_kho, kh.so_luong_ban_ra, kh.created_at 
                ";
                $stmt = $this->conn->prepare($sql_query);
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    return [
                        'success' => true,
                        'message' => 'Lấy chi tiết sản phẩm trong kho thành công',
                        'data' => $result
                    ];
                } else {
                    return [
                        'success' => false,
                        'message' => 'Không thể lấy được chi tiết sản phẩm trong kho'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'message' => 'Sản phẩm trong kho không tồn tại'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Không thể lấy được chi tiết sản phẩm trong kho ' . $e->getMessage()
            ];
        }
    }

    public function deleteStock($id)
    {
        try {
            if ($this->isIdExists($id, 'kho_hang')) {
                $sql_trigger = "CREATE TRIGGER delete_sp_after_delete_kho_hang
                            DELIMITER $$
                            CREATE TRIGGER after_kho_hang_delete
                            AFTER DELETE ON kho_hang
                            FOR EACH ROW
                            BEGIN
                                -- Xóa ảnh trong kho_anh có id_san_pham trùng với id của sản phẩm trong kho_hang
                                DELETE FROM kho_anh WHERE id_san_pham = OLD.id_san_pham;
                                -- Xóa giỏ hàng có id_san_pham trùng với id của sản phẩm trong kho_hang
                                DELETE FROM gio_hang WHERE id_san_pham = OLD.id_san_pham;
                                -- Xóa sản phẩm trong bảng san_pham có id trùng với id_san_pham
                                DELETE FROM san_pham WHERE id = OLD.id_san_pham;
                            END $$
                            DELIMITER ;
                            DELETE FROM kho_hang WHERE id=:id;";
                $stmt = $this->conn->prepare($sql_trigger);
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    return [
                        'success' => true,
                        'message' => 'Xóa sản phẩm trong kho thành công'
                    ];
                } else {
                    return [
                        'success' => false,
                        'message' => 'Không thể Xóa sản phẩm trong kho'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'message' => 'Sản phẩm trong kho không tồn tại'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Không thể xóa sản phẩm trong kho ' . $e->getMessage()
            ];
        }
    }

    public function updateStock($data)
    {
        try {
            if ($this->isIdExists($data['id'], "kho_hang")) {
                $sql_query = "UPDATE kho_hang SET so_luong_nhap=:so_luong_nhap, 
                so_luong_ton_kho=:so_luong_ton_kho, so_luong_ban_ra=:so_luong_ban_ra, gia_nhap=:gia_nhap, 
                ngay_nhap=:ngay_nhap, lo_hang=:lo_hang, 
                updated_at=NOW() WHERE id=:id";
                $stmt = $this->conn->prepare($sql_query);
                $stmt->bindParam(':so_luong_nhap', $data['so_luong_nhap']);
                $stmt->bindParam(':so_luong_ton_kho', $data['so_luong_ton_kho']);
                $stmt->bindParam(':so_luong_ban_ra', $data['so_luong_ban_ra']);
                $stmt->bindParam(':gia_nhap', $data['gia_nhap']);
                $stmt->bindParam(':ngay_nhap', $data['ngay_nhap']);
                $stmt->bindParam(':lo_hang', $data['lo_hang']);
                $stmt->bindParam(':id', $data['id']);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    return [
                        'success' => true,
                        'message' => 'Cập nhập sản phẩm trong kho thành công'
                    ];
                } else {
                    return [
                        'success' => false,
                        'message' => 'Không thể cập nhập sản phẩm trong kho'
                    ];
                }
            } else {
                return [
                    'success' => false,
                    'message' => 'Sản phẩm trong kho không tồn tại'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Không thể cập nhập sản phẩm trong kho ' . $e->getMessage()
            ];
        }
    }

    public function importStock($data)
    {
        try {
            if (isset($data) && !empty($data)) {

                $sql_query = "UPDATE kho_hang AS kh 
                                INNER JOIN san_pham as sp on sp.id = kh.id_san_pham
                                SET kh.ngay_nhap =:ngay_nhap, kh.gia_nhap =:gia_nhap, kh.so_luong_nhap =kh.so_luong_nhap + :so_luong_nhap, kh.so_luong_ton_kho = kh.so_luong_ton_kho + :so_luong_nhap
                                WHERE kh.id_san_pham =:id_san_pham";
                $stmt = $this->conn->prepare($sql_query);
                $stmt->bindParam(':ngay_nhap', $data['ngay_nhap']);
                $stmt->bindParam(':gia_nhap', $data['gia_nhap']);
                $stmt->bindParam(':so_luong_nhap', $data['so_luong_nhap']);
                $stmt->bindParam(':id_san_pham', $data['id_san_pham']);
                $stmt->execute();

                $ma_phieu = "NH" . $data['id_san_pham'] . rand(1000, 9999);
                $sql_insert = "INSERT INTO lich_su_kho(id_san_pham, loai_giao_dich, so_luong, gia, ngay_giao_dich, ly_do, ma_phieu, tong_gia_tri ,created_at) VALUES(:id_san_pham, 'Nhập Kho', :so_luong, :gia, :ngay_giao_dich, :ly_do, :ma_phieu, :tong_gia_tri, NOW())";
                $stmt_insert = $this->conn->prepare($sql_insert);
                $stmt_insert->bindParam(':id_san_pham', $data['id_san_pham']);
                $stmt_insert->bindParam(':so_luong', $data['so_luong_nhap']);
                $stmt_insert->bindParam(':gia', $data['gia_nhap']);
                $stmt_insert->bindParam(':ngay_giao_dich', $data['ngay_nhap']);
                $stmt_insert->bindParam(':ly_do', $data['ly_do']);
                $stmt_insert->bindParam(':ma_phieu',  $ma_phieu);
                $stmt_insert->bindParam(':tong_gia_tri', $data['tong_gia_tri']);
                $stmt_insert->execute();
                if ($stmt_insert->rowCount() > 0) {
                    return [
                        "ER" => 0,
                        "message" => "Nhập kho thành công"
                    ];
                } else {
                    return [
                        "ER" => 1,
                        "message" => "Không thể nhập kho"
                    ];
                }
            } else {
                return [
                    "ER" => 1,
                    "message" => "Không có dữ liệu",
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Không thể nhập kho " . $e->getMessage()
            ];
        }
    }

    public function exportStock($data)
    {
        try {

            $sql_query = "UPDATE kho_hang AS kh 
                            INNER JOIN san_pham as sp on sp.id = kh.id_san_pham
                            SET kh.so_luong_ton_kho = kh.so_luong_ton_kho - :so_luong, kh.so_luong_ban_ra = kh.so_luong_ban_ra + :so_luong 
                            WHERE kh.id_san_pham =:id_san_pham";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':so_luong', $data['so_luong']);
            $stmt->bindParam(':id_san_pham', $data['id_san_pham']);
            $stmt->execute();

            $ma_phieu = "XH" . $data['id_san_pham'] . rand(1000, 9999);
            $sql_insert = "INSERT INTO lich_su_kho(id_san_pham, loai_giao_dich, so_luong, gia, ngay_giao_dich, ly_do, ma_phieu, tong_gia_tri ,created_at) VALUES(:id_san_pham, 'Xuất Kho', :so_luong, :gia, :ngay_giao_dich, :ly_do, :ma_phieu, :tong_gia_tri, NOW())";
            $stmt_insert = $this->conn->prepare($sql_insert);
            $stmt_insert->bindParam(':id_san_pham', $data['id_san_pham']);
            $stmt_insert->bindParam(':so_luong', $data['so_luong']);
            $stmt_insert->bindParam(':gia', $data['gia_ban']);
            $stmt_insert->bindParam(':ngay_giao_dich', $data['ngay_giao_dich']);
            $stmt_insert->bindParam(':ly_do', $data['ly_do']);
            $stmt_insert->bindParam(':ma_phieu',  $ma_phieu);
            $stmt_insert->bindParam(':tong_gia_tri', $data['tong_gia_tri']);
            $stmt_insert->execute();

            if (
                $stmt->rowCount() > 0 && $stmt_insert->rowCount() > 0
            ) {
                return [
                    "ER" => 0,
                    "message" => "Xuất kho thành công"
                ];
            } else {
                return [
                    "ER" => 1,
                    "message" => "Không thể xuất kho"
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Không thể xuất kho " . $e->getMessage()
            ];
        }
    }

    public function takingStock()
    {
        try {
            $sql_query = "SELECT id, loai_giao_dich, so_luong, gia, ma_phieu, tong_gia_tri, ngay_giao_dich ,ly_do FROM lich_su_kho";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [
                    'ER' => 0,
                    'message' => 'Kiểm kê kho thành công',
                    'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Không có dữ liệu kiểm kê kho'
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Không thể kiểm kê kho ' . $e->getMessage()
            ];
        }
    }

    public function searchStock(string $nameStock): array
    {
        try {
            $sqlQuery = "SELECT 
                kh.id, 
                sp.ten_san_pham, 
                sp.ma_san_pham, 
                GROUP_CONCAT(DISTINCT img.ten_anh) AS ten_anh, 
                GROUP_CONCAT(DISTINCT img.duong_dan SEPARATOR ', ') AS duong_dan, 
                kh.so_luong_nhap, 
                kh.so_luong_ton_kho, 
                kh.so_luong_ban_ra, 
                kh.lo_hang,
                kh.created_at 
            FROM kho_hang AS kh
            INNER JOIN san_pham AS sp ON sp.id = kh.id_san_pham
            LEFT JOIN kho_anh AS img ON img.id_san_pham = sp.id
            WHERE sp.ten_san_pham LIKE :search_term 
            OR sp.ma_san_pham LIKE :search_term
            GROUP BY 
                kh.id, 
                sp.ten_san_pham, 
                sp.ma_san_pham, 
                kh.so_luong_nhap, 
                kh.so_luong_ton_kho, 
                kh.so_luong_ban_ra, 
                kh.created_at";

            $stmt = $this->conn->prepare($sqlQuery);
            $searchTerm = '%' . $nameStock;
            $stmt->bindParam(':search_term', $searchTerm, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                return [
                    'success' => true,
                    'message' => 'Tìm kiếm sản phẩm trong kho thành công',
                    'data' => $stmt->fetchAll(PDO::FETCH_ASSOC)
                ];
            }

            return [
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm trong kho'
            ];
        } catch (PDOException $e) {
            // Log the error here if you have a logging system
            return [
                'success' => false,
                'message' => 'Không thể tìm kiếm sản phẩm trong kho',
                'error' => $e->getMessage()
            ];
        }
    }

    public function getProductByCode($data)
    {
        try {
            $sql_query = "SELECT sp.id AS id_san_pham, sp.gia_ban ,sp.ma_san_pham, sp.ten_san_pham, kh.ngay_nhap, kh.gia_nhap, kh.lo_hang, kh.so_luong_nhap FROM san_pham AS sp INNER JOIN kho_hang AS kh ON kh.id_san_pham = sp.id  WHERE sp.ma_san_pham =:ma_san_pham";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':ma_san_pham', $data);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                // $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return [
                    "ER" => 0,
                    "message" => "Lấy sản phẩm theo mã sản phẩm trong kho thành công",
                    "data" => $result
                ];
            } else {
                return [
                    "ER" => 1,
                    "message" => "Không tìm thấy sản phẩm theo mã sản phẩm trong kho",
                    "data" => $data
                ];
            }
        } catch (Exception $e) {
            return [
                "ER" => 1,
                "message" => "Không thể lấy sản phẩm theo mã sản phẩm trong kho " . $e->getMessage()
            ];
        }
    }

    private function isIdExists($id, $name_table)
    {
        try {
            $sql_query = "SELECT * FROM $name_table WHERE id=:id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return "Không thể kiểm tra id trong kho " . $e->getMessage();
        }
    }
}
