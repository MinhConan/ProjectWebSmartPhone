<?php
include_once($_SERVER['DOCUMENT_ROOT']."/websmartphone/config/DB.php");
class userModel extends DB{
    public $ID;
    public $Name;
    public $Email;
    public $Role;
    public $Password;
    public $Phone;
    public $Address;
    
    public function __construct($data = array()){
        foreach ($data as $key => $value){
            $this->$key = $value;
        }
        $this->connect();
    }
    public function getuser(){
        
        $user = array(
            "ID"=>$this->ID,
            "Name" => $this->Name,
            "Email" => $this->Email,
            "Password" =>$this->Password,
            "Phone" =>$this->Phone,
            "Role" => $this->Role,
            "Address" => $this->Address
        );
        return $user;
    }
    public function getAllUser($data){
        $users=[];
        $colum="*";//ID,Name,Email,Role,Phone,Address";
        $where ="";
        $user=new userModel($data);
        $data=$user->getuser();
        
        foreach ($data as $key => $value ){
            if(!strcmp($value,""))  
                unset($data[$key]);
        }
        
        
        if(!empty($data)){
            $where = "WHERE ";
            foreach ($data as $key => $value){
                if($key=="ID")
                    $where=$where."$key = \"$value\"";
                else 
                    $where=$where."$key LIKE \"%".$value."%\"";
                if(strcmp(next($data),"")) {
                    $where=$where." AND ";
                }
            }

        }
        
        $userlist = $this->SeclectData("user",$colum,$where);
        foreach ($userlist as $user){
            $users[] = new userModel($user);
        }
        return $users ;
    
    }

    public function insertUser(){
        $user=$this->getuser();
        unset($user["ID"]);
        
        if(!isset($this->Address)) unset($user["Address"]);
        if(!$this->Role) unset($user["Role"]);
        foreach ($user as $key => $value ){
            if($value=="")  //echo json_encode(["messenger"=>"th??m user th???t b???i"]);
            return ["result"=> 0 ,"messenger"=>"th??m user th???t b???i, thi???u th??ng tin"];
        }
        if(!empty($this->getAllUser(["Phone"=>$this->Phone]))){
            return ["result"=> 0 ,"messenger"=>"th??m user th???t b???i, s??? ??i???n tho???i ???? s??? d???ng"];
        }else if($this->InsertData("user",$user))
            return ["result"=> 1 ,"messenger"=>"Th??m user th??nh c??ng"];
         else 
             return ["result"=> 0 ,"messenger"=>"Th??m user th???t b???i"];;
    }
    
    public function editUser(){
        $user=$this->getuser();
        unset($user["ID"]);
        foreach ($user as $key => $value ){
            if($value=="")  
                unset($user[$key]);
        }
        if($this->Role==0) $user["Role"]=$this->Role;
        
        if(empty($this->getAllUser(["ID"=>$this->ID]))) 
            return ["result"=> 0 ,"messenger"=>"user Kh??ng t???n t???i"];
        else if($this->UpdateData("user",$this->ID,$user))
            return ["result"=> 1 ,"messenger"=>"S???a th??ng tin user th??nh c??ng"];
            else
                return ["result"=> 0 ,"messenger"=>"S???a th??ng tin user th???t b???i"];;
    }
    public function deleteUser(){
        if(!isset($this->ID)) 
            return ["result"=> 0 ,"messenger"=>"Ch??a nh???p id user c???n x??a"];
        else if(empty($this->getAllUser(["ID"=>$this->ID]))) 
            return ["result"=> 0 ,"messenger"=>"user Kh??ng t???n t???i"];
        else if($this->DeleteData("user",$this->ID))
                return ["result"=> 1 ,"messenger"=>"X??a user th??nh c??ng"];
        else
                return ["result"=> 0 ,"messenger"=>"X??a user th???t b???i"];;
    }
}
?>