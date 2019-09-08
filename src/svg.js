import { writable } from "svelte/store";

export const dataStore = writable("");

export function getSvg(code, options) {
  const params = Object.assign(
    {
      icon: false,
      native: false,
      ref: true,
      titleProp: false,
      expandProps: "end",
      replaceAttrValues: {},
      svgProps: {},
      svgo: true,
      svgoConfig: { plugins: [{ removeTitle: false }] },
      prettier: true,
      prettierConfig: { semi: false }
    },
    options
  );
  return fetch("https://svgr.now.sh/api/svgr", {
    credentials: "omit",
    headers: {
      "content-type": "application/json",
      "sec-fetch-mode": "cors"
    },
    referrerPolicy: "no-referrer-when-downgrade",
    body: JSON.stringify({
      code: code,
      options: params
    }),
    method: "POST",
    mode: "cors"
  })
    .then(rsp => rsp.json())
    .then(el => el.output);
}
window.onmessage = async event => {
  if (event.data.pluginMessage.type === "networkRequest") {
    dataStore.set(event.data.pluginMessage.data);
  }
};
