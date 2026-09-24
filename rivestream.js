export const meta = {
  id: "rivestream-embed-api",
  name: "Rivestream Provider",
  version: "1.0.0",
  supportedTypes: ["movie", "tv"]
};

// Nuvio automatically sends the TMDB ID here when you click a movie on your TV
export function getStreams(mediaInfo) {
  const type = mediaInfo.type;
  const id = mediaInfo.tmdbId;
  const season = mediaInfo.season;
  const episode = mediaInfo.episode;

  let streamUrl = "";

  // Formats the links exactly how Rivestream's API requires them
  if (type === "movie") {
    streamUrl = "https://rivestream.app" + id;
  } else if (type === "tv") {
    streamUrl = "https://rivestream.app" + id + "&season=" + season + "&episode=" + episode;
  }

  // Sends the formatted player window back to your Nuvio app
  return Promise.resolve([
    {
      name: "Rivestream Aggregator Server",
      title: mediaInfo.title || "Play Video",
      url: streamUrl,
      type: "url"
    }
  ]);
}
