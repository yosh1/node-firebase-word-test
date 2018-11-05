var admin = require('firebase-admin');
var serviceAccount = require('word-test-yoshi1125hisa-firebase-adminsdk-9ya4y-ea159cf153.json');

admin.initializeApp( {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://word-test-yoshi1125hisa.firebaseio.com" //データベースのURL
} );

// データの取得
// 認証部分に続けて以下

var db = admin.database();
var ref = db.ref("word"); //word要素への参照

/*　word以下に対しての非同期コールバック */
ref.on("value", function(snapshot) {
    /* ここに取得したデータを用いた何らかの処理 */
    console.log(snapshot.val());
}, 
function(errorObject) {
    console.log("The read failed: " + errorObject.code);
} );
