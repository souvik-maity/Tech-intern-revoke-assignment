import { lienSecurities } from "./lienSecurities";
import { mockPostRequest } from "./mockPostRequest";


 //Interface for each individual lien security record
 
interface LienSecurity {
  pan: string;
  mobile: string;
  isin: string;
  rtaName: string;
  lienRefNo: string;
  lienUnits: number;
  lienSubRefNo: string;
}


 //Structure of the final payload we need to send
 
interface RevokePayload {
  pan: string;
  mobile: string;
  rtaName: string;
  lienRefNo: string;
  schemeDetails: {
    isin: string;
    lienUnits: number;
    lienSubRefNo: string;
  }[];
}

/**
 * For a given PAN and mobile number:
 * 1. Remove securities with lienUnits = 0
 * 2. Group the rest by rtaName + lienRefNo
 * 3. Create payloads and call the mock API for each group
 */
export async function prepareAndSubmitRevokeRequests(pan: string, mobile: string) {
  // Fetch all entries matching the PAN and mobile number
  const matching = lienSecurities.filter(s => s.pan === pan && s.mobile === mobile);

  if (matching.length === 0) {
    console.log(`No entries found for PAN: ${pan} and Mobile: ${mobile}. Please check the provided details.`);
    return;
  }

  // Separate valid entries (with lienUnits > 0) and entries to be skipped (lienUnits = 0)
  const filtered = matching.filter(s => s.lienUnits > 0);
  const skipped = matching.filter(s => s.lienUnits === 0);

  if (skipped.length > 0) {
    console.log("These entries were skipped because lienUnits are 0:");
    console.log(JSON.stringify(skipped, null, 2));
  }

  if (filtered.length === 0) {
    console.log(`All entries for PAN: ${pan} and Mobile: ${mobile} had lienUnits = 0. No action needed.`);
    return;
  }

  // Group the valid entries by rtaName and lienRefNo
  const grouped: { [key: string]: LienSecurity[] } = {};
  for (const sec of filtered) {
    const key = `${sec.rtaName}_${sec.lienRefNo}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(sec);
  }

  // Process each group and prepare the revoke request payload
  for (const groupKey in grouped) {
    const group = grouped[groupKey];
    const first = group[0]; // We'll use the first item to build the payload since they share rtaName and lienRefNo

    const payload: RevokePayload = {
      pan: first.pan,
      mobile: first.mobile,
      rtaName: first.rtaName,
      lienRefNo: first.lienRefNo,
      schemeDetails: group.map(s => ({
        isin: s.isin,
        lienUnits: s.lienUnits,
        lienSubRefNo: s.lienSubRefNo
      }))
    };

    try {
      // Simulating the API request to revoke lien
      await mockPostRequest("/revoke-lien", payload);
      console.log(`[✅ Success] Completed group ${first.rtaName}-${first.lienRefNo}`);
    } catch (err) {
      console.error(`[❌ Error] Failed to submit request for group ${first.rtaName}-${first.lienRefNo}:`, err);
    }
  }

  console.log('All valid requests have been processed.');
}

// Now Running the function with a sample PAN and mobile
prepareAndSubmitRevokeRequests("ABCDE1234F", "9876543210")
  .then(() => console.log('✅ All requests completed!'))
  .catch(err => console.error('❌ Overall process failed:', err));
