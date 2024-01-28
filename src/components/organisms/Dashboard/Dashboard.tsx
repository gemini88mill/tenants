import { Box, Grid } from "@mui/material";
import { useState } from "react";
import {
  FormAction,
  FormConfiguration,
  FormType,
} from "../../../../types/formConfiguration.types";
import { NavMenu } from "../../molecules/NavMenu";
import { SideInputDrawer } from "../Drawer/SideInputDrawer";
import { DashboardContent } from "./DashboardContent";
import { DashboardFooter } from "./DashboardFooter";
import { DashboardHeader } from "./DashboardHeader";
import { DrawerInputContextProvider } from "../../contexts/DrawerInputContext";
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

  //todo: move generic on DrawerInputContextProvider to data type prop. 

  return (
    <Box sx={{ display: "flex" }}>
      <NavMenu selected={selected} onNavClick={onNavClick} />
      <DrawerInputContextProvider<TenantFormData>
        data={{
          action: FormAction.Add,
          type: FormType.Tenant,
          data: {
            address: [
              {
                streetAddress: "",
                streerAddress2: "",
                city: "",
                stateProvince: "",
                postalCode: "",
                country: "",
                addressType: "",
              },
            ],
            personal: {
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              birthDate: new Date(),
              occupation: "",
            },
          },
        }}
      >
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
          <DashboardHeader
            selected={selected}
            createNewTenant={createNewTenant}
          />
          <DashboardContent selected={selected} />
          <DashboardFooter />
        </Grid>
        <SideInputDrawer open={open} setOpen={setOpen} />
      </DrawerInputContextProvider>
    </Box>
  );
};
