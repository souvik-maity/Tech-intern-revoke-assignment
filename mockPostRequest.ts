export async function mockPostRequest(url: string, payload: unknown) {
  console.log(`POST to ${url}`);
  console.log(JSON.stringify(payload, null, 2));
}
