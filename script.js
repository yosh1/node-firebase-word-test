//
// for(var i = 0;i < process.argv.length; i++){
//   console.log("argv[" + i + "] = " + process.argv[i]);
// }

// ここからejs
// nodeのコアモジュールのhttpを使う
var http = require('http');
var ejs  = require('ejs');
var qs   = require('querystring');
var fs     = require('fs');
var config = require('./config');
var server = http.createServer();

var posts = [];

// フォームを表示する
function renderForm(posts, res) {
    var data = ejs.render(template, {
        posts: posts
    });

    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.write(data);
    res.end();
}

// テンプレートを使うときはreadFileSyncを使う
var template = fs.readFileSync(__dirname + '/hello.ejs', 'utf-8');

server.on('request', function(req, res) {
    if (req.method === 'POST') {
        req.data = "";
        // フォームからのデータを受信
        req.on("readable", function() {
            // read()はnullが来る場合もあるので空文字にする
            req.data += req.read() || '';
            console.log(req.data);
        });
        req.on("end", function() {
            // パースすると、formから入力された値をquery.nameのように使えるようになる
            var query = qs.parse(req.data);
            console.log(query);
            posts.push(query.question + "｜"+query.answer);
            renderForm(posts, res);
        });
    } else {
        renderForm(posts, res);
    }
});

// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(config.port);


// ここからFirebase
var admin = require('firebase-admin');
admin.database.enableLogging(true);

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp( {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://word-test-yoshi1125hisa.firebaseio.com" //データベースのURL
} );
// データの取得
// 認証部分に続けて以下

var db = admin.database();
var ref = db.ref("sheet"); //word要素への参照


var q1 = "a";

/*　word以下に対しての非同期コールバック */
ref.on("value", function(snapshot) {
    /* ここに取得したデータを用いた何らかの処理 */
    // console.log(snapshot.val()); // 全て
      console.log(snapshot.child("question").child("1").val()); //またはsnapshot.child("").question.val()
      //console.log(snapshot.val().answer);
      q1 = snapshot.child("question").child("1").val();
      console.log(q1)


      if (process.argv[2] === q1){
        console.log("正解です！");
      }else {
        console.log("不正解です！");
      }
},
function(errorObject) {
    console.log("The read failed: " + errorObject.code);
} );

ref.update( { // 更新
    //"question": 10 //更に子の要素にアクセスするには / で区切って指定
} );

// console.log(process.argv[2]); // 第一引数
