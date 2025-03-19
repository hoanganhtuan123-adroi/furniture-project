<?php
class Router
{
    private $routes = [];
    private $corsConfig = [
        'origins' => ['*'], // Default to allow all origins
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
            'method' => strtoupper($method),
            'path' => $path,
            'handler' => $handler
        ];
    }

    public function handleRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Always set CORS headers
        $this->handleCorsHeaders();

        // Handle CORS preflight request
        if ($method === 'OPTIONS') {
            $this->sendResponse(null, 204);
            return;
        }

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
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

        // Set allowed origin
        if (in_array('*', $this->corsConfig['origins'])) {
            header('Access-Control-Allow-Origin: *');
        } elseif ($origin && in_array($origin, $this->corsConfig['origins'])) {
            header("Access-Control-Allow-Origin: {$origin}");
        } else {
            // If origin is not allowed, reject the request instead of setting null
            header('HTTP/1.1 403 Forbidden');
            echo json_encode(['error' => 'CORS origin not allowed']);
            exit;
        }

        // Set credentials
        if ($this->corsConfig['credentials']) {
            header('Access-Control-Allow-Credentials: true');
        }

        // Set allowed methods
        header('Access-Control-Allow-Methods: ' . implode(', ', $this->corsConfig['methods']));

        // Set allowed headers (prioritize requested headers for preflight)
        $requestedHeaders = isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])
            ? $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']
            : implode(', ', $this->corsConfig['headers']);
        header("Access-Control-Allow-Headers: {$requestedHeaders}");

        // Set max age
        header("Access-Control-Max-Age: {$this->corsConfig['maxAge']}");
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
                $params[$matches[1]] = $uriParts[$index] ?? null;
            }
        }

        return $params;
    }

    private function executeHandler($handler, $params)
    {
        try {
            list($controller, $method) = explode('@', $handler);
            if (!class_exists($controller) || !method_exists($controller, $method)) {
                throw new Exception('Invalid controller or method');
            }
            $controllerInstance = new $controller();
            call_user_func_array([$controllerInstance, $method], [$params]);
        } catch (Exception $e) {
            $this->sendResponse(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }

    public function sendResponse($data, $statusCode = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($statusCode);
        if ($data !== null) {
            echo json_encode($data);
        }
    }
}
