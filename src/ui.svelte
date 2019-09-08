<script context="module">
  import hljs from "highlight.js/lib/highlight";
  import javascript from "highlight.js/lib/languages/javascript";
  import "highlight.js/styles/default.css";

  hljs.registerLanguage("javascript", javascript);
</script>

<script>
  import { dataStore, copyToClipboard, getSvg } from "./svg.js";
  import { debounce } from "lodash";

  let loading = false;
  let data;
  let item;
  let svgContent;
  let replaceAttr = "";
  let options = {};
  const load = debounce(async function({ replaceAttr }) {
    loading = true;
    const replaceAttrValues = replaceAttr.split(",").reduce((acc, el) => {
      let [key, value] = el.split("=");
      acc[key] = value;
      return acc;
    }, {});
    data = await getSvg($dataStore, {
      replaceAttrValues: replaceAttrValues
    });
    loading = false;
  }, 100);
  $: if ($dataStore) {
    load({ replaceAttr });
  }
</script>

<textarea
  bind:value={replaceAttr}
  rows="2"
  class="textarea"
  placeholder="Replace attributes" />
{#if loading && !data}
  <div class="visual-bell" style="position:absolute">
    <div class="visual-bell__spinner-container">
      <span class="visual-bell__spinner" />
    </div>
    <span class="visual-bell__msg">Loading data...</span>
  </div>
{/if}

{#if data}
  <pre class="jsx">
    <code>{data}</code>
  </pre>
{/if}
