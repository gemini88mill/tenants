import { Box, Button, ButtonGroup, Drawer } from "@mui/material";
import { useDrawerInputContext } from "../../contexts/DrawerInputContext";

type SideInputDrawerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * Drawer for inputting data based on the contexts given by the Dashboard, the drawer will have a FormContext which will
 * contain the type of Form that needs to be generated and the data that needs to be filled in.
 */
export const SideInputDrawer = ({ open, setOpen }: SideInputDrawerProps) => {
  const {state: {data}} = useDrawerInputContext();

  const fields = Object.keys(data);

  return (
    <Drawer
      PaperProps={{ sx: { width: "50%", padding: "10px" } }}
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
    >
      {
        fields.map((field) => {
          if (field === "profiles" || field === "addresses"){
            return (
              <Box key={field} width={1} paddingBottom={2}>
                {field}
              </Box>
            );
          }
        })
      }
      <Box width={1} paddingTop={2} display={"flex"} justifyContent={"flex-end"}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {/* <Button onClick={saveDataContext}>Submit</Button> */}
          <Button>Clear</Button>
        </ButtonGroup>
      </Box>
    </Drawer>
  );
};
