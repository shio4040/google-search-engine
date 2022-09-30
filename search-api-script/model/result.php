<?php
require_once('../LoadDotEnv.php');
/*
 * APIを実行して検索結果を取得する 
 */
class GetResult{
    public $param;
    public $startNum;
    public $searchResultJson;
    public $items;
    public $flag=true;
    public function __construct($query, $startNum){
        // .env読み込み
        new LoadDotEnv();
        $this->startNum = $startNum;
        $this->param = $this->generateParam($query);
        $this->searchResultJson = $this->getResults();
    }
    //検索に使用するパラメーターを作成
    private function generateParam($query){
        $paramArray = array(
            'q' => $query,
            'key' => $_ENV["API_KEY"],
            'cx' => $_ENV["SEARCH_ENGINE_ID"],
            'alt' => 'json',
            'start' => $this->startNum
        );
        $param = http_build_query($paramArray);
        return $param;
    }
    //APIを実行
    private function getResults(){
        $reqUrl = "https://www.googleapis.com/customsearch/v1?" . $this->param;
        $res = file_get_contents($reqUrl, true);
        $json = json_decode($res, true);
        return $json;
    }
}