# social-share-js

A lightweight, fully typed social share library for **React** and **Vue** with zero runtime dependencies.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
  - [React](#react)
  - [Vue](#vue)
- [Components](#components)
  - [SocialShareButton](#socialsharebuttonprops)
  - [SocialShareBox](#socialsharebox-props)
- [Core API](#core-api)
  - [getShareUrl](#getshareurlnetwork-options)
  - [getShareUrls](#getshareurlsnetworks-options)
  - [getSupportedNetworks](#getsupportednetworks)
- [Supported Networks](#supported-networks)
- [TypeScript](#typescript)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```bash
npm install social-share-js
```

---

## Quick Start

### React

```tsx
import { SocialShareBox, SocialShareButton } from "social-share-js/react";

function App() {
  return (
    <>
      {/* Render a full row of share buttons */}
      <SocialShareBox
        link="https://example.com"
        socials={["facebook", "twitter", "whatsapp"]}
        text="Check this out!"
      />

      {/* Render a single share button */}
      <SocialShareButton
        network="telegram"
        link="https://example.com"
        text="Share on Telegram"
      />
    </>
  );
}
```

---

### Vue

**Register globally as a plugin:**

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import SocialShare from "social-share-js/vue";

createApp(App).use(SocialShare).mount("#app");
```

```vue
<!-- Any component -->
<template>
  <SocialShareBox
    link="https://example.com"
    :socials="['facebook', 'twitter', 'whatsapp']"
    text="Check this out!"
  />
</template>
```

**Or import per component:**

```vue
<template>
  <SocialShareBox link="https://example.com" />
  <SocialShareButton network="telegram" link="https://example.com" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SocialShareBox, SocialShareButton } from "social-share-js/vue";

export default defineComponent({
  components: { SocialShareBox, SocialShareButton },
});
</script>
```

---

## Components

### `SocialShareButton` Props

Renders a single share button for one social network.

| Prop          | Type                  | Default     | Required | Description                          |
| ------------- | --------------------- | ----------- | -------- | ------------------------------------ |
| `network`     | `NetworkKey`          | —           | ✅       | The social network to share to       |
| `link`        | `string`              | —           | ✅       | The URL to share                     |
| `text`        | `string`              | `""`        | ❌       | Share text or tweet body             |
| `subject`     | `string`              | `""`        | ❌       | Email subject (used with `email`)    |
| `showLabel`   | `boolean`             | `true`      | ❌       | Show the network name next to icon   |
| `style`       | `CSSProperties`       | `{}`        | ❌       | Override button inline styles        |
| `className`   | `string`              | `""`        | ❌       | Add extra CSS class to button        |

**Example:**

```tsx
<SocialShareButton
  network="whatsapp"
  link="https://example.com"
  text="Hey, check this out!"
  showLabel={false}
  style={{ borderRadius: "50px" }}
/>
```

---

### `SocialShareBox` Props

Renders a row (or column) of multiple share buttons.

| Prop          | Type              | Default     | Required | Description                                    |
| ------------- | ----------------- | ----------- | -------- | ---------------------------------------------- |
| `link`        | `string`          | —           | ✅       | The URL to share                               |
| `socials`     | `NetworkKey[]`    | all         | ❌       | List of networks to show. Defaults to all      |
| `text`        | `string`          | `""`        | ❌       | Share text passed to every button              |
| `subject`     | `string`          | `""`        | ❌       | Email subject passed to every button           |
| `showLabel`   | `boolean`         | `true`      | ❌       | Show network names on all buttons              |
| `direction`   | `"row" \| "column"` | `"row"`   | ❌       | Flex direction of the button container         |
| `gap`         | `string`          | `"8px"`     | ❌       | Gap between buttons                            |
| `buttonStyle` | `CSSProperties`   | `{}`        | ❌       | Override inline styles on every button         |
| `className`   | `string`          | `""`        | ❌       | Add extra CSS class to the wrapper             |
| `style`       | `CSSProperties`   | `{}`        | ❌       | Override inline styles on the wrapper          |

**Example:**

```tsx
<SocialShareBox
  link="https://example.com"
  socials={["facebook", "twitter", "linkedin", "whatsapp"]}
  text="Check this out!"
  direction="row"
  gap="12px"
  showLabel={true}
  buttonStyle={{ borderRadius: "8px", fontSize: "13px" }}
/>
```

---

## Core API

The core package is framework-agnostic and can be used in any Node.js or browser environment.

```ts
import { getShareUrl, getShareUrls, getSupportedNetworks } from "social-share-js";
```

---

### `getShareUrl(network, options)`

Returns the share URL for a single network.

**Parameters:**

| Name              | Type           | Required | Description                  |
| ----------------- | -------------- | -------- | ---------------------------- |
| `network`         | `NetworkKey`   | ✅       | The social network key       |
| `options.link`    | `string`       | ✅       | The URL to share             |
| `options.text`    | `string`       | ❌       | Share text or tweet body     |
| `options.subject` | `string`       | ❌       | Email subject                |
| `options.body`    | `string`       | ❌       | Email body                   |
| `options.title`   | `string`       | ❌       | Page title (Pinterest, Reddit) |
| `options.media`   | `string`       | ❌       | Image URL (Pinterest)        |

**Returns:** `string`

**Example:**

```ts
const url = getShareUrl("twitter", {
  link: "https://example.com",
  text: "Check this out!",
});

console.log(url);
// https://twitter.com/intent/tweet?url=https%3A%2F%2Fexample.com&text=Check%20this%20out!
```

**Throws:**
- If `network` is not a supported key
- If `options.link` is empty

---

### `getShareUrls(networks, options)`

Returns share URLs for multiple networks at once.

**Parameters:**

| Name       | Type                   | Required | Description                                     |
| ---------- | ---------------------- | -------- | ----------------------------------------------- |
| `networks` | `NetworkKey[] \| null` | ❌       | List of networks. Pass `null` to get all        |
| `options`  | `ShareOptions`         | ✅       | Same options as `getShareUrl`                   |

**Returns:** `Partial<Record<NetworkKey, string | null>>`

**Example:**

```ts
const urls = getShareUrls(["facebook", "twitter", "linkedin"], {
  link: "https://example.com",
  text: "Check this out!",
});

console.log(urls);
// {
//   facebook: "https://www.facebook.com/sharer/sharer.php?u=...",
//   twitter:  "https://twitter.com/intent/tweet?url=...",
//   linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=..."
// }
```

---

### `getSupportedNetworks()`

Returns metadata for all supported networks.

**Returns:** `NetworkInfo[]`

```ts
interface NetworkInfo {
  key: NetworkKey;
  label: string;
  color: string;
}
```

**Example:**

```ts
const networks = getSupportedNetworks();

console.log(networks);
// [
//   { key: "facebook", label: "Facebook", color: "#1877F2" },
//   { key: "twitter",  label: "Twitter / X", color: "#1DA1F2" },
//   ...
// ]
```

---

## Supported Networks

| Key         | Network       | Color     |
| ----------- | ------------- | --------- |
| `facebook`  | Facebook      | `#1877F2` |
| `twitter`   | Twitter / X   | `#1DA1F2` |
| `linkedin`  | LinkedIn      | `#0A66C2` |
| `whatsapp`  | WhatsApp      | `#25D366` |
| `telegram`  | Telegram      | `#229ED9` |
| `pinterest` | Pinterest     | `#E60023` |
| `reddit`    | Reddit        | `#FF4500` |
| `email`     | Email         | `#6B7280` |
| `sms`       | SMS           | `#34D399` |
| `viber`     | Viber         | `#7360F2` |

---

## TypeScript

The library ships with full type definitions. All types are exported from each entry point.

```ts
import type {
  NetworkKey,
  ShareOptions,
  NetworkInfo,
  SocialShareButtonProps,
  SocialShareBoxProps,
} from "social-share-js";
```

**`NetworkKey`** — union of all valid network keys:

```ts
type NetworkKey =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "whatsapp"
  | "telegram"
  | "pinterest"
  | "reddit"
  | "email"
  | "sms"
  | "viber";
```

**`ShareOptions`** — options accepted by `getShareUrl`:

```ts
interface ShareOptions {
  link: string;
  text?: string;
  subject?: string;
  body?: string;
  media?: string;
  title?: string;
}
```

---

## For Developers

[Conrtibuting](./Docs/CONTRIBUTING.md)


## License

[MIT](./LICENSE)