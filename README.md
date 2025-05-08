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
