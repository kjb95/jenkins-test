export const shortenText = (text: String, maxLength: number) => {
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength) + '...';
};
