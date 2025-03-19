<?php
class ProductModel
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAllProducts()
    {
        try {
            $checkQuery = "SELECT sp.id, sp.ma_san_pham, sp.ten_san_pham, sp.tieu_de, sp.mo_ta_san_pham, sp.gia_ban, 
                            GROUP_CONCAT(DISTINCT ka.ten_anh) AS ten_anh, GROUP_CONCAT(ka.duong_dan) AS duong_dan,
                            sp.ten_mau, sp.ma_mau, sp.kich_thuoc, dm.ten_danh_muc_con, 
                            gh.ma_giam_gia, gh.phan_tram_giam, gh.ngay_bat_dau, gh.ngay_ket_thuc, gh.trang_thai 
                            FROM san_pham AS sp 
                            LEFT JOIN giam_gia AS gh ON gh.id = sp.id_giam_gia
                            LEFT JOIN danh_muc_con AS dm ON dm.id = sp.id_danh_muc_con
                            LEFT JOIN kho_anh as ka on ka.id_san_pham = sp.id
                            GROUP BY  sp.id, sp.ma_san_pham, sp.ten_san_pham, sp.tieu_de, sp.mo_ta_san_pham, sp.gia_ban, 
                            sp.ten_mau, sp.ma_mau, sp.kich_thuoc, dm.ten_danh_muc_con, 
                            gh.ma_giam_gia, gh.phan_tram_giam, gh.ngay_bat_dau, gh.ngay_ket_thuc, gh.trang_thai";

            $checkStmt = $this->conn->prepare($checkQuery);
            $checkStmt->execute();
            $products = $checkStmt->fetchAll(PDO::FETCH_ASSOC);
            if (isset($products) && !empty($products)) {
                return [
                    'ER' => 0,
                    'message' => 'Lấy ra tất cả sản phẩm thành công',
                    'products' => $products
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Không có sản phẩm'
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Lấy sản phẩm thất bại: ' . $e->getMessage()
            ];
        }
    }

    public function getAllProductsClient($id)
    {
        try {
            $checkQuery = "SELECT sp.id, sp.ma_san_pham, sp.ten_san_pham, sp.tieu_de, sp.mo_ta_san_pham, sp.gia_ban, 
                            GROUP_CONCAT(DISTINCT ka.ten_anh) AS ten_anh, GROUP_CONCAT(ka.duong_dan) AS duong_dan,
                            sp.ten_mau, sp.ma_mau, sp.kich_thuoc, dm.ten_danh_muc_con, 
                            gh.ma_giam_gia, gh.phan_tram_giam, gh.ngay_bat_dau, gh.ngay_ket_thuc, gh.trang_thai, GROUP_CONCAT(dg.so_sao) as so_sao
                            FROM san_pham AS sp 
                            LEFT JOIN giam_gia AS gh ON gh.id = sp.id_giam_gia
                            LEFT JOIN danh_muc_con AS dm ON dm.id = sp.id_danh_muc_con
                            LEFT JOIN kho_anh as ka on ka.id_san_pham = sp.id
                            LEFT JOIN danh_gia as dg on dg.id_san_pham = sp.id
                            WHERE sp.id =:id
                            GROUP BY  sp.id, sp.ma_san_pham, sp.ten_san_pham, sp.tieu_de, sp.mo_ta_san_pham, sp.gia_ban, 
                            sp.ten_mau, sp.ma_mau, sp.kich_thuoc, dm.ten_danh_muc_con, 
                            gh.ma_giam_gia, gh.phan_tram_giam, gh.ngay_bat_dau, gh.ngay_ket_thuc, gh.trang_thai";

            $checkStmt = $this->conn->prepare($checkQuery);
            $checkStmt->bindParam(':id', $id);
            $checkStmt->execute();
            $products = $checkStmt->fetchAll(PDO::FETCH_ASSOC);
            if (isset($products) && !empty($products)) {
                return [
                    'ER' => 0,
                    'message' => 'Lấy ra sản phẩm thành công',
                    'products' => $products
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Không có sản phẩm'
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Lấy sản phẩm thất bại: ' . $e->getMessage()
            ];
        }
    }

    public function getProductsByName(string $name): array
    {
        try {
            $sql_query = "SELECT sp.id, sp.ma_san_pham, sp.ten_san_pham, sp.tieu_de, sp.mo_ta_san_pham, sp.gia_ban, GROUP_CONCAT(ka.ten_anh), GROUP_CONCAT(ka.duong_dan),
                            sp.ten_mau, sp.ma_mau, sp.kich_thuoc, dm.ten_danh_muc_con, 
                            gh.ma_giam_gia, gh.phan_tram_giam, gh.ngay_bat_dau, gh.ngay_ket_thuc, gh.trang_thai 
                            FROM san_pham AS sp 
                            LEFT JOIN giam_gia AS gh ON gh.id = sp.id_giam_gia
                            INNER JOIN danh_muc_con AS dm ON dm.id = sp.id_danh_muc_con
                            LEFT JOIN kho_anh as ka on ka.id_san_pham = sp.id
                            WHERE sp.ten_san_pham Like :search_name
                            GROUP BY  sp.id, sp.ma_san_pham, sp.ten_san_pham, sp.tieu_de, sp.mo_ta_san_pham, sp.gia_ban, 
                            sp.ten_mau, sp.ma_mau, sp.kich_thuoc, dm.ten_danh_muc_con, 
                            gh.ma_giam_gia, gh.phan_tram_giam, gh.ngay_bat_dau, gh.ngay_ket_thuc, gh.trang_thai ";
            $stmt = $this->conn->prepare($sql_query);
            $searchTerm = '%' . $name . '%';
            $stmt->bindParam(':search_name', $searchTerm, PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return [
                    'success' => true,
                    'message' => 'Lấy ra sản phẩm thành công',
                    'products' => $products
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Không có sản phẩm'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Lấy sản phẩm thất bại: ' . $e->getMessage()
            ];
        }
    }

    public function getProductDetailByID($id)
    {
        try {
            $sqlQuery = "SELECT sp.id, sp.ma_san_pham, sp.ten_san_pham, sp.tieu_de, sp.mo_ta_san_pham, sp.gia_ban, 
                            GROUP_CONCAT(ka.ten_anh) AS ten_anh, GROUP_CONCAT(ka.duong_dan) AS duong_dan,
                            sp.ten_mau, sp.ma_mau, sp.kich_thuoc, dm.ten_danh_muc_con, 
                            gh.ma_giam_gia, gh.phan_tram_giam, gh.ngay_bat_dau, gh.ngay_ket_thuc, gh.trang_thai 
                            FROM san_pham AS sp 
                            LEFT JOIN giam_gia AS gh ON gh.id = sp.id_giam_gia
                            INNER JOIN danh_muc_con AS dm ON dm.id = sp.id_danh_muc_con
                            LEFT JOIN kho_anh as ka on ka.id_san_pham = sp.id
                            where sp.id = :id
                            GROUP BY  sp.id, sp.ma_san_pham, sp.ten_san_pham, sp.tieu_de, sp.mo_ta_san_pham, sp.gia_ban, 
                            sp.ten_mau, sp.ma_mau, sp.kich_thuoc, dm.ten_danh_muc_con, 
                            gh.ma_giam_gia, gh.phan_tram_giam, gh.ngay_bat_dau, gh.ngay_ket_thuc, gh.trang_thai";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
            if (isset($product) && !empty($product)) {
                return [
                    'success' => true,
                    'message' => 'Lấy ra sản phẩm thành công',
                    'product' => $product
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Không có sản phẩm'
                ];
            }
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Lấy sản phẩm thất bại: ' . $e->getMessage()
            ];
        }
    }

    public function addNewProduct($data)
    {
        try {
            // Kiểm tra dữ liệu đầu vào
            $requiredFields = [
                'ma_san_pham',
                'ten_san_pham',
                'tieu_de',
                'mo_ta_san_pham',
                'gia_ban',
                'ten_mau',
                'ma_mau',
                'kich_thuoc',
                'id_danh_muc_con',
                'so_luong_nhap',
                'so_luong_ton_kho',
                'so_luong_ban_ra',
                'gia_nhap',
                'ngay_nhap',
                'lo_hang',
                'duong_dan'
            ];
            foreach ($requiredFields as $field) {
                if (!isset($data[$field]) || (is_string($data[$field]) && empty($data[$field]))) {
                    return [
                        'ER' => 1,
                        'message' => "Thiếu hoặc không hợp lệ: $field"
                    ];
                }
            }
            // Kiểm tra nếu không có ảnh nào được upload
            if (empty($data['duong_dan'])) {
                return [
                    'ER' => 1,
                    'message' => 'Phải upload ít nhất một ảnh'
                ];
            }

            // Kiểm tra mã sản phẩm đã tồn tại chưa
            $stmt = $this->conn->prepare("SELECT ma_san_pham FROM san_pham WHERE ma_san_pham = :ma_san_pham");
            $stmt->bindParam(':ma_san_pham', $data['ma_san_pham']);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [
                    'ER' => 1,
                    'message' => 'Mã sản phẩm đã tồn tại'
                ];
            }

            // Bắt đầu transaction
            $this->conn->beginTransaction();

            // Thêm vào bảng san_pham
            $sql_query_add_product = "INSERT INTO san_pham (
                ma_san_pham, ten_san_pham, tieu_de, mo_ta_san_pham, gia_ban, 
                ten_mau, ma_mau, kich_thuoc, id_danh_muc_con, id_giam_gia
            ) VALUES (
                :ma_san_pham, :ten_san_pham, :tieu_de, :mo_ta_san_pham, :gia_ban, 
                :ten_mau, :ma_mau, :kich_thuoc, :id_danh_muc_con, :id_giam_gia
            )";
            $stmt = $this->conn->prepare($sql_query_add_product);
            $stmt->bindParam(':ma_san_pham', $data['ma_san_pham']);
            $stmt->bindParam(':ten_san_pham', $data['ten_san_pham']);
            $stmt->bindParam(':tieu_de', $data['tieu_de']);
            $stmt->bindParam(':mo_ta_san_pham', $data['mo_ta_san_pham']);
            $stmt->bindParam(':gia_ban', $data['gia_ban']);
            $stmt->bindParam(':ten_mau', $data['ten_mau']);
            $stmt->bindParam(':ma_mau', $data['ma_mau']);
            $stmt->bindParam(':kich_thuoc', $data['kich_thuoc']);
            $stmt->bindParam(':id_danh_muc_con', $data['id_danh_muc_con']);
            $stmt->bindParam(':id_giam_gia', $data['id_giam_gia']);
            $stmt->execute();

            // Lấy ID sản phẩm vừa thêm
            $IDSanPham = $this->conn->lastInsertId();

            // Thêm vào bảng kho_hang
            $sql_query_add_khohang = "INSERT INTO kho_hang (
                id_san_pham, so_luong_nhap, so_luong_ton_kho, so_luong_ban_ra, gia_nhap, ngay_nhap, lo_hang
            ) VALUES (
                :id_san_pham, :so_luong_nhap, :so_luong_ton_kho, :so_luong_ban_ra, :gia_nhap, :ngay_nhap, :lo_hang
            )";
            $stmt = $this->conn->prepare($sql_query_add_khohang);
            $stmt->bindParam(':id_san_pham', $IDSanPham);
            $stmt->bindParam(':so_luong_nhap', $data['so_luong_nhap']);
            $stmt->bindParam(':so_luong_ton_kho', $data['so_luong_ton_kho']);
            $stmt->bindParam(':so_luong_ban_ra', $data['so_luong_ban_ra']);
            $stmt->bindParam(':gia_nhap', $data['gia_nhap']);
            $stmt->bindParam(':ngay_nhap', $data['ngay_nhap']);
            $stmt->bindParam(':lo_hang', $data['lo_hang']);
            $stmt->execute();

            // Thêm từng ảnh vào bảng kho_anh
            foreach ($data['duong_dan'] as $imagePath) {
                $ten_anh = basename($imagePath); // Lấy tên file từ đường dẫn
                $sql_query_add_image = "INSERT INTO kho_anh (id_san_pham, ten_anh, duong_dan) 
                                        VALUES (:id_san_pham, :ten_anh, :duong_dan)";
                $stmt = $this->conn->prepare($sql_query_add_image);
                $stmt->bindParam(':id_san_pham', $IDSanPham);
                $stmt->bindParam(':ten_anh', $ten_anh);
                $stmt->bindParam(':duong_dan', $imagePath);
                $stmt->execute();
            }

            // Commit transaction
            $this->conn->commit();

            return [
                'ER' => 0,
                'message' => 'Thêm sản phẩm thành công',
                'id' => $IDSanPham
            ];
        } catch (Exception $e) {
            // Rollback nếu có lỗi
            $this->conn->rollBack();
            return [
                'ER' => 1,
                'message' => 'Thêm sản phẩm thất bại: ' . $e->getMessage()
            ];
        }
    }

    // Chưa fix được
    public function updateProduct($data)
    {
        try {
            $IdSP = $data['id'];

            // Cập nhật bảng san_pham
            $sql_update_product = "UPDATE san_pham SET 
            ma_san_pham = :ma_san_pham,
            ten_san_pham = :ten_san_pham,
            tieu_de = :tieu_de,
            mo_ta_san_pham = :mo_ta_san_pham,
            gia_ban = :gia_ban,
            ten_mau = :ten_mau,
            ma_mau = :ma_mau,
            kich_thuoc = :kich_thuoc,
            id_danh_muc_con = :id_danh_muc_con,
            id_giam_gia = :id_giam_gia
            WHERE id = :id";
            $stmt = $this->conn->prepare($sql_update_product);
            $stmt->bindParam(':ma_san_pham', $data['ma_san_pham']);
            $stmt->bindParam(':ten_san_pham', $data['ten_san_pham']);
            $stmt->bindParam(':tieu_de', $data['tieu_de']);
            $stmt->bindParam(':mo_ta_san_pham', $data['mo_ta_san_pham']);
            $stmt->bindParam(':gia_ban', $data['gia_ban']);
            $stmt->bindParam(':ten_mau', $data['ten_mau']);
            $stmt->bindParam(':ma_mau', $data['ma_mau']);
            $stmt->bindParam(':kich_thuoc', $data['kich_thuoc']);
            $stmt->bindParam(':id_danh_muc_con', $data['id_danh_muc_con']);
            $stmt->bindParam(':id_giam_gia', $data['id_giam_gia']);
            $stmt->bindParam(':id', $IdSP);
            $stmt->execute();

            // Xử lý bảng kho_anh
            if (!empty($data['duong_dan'])) {
                // Xóa các bản ghi ảnh cũ
                $sql_delete_images = "DELETE FROM kho_anh WHERE id_san_pham = :id_san_pham";
                $stmt_delete = $this->conn->prepare($sql_delete_images);
                $stmt_delete->bindParam(':id_san_pham', $IdSP);
                $stmt_delete->execute();
                echo "Đã xóa các ảnh cũ cho id_san_pham: $IdSP<br>";

                // Thêm các bản ghi ảnh mới
                foreach ($data['duong_dan'] as $imagePath) {
                    $ten_anh = basename($imagePath);
                    $sql_insert_image = "INSERT INTO kho_anh (id_san_pham, ten_anh, duong_dan) 
                                     VALUES (:id_san_pham, :ten_anh, :duong_dan)";
                    $stmt_insert = $this->conn->prepare($sql_insert_image);
                    $stmt_insert->bindParam(':id_san_pham', $IdSP);
                    $stmt_insert->bindParam(':ten_anh', $ten_anh);
                    $stmt_insert->bindParam(':duong_dan', $imagePath);
                    if ($stmt_insert->execute()) {
                        echo "Đã thêm ảnh: $imagePath<br>";
                    } else {
                        echo "Lỗi thêm ảnh: $imagePath<br>";
                    }
                }
            } else {
                echo "Không có ảnh mới để cập nhật<br>";
            }

            return [
                'ER' => 0,
                'message' => 'Cập nhật sản phẩm thành công'
            ];
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Cập nhật sản phẩm thất bại: ' . $e->getMessage()
            ];
        }
    }


    public function deleteProduct($data)
    {

        try {
            $sql_query = "DELETE FROM san_pham WHERE id = :id";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->bindParam(':id', $data['id']);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                return [
                    'ER' => 0,
                    'message' => 'Xóa sản phẩm thành công'
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Xóa sản phẩm thất bại',
                    'data' => $data
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Xóa sản phẩm thất bại: ' . $e->getMessage()
            ];
        }
    }

    public function getDiscountCode()
    {
        try {
            $sql_query = "SELECT * FROM giam_gia";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            $discountCodes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (isset($discountCodes) && !empty($discountCodes)) {
                return [
                    'ER' => 0,
                    'message' => 'Lấy mã giảm giá thành công',
                    'discountCodes' => $discountCodes
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Không có mã giảm giá'
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Lấy mã giảm giá thất bại: ' . $e->getMessage()
            ];
        }
    }

    public function getSubCategories()
    {
        try {
            $sql_query = "SELECT * FROM danh_muc_con";
            $stmt = $this->conn->prepare($sql_query);
            $stmt->execute();
            $subCategories = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (isset($subCategories) && !empty($subCategories)) {
                return [
                    'ER' => 0,
                    'message' => 'Lấy danh mục con thành công',
                    'subCategories' => $subCategories
                ];
            } else {
                return [
                    'ER' => 1,
                    'message' => 'Không có danh mục con'
                ];
            }
        } catch (Exception $e) {
            return [
                'ER' => 1,
                'message' => 'Lấy danh mục con thất bại: ' . $e->getMessage()
            ];
        }
    }
}
