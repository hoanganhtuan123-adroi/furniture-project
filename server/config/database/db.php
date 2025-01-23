<?php
class Database
{
    private $database;
    private $servername;
    private $username;
    private $password;
    private $port;
    private $conn;
    public function __construct()
    {
        $this->database = 'furniture_database';
        $this->servername = 'localhost';
        $this->username = 'root';
        $this->password = '';
        // $this->port = 8080;
    }
    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=$this->servername;dbname=$this->database", $this->username, $this->password);
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "Connected successfully";
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
        return $this->conn;
    }
}
