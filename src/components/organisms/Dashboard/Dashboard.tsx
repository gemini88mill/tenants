import {
  Email,
  NotificationAdd,
  PersonAdd
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack
} from "@mui/material";
import { useState } from "react";
import { FormAction, FormConfiguration, FormType } from "../../../../types/formConfiguration.types";
import { FormContextProvider } from "../../contexts/FormContext";
import { NavMenu } from "../../molecules/NavMenu";
import { TenantGrid } from "../../molecules/TenantGrid/TenantGrid";
import { SideInputDrawer } from "../Drawer/SideInputDrawer";
import { DrawerFormContextProvider } from "../../contexts/DrawerFormContext";
import { Tenant } from "../../../clients/tenant";
import { TenantFormData } from "../../../../types/formData.types";

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
    const inputConfig:FormConfiguration = {
      formAction: FormAction.Add,
      formType: FormType.Tenant,
    };
    setInputConfig(inputConfig);
  };

  const onNavClick = (item: FormType) => {
    const inputConfig:FormConfiguration = {
      formAction: FormAction.Add,
      formType: item,
    };
    setInputConfig(inputConfig);
    setSelected(item);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavMenu selected={selected} onNavClick={onNavClick}/>
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
                onClick={() => createNewTenant()}
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
        <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>
          <TenantGrid />
        </Grid>
        <Grid container sx={{ padding: 0, flex: "0 1 5vh" }}>
          Content Footer
        </Grid>
      </Grid>
      {/* <FormContextProvider inputConfig={inputConfig}>
        <SideInputDrawer open={open} setOpen={setOpen} />
      </FormContextProvider> */}
      <DrawerFormContextProvider<TenantFormData> formData={{
        type: "tenant",
        action: "add"
      }} >
        <SideInputDrawer open={open} setOpen={setOpen} />
      </DrawerFormContextProvider>
    </Box>
  );
};
