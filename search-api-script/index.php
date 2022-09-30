<head>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="./js/script.js"></script>
<link href="./css/style.css" rel="stylesheet" type="text/css" media="all">
</head>
<html>
<body>
    <div>
        <form method="post">
            <input type="text" name="search-form" class="input_text">
            <input type="submit" value="検索" class="input_submit">
        </form>
    </div>
    <div id="modal_page">
		<!-- modal -->
		<div id="modal">
        <div>
			<a class="close_btn" href="index.php">×</a>
		</div>
		<div class="container">
			<div id="result_info">
				<p></p>
			</div>
			<div class="item">
				<ul id="result_area">
            		<!-- 検索結果表示 -->
				</ul>
			</div>
			<div class="page_current">
				<!-- ページネーション -->
			</div>
		</div>
	</div>
</div>
</body>
</html>
<?php
require_once('model/result.php');
$res = filter_input(INPUT_POST, "search-form");
if(isset($res)){
    $json = new GetResult($res, 1);
    echo "<script> showResult(".json_encode($json->searchResultJson)."); </script>"; 
}
?>