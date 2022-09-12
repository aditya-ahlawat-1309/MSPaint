const myTimeout = setTimeout(myGreeting, 900);

function myGreeting() {
  // when the DOM has loaded
  // window.onload = function () {
    // create elemnt object whose id is (" -------- ") ------------------//
    const activeToolEl = document.getElementById("active-tool");
    const brushColorBtn = document.getElementById("brush-color");
    const brushIcon = document.getElementById("brush");
    const brushSize = document.getElementById("brush-size");
    const brushSlider = document.getElementById("brush-slider");
    const bucketColorBtn = document.getElementById("bucket-color");
    const eraser = document.getElementById("eraser");
    const clearCanvasBtn = document.getElementById("clear-canvas");
    const saveStorageBtn = document.getElementById("save-storage");
    const loadStorageBtn = document.getElementById("load-storage");
    const clearStorageBtn = document.getElementById("clear-storage");
    const downloadBtn = document.getElementById("download");
    const { body } = document;
    // -----------------------------------------------------------------//

    // -------------- Global Variables ------------------------ //
    const canvas = document.createElement("canvas");
    // id of the canvas
    canvas.id = "canvas";
    // we want the canvas in 2d or 3d and equalise it to the context -> 2d canvas
    const context = canvas.getContext("2d");
    let currentSize = 45;
    let bucketColor = "#FFFFFF";
    let currentColor = "#f5ff50";
    let isEraser = false;
    let isMouseDown = false;
    let drawnArray = [];
    // -------------------------------------------------------//

    // -------------- Formatting Brush Size --------------------//
    function displayBrushSize() {
      // if brushSlider - (document with id = brush-slider) value is less than 10
      if (brushSlider.value < 10) {
        // change the text of brushSIze tp brushSlider value and add zero before it;
        brushSize.textContent = `0${brushSlider.value}`;
      } else {
        // change the text of brushSIze tp brushSlider value
        brushSize.textContent = brushSlider.value;
      }
    }
    // ------------------------------------------------------------//

    //--------------- Setting Brush Size ----------------------//
    // on changing of the value of the brushSlider
    brushSlider.addEventListener("change", () => {
      // change the currentSize and set it to the value
      currentSize = brushSlider.value;
      // display the brush Size by calling the function
      displayBrushSize();
    });
    // -----------------------------------------------------------//

    // ------------------- Setting Brush Color ------------------//
    // if there is a chnage then call this
    brushColorBtn.addEventListener("change", () => {
      // isEraser  = false (it is not an eraser)
      isEraser = false;
      // select color according to the value of the brushColorBtn
      currentColor = `#${brushColorBtn.value}`;
    });
    // ----------------------------------------------------------//

    // -----------------Setting Background Color ----------------//
    // if there is any change
    bucketColorBtn.addEventListener("change", () => {
      // bucket color is equal to the bucketColorBtn value
      bucketColor = `#${bucketColorBtn.value}`;
      // call create canvas
      createCanvas();
      // call restore canvas
      restoreCanvas();
      // it is basically the filling of the entire canvas white background with the same color
    });
    // ----------------------------------------------------------//

    // ---------------- Eraser -------------------------//
    // on button click with id -> ersaer ->
    eraser.addEventListener("click", () => {
      // isEraser -> yes,
      isEraser = true;
      // color of brushIcon -> "white"
      brushIcon.style.color = "white";
      // color of eraser stroke -> "white"
      eraser.style.color = "black";
      // text inside the left most Button
      activeToolEl.textContent = "Eraser";
      // currentColor === ----->>>>>  bucketColor
      currentColor = bucketColor;
      // currentSize ---->>>> 50;
      currentSize = 50;
    });
    // ----------------------------------------------------//

    // ----------------- Switch back to Brush ---------------//
    function switchToBrush() {
      // it's not the eraser
      isEraser = false;
      // text of the left most element
      activeToolEl.textContent = "Brush";
      // color of the brushIcon
      brushIcon.style.color = "black";
      // color of the eraser icon
      eraser.style.color = "white";
      // currentColor ---->>> value
      currentColor = `#${brushColorBtn.value}`;
      // currentSize ----->>>> 45
      currentSize = 45;
      // sliderValue ----->>>> 45
      brushSlider.value = 45;
      // display the size of the Brush also
      displayBrushSize();
    }
    // -------------------------------------------------------//

    // ---------------- Create Canvas ----------------------//
    function createCanvas() {
      // canvas ki width -> jitni window ki width hai
      canvas.width = window.innerWidth;
      // canvas ki height -> jitni window ki height hai
      canvas.height = window.innerHeight - 50;
      // fill the entire canvas with bucketColor -> make changes in the context (2d context) -> where we draw
      context.fillStyle = bucketColor;
      // fill the canvas from canvas width till canvas height
      context.fillRect(0, 0, canvas.width, canvas.height);
      // make changes in the entire body which are made in the canvas element
      body.appendChild(canvas);
      // switch to brush
      switchToBrush();
    }
    // ------------------------------------------------------//

    // ---------------- Clear Canvas -----------------------------//
    clearCanvasBtn.addEventListener("click", () => {
      // createCanvas() from scratch
      createCanvas();
      // drwanArray is Empty
      drawnArray = [];
      // Active Tool ---->>>> text in the left most element
      activeToolEl.textContent = "Canvas Cleared";
      // switch to Brush automatically after 1.5 seconds
      setTimeout(switchToBrush, 1500);
    });
    // ------------------------------------------------------------//

    // ------------ Draw what is stored in DrawnArray ----------------//
    // restore canvas function
    function restoreCanvas() {
      // array of points where the mouse moved through
      for (let i = 1; i < drawnArray.length; i++) {
        // continuous path function in the canvas function and element of the HTML
        context.beginPath();
        // join all the elements
        context.moveTo(drawnArray[i - 1].x, drawnArray[i - 1].y);
        // How thick the line should be? -> equal to the size stored in the drawnArray
        context.lineWidth = drawnArray[i].size;
        // how the line should be like  -> round shaped
        context.lineCap = "round";
        // if we are using eraser
        if (drawnArray[i].eraser) {
          // then stroke style -> when you click what is visible -> should have bucketColor
          context.strokeStyle = bucketColor;
        } else {
          // nhi toh equal to the color selected
          context.strokeStyle = drawnArray[i].color;
        }
        // x -> y tak line honi chahiye
        context.lineTo(drawnArray[i].x, drawnArray[i].y);
        // Draw it -> yeh sabb kuch calculate karke draw karo -> instruction to Computer
        context.stroke();
      }
    }
    // ----------------------------------------------------------------//

    // --------------- Store Drawn Lines in DrawnArray ----------------//
    function storeDrawn(x, y, size, color, erase) {
      // push the following in the drwanArray
      const line = {
        x,
        y,
        size,
        color,
        erase,
      };
      // put / push
      drawnArray.push(line);
    }
    // ----------------------------------------------------------------//

    // --------------------- Get Mouse Position ---------------- //
    // as soon as mouse is clicked
    function getMousePosition(event) {
      // get the x and y coordinate of the mouse clicked
      const boundaries = canvas.getBoundingClientRect();
      return {
        x: event.clientX - boundaries.left,
        y: event.clientY - boundaries.top,
      };
    }
    // ---------------------------------------------------------//

    // ---------------------- Mouse Down -----------------------//
    // if mouse is pulled down
    canvas.addEventListener("mousedown", (event) => {
      // set isMouseDown to True
      isMouseDown = true;
      // get the current Position of the mouse
      const currentPosition = getMousePosition(event);
      // from x to y fill it
      context.moveTo(currentPosition.x, currentPosition.y);
      // then start the path
      context.beginPath();
      // line width equal to current size
      context.lineWidth = currentSize;
      // line cap = "round"
      context.lineCap = "round";
      // strokeStyle should be equal to the currentColor
      context.strokeStyle = currentColor;
    });
    // ---------------------------------------------------------//

    // ------------------------ Mouse Move ---------------------//

    // if mouse moves up
    canvas.addEventListener("mousemove", (event) => {
      // if mouse is moving and downwards
      if (isMouseDown) {
        // get the currentPosition
        const currentPosition = getMousePosition(event);
        // from yaha se yaha line draw karo
        context.lineTo(currentPosition.x, currentPosition.y);
        // draw it
        context.stroke();
        // call the function with following parameters
        // store the parameters in the drawnArray
        storeDrawn(
          currentPosition.x,
          currentPosition.y,
          currentSize,
          currentColor,
          isEraser
        );
      } else {
        // store nothing
        storeDrawn(undefined);
      }
    });
    // ------------------------------------------------------------//

    // --------------------- Mouse Up ---------------------------//
    // if move is moving up
    canvas.addEventListener("mouseup", () => {
      // it's NOT moving down
      isMouseDown = false;
    });
    // ------------------------------------------------------------//

    // ----------------  Save to Local Storage ------------------- //
    // on Button Click
    saveStorageBtn.addEventListener("click", () => {
      // set the localStorage as DrawnArray
      localStorage.setItem("savedCanvas", JSON.stringify(drawnArray));
      // Active Tool ----->>>> text of the left most element
      activeToolEl.textContent = "Canvas Saved";
      // after 1.5 seconds switchToBrush
      setTimeout(switchToBrush, 1500);
    });
    // ----------------------------------------------------------- //

    // ---------------- Load from Local Storage ------------------//
    // on Button Click ->
    loadStorageBtn.addEventListener("click", () => {
      // if there is something in localStorage
      if (localStorage.getItem("savedCanvas")) {
        // fill the drawnArray with the localStorage with the name --->>> 'savedCanvas'
        drawnArray = JSON.parse(localStorage.savedCanvas);

        // restore Canavs;
        restoreCanvas();

        // Active Tool ----->>>>> name in the left most element
        activeToolEl.textContent = "Canvas Loaded";
        // switch to Brush after 1.5 seconds
        setTimeout(switchToBrush, 1500);
      }
      // nhi toh "No Canvas Found"
      else {
        activeToolEl.textContent = "No Canvas Found";
        // and switch to Brush after 1.5 seconds
        setTimeout(switchToBrush, 1500);
      }
    });
    // --------------------------------------------------------------//

    // -------------- Clear Local Storage ----------------------//
    // on button Click
    clearStorageBtn.addEventListener("click", () => {
      // remove the LOCAL STROAGE ITEM with NAME -> "" savedCanvas ""
      localStorage.removeItem("savedCanvas");
      // Active Tool
      activeToolEl.textContent = "Local Storage Cleared";
      // switchToBrush after 1.5 seconds
      setTimeout(switchToBrush, 1500);
    });
    // --------------------------------------------------------------//

    // ----------------- Download Image ------------------------//
    // on button click ->
    downloadBtn.addEventListener("click", () => {
      // download with URL -> image/jpeg
      downloadBtn.href = canvas.toDataURL("image/jpeg", 1);
      // name of the download
      downloadBtn.download = "paint-example.jpeg";
      // Active Tool
      activeToolEl.textContent = "Image File Saved";
      // switchToBrush after 1.5 seconds
      setTimeout(switchToBrush, 1500);
    });
    // -----------------------------------------------------------//

    // ------------------ Event Listener --------------------- //
    // if clicked on BrushIcon then switchToBrush
    brushIcon.addEventListener("click", switchToBrush);
    // ------------------------------------------------------- //

    // --------------- On Load ------------------------------//
    createCanvas();
    // -------------------------------------------------------//
  };
// }

