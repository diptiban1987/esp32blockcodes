// Helper to convert raw SVG XML into encoded data URI
export const svg = (raw) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(raw)}`;
