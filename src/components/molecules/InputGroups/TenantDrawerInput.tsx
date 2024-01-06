import { Box, Button } from "@mui/material";
import {
  TenantProvider
} from "../../Providers/Tenants/TenantProvider";
import { AddressInput } from "./AddressInput";
import { PersonalInput } from "./PersonalInput";

export const TenantDrawerInput = () => {
  return (
    <TenantProvider>
      <Box sx={{ padding: "5px 10px" }}>
        <h5>Personal Information</h5>
        <PersonalInput />
      </Box>
      <Box sx={{ padding: "5px 10px" }}>
        <h5>Address</h5>
        <AddressInput />
      </Box>
      <Box sx={{ padding: "5px 10px", textAlign: "right" }}>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </TenantProvider>
  );
};




