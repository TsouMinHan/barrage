
const c = function(msg) {
    console.log(msg);
}

const barrage = {
    i: 0,
    arr: [],
    canvas: document.querySelector("canvas"),
    ctx: canvas.getContext("2d"),
    init: function() {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;
        this.ctx.font = "30px Microsoft JhengHei";
    },
    add: function(txt) {
        this.arr.push(txt);
        c(this.arr)
    },
    run: function() {
        barrage.ctx.clearRect(0, 0, barrage.canvas.width, barrage.canvas.height);
        barrage.arr.forEach( ele => {
            barrage.ctx.fillText(ele.txt, ele.x, ele.y);
            ele.x -= 1;
            
            if (ele.x == -(ele.txt_width))
                barrage.arr.splice(0, 1)
        });

        setTimeout(barrage.run, 15) 
    }
}

const setEventListener = function() {
    document.querySelector("input[id='submit']").addEventListener("click", submit);
    window.addEventListener("resize", barrage.init);
}

const submit = function(event) {
    let input = document.querySelector("input[id='message']");
    const txt = input.value;
    if (!txt) return;
    
    const data = {
        "txt": txt,
        "x": barrage.canvas.width,
        "y": Math.floor(Math.random() * barrage.canvas.height),
        "txt_width": Math.ceil(barrage.ctx.measureText(txt).width)
    }

    barrage.add(data);
    input.value = "";
}

setEventListener();
barrage.init();
setTimeout(barrage.run, 1000) 