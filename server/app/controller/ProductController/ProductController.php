<?php
class ProductController
{
    private $ProductModel;
    public function __construct()
    {
        $this->ProductModel = new ProductModel();
    }

    private function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET');
        http_response_code($statusCode);
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public function getAllProductsController()
    {
        $result = $this->ProductModel->getAllProducts();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getAllProductsClientController($params)
    {
        $id = $params['id'];
        $result = $this->ProductModel->getAllProductsClient($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getProductsByNameController($params)
    {
        $name_search = parse_str($params['name_search'], $output);
        $name_search = $output['spt'];
        $result = $this->ProductModel->getProductsByName($name_search);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getDetailProductController($params)
    {
        $id = $params['id'];
        $result = $this->ProductModel->getProductDetailByID($id);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function addNewProductController()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Lấy dữ liệu từ $_POST
            $data = [
                'ma_san_pham' => $_POST['ma_san_pham'] ?? '',
                'ten_san_pham' => $_POST['ten_san_pham'] ?? '',
                'tieu_de' => $_POST['tieu_de'] ?? '',
                'mo_ta_san_pham' => $_POST['mo_ta_san_pham'] ?? '',
                'gia_ban' => $_POST['gia_ban'] ?? 0,
                'ten_mau' => $_POST['ten_mau'] ?? '',
                'ma_mau' => $_POST['ma_mau'] ?? '',
                'kich_thuoc' => $_POST['kich_thuoc'] ?? '',
                'id_danh_muc_con' => $_POST['id_danh_muc_con'] ?? 0,
                'id_giam_gia' => $_POST['id_giam_gia'] ?? null,
                'so_luong_nhap' => $_POST['so_luong_nhap'] ?? 0,
                'so_luong_ton_kho' => $_POST['so_luong_ton_kho'] ?? 0,
                'so_luong_ban_ra' => $_POST['so_luong_ban_ra'] ?? 0,
                'gia_nhap' => $_POST['gia_nhap'] ?? 0,
                'ngay_nhap' => $_POST['ngay_nhap'] ?? '',
                'lo_hang' => $_POST['lo_hang'] ?? ''
            ];

            // Xử lý nhiều file ảnh từ $_FILES
            $data['duong_dan'] = []; // Khởi tạo mảng để lưu đường dẫn các file
            if (isset($_FILES['duong_dan']) && is_array($_FILES['duong_dan']['name']) && !empty($_FILES['duong_dan']['name'][0])) {
                $files = $_FILES['duong_dan'];
                $fileCount = count($files['name']); // Đảm bảo là mảng trước khi count

                // Đường dẫn lưu file
                $uploadDir = __DIR__ . '/../../uploads/';
                if (!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                // Duyệt qua từng file
                for ($i = 0; $i < $fileCount; $i++) {
                    if ($files['error'][$i] === UPLOAD_ERR_OK) {
                        $fileName = $files['name'][$i];
                        $fileTmpName = $files['tmp_name'][$i];

                        // Tạo tên file mới
                        $newFileName = uniqid() . '_' . basename($fileName);
                        $destination = $uploadDir . $newFileName;

                        // Di chuyển file từ thư mục tạm sang đích
                        if (move_uploaded_file($fileTmpName, $destination)) {
                            $data['duong_dan'][] = '/uploads/' . $newFileName;
                        } else {
                            $this->sendResponse(['error' => "Không thể lưu file ảnh: $fileName"], 500);
                            return;
                        }
                    } else {
                        $this->sendResponse(['error' => "Lỗi upload file: " . $files['name'][$i]], 400);
                        return;
                    }
                }
            } elseif (!isset($_FILES['duong_dan']) || empty($_FILES['duong_dan']['name'][0])) {
                $this->sendResponse(['error' => 'Không có file ảnh hoặc lỗi upload'], 400);
                return;
            }

            // Gọi model để thêm sản phẩm
            $result = $this->ProductModel->addNewProduct($data);

            if (isset($result) && !empty($result) && $result['ER'] === 0) {
                $this->sendResponse($result, 200);
            } else {
                $this->sendResponse($result, 400);
            }
        } else {
            $this->sendResponse(['error' => 'Phương thức không được hỗ trợ'], 405);
        }
    }


    public function updateProductController()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            // Lấy dữ liệu từ $_POST
            $data = [
                'id' => $_POST['id'] ?? '',
                'ma_san_pham' => $_POST['ma_san_pham'] ?? '',
                'ten_san_pham' => $_POST['ten_san_pham'] ?? '',
                'tieu_de' => $_POST['tieu_de'] ?? '',
                'mo_ta_san_pham' => $_POST['mo_ta_san_pham'] ?? '',
                'gia_ban' => $_POST['gia_ban'] ?? 0,
                'ten_mau' => $_POST['ten_mau'] ?? '',
                'ma_mau' => $_POST['ma_mau'] ?? '',
                'kich_thuoc' => $_POST['kich_thuoc'] ?? '',
                'id_danh_muc_con' => $_POST['id_danh_muc_con'] ?? 0,
                'id_giam_gia' => $_POST['id_giam_gia'] ?? null,
                'ten_anh' => $_POST['ten_anh'] ?? ''
            ];

            // Xử lý nhiều file ảnh từ $_FILES
            $data['duong_dan'] = [];
            if (isset($_FILES['duong_dan']) && is_array($_FILES['duong_dan']['name']) && !empty($_FILES['duong_dan']['name'][0])) {
                $files = $_FILES['duong_dan'];
                $fileCount = count($files['name']);

                $uploadDir = __DIR__ . '/../../uploads/';
                if (!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                for ($i = 0; $i < $fileCount; $i++) {
                    if ($files['error'][$i] === UPLOAD_ERR_OK) {
                        $fileName = $files['name'][$i];
                        $fileTmpName = $files['tmp_name'][$i];
                        $newFileName = uniqid() . '_' . basename($fileName);
                        $destination = $uploadDir . $newFileName;

                        if (move_uploaded_file($fileTmpName, $destination)) {
                            $data['duong_dan'][] = '/uploads/' . $newFileName;
                        } else {
                            $this->sendResponse(['error' => "Không thể lưu file ảnh: $fileName"], 500);
                            return;
                        }
                    } else {
                        $this->sendResponse(['error' => "Lỗi upload file: " . $files['name'][$i]], 400);
                        return;
                    }
                }
            }

            // Gọi model để cập nhật sản phẩm
            $result = $this->ProductModel->updateProduct($data);

            if (isset($result) && !empty($result) && $result['ER'] === 0) {
                $this->sendResponse($result, 200);
            } else {
                $this->sendResponse($result, 400);
            }
        } else {
            $this->sendResponse(['error' => 'Phương thức không được hỗ trợ'], 405);
        }
    }

    public function deleteProductController()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->ProductModel->deleteProduct($data);
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }


    public function getDiscountController()
    {
        $result = $this->ProductModel->getDiscountCode();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }

    public function getSubCategoriesController()
    {
        $result = $this->ProductModel->getSubCategories();
        if (isset($result) && !empty($result)) {
            $this->sendResponse($result, 200);
        } else {
            $this->sendResponse($result, 404);
        }
    }
}
