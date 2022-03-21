import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import styled from "styled-components";
// assets
import bgImg1 from "../img/bg-1.jpg";

const StyledDropDown = styled.div`
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;
  margin-top: 2em;
  border-radius: 5px;

  div:first-child {
    color: white;
    background-color: ${({ theme }) => theme.colors.xiketic};
    padding: 1.5em 3em 1.5em 1.5em;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
    &::after {
      content: "+";
      position: absolute;
      right: 10%;
    }
  }

  ul {
    background-color: ${({ theme }) => theme.colors.selectiveYellow};
    display: flex;
    flex-direction: column;
    overflow: ${({ open }) => (open ? "auto" : "hidden")};
    max-height: 75%;
    border-radius: 0 0 5px 5px;

    li {
      transition: all 0.5s ease;
      padding: ${({ open }) =>
        open ? "1.5em 3em 1.5em 1.5em" : "0 3em 0 1.5em"};
      height: ${({ open }) => (open ? "50px" : "0px")};
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        transition: all 0.25s ease;
        color: white;
        background-color: ${({ theme }) => theme.colors.xiketic};
      }
    }
  }
`;

const StyledPage = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${bgImg1});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const Page = ({ title, dataArray, handleInputChange, name, next }) => {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  useClickOutside(dropDownRef, () => (open ? setOpen(false) : ""));

  return (
    <StyledPage>
      <StyledDropDown
        open={open}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <div>{title}</div>

        <ul ref={dropDownRef}>
          {dataArray.map((elem) => (
            <li
              key={elem.id}
              onClick={() => handleInputChange(name, elem.id, next)}
            >
              {elem.name}
            </li>
          ))}
        </ul>
      </StyledDropDown>
    </StyledPage>
  );
};

export default Page;
