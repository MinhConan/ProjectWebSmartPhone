<?php
    class product extends db{
        private $conn;
        public $ID;
        public $Name;
        public $Detail;
        public $Price;
        public $ImageLink;
        public $BrandID;

        public function __construct($db)
        {
            $this->conn = $db;
        }

        public function read($Id, $size){
            $query = "SELECT * FROM product limit $Id,$size";

            $stmt = $this->conn->prepare($query);
            
            // $stmt->bindParam('?', $this->ID);

            $stmt->execute();
            return $stmt;
        }

        public function sbrand(){
            $query = "SELECT product.*,brand.Name as BrandName FROM product,brand where product.BrandID=brand.ID and brand.Name like :Name";

            $stmt = $this->conn->prepare($query);
            $this->Name = htmlspecialchars(strip_tags($this->Name));
            $data = '%'.$this->Name.'%';
            $stmt->bindParam(':Name', $data);

            $stmt->execute();
            return $stmt;
        }

        public function search($page, $size, $name, $brandID){
            $page = ($page-1)*$size;
            if($brandID == -1) {
                $query = "SELECT product.*, brand.Name as BrandName FROM product,brand where product.BrandID=brand.ID and product.Name like :Name limit $page,$size";
            }
            else{
                $query = "SELECT product.*, brand.Name as BrandName FROM product,brand where product.BrandID=brand.ID and product.Name like :Name and brand.ID = $brandID limit $page,$size";
            }

            $stmt = $this->conn->prepare($query);
            $data = '%'.$name.'%';
            $stmt->bindParam(':Name', $data);

            $stmt->execute();
            return $stmt;
        }

        public function show(){
            $query = "SELECT * FROM product WHERE ID=? LIMIT 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $this->ID);
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->Name = $row['Name'];
            $this->Detail = $row['Detail'];
            $this->Price = $row['Price'];
            $this->ImageLink = $row['ImageLink'];
            $this->BrandID = $row['BrandID'];

            return $stmt;
        }

        public function add(){
            $query = "INSERT INTO product SET Name=:Name , Detail=:Detail ,Price=:Price ,ImageLink=:ImageLink ,BrandID=:BrandID";

            $stmt = $this->conn->prepare($query);

            $this->Name = htmlspecialchars(strip_tags($this->Name));
            $this->Detail = htmlspecialchars(strip_tags($this->Detail));
            $this->Price = htmlspecialchars(strip_tags($this->Price));
            $this->ImageLink = htmlspecialchars(strip_tags($this->ImageLink));
            $this->BrandID = htmlspecialchars(strip_tags($this->BrandID));

            $stmt->bindParam(':Name', $this->Name);
            $stmt->bindParam(':Detail', $this->Detail);
            $stmt->bindParam(':Price', $this->Price);
            $stmt->bindParam(':ImageLink', $this->ImageLink);
            $stmt->bindParam(':BrandID', $this->BrandID);

            if($stmt->execute()){
                return true;
            }
            printf("Error %s.\n" .$stmt->error);
            return false;
        }

        public function update(){
            $query = "UPDATE product SET Name=:Name , Detail=:Detail ,Price=:Price ,ImageLink=:ImageLink ,BrandID=:BrandID WHERE ID=:ID";

            $stmt = $this->conn->prepare($query);

            $this->ID = htmlspecialchars(strip_tags($this->ID));
            $this->Name = htmlspecialchars(strip_tags($this->Name));
            $this->Detail = htmlspecialchars(strip_tags($this->Detail));
            $this->Price = htmlspecialchars(strip_tags($this->Price));
            $this->ImageLink = htmlspecialchars(strip_tags($this->ImageLink));
            $this->BrandID = htmlspecialchars(strip_tags($this->BrandID));
            

            $stmt->bindParam(':Name', $this->Name);
            $stmt->bindParam(':Detail', $this->Detail);
            $stmt->bindParam(':Price', $this->Price);
            $stmt->bindParam(':ImageLink', $this->ImageLink);
            $stmt->bindParam(':BrandID', $this->BrandID);
            $stmt->bindParam(':ID', $this->ID);

            if($stmt->execute()){
                return true;
            }
            printf("Error %s.\n" .$stmt->error);
            return false;
        }

        public function delete(){
            $query = "DELETE FROM  product WHERE ID=:ID";

            $stmt = $this->conn->prepare($query);

            $this->ID = htmlspecialchars(strip_tags($this->ID));
            
            $stmt->bindParam(':ID', $this->ID);

            if($stmt->execute()){
                return true;
            }
            printf("Error %s.\n" .$stmt->error);
            return false;
        }

    }
?>
