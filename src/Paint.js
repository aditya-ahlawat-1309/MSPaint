import React from 'react'
import {
  BsBrush,
  BsFillDropletFill,
  BsFillEraserFill,
  BsFillArrowDownSquareFill,
  BsFillCloudUploadFill,
  BsFillTrashFill,
  BsSave,
  BsFillBackspaceFill,
} from "react-icons/bs";
import {jscolor}  from "./jscolor"
const Paint = () => {
  return (
    <div>
      <div>
        <div className="top-bar">
          {/* Active Tool */}
          <div className="active-tool">
            <span id="active-tool" title="Active Tool">
              Brush
            </span>
          </div>
          {/* Brush */}
          <div className="brush tool" style={{display:"flex"}}>
            <BsBrush
              className="fas fa-brush"
              id="brush"
              title="Brush"
              style={{ fontSize: "35px" }}
            />
            <input
              className="jscolor"
              defaultValue="f55f50"
              id="brush-color"
              style={{ marginTop: "5px" }}
            />
            <span className="size" id="brush-size" title="Brush Size">
              10
            </span>
            <input
              type="range"
              min={1}
              max={50}
              defaultValue={45}
              className="slider"
              id="brush-slider"
            />
          </div>
          {/* Bucket */}
          <div className="bucket tool" style={{display:"flex"}}>
            <BsFillDropletFill
              className="fas fa-fill-drip"
              title="Background Color"
              style={{ fontSize: "30px" }}
            />
            <input
              className="jscolor"
              defaultValue="ffffff"
              id="bucket-color"
              style={{marginTop:"5px"}}
            />
          </div>
          {/* Eraser */}
          <div className="tool">
            <BsFillEraserFill
              className="fas fa-eraser"
              id="eraser"
              title="Eraser"
              style={{ fontSize: "30px" }}
            />
          </div>
          {/* Clear Canvas */}
          <div className="tool">
            <BsFillBackspaceFill
              className="fas fa-undo-alt"
              id="clear-canvas"
              title="Clear"            
              style={{fontSize:"30px"}}
            />
          </div>
          {/* Save Local Storage */}
          <div className="tool">
            <BsFillArrowDownSquareFill
              className="fas fa-download"
              id="save-storage"
              title="Save Local Storage"
              style={{ fontSize: "30px" }}
            />
          </div>
          {/* Load Local Storage */}
          <div className="tool">
            <BsFillCloudUploadFill
              className="fas fa-upload"
              id="load-storage"
              title="Load Local Storage"
              style={{ fontSize: "30px" }}
            />
          </div>
          {/* Clear Local Storage */}
          <div className="tool">
            <BsFillTrashFill
              className="fas fa-trash-alt"
              id="clear-storage"
              title="Clear Local Storage"
              style={{ fontSize: "30px" }}
            />
          </div>
          {/* Download Image */}
          <div className="tool">
            <a id="download">
              <BsSave
                className="far fa-save"
                title="Save Image File"
                style={{ fontSize: "30px" }}
              />
            </a>
          </div>
        </div>
        {/* Mobile Message */}
        <div className="mobile-message">
          <h2>Please use application on larger screen</h2>
        </div>
      </div>
    </div>
  );
}

export default Paint