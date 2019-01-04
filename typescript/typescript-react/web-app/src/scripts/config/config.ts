import {ConfigStructure} from "./structure/config-structure";
import ConfigDefault from "./config-default";

let config: ConfigStructure;

// currently only one configuration. See the server-app which shows multiple configurations.
switch (process.env.NODE_ENV) {
    default:
        config = ConfigDefault;
        break;
}

export default config;
export {ConfigStructure};
