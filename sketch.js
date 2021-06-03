var canavs;
var database;

var drawing = []

function setup() {
    canvas = createCanvas(1000, 1000);
    canvas.parent('canvascontainer');
    database = firebase.database()
    background("skyblue")
    var clearbutton = select('#clearbutton');

    clearbutton.mousePressed(clearDrawing)

}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke("black");
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }

}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}

// function clearDrawing() {
//     db_drawing = []
//     var drawingRef = database.ref('drawing')
//     drawingRef.set({
//         "d": []
//     })
// }

function clearDrawing() {
    db_drawing = [];
    var adaRef = database.ref('drawing');
    adaRef.remove()
}