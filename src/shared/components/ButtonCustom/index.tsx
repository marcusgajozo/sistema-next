import { ButtonBase, styled } from "@mui/material";

type ButtonCustomProps = {
  title: string;
  functionCustom?: () => void;
};

const ButtonCustomStyled = styled(ButtonBase)(({ disabled }) => ({
  padding: "10px 30px",
  backgroundColor: disabled === true ? "#d7d5d6" : "#1976d2",
  color: disabled === true ? "#8e8e91" : "#FFFFFF",
  fontSize: 16,
  borderRadius: "4px",
}));

const ButtonCustom = ({ title, functionCustom }: ButtonCustomProps) => {
  return (
    <ButtonCustomStyled onClick={functionCustom}>{title}</ButtonCustomStyled>
  );
};

export default ButtonCustom;
