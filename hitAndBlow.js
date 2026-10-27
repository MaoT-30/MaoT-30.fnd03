'use strict'
// 1行目に記載している 'use strict' は削除しないでください

//===================
// htmlから取得
//===================
const home1 = document.getElementById("home1");
const difficulty2 = document.getElementById("difficulty2");
const battle3 = document.getElementById("battle3");
const cpu1 = document.getElementById("cpu1");
const twin1 = document.getElementById("twin1");
const return2 = document.getElementById("return2");
const difbutton2Arr = document.querySelectorAll(".difbutton2");
const boxchild3 = document.querySelectorAll(".boxchild3");
const mode3 = document.getElementById("mode3");
const limittime3 = document.getElementById("limittime3");
const stop3 = document.getElementById("stop3");
const inputValue3 = document.getElementById("inputValue3");
const num3 = document.querySelectorAll(".num3");
const deleteButton3 = document.getElementById("deleteButton3");
const enter3 = document.getElementById("enter3");
const numlog3 = document.getElementById("numlog3");
const log3 = document.querySelectorAll(".log");
const secletinfo4 = document.getElementById("secletinfo4");
const next4 = document.getElementById("next4");

//===================
// jsでのみ使用
//===================
let digits;// 桁数
let answer = [];//正解の数字
let inputValueJs = []; //入力された数字が入る配列
let limit; //残り回数
let p1ans = []; //p1答え
let p2ans = []; //p2答え
let p1log = []; //p1履歴
let p2log = []; //p2履歴
let turn = true; //どちらのターンか把握 true:p1 false:p2

//===================
//0.関数
//===================
// ago -> new
function displayChangeDo(element1, element2) {
    displayChange(element1);
    displayChange(element2);
}
//画面反転関数
function displayChange(element) {
    element.classList.toggle("displayoff");
    element.classList.toggle("displayon");
}
//html文字を入力
function changeHtml(element, str) {
    element.innerHTML = str;
}
//正解の数字決め
function answerNum() {
    answer = [];
    let i = 0;
    while (i < digits) {
        const rand = Math.floor(Math.random() * 10);
        if (answer.indexOf(rand) === -1) {
            answer.push(rand);
            i++;
        }
    }
}
//4_p1p2画面切り替え
function displayChangePlayer(elements) {
    elements.forEach((element) =>
        playerChange(element)
    );
}
//4_p1p2反転関数
function playerChange(element) {
    element.classList.toggle("p1display4");
    element.classList.toggle("p2display4");
}
//4_ボタン反転関数（空白あり）
function displayChangeBlank(element) {
    element.classList.toggle("visible");
    element.classList.toggle("invisible");
}

//===================
//1.ホーム画面
//===================
//cpuクリック　＝＞難易度ページに遷移
cpu1.addEventListener('click',
    () => { displayChangeDo(home1, difficulty2) }
)
//2人対戦クリック　＝＞　二人対戦画面に遷移
twin1.addEventListener('click',
    () => {
        displayChangeDo(home1, battle3)
        digits = 3;
        console.log(digits);
        //リミットのところにプレイヤー名入れる
        changeHtml(limittime3, `Player1`);
        //入力数字の初期化
        inputValueJs = [];
        changeHtml(inputValue3, "");
        //履歴ログ初期化
        changeHtml(numlog3, "");
        //モード入力
        changeHtml(mode3, "2人対戦");
        //秘密の数字入力案内
        changeHtml(secletinfo4, "重複なしの3桁の数字を設定してください");
        //画面色切替
        boxchild3.forEach((element) =>
            element.classList.toggle("p1display4")
        );
    }
)

//===================
//2.難易度選択画面
//===================
//戻るクリック＝＞ホームへ遷移
return2.addEventListener('click',
    () => { displayChangeDo(difficulty2, home1) }
)
//難易度クリック　＝＞難易度取得　対戦画面遷移
difbutton2Arr.forEach(element => {
    element.addEventListener('click',
        (event) => {
            displayChangeDo(difficulty2, battle3);
            digits = Number(event.currentTarget.value);
            console.log(digits);
            answerNum();
            console.log(answer);
            //残り回数の初期化
            limit = 8;
            changeHtml(limittime3, `残り${limit}回`);
            //入力数字の初期化
            inputValueJs = [];
            changeHtml(inputValue3, "");
            //履歴ログ初期化
            changeHtml(numlog3, "");
            //モード入力
            changeHtml(mode3, "CPU対戦");
            //数字入力案内
            changeHtml(secletinfo4, `重複なしの${digits}桁の数字を入力してください`);
        }
    )
});

