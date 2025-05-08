# 🧑‍💻 Intern Assignment: Revoke Request Preparation

## 🎯 Objective

You are given a list of pledged financial holdings. Your job is to:

1. Filter out entries where `lienUnits === 0`
2. Group the rest by `rtaName + lienRefNo`
3. Prepare payloads in the following format
4. Simulate an API call to revoke each group

---

## 📥 Input Structure (from lienSecurities.ts)

Each record has:

- `pan`: string  
- `mobile`: string  
- `isin`: string  
- `rtaName`: string  
- `lienRefNo`: string  
- `lienUnits`: number  
- `lienSubRefNo`: string  

---

## 📤 Payload Format (for each group)

Call the following payload:

```ts
{
  pan: string;
  mobile: string;
  rtaName: string;
  lienRefNo: string;
  schemeDetails: Array<{
    isin: string;
    lienUnits: number;
    lienSubRefNo: string;
  }>
}
```

Use:
```ts
mockPostRequest("/revoke-lien", payload)
```

---

## 🔧 Function to Complete

```ts
async function prepareAndSubmitRevokeRequests(pan: string, mobile: string)
```

Only process entries with `lienUnits > 0`. Group by `rtaName + lienRefNo`.

---

## ✅ Bonus (Optional)

- Use TypeScript types
- Log skipped entries (where lienUnits is 0)
- Add basic input validation
- Add try/catch for failed requests

---

## 🧪 Example

Input:

```ts
pan: "ABCDE1234F", mobile: "9876543210"
```

Expected POST (example):

```ts
{
  pan: "ABCDE1234F",
  mobile: "9876543210",
  rtaName: "CAMS",
  lienRefNo: "LR001",
  schemeDetails: [
    {
      isin: "INF109K01VQ5",
      lienUnits: 50,
      lienSubRefNo: "LS001"
    }
  ]
}
```

---

## 📦 Submission

- Zip and share your files or submit GitHub repo link.

---

**All the best!**

The most interesting yet challenging part for me was implementing the grouping logic for the securities. At first glance, it seemed simple - just group by rtaName and lienRefNo. But when I actually started coding, I faced some tricky parts:

1.The Grouping Mechanism:
I initially tried using array methods like reduce() but found the object-based approach (grouped: { [key: string]: LienSecurity[] }) to be more readable and efficient. Creating those composite keys like "CAMS_LR001" felt like solving a puzzle!

2.Handling Edge Cases:
I spent extra time making sure the code handled scenarios like:

->When all entries have lienUnits = 0

->When no entries match the PAN/mobile

->When a group has only one security

3.Type Safety:
Defining the RevokePayload interface was satisfying - it helped catch errors early when I accidentally tried to include wrong properties. The TypeScript compiler became my safety net.

4.The Mock API Simulation:
Making the async calls sequential with await was a good learning experience. I had to think carefully about where to place the try-catch blocks to ensure one failed request wouldn't stop the whole process.

The most rewarding moment was seeing the console log showing successful grouped requests with all the correct details. It made me appreciate how careful data transformation can turn messy raw data into clean, structured API payloads.
