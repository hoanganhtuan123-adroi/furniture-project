<?php
require __DIR__ . '/config/database/db.php';
require __DIR__ . '/routes/routes.php';
// Model
require __DIR__ . '/app/model/AuthModel/AuthModel.php';
require __DIR__ . '/app/model/ProductModel/ProductModel.php';
// Controller
require __DIR__ . '/app/controller/AuthController/AuthController.php';
require __DIR__ . '/app/controller/ProductController/ProductController.php';


$db = new Database();
$db->connect();

$router = new Router();

$router->setCorsConfig([
    'origins' => ['http://localhost:8080'],
    'methods' => ['GET', 'POST', 'PUT', 'DELETE'],
    'headers' => ['Content-Type', 'Authorization'],
    'credentials' => true,
    'maxAge' => 3600
]);

$router->addRoute('GET', '/api/accounts', 'AuthController@index');


// Xu ly dang ky va dang nhap
$router->addRoute('POST', '/api/auth/register', 'AuthController@register');
$router->addRoute('POST', '/api/auth/login', 'AuthController@login');

// Lay tat ca san pham
$router->addRoute("GET", '/api/products', 'ProductController@getAllProducts');

$router->handleRequest();
