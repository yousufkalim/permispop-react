let frontUrl = "";
let baseUrl = "";
let chatUrl = "";

if (window.location.host === "permispop.fr") {
  frontUrl = "https://permispop.fr";
  baseUrl = "https://api.permispop.fr/api/";
  chatUrl = "https://chat.permispop.fr";
} else if (window.location.host === "permispop-demo.web.app") {
  frontUrl = "https://permispop-demo.web.app";
  baseUrl = "https://permispop.falconit.com.pk/api/";
  chatUrl = "https://chat.permispop.fr";
} else {
  frontUrl = "http://localhost:3000/";
  baseUrl = "http://160.153.244.127:9090/api/";
  chatUrl = "http://160.153.244.127:9093";
}

module.exports = { frontUrl, baseUrl, chatUrl };
