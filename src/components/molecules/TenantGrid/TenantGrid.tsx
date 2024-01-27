import { Edit, Notifications } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Tenant, Tenants, getTenants } from "../../../clients/tenant";

const TenantItem = ({ tenant }: { tenant: Tenant }) => {

  const toDate = (date: string) => {
    if (date === "") return "";

    return new Date(date).toLocaleDateString();
  };

  return (
    <Box sx={{
      width: 1,
      ":hover": {
        backgroundColor: "#3f3f3f",
        cursor: "pointer",
        "& h2": {
          color: "#ffffff",
        },
        "& p": {
          color: "#ffffff",
        },
      }
      }}>
      <Grid container spacing={2} alignItems={"baseline"} maxWidth={1}>
        <Grid item xs={7} textAlign={"start"}>
          <small>Name</small>
          <Stack direction={"row"} spacing={2} alignItems={"baseline"}>
            <h2>{tenant.profiles?.last_name}</h2>
            <p>{tenant.profiles?.first_name}</p>
          </Stack>
        </Grid>
        <Grid item xs={5} textAlign={"start"}>
          <small>Address</small>
          <Stack direction={"column"} spacing={2} alignItems={"baseline"}>
            <p>{tenant.addresses?.street_address}, {tenant.addresses?.city}, {tenant.addresses?.state_province}</p>
          </Stack>
        </Grid>
        <Grid container item spacing={2} alignItems={"baseline"} padding={"10px"}>
          <Grid item xs={8} textAlign={"start"}>
            <small>Lease</small>
            <p>{toDate(tenant.lease_start_date ?? "")} - {toDate(tenant.lease_end_date ?? "")}</p>
          </Grid>
          <Grid item xs={4}>
            <Button sx={{marginLeft: "10px"}} variant={"contained"} endIcon={<Edit />}>Edit Tenant</Button>
            <Button sx={{marginLeft: "10px"}} variant={"contained"} endIcon={<Notifications/>}>Send Notification</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
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
    <Stack sx={{ margin: 0, width: 1, height: "auto" }}>
      {
        tenants.map((tenant) => {
          return <TenantItem key={tenant.tenant_id} tenant={tenant} />
        })
      }
      <Divider orientation="horizontal" />
    </Stack>
  );
};