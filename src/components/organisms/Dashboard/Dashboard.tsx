import {
  CalendarToday,
  Email,
  Home,
  Map,
  NotificationAdd,
  People,
  Person,
  PersonAdd,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIconTypeMap,
  TextField,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { useEffect, useState } from "react";
import { TenantProvider } from "../../Providers/Tenants/TenantProvider";
import { TenantDrawerInput } from "../../molecules/InputGroups/TenantDrawerInput";
import { Tenant, getTenants } from "../../../clients/tenant";
import { TenantGrid } from "../../molecules/TenantGrid/TenantGrid";

export enum MenuItems {
  Tenants = "Tenants",
  Owners = "Owners",
  Properties = "Properties",
  Schedule = "Schedule",
  Maps = "Maps",
}

type MenuItemProps = {
  text: MenuItems;
  Icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string;
  };
  setSelected: React.Dispatch<React.SetStateAction<MenuItems>>;
};

const MenuItem = ({ text, Icon, setSelected }: MenuItemProps) => {
  return (
    <ListItem>
      <ListItemButton onClick={() => setSelected(text)}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export const Dashboard = () => {
  const [selected, setSelected] = useState<MenuItems>(MenuItems.Tenants);
  const [open, setOpen] = useState(false);

  const setProviderOnSelected = (text: MenuItems) => {
    switch (text) {
      case MenuItems.Tenants:
        return TenantProvider;
      case MenuItems.Owners:
        break;
      case MenuItems.Properties:
        break;
      case MenuItems.Schedule:
        break;
      case MenuItems.Maps:
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ width: 240 }}
        PaperProps={{ sx: { width: 240 } }}
      >
        <List>
          <MenuItem
            text={MenuItems.Tenants}
            Icon={Person}
            setSelected={setSelected}
          />
          <MenuItem
            text={MenuItems.Owners}
            Icon={People}
            setSelected={setSelected}
          />
          <MenuItem
            text={MenuItems.Properties}
            Icon={Home}
            setSelected={setSelected}
          />
          <MenuItem
            text={MenuItems.Schedule}
            Icon={CalendarToday}
            setSelected={setSelected}
          />
          <MenuItem
            text={MenuItems.Maps}
            Icon={Map}
            setSelected={setSelected}
          />
        </List>
      </Drawer>
      <Grid
        container
        direction={"column"}
        sx={{
          display: "flex",
          minWidth: "calc(100vw - 240px)",
          height: "100vh",
          padding: 0,
        }}
      >
        <Grid container sx={{ padding: 0, flex: "0 1 10vh" }}>
          <Grid item xs={3}>
            <h3>{selected}</h3>
          </Grid>
          <Grid item xs={9}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <IconButton aria-label="Email all tenants">
                <Email color="info" />
              </IconButton>
              <IconButton aria-label="Notify">
                <NotificationAdd color="info" />
              </IconButton>
              <IconButton
                aria-label="Add New Tenant"
                onClick={() => setOpen(true)}
              >
                <PersonAdd color="info" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            Selected Tenant
          </Grid>
          <Grid item xs={6}>
            Actions to Selected Tenant
          </Grid>
        </Grid>
        <Grid container sx={{ flex: "0 1 85vh"}}>
          <TenantGrid />
        </Grid>
        <Grid container sx={{ padding: 0, flex: "0 1 5vh" }}>
          Content Footer
        </Grid>
      </Grid>
      <Drawer
        PaperProps={{ sx: { width: "50%" } }}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        {selected === MenuItems.Tenants 
          ? <TenantDrawerInput />
          : null
         }
      </Drawer>
    </Box>
  );
};
