const OUTLINE = [
    {
        name: 'Home',
        children: null,
        home: true,
    },
    {
        name: 'About',
        children: null,
    },
    {
        name: 'Legal',
        children: null,
    },
    {
        name: 'MetaData',
        children: ['TUS by the Numbers', 'The Myth of Negativity'],
        hashit: true,
    },
    {
        name: 'The Team',
        children: ['Raw Player Ratings', 'The Dependables', 'TUS Fan Favorites'],
    },
    {
        name: 'The Dugout',
        children: ['Raw Manager Ratings', 'Dead Man Walking'],
    },
    {
        name: 'Ratings Head2Head',
        children: ['WhoScored', 'The Media'],
    },
];

function getHomeName() {
    return OUTLINE.find(item => item.home).name;
}

function isHome(name) {
    return name === getHomeName();
}

function transformRouteString(string) {
    return string.toLowerCase().replaceAll(' ', '-');
}

function createRoute(item, child, hashit) {
    const connector_string = hashit ? '#' : '-';
    return transformRouteString(item.name) + connector_string + transformRouteString(child);
}

export { OUTLINE, getHomeName, isHome, transformRouteString, createRoute };
