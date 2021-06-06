<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname = "test";
// Create connection
$pdo = new PDO('mysql:host=localhost;dbname='.$dbname, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$action=$_GET['action'];

switch ($action) {
        case 'show':
        $sql = "SELECT id,task FROM tbl_todos";
        $result = $pdo->query($sql);

        while($row =  $result->fetchAll(PDO::FETCH_ASSOC)) {
                $returnResult= $row;
            }
        
        echo json_encode($returnResult);
        
        break;

        case 'create':
            try {
            $data = json_decode(file_get_contents("php://input"));
            print_r($data);
            $task=$data->task;
            $sql = $pdo->prepare("INSERT INTO tbl_todos (task) VALUES (:task)");
            $sql->execute(array('task' => $task));
        } catch (\PDOException $e) {
            die($e->getMessage());
        }
        break;
        case 'update':
            $data = json_decode(file_get_contents("php://input"));
            print_r($data);
            $task=$data->task;
            $id=$data->id;
            $sql = $pdo->prepare("UPDATE tbl_todos set task =:task WHERE id=:id");
            $sql->execute(array('task' => $task,'id'=>$id));
        
        break;
        case 'delete':
            try {
            $data = json_decode(file_get_contents("php://input"));
            print_r($data);
            $id=$data->id;
            $sql = $pdo->prepare("DELETE FROM tbl_todos where id=:id");
            $sql->execute(array('id' => $id));
        } catch (\PDOException $e) {
            die($e->getMessage());
        }
        break;
    
    default:
        # code...
        break;
}
?>