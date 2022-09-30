<?php
/*
 * ページネーションをクリックした時にpostしているファイル
*/
require_once('model/result.php');
if(isset($_POST["number"]) && isset($_POST["keyword"])){
    $json = new GetResult($_POST["keyword"], $_POST["number"]);
    echo json_encode($json->searchResultJson);
}
?>