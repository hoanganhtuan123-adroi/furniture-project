<?php
class Router
{
    private $routes = [];
    private $corsConfig = [
        'origins' => ['*'],
        'methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
        'credentials' => true,
        'maxAge' => 86400 // 24 hours
    ];

    public function setCorsConfig($config)
    {
        $this->corsConfig = array_merge($this->corsConfig, $config);
    }

    public function addRoute($method, $path, $handler)
    {
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler
        ];
    }

    public function handleRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Handle CORS preflight request
        if ($method === 'OPTIONS') {
            $this->handleCorsHeaders();
            return;
        }

        // Add CORS headers to all responses
        $this->handleCorsHeaders();

        foreach ($this->routes as $route) {
            if ($this->matchRoute($route['path'], $uri) && $route['method'] === $method) {
                $params = $this->extractParams($route['path'], $uri);
                $this->executeHandler($route['handler'], $params);
                return;
            }
        }

        $this->sendResponse(['error' => 'Route not found'], 404);
    }

    private function handleCorsHeaders()
    {
        // Handle Origin
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

        if (in_array('*', $this->corsConfig['origins']) || in_array($origin, $this->corsConfig['origins'])) {
            if ($origin) {
                header("Access-Control-Allow-Origin: {$origin}");
            } else {
                header("Access-Control-Allow-Origin: *");
            }
        }

        // Handle Credentials
        if ($this->corsConfig['credentials']) {
            header('Access-Control-Allow-Credentials: true');
        }

        // Handle Methods
        header('Access-Control-Allow-Methods: ' . implode(', ', $this->corsConfig['methods']));

        // Handle Headers
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header('Access-Control-Allow-Headers: ' . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
        } else {
            header('Access-Control-Allow-Headers: ' . implode(', ', $this->corsConfig['headers']));
        }

        // Handle Max Age
        header('Access-Control-Max-Age: ' . $this->corsConfig['maxAge']);

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit();
        }
    }

    private function matchRoute($routePath, $uri)
    {
        $routeRegex = preg_replace('/\{[^}]+\}/', '([^/]+)', $routePath);
        return preg_match('#^' . $routeRegex . '$#', $uri);
    }

    private function extractParams($routePath, $uri)
    {
        $params = [];
        $routeParts = explode('/', trim($routePath, '/'));
        $uriParts = explode('/', trim($uri, '/'));

        foreach ($routeParts as $index => $part) {
            if (preg_match('/\{([^}]+)\}/', $part, $matches)) {
                $params[$matches[1]] = $uriParts[$index];
            }
        }

        return $params;
    }

    private function executeHandler($handler, $params)
    {
        list($controller, $method) = explode('@', $handler);
        $controllerInstance = new $controller();
        call_user_func_array([$controllerInstance, $method], [$params]);
    }

    public function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($statusCode);
        echo json_encode($data);
    }
}
