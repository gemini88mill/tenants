import { Grid, IconButton, Stack } from "@mui/material";
import { FormType } from "../../../../types/formConfiguration.types";
import { Email, NotificationAdd, PersonAdd } from "@mui/icons-material";

type DashboardHeaderProps = {
  selected: FormType;
  createNewTenant: () => void;
};

export const DashboardHeader = ({selected, createNewTenant}: DashboardHeaderProps) => {
  return (
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
  );
};