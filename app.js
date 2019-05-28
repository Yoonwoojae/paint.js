const body = document.body;
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let mouse = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseOver(event){
    if(mouse){
        onMouseMove(event);
        startPainting();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event){
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContext(event){
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = 'PaintJS';
    link.click();
}

function handleMouseDown(evnet){
    startPainting();
    mouse = true;
}

function handleMouseUp(evnet){
    stopPainting();
    mouse = false;
}

function init(){

    if(canvas){
        canvas.addEventListener("mousemove", onMouseMove);
        body.addEventListener("mousedown", handleMouseDown);
        body.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("mouseover", onMouseOver);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleContext);
    }

    if(colors){
        Array.from(colors).forEach(color => 
            color.addEventListener("click", handleColorClick)
        );
    }

    if(range){
        range.addEventListener("input", handleRangeChange);
    }

    if(mode){
        mode.addEventListener("click", handleModeClick);
    }

    if(save){
        save.addEventListener("click", handleSaveClick);
    }

}

init();

