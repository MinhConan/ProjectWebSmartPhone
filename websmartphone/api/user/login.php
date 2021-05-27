<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include_once($_SERVER['DOCUMENT_ROOT']."/websmartphone/model/userModel.php");
$errorMess=["result"=>0,"mess"=>"Đăng nhập thất bại"];
    $input = json_decode(file_get_contents('php://input'),true);
    if(isset($input["Phone"]) || isset($input["Password"])){

        $where = " WHERE ";
        $where=$where."Phone = '".$input["Phone"]."'";
        $where=$where." AND Password = '".$input["Password"]."'";
        
        $db=new DB();
        $db->connect();
        $result = $db->SeclectData("`user`","id",$where);
        
        if(!empty($result)){
            $Authorization= base64_encode($input["Phone"].":".$input["Password"]);
            $mess=["result"=> 1 ,"messenger"=>"đăng nhập thành công"];
            $mess["Authorization"]=$Authorization;
            echo json_encode($mess,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE );
        }else{
            echo json_encode($errorMess,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE );
        }
        
    } else{
        echo json_encode($errorMess,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE );
    }


?>