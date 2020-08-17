const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.color');
const range = document.querySelector('.range');
const btn_mode = document.querySelector('.btn_mode');
const btn_save = document.querySelector('.btn_save');
const moreColors = document.querySelector('#moreColors');
const moreColor = document.querySelector('#moreColor')

canvas.width = 700;
canvas.height = 600;

ctx.strokeStyle = 'black'
ctx.fillStyle = 'white'
ctx.fillRect(0, 0, 700, 600);

let painting = false;
let filling = false;

function colorChange(){
  const color = this.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function colorChangeMore(){
  moreColor.style.backgroundColor = this.value
  ctx.strokeStyle = this.value
}

function startPainting(){
  painting = true;
}

function stopPainting(){
  painting = false;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleRangeChange(){
  ctx.lineWidth = this.value;
}

function changeMode(){
  if(filling){
    filling = false;
    this.innerText = "FILL"
  } else {
    filling = true;
    this.innerText = 'PAINT'
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, 700, 600);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PAINTJS[EXPORT]";
  link.click();
}

colors.forEach(function(color){color.addEventListener('click', colorChange)})

if(canvas){
  canvas.addEventListener('mousedown', startPainting)
  canvas.addEventListener('mouseup', stopPainting)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mouseleave', stopPainting)
  canvas.addEventListener('click', handleCanvasClick)
}
moreColors.addEventListener('change', colorChangeMore)
btn_mode.addEventListener('click', changeMode)
range.addEventListener('change', handleRangeChange)
btn_save.addEventListener('click', handleSaveClick);