function getStreams(tmdbId, mediaType, season, episode) {
  var base = "https://www.rivestream.app";
  var streamUrl = "";

  if (mediaType === "movie") {
    streamUrl = base + "/embed/agg?type=movie&id=" + tmdbId;
  } else if (mediaType === "tv") {
    streamUrl = base + "/embed/agg?type=tv&id=" + tmdbId + "&season=" + season + "&episode=" + episode;
  }

  return Promise.resolve([
    {
      name: "Rivestream Aggregator",
      title: "Rivestream",
      url: streamUrl,
      quality: "Auto"
    }
  ]);
}

module.exports = { getStreams };
