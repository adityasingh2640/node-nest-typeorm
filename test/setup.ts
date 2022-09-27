import { rm } from "fs";
import { join } from "path";

global.beforeEach(() => {
    try {
        rm(join(__dirname, '..', 'db.sqlite_test'), () => { });
    }
    catch (error) {
    }
})