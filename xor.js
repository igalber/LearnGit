const fullList = ["igal", "moshe", "yael", "david", "noam"];
const missingValueList = ["david", "moshe", "noam"];

function xorList(value) {
    if (!value || value.length == 0)
        return null;
    return value.reduce((acc, v) => acc ^ v);
};

function msb(value) {
    for (let i = 0; i < 32; i++)
        if (value >> i == 0)
            return i;
}

function findMissingValue(valueList, checkList) {
    switch (checkList.length - valueList.length) {
        case 1:
            return xorList(valueList) ^ xorList(checkList);
        case 2:
            const uv = xorList(valueList) ^ xorList(checkList);;
            const filterBy = (v) => v < 1 << (msb(uv) - 1);
            const u = findMissingValue(valueList.filter(filterBy), checkList.filter(filterBy));
            const v = uv ^ u;
            return [u, v];
        default:
            return null;
    }
};

function printList(list) {
    for (let index = 0; index < list.length; index++)
        console.log(list[index].toString(2));
    // console.log(`${index.toString(2)} msb: ${msb(index)} ${index} >= ${1 << (msb(index) - 1)} `)
};

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}



function leftPad(str, p = 4, ch = '0') {
    return (new Array(p - 1).fill(ch, 0, p - str.length)).join('').concat(str);
};

function binFormat(value, grpLen = 4, len = 64, ch = ' ') {
    const result = new Array(len / grpLen);
    for (let i = 0; i < result.length; i++) {
        result[i] = leftPad(((value >> (grpLen * (result.length - i - 1))) % (1 << (grpLen))).toString(2), grpLen);
    };
    return result.join(' ');
};
logBin = (val) => console.log(binFormat(val));
xor = (a, b) => hashCode(a) ^ hashCode(b);

logBin(hashCode("moshe"));