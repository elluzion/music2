import type { PageServerLoad } from "./$types";
import type { InstagramData } from "./types";

// Required headers example
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"; // Use this one or get your User-Agent from your browser

// Function to get instagram data from URL string
async function getInstagramGraphqlData(
  igId: string,
): Promise<InstagramData | undefined> {
  if (!igId) {
    return undefined;
  }

  // Fetch graphql data from instagram post
  const graphql = new URL(`https://www.instagram.com/api/graphql`);
  graphql.searchParams.set("variables", JSON.stringify({ shortcode: igId }));
  graphql.searchParams.set("doc_id", "10015901848480474");
  graphql.searchParams.set("lsd", "AVqbxe3J_YA");

  const response = await fetch(graphql, {
    method: "POST",
    headers: {
      "User-Agent": userAgent,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-FB-LSD": "AVqbxe3J_YA",
      "X-ASBD-ID": "129477",
      "Sec-Fetch-Site": "same-origin",
    },
  });

  const json = await response.json();
  const items = json?.data?.xdt_shortcode_media;

  return {
    Card: "player",
    ImageURL: items?.display_url,
    VideoURL: items?.video_url,
    URL: `https://www.instagram.com/reel/${igId}`,
    Caption: items?.edge_media_to_caption?.edges[0]?.node?.text,
    Width: items?.dimensions?.width,
    Height: items?.dimensions?.height,
  } as InstagramData;
}

export const load = (async ({ params: { reelId } }) => {
  return await getInstagramGraphqlData(reelId);
}) satisfies PageServerLoad;
