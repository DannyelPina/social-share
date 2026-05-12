import type { App } from "vue";
import type { SocialShareButtonProps, SocialShareBoxProps, NetworkKey, ShareOptions, NetworkInfo } from "../core/types";

export declare const SocialShareButton: import("vue").DefineComponent<SocialShareButtonProps>;
export declare const SocialShareBox: import("vue").DefineComponent<SocialShareBoxProps>;

export type { NetworkKey, ShareOptions, NetworkInfo };

declare const plugin: { install(app: App): void };
export default plugin;