<?php
class AuthModel
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    public function register($username, $email, $password)
    {
        try {
            // Check if user already exists
            $checkQuery = "SELECT id FROM tai_khoan WHERE email = ? OR username = ? LIMIT 1";
            $checkStmt = $this->conn->prepare($checkQuery);
            $checkStmt->execute([$email, $username]);

            if ($checkStmt->fetch()) {
                return [
                    'success' => false,
                    'message' => 'Email or username already exists'
                ];
            }

            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Insert new user
            $query = "INSERT INTO users (username, email, password, created_at) 
                     VALUES (?, ?, ?, NOW())";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$username, $email, $hashedPassword]);

            return [
                'success' => true,
                'message' => 'Registration successful',
                'user_id' => $this->conn->lastInsertId()
            ];
        } catch (PDOException $e) {
            return [
                'success' => false,
                'message' => 'Registration failed: ' . $e->getMessage()
            ];
        }
    }

    public function login($email, $password)
    {
        try {
            // Get user
            $mat_khau = "password";
            $query = "SELECT id,username, email, $mat_khau, trang_thai FROM tai_khoan WHERE email = ? and $mat_khau = ? LIMIT 1";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$email, $password]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$user) {
                return [
                    'success' => false,
                    'message' => 'Invalid email or password'
                ];
            }

            // Generate JWT token
            $token = $this->generateJWT($user['id']);


            return [
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'token' => $token
                ]
            ];
        } catch (PDOException $e) {
            return [
                'success' => false,
                'message' => 'Login failed: ' . $e->getMessage()
            ];
        }
    }

    private function generateJWT($userId)
    {
        $secretKey = '3a6b8861-befa-4d8e-a085-7474ab9c40b9'; // Store this securely in configuration
        $issuedAt = time();
        $expire = $issuedAt + 3600; // Token expires in 1 hour
        $ranNum = random_int(10, 99);
        $payload = [
            'key' => $secretKey,
            'iat' => $issuedAt,
            'exp' => $expire,
            'user_id' => $userId,
            'ran_num' => $ranNum
        ];

        // In production, use a proper JWT library
        return base64_encode(json_encode($payload));
    }
}
