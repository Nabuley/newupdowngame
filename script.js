var num1;
var num2;
var num3;
var num4;
var num5;
var mode="hard";
document.getElementById("mode").innerHTML=`New-Up-Down Game(mode= ${mode})`;
function define_random_number(){
    num1=Math.floor(Math.random() * 10);
    num2=Math.floor(Math.random() * 10);
    num3=Math.floor(Math.random() * 10);
    num4=Math.floor(Math.random() * 10);
    num5=Math.floor(Math.random() * 10);
    do{
        /*if(num1===num2 || num2===num3 || num1===num3){
            num1=Math.floor(Math.random() * 10);
            num2=Math.floor(Math.random() * 10);
            num3=Math.floor(Math.random() * 10);
        }*/
        if(num1===10){
            //가끔 아아아아아아주 드물게 10이 되는 경우가 있음.
            num1=Math.floor(Math.random() * 10);
        }
        if(num2===10){
            num2=Math.floor(Math.random() * 10);
        }
        if(num3===10){
            num3=Math.floor(Math.random() * 10);
        }
        if(num4===10){
            num4=Math.floor(Math.random() * 10);
        }
        if(num5===10){
            num5=Math.floor(Math.random() * 10);
        }
    }while(num1===10 || num2===10 || num3===10 || num4===10 || num5===10);
}
define_random_number();
var chance=10;
var suc=false;
function up_down_game(m,n){
    if(m===n){
        return 0;
    }
    return m<n ? 1:-1;
}
function mode_(){
    if(mode === "hard"){
        mode="easy";
    }else{
        mode="hard";
    }document.getElementById("mode").innerHTML=`New-Up-Down Game(mode= ${mode})`;
}
function sum(_list){
    let s=0;
    for(const i in _list){
        //console.log(_list[i]);
        s+=_list[i];
    }
    return s;
}
function new_up_down_game(l,m,n,o,p){
    let list=[];
    let isBreak=false;
    let numm=0;
    let input_list=[l,m,n,o,p];
    let ans_list=[num1,num2,num3,num4,num5];
    numm=sum(input_list)-sum(ans_list);
    //console.log(ans_list);
    for(const idx in input_list){
        list.push(up_down_game(input_list[idx],ans_list[idx]));
    }
    let z=[];
    for(const idx in list){
        if(!(list[idx]===0)){
            isBreak=true;
        }else{
            //console.log(z);
            z.push(+idx+1);
        }
    }
    if(!isBreak){
        return false;
    }
    let res=sum(list);
    //console.log(z);
    if(mode==="hard"){
        if(z.length !=0){
            return res>=0 ? `${res}up, ${z} 번째 칸 정답. `:`${-res}down, ${z} 번째 칸 정답. `;
        }
        return res>=0 ? `${res}up. `:`${-res}down. `;
    }else{
        if(z.length !=0){
            return res>=0 ? `${res}up, ${z} 번째 칸 정답, 전체 ${numm}차이. `:`${-res}down, ${z} 번째 칸 정답, 전체 ${numm}차이. `;
        }
        return res>=0 ? `${res}up, 전체 ${numm}차이. `:`${-res}down, 전체 ${numm}차이. `;
    }
}
function play() {
    let a=null;
    let b=null;
    let c=null;
    let d=null;
    let e=null;
    let splited_list=[];
    let guess = document.getElementById("guess").value;
    try{
        splited_list=guess.split(" ");
        if(splited_list.length != 5){
            throw new Error('Invalid input');
        }
        a=+splited_list[0];
        b=+splited_list[1];
        c=+splited_list[2];
        d=+splited_list[3];
        e=+splited_list[4];
        if(isNaN(a) ||isNaN(b) || isNaN(c) ||isNaN(d) || isNaN(e)){
            throw new Error('Invalid input');
        }
        chance -= 1;
        let m=new_up_down_game(a,b,c,d,e);
        if (!m){
            document.getElementById("message").innerHTML = "정답입니다! 다섯 숫자를 모두 맞추셨습니다! 이스터에그의 힌트는.. 줄거 다 줬어요, 이젠 줄것도 없다고요.";
            define_random_number();
            chance=10;
        }
        else{
            document.getElementById("message").innerHTML = m+`${chance}번 남았습니다.`;
        }
        if(chance <= 0){
            document.getElementById("message").innerHTML = `기회를 모두 소진했습니다. 답은 ${num1} ${num2} ${num3} ${num4} ${num5}입니다. 다시 시도하세요!`;
            chance=10;
            define_random_number();
        }
    }
    catch(error){
        document.getElementById("message").innerHTML = "띄어쓰기로 숫자를 구분해주시고, 문자를 입력하지 마세요.";
    }
}
