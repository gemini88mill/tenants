import { Email, NotificationAdd, PersonAdd } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import {
  FormAction,
  FormConfiguration,
  FormType,
} from "../../../../types/formConfiguration.types";
import { TenantFormData } from "../../../../types/formData.types";
import { NavMenu } from "../../molecules/NavMenu";
import { TenantGrid } from "../../molecules/TenantGrid/TenantGrid";
import { SideInputDrawer } from "../Drawer/SideInputDrawer";
import { DashboardHeader } from "./DashboardHeader";

export enum MenuItems {
  Tenants = "Tenants",
  Owners = "Owners",
  Properties = "Properties",
  Schedule = "Schedule",
  Maps = "Maps",
}

export const Dashboard = () => {
  const [selected, setSelected] = useState<FormType>(FormType.Tenant);
  const [open, setOpen] = useState(false);
  const [inputConfig, setInputConfig] = useState<FormConfiguration>();

  const createNewTenant = () => {
    setOpen(true);
    const inputConfig: FormConfiguration = {
      formAction: FormAction.Add,
      formType: FormType.Tenant,
    };
    setInputConfig(inputConfig);
  };

  const onNavClick = (item: FormType) => {
    const inputConfig: FormConfiguration = {
      formAction: FormAction.Add,
      formType: item,
    };
    setInputConfig(inputConfig);
    setSelected(item);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavMenu selected={selected} onNavClick={onNavClick} />
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
        <DashboardHeader selected={selected} createNewTenant={createNewTenant} />
        <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>
          <TenantGrid />
        </Grid>
        <Grid container sx={{ padding: 0, flex: "0 1 5vh" }}>
          Content Footer
        </Grid>
      </Grid>
      <SideInputDrawer open={open} setOpen={setOpen} />
    </Box>
  );
};


