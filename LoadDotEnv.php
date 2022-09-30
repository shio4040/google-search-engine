<?php
require 'vendor/autoload.php';
//composerを使用して.envを読み込む
class LoadDotEnv{
    public $dotenv;
    public function __construct(){
        $this->dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $this->dotenv->load();
    }
}