<?php
require __DIR__ . '/config/database/db.php';
require __DIR__ . '/routes/routes.php';
// Model
require __DIR__ . '/app/model/AuthModel/AuthModel.php';
require __DIR__ . '/app/model/ProductModel/ProductModel.php';
require __DIR__ . '/app/model/OrderModel/OrderModel.php';
require __DIR__ . '/app/model/ReviewModel/ReviewModel.php';
require __DIR__ . '/app/model/StockModel/StockModel.php';
require __DIR__ . '/app/model/PaymentModel/PaymentModel.php';
require __DIR__ . '/app/model/UserModel/UserModel.php';
// Controller
require __DIR__ . '/app/controller/AuthController/AuthController.php';
require __DIR__ . '/app/controller/ProductController/ProductController.php';
require __DIR__ . '/app/controller/OrderController/OrderController.php';
require __DIR__ . '/app/controller/ReviewController/ReviewController.php';
require __DIR__ . '/app/controller/StockController/StockController.php';
require __DIR__ . '/app/controller/PaymentController/PaymentController.php';
require __DIR__ . '/app/controller/UserController/UserController.php';


$db = new Database();
$db->connect();

$router = new Router();

$router->addRoute('GET', '/api/accounts', 'AuthController@index');


// Xu ly dang ky va dang nhap
$router->addRoute('POST', '/api/auth/register', 'AuthController@register');
$router->addRoute('POST', '/api/auth/login', 'AuthController@loginController');

// Dashboard sản phẩm

// Lay tat ca san pham hien thi dashboard
$router->addRoute("GET", '/api/dashboard/products/all', 'ProductController@getAllProductsController');
$router->addRoute("GET", '/api/products/{id}/details', 'ProductController@getDetailProductController');
$router->addRoute("POST", '/api/dashboard/products', 'ProductController@addNewProductController');
$router->addRoute("PUT", '/api/dashboard/products/update', 'ProductController@updateProductController');
$router->addRoute("DELETE", '/api/dashboard/products/delete', 'ProductController@deleteProductController');
$router->addRoute("GET", '/api/products/spt={name_search}/search', 'ProductController@getProductsByNameController');
$router->addRoute("GET", '/api/dashboard/products/discounts', 'ProductController@getDiscountController');
$router->addRoute("GET", "/api/dashboard/products/subcategories", "ProductController@getSubCategoriesController");

// Client sản phẩm
$router->addRoute("GET", '/api/shop/{id}/detail', 'ProductController@getAllProductsClientController');

// Them sp vao gio hang
$router->addRoute("POST", "/api/cart/add", "UserController@addToCartController");
$router->addRoute("GET", "/api/cart/user/{id}/detail", "UserController@getCartController");
$router->addRoute("DELETE", "/api/cart/{id}/remove", "UserController@deleteItemFromCartController");
$router->addRoute("GET", '/api/user/{id}/myorder', 'UserController@getUserOrdersWithDetailsController');
//Xử lý đơn hàng
$router->addRoute("GET", '/api/dashboard/orders/all', 'OrderController@getAllOrderController');
$router->addRoute("GET", '/api/dashboard/orders/{id}/details', 'OrderController@getDetailOrderController');
$router->addRoute("PUT", '/api/dashboard/orders/update', 'OrderController@updateOrderController');
$router->addRoute("DELETE", '/api/dashboard/orders/{id}/delete', 'OrderController@deleteOrderController');
$router->addRoute("POST", "/api/dashboard/orders/create", "OrderController@addOrderController");
$router->addRoute("GET", '/api/dashboard/orders/users/all', 'OrderController@getAllUsersController');

// Xử lý đánh giá sản phẩm
$router->addRoute("GET", "/api/dashboard/reviews", "ReviewController@getAllReviewsController");
$router->addRoute("DELETE", "/api/dashboard/reviews/{id}/delete", "ReviewController@deleteReviewController");
// Xử lý kho hàng
$router->addRoute("GET", "/api/dashboard/stocks/all", "StockController@getAllStocksController");
$router->addRoute("GET", "/api/dashboard/stocks/{id}/details", "StockController@getDetailStockController");
$router->addRoute("DELETE", "/api/dashboard/stocks/{id}/delete", "StockController@deleteStockController");
$router->addRoute("PUT", "/api/dashboard/stocks/{id}/update", "StockController@updateStockController");
$router->addRoute("GET", "/api/dashboard/stocks/spt={name_search}/search", "StockController@searchStockController");

// Nhập hàng
$router->addRoute("POST", "/api/dashboard/stocks/importstock", "StockController@importStockController");
$router->addRoute("POST", "/api/dashboard/stocks/exportstock", "StockController@exportStockController");
$router->addRoute("GET", "/api/dashboard/stocks/{id}/products", "StockController@getProductByCodeController");
$router->addRoute("GET", "/api/dashboard/stocks/takingstock", "StockController@takingStockController");
// Xử lý thanh toán
$router->addRoute("GET", "/api/dashboard/payments/all", "PaymentController@getAllPaymentsController");
$router->addRoute("PUT", "/api/dashboard/payments/update", "PaymentController@updatePaymentController");
$router->addRoute("DELETE", "/api/dashboard/payments/{id}/delete", "PaymentController@deletePaymentController");
// Xử lý thanh toán đơn hàng
$router->addRoute("POST", "/api/payments/payorder", "UserController@payOrderController");
// Khach hang
$router->addRoute("GET", "/api/dashboard/customers/all", "UserController@getAllCustomersController");
$router->addRoute("PUT", "/api/dashboard/customers/update", "UserController@updateCustomerController");
$router->addRoute("POST", "/api/dashboard/customers/create", "UserController@createCustomerController");
$router->addRoute("DELETE", "/api/dashboard/customers/{id}/delete", "UserController@deleteCustomerController");


$router->addRoute("POST", "/api/momo-ipn", "UserController@momoIpnController");
$router->addRoute("POST", "/api/payments/payorderatm", "UserController@payOrderControllerATM");
$router->handleRequest();
