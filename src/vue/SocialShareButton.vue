<template>
	<a
		:href="shareUrl"
		target="_blank"
		rel="noopener noreferrer"
		:class="`ss-btn ss-${network}`"
		:style="buttonStyle"
	>
		<slot />
		<span v-if="showLabel">{{ meta?.label }}</span>
	</a>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, CSSProperties } from "vue";
import { getShareUrl, networks } from "../core/index";
import type { NetworkKey } from "../core/types";

export default defineComponent({
	name: "SocialShareButton",
	props: {
		network: { type: String as PropType<NetworkKey>, required: true },
		link: { type: String, required: true },
		text: { type: String, default: "" },
		subject: { type: String, default: "" },
		showLabel: { type: Boolean, default: true },
		customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
	},
	setup(props) {
		const meta = computed(() => networks[props.network] ?? null);

		const shareUrl = computed(() =>
			getShareUrl(props.network, {
				link: props.link,
				text: props.text,
				subject: props.subject,
			}),
		);

		const buttonStyle = computed<CSSProperties>(() => ({
			display: "inline-flex",
			alignItems: "center",
			gap: "6px",
			padding: "8px 14px",
			borderRadius: "6px",
			backgroundColor: meta.value?.color ?? "#333",
			color: "#fff",
			textDecoration: "none",
			fontFamily: "sans-serif",
			fontSize: "14px",
			fontWeight: 500,
			cursor: "pointer",
			...props.customStyle,
		}));

		return { meta, shareUrl, buttonStyle };
	},
});
</script>
