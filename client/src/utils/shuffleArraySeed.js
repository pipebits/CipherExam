import { Buffer } from "buffer";

import seedrandom from "seedrandom";

function shuffleArraySeed(array, sha256Value) {
    const sha256Bytes = new Uint8Array(Buffer.from(sha256Value, 'hex'));

    const seed = sha256Bytes.reduce((acc, val) => acc + val, 0);

    const prng = new seedrandom(seed);

    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(prng() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

export default shuffleArraySeed;