
let dropdown=document.querySelectorAll(".dropdown select");
let imgs=document.querySelectorAll(".dropdown img");
let amt=document.querySelector(".amount input");
let btn=document.querySelector("form button");
let from=document.querySelector("#from");
let to=document.querySelector("#to");
let message=document.querySelector(".msg");

let url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
// let url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`;

for(select of dropdown){
for(let code in countryList){
    // console.log(`${code}  ${countryList[code]}`);
    let option=document.createElement("option");
    option.innerText=code;
    option.value=code;
    select.append(option);
    if(select.name=="from" && code=="USD"){
        option.selected="selected";

    }
    if(select.name=="to" && code=="INR"){
        option.selected="selected";

    }
   }
    select.addEventListener("change",function(e){
        update(e.target);
    })     
}

let update=function(e){
    console.log(e);
    let currcode=e.value;
    let countryCode=countryList[currcode];
    console.log(countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/24.png`;
    // let img=e.parentElement.querySelector("img");
    let img=e.previousElementSibling;
    img.src=newSrc;
}

btn.addEventListener("click",function(e){
    e.preventDefault();
    let amtVal=amt.value;
    if(amtVal=='' || amtVal<=0){
        amtVal=1;
        amt.value='1';

    }
    console.log(amtVal); 
    main();  

})
async function main(){
    let res=to.value.toLowerCase();
    console.log(res);  
    let pes=from.value.toLowerCase();
    console.log(pes); 
    let url1=`${url}/${pes}.json`;
    let data=await fetch(url1);
    let data1=await data.json();
    console.log(data1);
   for(let i in data1){
    console.log(`${i}:${data1[i]}`);
    for(let j in data1[i]){
        if(j==res){
        console.log(`${j} : ${data1[i][j]}`);
        console.log(data1[i][j]);
        let finalAmt=data1[i][j]*amt.value;
        console.log(finalAmt);
        message.innerText=`${amt.value} ${from.value}=${finalAmt}${to.value} `;
        }
    }
   
   }

}
window.addEventListener("load",()=>{
    main();
})




   