//===================
//3.対戦画面
//===================
//やめるクリック＝＞ホームに戻る
stop3.addEventListener('click',
    () => {
        //相手のターンボタンhidden
        next4.classList.remove("visible");
        next4.classList.add("invisible");
        //p1p2id消す
        boxchild3.forEach((element) => {
            element.classList.remove("p1display4");
            element.classList.remove("p2display4");
        });
        //履歴削除
        p1ans = [];
        p2ans = [];
        p1log = [];
        p2log = [];
        //秘密の数字入力案内削除
        changeHtml(secletinfo4, "");
        //画面遷移
        displayChangeDo(battle3, home1);
    }
)
//数字クリック＝＞数字打ち込まれる
num3.forEach(num => {
    num.addEventListener('click', (event) => {
        //勝ち負け出てたら打ち込めない
        if ((numlog3.innerHTML).indexOf("<h2>") === -1) {
            console.log("katimake ok");
            // 相手のターンボタン出てたら打ち込めない
            if (next4.classList.contains("invisible")) {
                console.log("button ok");
                //入力桁数が最大桁数より小さければ打ち込める
                if (inputValueJs.length < digits) {
                    console.log("ketasuu ok");
                    // 入力された値を取得
                    let input = Number(event.currentTarget.value);
                    //重複がなければ配列に入れる
                    if (inputValueJs.indexOf(input) === -1 && input !== NaN) {
                        inputValueJs.push(input);
                    }
                    //出力
                    console.log(inputValueJs.join(""), typeof inputValueJs);
                    changeHtml(inputValue3, inputValueJs.join(""));
                }
            }
        }
    })
});

//1文字消すボタン押す＝＞1文字消す
deleteButton3.addEventListener('click',
    function () {
        if (inputValueJs.length > 0 && inputValueJs.length <= digits) {
            inputValueJs.pop();
            console.log(inputValueJs.join(""), typeof inputValueJs);
            changeHtml(inputValue3, inputValueJs.join(""));
        }
    }
);
//決定ボタン押す＝＞hit&blow判定
enter3.addEventListener("click",
    function () {
        if (inputValueJs.length === digits && mode3.innerText === "CPU対戦") {

            let hit = 0;
            let blow = 0;
            //hitblow判定
            for (let i = 0; i < digits; i++) {
                const val = inputValueJs[i];
                if (answer[i] === val) {
                    hit++;
                } else if (answer.indexOf(val) !== -1) {
                    blow++;
                }
            }
            //履歴つくる
            const li = document.createElement('li');
            li.className = 'log3';
            const p = document.createElement('p');
            p.innerText = inputValueJs.join("");
            li.appendChild(p);
            const spanhit = document.createElement('span');
            spanhit.className = 'hit3';
            spanhit.innerText = `${hit}Hit`;
            li.appendChild(spanhit);
            const spanblow = document.createElement('span');
            spanblow.className = 'blow3';
            spanblow.innerText = `${blow}Blow`
            li.appendChild(spanblow);
            numlog3.prepend(li);
            //入力数字初期化
            inputValueJs = [];
            changeHtml(inputValue3, "");
            //残り回数が0なら残念表示
            if (limit === 1) {
                limit--;
                changeHtml(limittime3, `残り${limit}回`);
                const li = document.createElement('li');
                li.innerHTML = "<h2>Game Over</h2>";
                numlog3.prepend(li);
            } else {
                //当たらなければ残り回数更新
                if (hit !== digits) {
                    limit--;
                    changeHtml(limittime3, `残り${limit}回`);
                } else {
                    const li = document.createElement('li');
                    li.innerHTML = "<h2>You WIN</h2>";
                    numlog3.prepend(li);
                }
            }
        }
    }
);

