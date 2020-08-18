<?php
include('database.php');
class AppFunctions extends Database {

    function getUniqueUserByEmailType($email, $type) {
        $result = $this->query("SELECT * FROM users where email = '".$email."' and type = '".$type."'");
        return $this->fetch($result);
    }

    function updateUserLoginToken($id) {
        $loginToken = md5(" " . time() . " login token" . time());
        $userId = $this->escape_string($this->strip_all($id));

        $lastUpdated = date("Y-m-d H:i:s");
        $sqlQuery = "UPDATE users set userToken = '" . $loginToken . "', last_login_time = '" . $lastUpdated . "' WHERE id = '" . $userId . "' ";
        $this->query($sqlQuery);
        return $loginToken;
    }

    function getUniqueUserByToken($token) {
        $token = $this->escape_string($this->strip_all($token));

        $sqlQuery = $this->query("SELECT * FROM users where userToken = '".$token."'");
        return $this->fetch($sqlQuery);
    }

    function insertData($data, $table) {
        $columns = implode(", ",array_keys($data));
        $values  = "'".implode("', '", array_values($data))."'";
        $sql = $this->query("INSERT INTO ".$table." ($columns) VALUES ($values)");
        return $this->last_insert_id();
    }

    function updateData($data, $table, $column, $id) {
        $valueSet = array();
        foreach ($data as $key => $val) {
            $valueSet[] = $key." = '".$val."'";
        }
        $values = implode(', ', $valueSet);
        $sql = $this->query("UPDATE ".$table." set $values where $column = '".$id."'");
        return $sql;
    }

    function deleteData($table, $column = '', $val = '') {
        if(!empty($column) && !empty($val)) {
            $whereCond = " where ".$column." = '".$val."'";
        } else {
            $whereCond = "";
        }
        $this->query("DELETE FROM ".$table." $whereCond ");
        return $val;
    }

    function getUniqueTableData($table, $column, $val) {
        $query = $this->query("SELECT * FROM ".$table." WHERE ".$column." = ".$val);
        return $this->fetch($query);
    }

} 
