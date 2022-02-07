 
function getContent() {
    const [file] = document.querySelector("#file").files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        compute5(reader.result);
        }, false
    );

    if (file) {
        reader.readAsText(file);
    } 
}

function compute5(content) {
    var binaries = content.split("\n").filter(i=>i!="");

    var height = binaries[0].length;
    var transposed = Array.from({length: height}, (_,__)=>[]);

    for (let b of binaries) {
        var bs = b.split("");
        for(let i=0;i<b.length;i++) {
            transposed[i].push(b[i]);
        }
    }
    var gs = [];
    var es = [];
    for (let b of transposed) {
        var count = [0,0];
        b.forEach(bit=>count[bit]++);
        if (count[0]>count[1]) {
            gs.push(0);
            es.push(1);
        }
        else {
            gs.push(1);
            es.push(0);
        }
    }
    var gamma = Number(gs.reduce((acc,b)=>acc+b,"0b"));
    var epsilon = Number(es.reduce((acc,b)=>acc+b,"0b"));

    document.querySelector("#result").innerHTML = `${gamma*epsilon}`;
}

function compute4(content) {
    var moves = content.split("\n").filter(i=>i!="");
    var x=0;
    var z=0;
    var a=0;
    let act = 
        { forward: v=> (x,z,a)=>[x+v,z+a*v,a],
        down:  v=> (x,z,a)=>[x,z,a+v],
        up:  v=> (x,z,a)=>[x,z,a-v]
        };
    for (let m of moves) {
        let [dir,val] = m.split(" ");
        [x,z,a] = act[dir](parseInt(val))(x,z,a);
    }
    document.querySelector("#result").innerHTML = `${x*z}`;
}

function compute3(content) {
    var moves = content.split("\n").filter(i=>i!="");
    var x=0;
    var z=0;
    let act = 
        { forward: v=> (x,z)=>[x+v,z],
        down:  v=> (x,z)=>[x,z+v],
        up:  v=> (x,z)=>[x,z-v]
        };
    for (let m of moves) {
        let [dir,val] = m.split(" ");
        [x,z] = act[dir](parseInt(val))(x,z);
    }
    document.querySelector("#result").innerHTML = `${x*z}`;
}
function compute2(content) {
    var measures = content.split("\n").filter(i=>i!="");
    var inc=0;
    for (var i=3; i<=measures.length-1;i++)
        if(parseInt(measures[i])
        +parseInt(measures[i-1])+parseInt(measures[i-2])>parseInt(measures[i-1])
        +parseInt(measures[i-2])+parseInt(measures[i-3])) inc++;
    document.querySelector("#result").innerHTML = inc;
}

function compute1(content) {
    var measures = content.split("\n").filter(i=>i!="");
    var inc=0;
    for (var i=1; i<measures.length;i++)
        if(parseInt(measures[i])>parseInt(measures[i-1])) inc++;
    document.querySelector("#result").innerHTML = inc;
}


