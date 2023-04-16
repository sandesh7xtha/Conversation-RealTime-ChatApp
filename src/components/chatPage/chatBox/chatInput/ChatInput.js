import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";

export const ChatInput = ({ handleSendMsg }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleInputChange = (e) => setMessage(e.target.value);

  const handleEmojiSelect = (emoji) => setMessage(message + emoji.emoji);

  const handleEmojiButtonClick = () =>
    setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker);

  const handleSendButtonClick = () => {
    handleSendMsg(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendButtonClick();
    }
  };
  return (
    <ChatInputContainer>
      <InputContainer>
        <StyledTextField
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          multiline
          rowsMax={4}
          onKeyPress={handleKeyPress}
        />
      </InputContainer>
      <StyledButton
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        onClick={handleSendButtonClick}
      >
        Send
      </StyledButton>
      <EmojiButton onClick={handleEmojiButtonClick}>
        <EmojiIcon>😀</EmojiIcon>
      </EmojiButton>
      {showEmojiPicker && (
        <EmojiPickerContainer>
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </EmojiPickerContainer>
      )}
    </ChatInputContainer>
  );
};

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  padding: 10px;
  // position: fixed;
  bottom: 0;
  // width: 96%;
  z-index: 1;

  // @media (min-width: 768px) {
  //   width: 80%;
  //   left: 10%;
  //   right: 10%;
  //   max-width: 1400px;
  // }
`;

const InputContainer = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  && {
    padding: 8px;
    margin-left: 10px;
    border-radius: 20px;
    background-color: #212121;
  }
`;

const EmojiButton = styled(StyledButton)`
  && {
    padding: 4px;
    background-color: #f3f3f3;
  }
`;

const EmojiIcon = styled.span`
  font-size: 20px;
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 70px;
  right: 10px;
`;
