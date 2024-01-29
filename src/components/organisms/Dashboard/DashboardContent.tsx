import { Grid } from "@mui/material";
import { FormType } from "../../../../types/formConfiguration.types";
import { TenantGrid } from "../../molecules/TenantGrid/TenantGrid";

type DashboardContentProps = {
  selected: FormType;
};

export const DashboardContent = ({selected}: DashboardContentProps) => {

  switch (selected) {
    case FormType.Tenant:
      return (
        <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>          
          <TenantGrid />
        </Grid>
      );
    case FormType.Owner:
      return (
        <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>
          Owners not implemented yet
        </Grid>
      );
    case FormType.Property:
      return (
        <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>
          Properties not implemented yet
        </Grid>
      );
    case FormType.Schedule:
      return (
        <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>
          Schedule not implemented yet
        </Grid>
      );
    case FormType.Map:
      return (
        <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>
          Maps not implemented yet
        </Grid>
      );
    default:
      return (
        <Grid container sx={{ flex: "0 1 85vh", width: 1 }}>
          Tenants not implemented yet
        </Grid>
      );
  
  }
};