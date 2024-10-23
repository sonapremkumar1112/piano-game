const arr=shuffle(['b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16']);
const gameStatus=document.querySelector('[data-button]');
const cellElements= document.querySelectorAll('[data-cell]');
cellElements.forEach(cell => {
    cell.addEventListener("click", moveToArray);
 });

var index;
var temp;
var list;
var gameInProcess;

gameStatus.addEventListener("click",newGame);
newGame();

function newGame(){
    console.log("CLICKED");
    index=1; 
    temp=0;
    list=new Array(16).fill(null);
    gameInProcess=true;

    console.log(arr);

    pattern();
}

function moveToArray(i){
  if(gameInProcess){ 
    const cell= i.target;
    console.log(cell.id);
    if(temp<index){
        list[temp]=cell.id;
        temp++;}

    if(temp==index){
        console.log(list);
        checkifpatternclickediscrct();
    }
    
    if(index==17){
        const output=document.getElementsByClassName("Output");
        output[0].innerHTML="You Won! Score:16/16";
        gameInProcess=false;
        cellElements.forEach(cell => {
            cell.removeEventListener("click", moveToArray);
         });
    }  
}  
}

function checkifpatternclickediscrct(){
    let newarr1=list.slice(0,index);
    let newarr2=arr.slice(0,index);
    newarr1.sort();
    newarr2.sort();
    if(check(newarr1,newarr2)){
            gameInProcess=false;
            alert("Game Over!");
            const output=document.getElementsByClassName("Output");
            output[0].innerHTML="Score:"+(index-1)+"/16";
        }
    else{ 
        index++;
        temp=0;
        if(index!=17){
        const nexr = document.getElementById("nextround");
        nexr.classList.add("round");
        nexr.innerHTML="Moving on to round"+index+" ...";
        setTimeout(function(){
            nexr.classList.remove("round");
        },2000);
        console.log(nexr);}

        setTimeout(function(){
            pattern();},3000);
        }
}

function check(a,b){
    for(let i=0;i< a.length;i++){
        if(a[i]!=b[i]){
            return 1;
        }
    }
    return 0;
}

function pattern(){
    for(let i=0; i<index; i++){
        setTimeout(function(){colour(i);},i*1000);
    }
}

function colour(i){
    let r=document.getElementById(arr[i]);
        r.classList.add("pattern");
        setTimeout(function (){r.classList.remove("pattern");},1000);
}

function shuffle(array){
    let a=16;
    for(let i=0;i<a;i++){
        let p=Math.floor((Math.random() *16));
        let t=array[i];
        array[i]=array[p];
        array[p]=t;
    }
    return array;
}
