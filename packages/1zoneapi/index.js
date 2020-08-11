const data = require("./data");
const mapArea = require("./mapArea");

/**
 * Returns the name of the area/zone at specified coords, ignores heights.
 * @param  {object} coords An object with "x" and "y" properties.
 * @return {string}        Zone name.
 */
mp.world.getNameOfZone2D = function(coords) {
    const { x, y } = coords;

    for (let i = 0; i < data.length; i++) {
        const { minX, minY, minZ, maxX, maxY, maxZ } = data[i].bounds;

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            return data[i].name;
        }
    }

    return "San Andreas";
};

/**
 * Returns the name of the area/zone at specified coords.
 * @param  {object} coords An object with "x", "y" and "z" properties, such as mp.Vector3.
 * @return {string}        Zone name.
 */
mp.world.getNameOfZone3D = function(coords) {
    const { x, y, z } = coords;

    for (let i = 0; i < data.length; i++) {
        const { minX, minY, minZ, maxX, maxY, maxZ } = data[i].bounds;

        if (x >= minX && x <= maxX && y >= minY && y <= maxY && z >= minZ && z <= maxZ) {
            return data[i].name;
        }
    }

    return "San Andreas";
};

/**
 * Returns the type of the area/zone at specified coords.
 * @param  {object} coords An object with "x" and "y" properties.
 * @return {string}        Zone type, either "city" or "countryside".
 */
mp.world.getTypeOfZone = function(coords) {
    const { x, y } = coords;

    for (let i = 0; i < mapArea.length; i++) {
        const { minX, minY, minZ, maxX, maxY, maxZ } = mapArea[i].bounds;

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
            return mapArea[i].type;
        }
    }

    return "countryside";
};

// (1.1.0) RAGEMP-like syntax
mp.world.zone = {
    getName2d: mp.world.getNameOfZone2D,
    getName3d: mp.world.getNameOfZone3D,
    getType: mp.world.getTypeOfZone
};