import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// assets
import startBgImg from "../img/start-bg.jpg";

const StyledButton = styled.button`
  padding: 1.5em 3em;
  border-radius: 5px;
  border: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    transition: all 0.25s ease;
    color: white;
    background-color: ${({ theme }) => theme.colors.xiketic};
  }
`;

const StyledStart = styled.section`
  height: 100vh;
  width: 100%;
  background-image: url(${startBgImg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Start = () => {
  const navigate = useNavigate()

  return (
    <StyledStart>
      <StyledButton onClick={() => navigate("/type")}>Start</StyledButton>
    </StyledStart>
  );
};

export default Start;
