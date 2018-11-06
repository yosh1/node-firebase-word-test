
for(var i = 0;i < process.argv.length; i++){
  console.log("argv[" + i + "] = " + process.argv[i]);
}


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

/*　word以下に対しての非同期コールバック */
ref.on("value", function(snapshot) {
    /* ここに取得したデータを用いた何らかの処理 */
    console.log(snapshot.val()); // 全て
      console.log(snapshot.child("question").child("1").val()); //またはsnapshot.child("").question.val()
      //console.log(snapshot.val().answer);
},
function(errorObject) {
    console.log("The read failed: " + errorObject.code);
} );

ref.update( {
    //"question": 10 //更に子の要素にアクセスするには / で区切って指定
} );

console.log(process.argv[2]); // 第一引数