//===================
//4.二人対戦画面
//===================
//決定ボタン押す＝＞player1数字決定、player2へ画面遷移
enter3.addEventListener("click",
    function () {
        if (inputValueJs.length === digits && limittime3.innerText === "Player1" && p1ans.length !== digits) {
            //p1Answerに回答入れる
            for (let i = 0; i < digits; i++) {
                p1ans.push(Number(inputValueJs.shift()));
            }
            console.log(`p1ans:${p1ans}`);
            //入力値表示リセット
            changeHtml(inputValue3, "");
            //リミットのところにプレイヤー名入れる
            changeHtml(limittime3, `Player2`);
            //p1p2反転
            displayChangePlayer(boxchild3);
        }
    }
);

//決定ボタン押す＝＞player2数字決定、p1からゲームスタート
enter3.addEventListener("click",
    function () {
        if (inputValueJs.length === digits && limittime3.innerText === "Player2" && p2ans.length !== digits) {
            //p2Answerに回答入れる
            for (let i = 0; i < digits; i++) {
                p2ans.push(Number(inputValueJs.shift()));
            }
            console.log(`p2ans:${p2ans}`);
            //入力値表示リセット
            changeHtml(inputValue3, "");
            //リミットのところにプレイヤー名入れる
            changeHtml(limittime3, `Player1`);
            //p1p2反転
            displayChangePlayer(boxchild3);
            //数字入力案内
            changeHtml(secletinfo4, "相手が設定した重複なしの3桁の数字を推理しよう");
        }
    }
);

//決定ボタン押す＝＞hit&blow判定
enter3.addEventListener("click",
    function () {
        if (inputValueJs.length === digits && limittime3.innerText.includes("Player")) {
            if (p1ans.length === digits && p2ans.length === digits) {
                if (turn) {
                    answer = p2ans;
                } else {
                    answer = p1ans;
                }
                let hit = 0;
                let blow = 0;
                //hitblow判定
                for (let i = 0; i < digits; i++) {
                    const val = inputValueJs[i];
                    if (answer[i] === val) {
                        hit++;
                    } else if (answer.indexOf(val) !== -1) {
                        blow++;
                    }
                }
                //履歴つくる
                const li = document.createElement('li');
                li.className = 'log3';
                const p = document.createElement('p');
                p.innerText = inputValueJs.join("");
                li.appendChild(p);
                const spanhit = document.createElement('span');
                spanhit.className = 'hit3';
                spanhit.innerText = `${hit}Hit`;
                li.appendChild(spanhit);
                const spanblow = document.createElement('span');
                spanblow.className = 'blow3';
                spanblow.innerText = `${blow}Blow`
                li.appendChild(spanblow);
                //履歴追加
                numlog3.prepend(li);
                if (turn) {
                    p1log.push(li);
                    console.log(`p1log:${p1log}`);
                } else {
                    p2log.push(li);
                    console.log(`p2log:${p2log}`);
                }

                //入力数字初期化
                inputValueJs = [];
                changeHtml(inputValue3, "");
                //結果表示
                if (hit === digits) {
                    const li = document.createElement('li');
                    li.innerHTML = "<h2>You WIN</h2>";
                    numlog3.prepend(li);
                } else {
                    //相手のターンボタン表示
                    displayChangeBlank(next4);
                }
            }
        }
    }
);
//相手のターンボタン押す
next4.addEventListener('click',
    function () {
        //履歴削除
        changeHtml(numlog3, "");
        //p1p2画面反転
        displayChangePlayer(boxchild3);
        //相手のターンボタン非表示
        displayChangeBlank(next4);
        //履歴、プレイヤー名変更
        if (turn) {
            p2log.forEach((log) => {
                numlog3.prepend(log);
            })
            //リミットのところにプレイヤー名入れる
            changeHtml(limittime3, `Player2`);
        } else {
            p1log.forEach((log) => {
                numlog3.prepend(log);
            })
            //リミットのところにプレイヤー名入れる
            changeHtml(limittime3, `Player1`);
        }
        //ターン入れ替え
        turn = !turn;
    }
);
