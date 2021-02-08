export default async function getCoordsByPostcode(
  postcode: string
): Promise<any> {
  try {
    const encodedPostcode = encodeURI(postcode);
    const response = await fetch(
      `http://api.postcodes.io/postcodes/${encodedPostcode}`
    );

    const { result, errors } = await response.json();

    if (response.ok && result) return result;
    else {
      return Promise.reject(new Error("No result available for posted query"));
    }
  } catch (e) {
    console.log(e);
  }
}
