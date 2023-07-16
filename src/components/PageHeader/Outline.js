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
        children: ['TUS by the numbers', 'The Myth of Negativity'],
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

function createRoute(item, child) {
    return 'head#child'.replace('head', transformRouteString(item.name)).replace('child', transformRouteString(child));
}

export { OUTLINE, getHomeName, isHome, transformRouteString, createRoute };
