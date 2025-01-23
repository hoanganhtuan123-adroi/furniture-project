<?php
class ProductModel
{
    private $id;
    private $id_giam_gia;
    private $id_danh_muc_con;
    private $id_kho_hang;
    private $gia_da_giam;
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function getAllProduct()
    {
        try {
            $checkQuery = "SELECT 
                        sp.id as product_id,
                        sp.gia_da_giam,
                        kh.ma_san_pham,
                        kh.ten_san_pham,
                        kh.tieu_de_lon,
                        kh.mo_ta_san_pham,
                        kh.gia_ban,
                        kh.so_luong_co_trong_kho,
                        dm.id as category_id,
                        dm.ten_danh_muc as category_name,
                        dmc.id as sub_category_id,
                        dmc.ten_tieu_de as sub_category_name,
                        gg.ma_giam_gia,
                        gg.phan_tram_giam,
                        ms.ten_mau,
                        kt.so_kich_thuoc,
                        ka.duong_dan 
                    FROM san_pham sp
                    LEFT JOIN kho_hang kh ON sp.id_kho_hang = kh.id
                    LEFT JOIN danh_muc_con dmc ON sp.id_danh_muc_con = dmc.id
                    LEFT JOIN danh_muc dm ON dmc.id_danh_muc = dm.id
                    LEFT JOIN giam_gia gg ON sp.id_giam_gia = gg.id
                    LEFT JOIN mau_sac ms ON ms.id_san_pham = sp.id
                    LEFT JOIN kich_thuoc kt ON kt.id_san_pham = sp.id
                    LEFT JOIN kho_anh ka ON ka.id_san_pham = sp.id;";

            $checkStmt = $this->conn->prepare($checkQuery);
            $checkStmt->execute();
            $products = $checkStmt->fetchAll(PDO::FETCH_ASSOC);
            if (isset($products) && !empty($products)) {
                return [
                    'success' => true,
                    'message' => 'Lấy ra tất cả sản phẩm thành công',
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

    public function getProductDetail($id) {}
}
