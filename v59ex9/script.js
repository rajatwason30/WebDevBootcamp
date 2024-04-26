function main(){
    let oper={
        "+":"-",
        "*":"+",
        "-":"/",
        "/":"**"
    }
    let a = prompt("Input first number");
    let o = prompt("Operator");
    let b = prompt("Input second number");
    let ans = Math.random(1) < 0.1 ? eval(`${a} ${(oper[o])} ${b}`) : eval(`${a} ${o} ${b}`);
    alert(`Ans is ${ans}`); 
}

main();
