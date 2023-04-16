import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getOrientation } from "get-orientation/browser";
import ImgDialog from "./ImgDialog";
import { getCroppedImg, getRotatedImage } from "./canvasUtils";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const CropContainer = styled("div")(({ theme }) => ({
  position: "relative",
  marginRight: "15rem",
  height: 200,
  background: "#121212",
  [theme.breakpoints.up("sm")]: {
    height: 400,
    width: 300,
  },
}));
const Controls = styled("div")(({ theme }) => ({
  width: "20rem",
  alignItems: "stretch",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
  },
}));
const SliderContainer = styled("div")({
  display: "flex",
  flex: "1",
  alignItems: "center",
});

const Typographyz = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    minWidth: 65,
  },
}));
const Sliderz = styled(Slider)(({ theme }) => ({
  color: "#121212",

  padding: "22px 0px",
  marginLeft: 16,
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    alignItems: "center",
    margin: "0 16px",
  },
}));

const CropButton = styled(Button)({
  flexShrink: 0,
  background: "#121212",
  "&:hover": {
    background: "#4a4a4a",
  },
});

const Input = styled("input")({
  display: "none",
});

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const IMGcropper = ({ classes, setPic }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });

      setCroppedImage(croppedImage);
      const imageSource = croppedImage;
      const blob = await fetch(imageSource).then((res) => res.blob());
      const file = new File([blob], "my_image.png", {
        type: "image/png",
        lastModified: new Date(),
      });

      setPic(file);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(croppedImage);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div>
      {imageSrc ? (
        <React.Fragment>
          <CropContainer>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </CropContainer>
          <Controls>
            <SliderContainer>
              <Typographyz variant="overline">Zoom</Typographyz>
              <Sliderz
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </SliderContainer>

            <SliderContainer>
              <Typographyz variant="overline">Rotation</Typographyz>
              <Sliderz
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </SliderContainer>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                onChange={onFileChange}
                id="contained-button-file"
                type="file"
              />
              <Button
                variant="contained"
                component="span"
                style={{ marginRight: "1rem" }}
              >
                Upload
              </Button>
            </label>
            <CropButton
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
            >
              Crop and Save
            </CropButton>
            {/* <Button onClick={() => this.props.img(croppedImage)}>apple</Button> */}
          </Controls>
          <ImgDialog img={croppedImage} onClose={onClose} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <input
            type="file"
            onChange={onFileChange}
            accept="image/*"
            style={{ marginRight: "18rem" }}
          /> */}

          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              onChange={onFileChange}
              type="file"
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              // style={{ marginRight: "-0.0rem" }}
            >
              <PhotoCamera />
            </IconButton>
          </label>

          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              onChange={onFileChange}
              id="contained-button-file"
              type="file"
            />
            <Button
              variant="contained"
              component="span"
              style={{ marginRight: "25.5rem" }}
            >
              Upload
            </Button>
          </label>
        </React.Fragment>
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

// const StyledDemo = withStyles(styles)(Demo)

// const rootElement = document.getElementById('root')
// ReactDOM.render(<StyledDemo />, rootElement)

export default IMGcropper;
