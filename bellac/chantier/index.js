var tasks = [
    {   id: "DEVI",
        description: "collecte des devis", 
        duration: 7,
        assumes: []
    },
    {   id: "RNOT",
        description: "réponses du notaire", 
        duration: 3,
        assumes: []
    },
    {   id: "MGEO",
        description: "mesures du géomètre", 
        duration: 1,
        assumes: [() => fin("RNOT")]
    },
    {   id: "VNOT",
        description: "acte de vente parcelle", 
        duration: 2,
        assumes: [() => fin("RNOT"), () => fin("DEVI"), () => fin("MGEO")]
    },
    {   id: "PRET",
        description: "déblocage du prêt", 
        duration: 10,
        assumes: [() => fin("DEVI")]
    },
    {   id: "DPRT",
        description: "demande préalable", 
        duration: 12,
        assumes: [() => fin("PRET"), () => fin("DEVI")]
    },
    {   id: "PCNS",
        description: "permis de construire", 
        duration: 12,
        assumes: [() => fin("PRET"), () => fin("DEVI")]
    },
    {   id: "APAR",
        description: "achat de parpaings", 
        duration: 7,
        assumes: [() => fin("PCNS"), () => fin("DPRT")]
    },
    {   id: "ACIM",
        description: "achat de ciment", 
        duration: 7,
        assumes: [() => fin("PCNS"), () => fin("DPRT")]
    },
    {   id: "AFER",
        description: "achat de fers", 
        duration: 7,
        assumes: [() => fin("PCNS"), () => fin("DPRT")]
    },
    {   id: "APOU",
        description: "achat de poutres", 
        duration: 7,
        assumes: [() => fin("PCNS"), () => fin("DPRT")]
    },
    {   id: "ATUI",
        description: "achat de tuiles", 
        duration: 7,
        assumes: [() => fin("PCNS"), () => fin("DPRT")]
    },
    {   id: "LECH",
        description: "location échafaudage", 
        duration: 90,
        assumes: [() => fin("PCNS"), () => fin("DPRT")]
    },
    {   id: "CMUR",
        description: "construction du mur", 
        duration: 60,
        assumes: [() => debut("LECH"), () => fin("APAR"), () => fin("ACIM"), () => fin("AFER")]
    },
    {   id: "RANG",
        description: "refection de l'angle", 
        duration: 7,
        assumes: [() => debut("LECH"), () => fin("APAR"), () => fin("ACIM"), () => fin("AFER")]
    },
    {   id: "ENDM",
        description: "enduis du mur", 
        duration: 7,
        assumes: [() => fin("CMUR")]
    },
    {   id: "TOIT",
        description: "toiture", 
        duration: 14,
        assumes: [() => fin("CMUR")]
    },
    {   id: "AFEN",
        description: "achat fenêtres", 
        duration: 4,
        assumes: [() => fin("PRET")]
    },
    {   id: "PFEN",
        description: "pose des fenêtres", 
        duration: 3,
        assumes: [() => fin("AFEN")]
    },
    {   id: "PCHA",
        description: "pose des 2 chapeaux cheminée", 
        duration: 2,
        assumes: [() => fin("TOIT")]
    },
    {   id: "PGAI",
        description: "pose gaine cheminée", 
        duration: 2,
        assumes: [() => fin("TOIT")]
    },
    {   id: "ITOI",
        description: "isolation sous toiture", 
        duration: 3,
        assumes: [() => fin("TOIT")]
    },
    {   id: "PPLC",
        description: "pose plancher combles", 
        duration: 10,
        assumes: [() => fin("TOIT")]
    }
];

var task = id => tasks.filter(item=>item.id==id)[0];
var debut = id => {
    let t = task(id);
    if (t.assumes.length == 0) return 0;
    return t.assumes.map(f=>f()).reduce((acc,d)=>Math.max(acc,d),0);
};

var fin = id => {
    let t = task(id);
    return debut(id) + t.duration;
};

