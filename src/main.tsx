import r2wc from "@r2wc/react-to-web-component"

import App from "./App"

const WebApp = r2wc(App, {
  props: {
    name: "string",
    description: "string",
    buttonVariant: "string",
    colorMode: "string",
  },
})

customElements.define("web-app", WebApp)