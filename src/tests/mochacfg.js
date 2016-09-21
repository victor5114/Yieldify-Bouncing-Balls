require.extensions['.png'] = function ignorePNG() { return null; };
require.extensions['.jpg'] = function ignoreJPEG() { return null; };
require.extensions['.svg'] = function ignoreSVG() { return null; };
require.extensions['.css'] = function ignoreCSS() { return null; };
require.extensions['.scss'] = function ignoreSCSS() { return null; };
