import { Box, Button, ButtonGroup, Drawer } from "@mui/material";
import { useFormContextProvider } from "../../contexts/FormContext";

type SideInputDrawerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Drawer for inputting data based on the contexts given by the Dashboard, the drawer will have a FormContext which will
 * contain the type of Form that needs to be generated and the data that needs to be filled in.
 */
export const SideInputDrawer = ({ open, setOpen }: SideInputDrawerProps) => {
  const { inputGroups } = useFormContextProvider();

  return (
    <Drawer
      PaperProps={{ sx: { width: "50%", padding: "10px" } }}
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box width={1}>
        {inputGroups.map((InputGroup, index) => {
          return <InputGroup key={index} />;
        })}
      </Box>
      <Box width={1} paddingTop={2} display={"flex"} justifyContent={"flex-end"}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button>Submit</Button>
          <Button>Clear</Button>
        </ButtonGroup>
      </Box>
    </Drawer>
  );
};