function getStreams(tmdbId, mediaType, season, episode) {
  var API_BASE = "https://scrapper.rivestream.app";
  var PROVIDERS = [
    "apex", "pulse", "solstice", "quasar", "primevids",
    "flowcast", "citadel", "guru", "asiacloud", "horizon", "hindicast"
  ];

  var headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Referer": "https://www.rivestream.app/",
    "Origin": "https://www.rivestream.app",
    "Accept": "application/json, text/plain, */*"
  };

  var requests = PROVIDERS.map(function (provider) {
    var url = API_BASE + "/api/provider?provider=" + provider + "&id=" + tmdbId;
    if (mediaType === "tv") {
      url += "&season=" + (season || 1) + "&episode=" + (episode || 1);
    }

    return fetch(url, { headers: headers })
      .then(function (res) {
        if (!res.ok) return [];
        return res.json();
      })
      .then(function (data) {
        if (!data || !data.data || !data.data.sources) return [];
        return data.data.sources
          .filter(function (s) {
            return s && s.url && s.url.indexOf("http") === 0;
          })
          .map(function (s) {
            return {
              name: "Rivestream - " + (s.source || provider),
              title: (s.quality || "Auto") + " • " + (s.format || "HLS").toUpperCase(),
              url: s.url,
              quality: s.quality || "Auto",
              headers: headers
            };
          });
      })
      .catch(function () {
        return [];
      });
  });

  return Promise.all(requests).then(function (results) {
    var streams = [];
    var seen = {};
    results.forEach(function (arr) {
      arr.forEach(function (s) {
        if (!seen[s.url]) {
          seen[s.url] = true;
          streams.push(s);
        }
      });
    });
    return streams;
  });
}

module.exports = { getStreams };
