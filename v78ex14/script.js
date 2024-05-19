function getRandomTime(a,b){
    let randomNum= Math.random();
    return (a+(b-a)*randomNum);
}

function printDots(){
    return new Promise((resolve,reject)=>{
        let bodykahtml = document.body.innerHTML.slice(0,document.body.innerHTML.length-4);
        setTimeout(() => {
            bodykahtml = `${bodykahtml}.`
            document.body.innerHTML=`${bodykahtml}</h1></b>`
        }, 500);
        setTimeout(() => {
            bodykahtml = `${bodykahtml}.`
            document.body.innerHTML=`${bodykahtml}</h1></b>`
        }, 800);
        setTimeout(() => {
            bodykahtml = `${bodykahtml}.`
            document.body.innerHTML=`${bodykahtml}</h1></b>`
        }, 1200);
        resolve()
    })
}

// printStatement should return a promise
function printStatement(statement){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log(statement)
        document.body.innerHTML=`<b>${statement}</b>`;
        resolve();
    },
        getRandomTime(1000,3000))})
}

(async ()=>{
    console.log("hello world");
    document.body.style.backgroundColor='green';
    await printStatement("Initializing hacking");
    await printDots();
    await printStatement("Reading your files")
    await printDots();
    await printStatement("Password files detected")
    await printDots();
    await printStatement("Sending all passwords and personal files to server")
    await printDots();
    await printStatement("Cleaning up")
    await printDots();
})();