function draw() {
    var svg = document.querySelector("#chart");
    var globalHeight = svg.getAttribute('height');
    var height = 2 * globalHeight / 3;
    var width = svg.getAttribute('width');
    let n = tasks.length;
    console.log(n);
    let longest = tasks.map(t => fin(t.id)).reduce((acc,time)=>Math.max(acc,time));
     
    for (let i in tasks) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttributeNS(null, "x", debut(tasks[i].id)/longest*width);
        rect.setAttributeNS(null, "y", i*height/n);
        rect.setAttributeNS(null, "width", tasks[i].duration/longest*width);
        rect.setAttributeNS(null, "height", height/n);
        var color = charte({re:(i+1.1)/205, im:0.02/(i+1)});
        rect.setAttributeNS(null, "fill", 
            `rgb(${255*color.r},${255*color.g},${255*color.b})`);
        svg.appendChild(rect);
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttributeNS(null, "fill", 
            `rgb(${255*(color.r<0.25)},${255*(color.g<0.35)},${255*(color.b>0.25)})`);
        text.setAttributeNS(null, "stroke", "black");
        text.setAttributeNS(null, "stroke-width", "0.5");
        text.setAttributeNS(null, "transform",
            `translate(${debut(tasks[i].id)/longest*width+5},
            ${(Number(i)+0.7)*height/n}) scale(${1.3+0.005*tasks[i].duration})`);
        var str = document.createTextNode(tasks[i].description);
        text.appendChild(str);
        svg.appendChild(text);
    }
    
    let dates = tasks.map(t => fin(t.id)).concat(tasks.map(t => debut(t.id)));
    for (let date of dates) {
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttributeNS(null, "fill", "white");
        text.setAttributeNS(null, "stroke-width", "0.5");
        text.setAttributeNS(null, "transform", 
            `translate(${date/longest*width+5},${1.3 * height}) rotate(-90)`);
        var str = document.createTextNode((new Date(date * 24 * 3600 * 1000 + Date.now())).toDateString());
        text.appendChild(str);
        svg.appendChild(text);
    }
}


function charte(p) {
    var x = p.re, y = p.im;
 
    return trilinear(
        { r: 1, g: 1, b: 1 },
        { r: 1, g: 0, b: 1 },
        { r: 0, g: 1, b: 1 }, 
        { r: 1, g: 1, b: 0 },
        { r: 0, g: 1, b: 0 },
        { r: 0, g: 0, b: 1 },
        { r: 1, g: 0, b: 0 },
        { r: 0, g: 0, b: 0 },
        (2*x/(1+x*x+y*y)+1)/2,
        (2*y/(1+x*x+y*y)+1)/2,
        ((-1+x*x+y*y)/(1+x*x+y*y)+1)/2,
     );
}


function trilinearScalaire(
    f000, f001, f010, f011,
    f100, f101, f110, f111,
    x, y, z
) {
    var f00 = (1-x)*f000 + x*f100;
    var f01 = (1-x)*f001 + x*f101;
    var f10 = (1-x)*f010 + x*f110;
    var f11 = (1-x)*f011 + x*f111;

    var f0 = (1-y)*f00 + y*f10;
    var f1 = (1-y)*f01 * y*f11;

    return (1-z)*f0 + z*f1;
}

function trilinear(
    f000, f001, f010, f011,
    f100, f101, f110, f111,
    x, y, z
) {
    return {
        r: trilinearScalaire(
            f000.r, f001.r, f010.r, f011.r,
            f100.r, f101.r, f110.r, f111.r,
            x, y, z
        ),
        g: trilinearScalaire(
            f000.g, f001.g, f010.g, f011.g,
            f100.g, f101.g, f110.g, f111.g,
            x, y, z
        ),
        b: trilinearScalaire(
            f000.b, f001.b, f010.b, f011.b,
            f100.b, f101.b, f110.b, f111.b,
            x, y, z
        )
    };
}


