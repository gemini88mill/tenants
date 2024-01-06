import { useEffect, useState } from "react";
import { Tenant, Tenants, getTenants } from "../../../clients/tenant";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import { Edit, Label, Notifications } from "@mui/icons-material";

const TenantItem = ({ tenant }: { tenant: Tenant }) => {

  const toDate = (date: string) => {
    if (date === "") return "";

    return new Date(date).toLocaleDateString();
  };

  return (
    <Grid container spacing={2} alignItems={"baseline"}>
      <Grid item xs={7}>
        <Stack direction={"row"} spacing={2} alignItems={"baseline"}>
          <h2>{tenant.profiles?.last_name}</h2>
          <p>{tenant.profiles?.first_name}</p>
        </Stack>
      </Grid>
      <Grid item xs={5}>
        <Stack direction={"column"} spacing={2} alignItems={"baseline"}>
          <small>{tenant.addresses?.street_address}</small>
          <small>{tenant.addresses?.city}, {tenant.addresses?.state_province}</small>
        </Stack>
      </Grid>
      <Grid container spacing={2} alignItems={"baseline"} padding={"10px"}>
        <Grid item xs={8} textAlign={"start"}>
          <small>Lease</small>
          <p>{toDate(tenant.lease_start_date ?? "")} - {toDate(tenant.lease_end_date ?? "")}</p>
        </Grid>
        <Grid item xs={4}>
          <IconButton>
            <Edit />
          </IconButton>
          <IconButton>
            <Notifications />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export const TenantGrid = () => {
  const [tenants, setTenants] = useState<Tenants>([]);
  
  useEffect(() => {
    (async () => {
      const res = await getTenants();
      setTenants(res);
    })()
  }, []);

  return (
    <Stack sx={{padding: "10px", maxHeight: "50px" }}>
      {
        tenants.map((tenant) => {
          return <TenantItem key={tenant.tenant_id} tenant={tenant} />
        })
      }
    </Stack>
  );
};