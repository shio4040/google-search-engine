//モーダルに検索結果を表示する
function showResult(json){
    document.getElementById('result_area').remove();
    const ul = document.createElement("ul");
    const itemDiv = document.getElementsByClassName("item")[0];
    itemDiv.appendChild(ul);
    ul.setAttribute('id', 'result_area');
    const text = json.queries.request[0].searchTerms;
    const startIndex = json.queries.request[0].startIndex;
    const pageNum = Math.floor(startIndex / 10) + 1;
    //動的にモーダルを作成する
    const generateSearchInformation = function(searchInformation){
        const infoArea = document.getElementById('result_info');
        const resultPtag = infoArea.getElementsByTagName("p")[0];
        resultPtag.textContent = `約${searchInformation.formattedTotalResults}件 (${searchInformation.formattedSearchTime}秒)`;
    }    
    const generateContent = function(items){
        const resultArea = document.getElementById('result_area');
        //タイトル 作成
        const titleDiv = document.createElement("div");
        titleDiv.classList.add('result_title');
        const titleATag = document.createElement("a");
        titleATag.textContent = `${items.title}`;
        titleATag.href = `${items.link}`;
        titleDiv.appendChild(titleATag);
        resultArea.appendChild(titleDiv);

        //ディスクリプション 作成
        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add('result_description');
        const imageDiv = document.createElement("div");
        imageDiv.classList.add('result_image');
        const snippetDiv = document.createElement("div");
        const imageATag = document.createElement("a");
        imageATag.href = `${items.link}`;
        const imageArea = document.createElement("img");
        if(items.pagemap.cse_thumbnail){
            imageArea.setAttribute('src', `${items.pagemap.cse_thumbnail[0].src}`);
        }
        imageATag.appendChild(imageArea);
        imageDiv.appendChild(imageATag);
        const snippetPtag = document.createElement("p");
        snippetPtag.textContent = `${items.snippet}`;
        snippetDiv.appendChild(snippetPtag);
        descriptionDiv.appendChild(imageDiv);
        descriptionDiv.appendChild(snippetDiv);
        resultArea.appendChild(descriptionDiv);
    }
    //何件取得できたか件数と秒を表示
    generateSearchInformation(json.searchInformation);
    //APIで取得した情報を表示
    json.items.forEach(element => {
        generateContent(element);
    });

    //ページネーション
    let pagenationDiv = document.getElementsByClassName("page_current")[0];
    //再作成
    pagenationDiv.remove();
    pagenationDiv = document.createElement("div");
    pagenationDiv.classList.add('page_current');
    const containerDiv = document.getElementsByClassName("container")[0];
    containerDiv.appendChild(pagenationDiv);
    for(let i=0; i<10; i++){
        const nextNum = i*10 + 1;
        const pageNumDiv = document.createElement("div");
        pageNumDiv.classList.add('page_link');
        //現在のページではクリックできないようにする
        if(pageNum === i+1){
            pageNumDiv.textContent = `${i+1}`;
        }else{
            const pageDivTag = document.createElement("div");
            pageDivTag.classList.add('active');
            pageDivTag.setAttribute('onclick', `clickPagenation(${nextNum}, '${text}')`);
            pageNumDiv.appendChild(pageDivTag);
            pageDivTag.textContent = `${i+1}`;
        }
        pagenationDiv.appendChild(pageNumDiv);
    }

    //モーダルを表示
    document.getElementById('modal_page').style.display = 'flex';
}

//ページネーションをクリックした時の挙動
function clickPagenation(startNum, keyword){
    return jQuery.ajax({
        type: 'post',
        url: 'pagenation.php', //送信先PHPファイル
        data: {'number' : startNum, 'keyword' : keyword}, //POSTするデータ
        success: function(content){ //正常に処理が完了した時
            showResult(JSON.parse(content));
        }
    })
}