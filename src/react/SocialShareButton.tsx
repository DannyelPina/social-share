import React, { CSSProperties } from "react";
import { getShareUrl, networks } from "../core/index";
import type { SocialShareButtonProps } from "../core/types";

interface Props extends SocialShareButtonProps {
	style?: CSSProperties;
	className?: string;
	children?: React.ReactNode;
}

export function SocialShareButton({
	network,
	link,
	text = "",
	subject = "",
	showLabel = true,
	style = {},
	className = "",
	children,
}: Props) {
	const meta = networks[network];
	if (!meta) return null;

	const href = getShareUrl(network, { link, text, subject });

	const baseStyle: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: "6px",
		padding: "8px 14px",
		borderRadius: "6px",
		backgroundColor: meta.color,
		color: "#fff",
		textDecoration: "none",
		fontFamily: "sans-serif",
		fontSize: "14px",
		fontWeight: 500,
		cursor: "pointer",
		...style,
	};

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			style={baseStyle}
			className={`ss-btn ss-${network} ${className}`.trim()}
		>
			{children}
			{showLabel && <span>{meta.label}</span>}
		</a>
	);
}
