import config from "../../config";

function generateImageLink(image: string): string {
	if (image.startsWith("/")) {
		return `${config.cdn.image.url}${image}`;
	} else {
		return `${config.cdn.image.url}/${image}`;
	}
}

export { generateImageLink };
