function getStreams(tmdbId, mediaType, season, episode) {
  var base = "https://www.rivestream.app";
  var streamUrl = "";

  if (mediaType === "movie") {
    // Standard embed
    streamUrl = base + "/embed?type=movie&id=" + tmdbId;
    // Or use Aggregator: base + "/embed/agg?type=movie&id=" + tmdbId;
  } else if (mediaType === "tv") {
    streamUrl = base + "/embed?type=tv&id=" + tmdbId + "&season=" + season + "&episode=" + episode;
    // Or use Aggregator: base + "/embed/agg?type=tv&id=" + tmdbId + "&season=" + season + "&episode=" + episode;
  }

  return Promise.resolve([
    {
      name: "Rivestream",
      title: "Rivestream Player",
      url: streamUrl,
      type: "url",
      quality: "Auto"
    }
  ]);
}

module.exports = { getStreams };
