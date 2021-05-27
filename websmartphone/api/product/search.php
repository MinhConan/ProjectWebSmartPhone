<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');

    include_once('../../config/db.php');
    include_once('../../model/product.php');

    $dtb = new db();
    $connect = $dtb->connect();

    $product = new product($connect);
    $page = isset($_GET['page']) ? $_GET['page'] : die();
    $size = isset($_GET['size']) ? $_GET['size'] : die();
    $name = isset($_GET['name']) ? $_GET['name'] : '';
    $brandID = isset($_GET['bid']) ? $_GET['bid'] : -1;

    $read = $product->search($page, $size, $name, $brandID);

    $num = $read->rowCount();

    if($num > 0){
        $product_array = [];
        $product_array['data'] = [];

        while($row = $read->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $product_item = array(
                'ID' => $ID,
                'Name' => $Name,
                'Detail' => $Detail,
                'Price' => $Price,
                'Image' => $ImageLink,
                'BrandID' => $BrandID
            );
            array_push($product_array['data'], $product_item);
        }
        echo json_encode($product_array);
    }
    // else echo "khong tim thay ket qua";

?>
