
import { localizeData } from "../../../index.js";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default () => {
    return localizeData({}, __dirname);
};
