const generateImageUrl = imageUrl => {
    return `url(${process.env.PUBLIC_URL}/images/${imageUrl}.png)`;
};

export { generateImageUrl };
