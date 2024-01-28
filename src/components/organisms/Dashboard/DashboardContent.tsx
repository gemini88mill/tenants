import { Grid } from "@mui/material";
import { TenantGrid } from "../../molecules/TenantGrid/TenantGrid";

export const DashboardContent = () => {
  return (
    <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>
      <TenantGrid />
    </Grid>
  );
};