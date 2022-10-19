　

■LoadDotEnv.php  
.envを呼び出すためのクラスファイルです
同じディレクトリに.envファイルを置いてください


## search-api-script/
■index.php  
メインで表示するファイルです  
検索バーが表示されます  
検索欄に検索したい文字を入れて検索ボタンを押し検索をかけます  

■pagenation.php  
ページネーションをクリックした際に呼び出されるファイルです  
検索したキーワードを保持してそのキーワードの任意のページを呼び出します  

■model>result.php  
APIを実行し結果を取得するクラスファイルです  
.envよりAPI処理情報を取得します(git管理外)  

  ### /js/
  ■script.js
  #### function  
  * showResult(array)  
    検索結果をモーダルに動的出力するための関数です  
    HTML要素を一度削除して再作成を行い、モーダルの要素を表示させています  
    
  * clickPagenation(int, string)  
    ページネーションをクリックした際の値をPHPにajaxで非同期通信を行い受け渡すための関数です  
    成功しPHPから値が返ってきたらshowResultを呼び出し再表示します  
    
  ### /css/
  ■style.css
