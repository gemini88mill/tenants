import { CalendarToday, Home, Map, People, Person } from "@mui/icons-material";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { FormType } from "../../../types/formConfiguration.types";

export enum MenuItems {
  Tenants = "Tenants",
  Owners = "Owners",
  Properties = "Properties",
  Schedule = "Schedule",
  Maps = "Maps",
}

type MenuItemProps = {
  text: FormType;
  Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
  };
  onClick: (item: FormType) => void;
};

const MenuItem = ({ text, Icon, onClick }: MenuItemProps) => {
  return (
    <ListItem>
      <ListItemButton onClick={() => onClick(text)}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

type NavMenuProps = {
  selected: FormType;
  onNavClick: (item: FormType) => void;
};

export const NavMenu = ({onNavClick}: NavMenuProps) => {

  return (
    <Drawer
    variant="permanent"
    anchor="left"
    sx={{ width: 240 }}
    PaperProps={{ sx: { width: 240 } }}
  >
    <List>
      <MenuItem
        text={FormType.Tenant}
        Icon={Person}
        onClick={onNavClick}
      />
      <MenuItem
        text={FormType.Owner}
        Icon={People}
        onClick={onNavClick}
      />
      <MenuItem
        text={FormType.Property}
        Icon={Home}
        onClick={onNavClick}
      />
      <MenuItem
        text={FormType.Schedule}
        Icon={CalendarToday}
        onClick={onNavClick}
      />
      <MenuItem
        text={FormType.Map}
        Icon={Map}
        onClick={onNavClick}
      />
    </List>
  </Drawer>
  );
};