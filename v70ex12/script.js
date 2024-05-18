function getRandomColor(){
    let r=Math.floor(Math.random() * 255) + 1;
    let g=Math.floor(Math.random() * 255) + 1;
    let b=Math.floor(Math.random() * 255) + 1;
    let randomColor = `rgb(${r},${g},${b})`;
    console.log(randomColor);
    return randomColor;
}

document.querySelectorAll(".box").forEach(e=>{
    console.log(e);
    e.style.backgroundColor = getRandomColor();
    e.style.color = getRandomColor();
})