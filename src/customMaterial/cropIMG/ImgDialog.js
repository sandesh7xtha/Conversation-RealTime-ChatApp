import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";

const AppBarStyled = styled(AppBar)({
  position: "relative",
  background: "#121212",
});

const Flex = styled("div")({
  flex: 1,
});

const ImgContainer = styled("div")({
  position: "relative",
  flex: 1,
  padding: 16,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Img = styled("img")({
  maxWidth: "30rem",
  maxHeight: "100%",
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ImgDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Dialog
        fullScreen
        open={!!this.props.img}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
      >
        <div>
          <AppBarStyled>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.props.onClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" component={Flex}>
                Cropped image
              </Typography>
            </Toolbar>
          </AppBarStyled>
          <ImgContainer>
            <Img src={this.props.img} alt="Cropped" />
          </ImgContainer>
        </div>
      </Dialog>
    );
  }
}

export default ImgDialog;
