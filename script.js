const btnNextStep = document.querySelector('#nextStep');
const presets = document.querySelector('#presets');//Select Option
const btnAnimate = document.querySelector('#animate');
const btnStop = document.querySelector('#stop');
const btnClear = document.querySelector('#clear');
var p_pop = document.querySelector('#population');// Population : 0



//
const row=128;//128x128
const column=128;//128x128
var wholePopulation=0;//Tüm popülasyon
var population=0;//canlı popülasyon
var adjacent=0;//canlı komşu sayısı
var adjacentArray=[];//canlı komşu array
var border=0;//sınır kontrolü
var gameInterval;//timer
var clicked=[];//butona basılma kontrolü
//
//Başlangıçta animate ve stop tuşları enabled true
btnStop.disabled=true;
btnAnimate.disabled=true;
//
for(let i = 0;i<row*column;i++){//clicked dizisi ayarlama basılan basılmayan cell
    clicked[i]=0;
}
//
for(let i = 0;i<row;i++){//hücreleri oluşturma
    for(let j =0;j<column;j++){
        var cell = document.createElement('div');
        cell.id=wholePopulation;
        cell.className='cell';
        cell.value=0; //oyun başında 0
        //cell.textContent=`${wholePopulation}/${i}-${j}`;
        document.querySelector('#gameOfLife').appendChild(cell);
        wholePopulation++;
    }
}
var allCells = document.querySelectorAll('.cell');
allCells.forEach(function(item){//hücrelere basıldığında
    item.addEventListener('click',function(e){
        clicked[Number(e.target.id)]++;
        if(clicked[Number(e.target.id)] %2 ==1){
            e.target.style.backgroundColor='#25F3A6';
            e.target.value=1;
            population++;
            
        }
        else{
            e.target.style.backgroundColor='white';
            e.target.value=0;
             population--;
        }
        
        p_pop.textContent=`Population : ${population}`;
        btnAnimate.disabled=false;
        
       
    });
    
});
function presetsChange(){//select option text değişme
    clear();
    stop();
    btnAnimate.disabled=false;
    const base=3500;
    if(presets.selectedIndex === 1){//glider
        makeAlive(base);
        makeAlive(base+row+1);
        makeAlive(base+(2*row)+1);
        makeAlive(base+row+2);
        makeAlive(base+2);
    }
    else if(presets.selectedIndex ===2){//pulsar
        {//#1
        makeAlive(base-(row*6)-3);
        makeAlive(base-(row*6)-4);
        makeAlive(base-(row*5)-2);
        makeAlive(base-(row*5)-3);
        makeAlive(base-(row*4)-1);
        makeAlive(base-(row*4)-3);
        makeAlive(base-(row*4)-6);
        makeAlive(base-(row*3)-1);
        makeAlive(base-(row*3)-2);
        makeAlive(base-(row*3)-4);
        makeAlive(base-(row*3)-5);
        makeAlive(base-(row*3)-6);
        makeAlive(base-(row*2)-1);
        makeAlive(base-(row*2)-3);
        makeAlive(base-(row*2)-5);
        makeAlive(base-row-2);
        makeAlive(base-row-3);
        makeAlive(base-row-4);
        }
        {//#2
            makeAlive(base-(row*6)+3);
            makeAlive(base-(row*6)+4);
            makeAlive(base-(row*5)+2);
            makeAlive(base-(row*5)+3);
            makeAlive(base-(row*4)+1);
            makeAlive(base-(row*4)+3);
            makeAlive(base-(row*4)+6);
            makeAlive(base-(row*3)+1);
            makeAlive(base-(row*3)+2);
            makeAlive(base-(row*3)+4);
            makeAlive(base-(row*3)+5);
            makeAlive(base-(row*3)+6);
            makeAlive(base-(row*2)+1);
            makeAlive(base-(row*2)+3);
            makeAlive(base-(row*2)+5);
            makeAlive(base-row+2);
            makeAlive(base-row+3);
            makeAlive(base-row+4);
        
        }
        {//#3
            makeAlive(base+row-2);
            makeAlive(base+row-3);
            makeAlive(base+row-4);
            makeAlive(base+(row*2)-1);
            makeAlive(base+(row*2)-3);
            makeAlive(base+(row*2)-5);
            makeAlive(base+(row*3)-1);
            makeAlive(base+(row*3)-2);
            makeAlive(base+(row*3)-4);
            makeAlive(base+(row*3)-5);
            makeAlive(base+(row*3)-6);
            makeAlive(base+(row*4)-1);
            makeAlive(base+(row*4)-3);
            makeAlive(base+(row*4)-6);
            makeAlive(base+(row*5)-2);
            makeAlive(base+(row*5)-3);
            makeAlive(base+(row*6)-3);
            makeAlive(base+(row*6)-4);
        }
        {//#4
            makeAlive(base+row+2);
            makeAlive(base+row+3);
            makeAlive(base+row+4);
            makeAlive(base+(row*2)+1);
            makeAlive(base+(row*2)+3);
            makeAlive(base+(row*2)+5);
            makeAlive(base+(row*3)+1);
            makeAlive(base+(row*3)+2);
            makeAlive(base+(row*3)+4);
            makeAlive(base+(row*3)+5);
            makeAlive(base+(row*3)+6);
            makeAlive(base+(row*4)+1);
            makeAlive(base+(row*4)+3);
            makeAlive(base+(row*4)+6);
            makeAlive(base+(row*5)+2);
            makeAlive(base+(row*5)+3);
            makeAlive(base+(row*6)+3);
            makeAlive(base+(row*6)+4);
        }
    }
    else if(presets.selectedIndex===3){//spaceship
        makeAlive(base);
        makeAlive(base+1);
        makeAlive(base+row-1);
        makeAlive(base+row);
        makeAlive(base+row+1);
        makeAlive(base+row+2);
        makeAlive(base+(row*2)-1);
        makeAlive(base+(row*2));
        makeAlive(base+(row*2)+2);
        makeAlive(base+(row*2)+3);
        makeAlive(base+(row*3)+1);
        makeAlive(base+(row*3)+2);
    }
    else if(presets.selectedIndex===4){//circleOfFire
        {
            makeAlive(base-(row*5)-1);
            makeAlive(base-(row*5)+1);
            makeAlive(base-(row*4)-3);
            makeAlive(base-(row*4));
            makeAlive(base-(row*4)+3);
            makeAlive(base-(row*3)-2);
            makeAlive(base-(row*3));
            makeAlive(base-(row*3)+2);
            makeAlive(base-(row*2)-4);
            makeAlive(base-(row*2)-3);
            makeAlive(base-(row*2)-2);
            makeAlive(base-(row*2));
            makeAlive(base-(row*2)+4);
            makeAlive(base-(row*2)+3);
            makeAlive(base-(row*2)+2);
            makeAlive(base-row);
        }
        {
            for(let i=1;i<=5;i++){
                makeAlive(base-i);
            }
            for(let i=1;i<=5;i++){
                makeAlive(base+i);
            }
        }
        {
            makeAlive(base+row);
            makeAlive(base+(row*2)-4);
            makeAlive(base+(row*2)-3);
            makeAlive(base+(row*2)-2);
            makeAlive(base+(row*2));
            makeAlive(base+(row*2)+2);
            makeAlive(base+(row*2)+3);
            makeAlive(base+(row*2)+4);
            makeAlive(base+(row*3)-2);
            makeAlive(base+(row*3));
            makeAlive(base+(row*3)+2);
            makeAlive(base+(row*4)-3);
            makeAlive(base+(row*4));
            makeAlive(base+(row*4)+3);
            makeAlive(base+(row*5)-1);
            makeAlive(base+(row*5)+1);
        }
    }
    else if(presets.selectedIndex===5){//quadpole
        makeAlive(base-row);
        makeAlive(base+row);
        makeAlive(base-row-2);
        makeAlive(base+row+2);
        makeAlive(base-(row*2)-3);
        makeAlive(base-(row*3)-3);
        makeAlive(base-(row*3)-2);
        makeAlive(base+(row*2)+3);
        makeAlive(base+(row*3)+3);
        makeAlive(base+(row*3)+2);
    }
    
    
}
btnNextStep.addEventListener('click',function(){//next step
    gamePlay(); 
   
});   
btnClear.addEventListener('click',clear);//clearAll
btnAnimate.addEventListener('click',function(){
    gameInterval=setInterval(gamePlay,500);
    btnStop.disabled=false;
});
btnStop.addEventListener('click',function(){
    stop();
});
function gamePlay(){//oynanış
    for(let i=0;i<allCells.length;i++){//adjencyArrayı tamamıyla 0 yapmö
        adjacentArray[i]=0;
    }
    for(let i=0;i<allCells.length;i++){//adjencyArray düzenlemeleri

        if((i>=0) && (i<row-1)){
            border=1;
            if(i!=0){
                if(allCells[i-1].value==1){
                    adjacent++;
                }
                if(allCells[i+1].value==1){
                    adjacent++;
                }
                if(allCells[i+row-1].value==1){
                    adjacent++;
                }
                if(allCells[i+row].value==1){
                    adjacent++;
                }
                if(allCells[i+row+1].value==1){
                    adjacent++;
                }
            }
            if(i==0){
                if(allCells[i+1].value==1){
                    adjacent++;
                }
                if(allCells[i+row].value==1){
                    adjacent++;
                }
                if(allCells[i+row+1].value==1){
                    adjacent++;
                }

            }
        }
        if(i==(row-1)){
            border=1;
            if(allCells[i-1].value==1){
                adjacent++;
            }
            if(allCells[i+row-1].value==1){
                adjacent++;
            }
            if(allCells[i+row].value==1){
                adjacent++;
            }

        }
        if((i!=0) && (i%row==0) && (i!=allCells[allCells.length-row].id)){
            border=1;
            if(allCells[i-row].value == 1){
                adjacent++;
            }
            if(allCells[i-row+1].value == 1){
                adjacent++;
            }
            if(allCells[i+1].value==1){
                adjacent++;
            }
            if(allCells[i+row].value==1){
                adjacent++;
            }
            if(allCells[i+row+1].value==1){
                adjacent++;
            }
            
        }
        if(i==allCells[allCells.length-row].id){
            border=1;
            if(allCells[i-row].value == 1){
                adjacent++;
            }
            if(allCells[i-row+1].value == 1){
                adjacent++;
            }
            if(allCells[i+1].value==1){
                adjacent++;
            }
            
        }
        if((i!=(row-1)) && (i%(row)==(row-1)) &&(i!=allCells[allCells.length-1].id)){
            border=1;
            if(allCells[i-row].value==1){
                adjacent++;
            }
            if(allCells[i-row-1].value==1){
                adjacent++;
            }
            if(allCells[i-1].value==1){
                adjacent++;
            }
            if(allCells[i+row].value==1){
                adjacent++;
            }
            if(allCells[i+row-1].value==1){
                adjacent++;
            }
        }
        if(i==(allCells[allCells.length-1].id)){
            border=1;
            if(allCells[i-row].value==1){
                adjacent++;
            }
            if(allCells[i-row-1].value==1){
                adjacent++;
            }
            if(allCells[i-1].value==1){
                adjacent++;
            }
        }
        if((i>(allCells[allCells.length-row].id)) && (i<allCells[allCells.length-1].id)){
            border=1;
            if(allCells[i-row].value==1){
                adjacent++;
            }
            if(allCells[i-row-1].value==1){
                adjacent++;
            }
            if(allCells[i-row+1].value==1){
                adjacent++;
            }
            if(allCells[i-1].value==1){
                adjacent++;
            }
            if(allCells[i+1].value==1){
                adjacent++;
            }
        }
        if(border==0){
            if(allCells[i-1].value==1){
                adjacent++;
            }
            if(allCells[i+1].value==1){
                adjacent++;
            }
            if(allCells[i-row-1].value==1){
                adjacent++;
            }
            if(allCells[i-row].value==1){
                adjacent++;
            }
            if(allCells[i-row+1].value==1){
                adjacent++;
            }
            if(allCells[i+row-1].value==1){
                adjacent++;
            }
            if(allCells[i+row].value==1){
                adjacent++;
            }
            if(allCells[i+row+1].value==1){
                adjacent++;
            }
        }
        
        adjacentArray[i]=adjacent;
        adjacent=0;
        border=0;
        
    }

    changingColor();
  

}
function changingColor(){//canlı cansız renk değiştirme
    for(let i=0;i<allCells.length;i++){//renk-value değiştirme
        if((adjacentArray[i]<2) || adjacentArray[i]>3){
            if(allCells[i].value==1){
                makeDead(i);
            }
        }
        else if(adjacentArray[i]===3){
            if(allCells[i].value==0){
                makeAlive(i);
            }
        }
        
    }
    p_pop.textContent=`Population: ${population}`;
}

function makeAlive(index){//canlı yapma
    allCells[index].value=1;
    allCells[index].style.backgroundColor='#25F3A6';
    population++;
    clicked[index]=1;
   
}
function makeDead(index){//cansız yapma
    allCells[index].value=0;
    allCells[index].style.backgroundColor='white';
    population--;
    clicked[index]=0;
   

}
function clear(){//clear
    wholePopulation=0;
    population=0;
    adjacent=0;
    adjacentArray=[];
    border=0;
    allCells.forEach(function(item){
        item.value=0;
        item.style.backgroundColor='#fff';
    });
    for(let i=0;i<row*column;i++){
        clicked[i]=0;
    }
    p_pop.textContent=`Population: ${population}`;
    btnAnimate.disabled=true;
    btnStop.disabled=true;
    
   
    
}
function stop(){//clearInterval
    clearInterval(gameInterval);
}

