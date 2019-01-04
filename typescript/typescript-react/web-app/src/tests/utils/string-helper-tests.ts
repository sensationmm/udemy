import {StringHelper} from "./../../scripts/utils";
import * as assert from "assert";

describe("StringHelper", () => {
    describe("#isUndefinedOrWhitespace()", () => {
        it("should return true for null", () => {
            assert.equal(StringHelper.isUndefinedOrWhitespace(null as any), true);
        });

        it("should return true for undefined", () => {
            assert.equal(StringHelper.isUndefinedOrWhitespace(undefined), true);
        });

        it("should return true for an empty string", () => {
            assert.equal(StringHelper.isUndefinedOrWhitespace(""), true);
        });

        it("should return true for a string with only whitepsace", () => {
            assert.equal(StringHelper.isUndefinedOrWhitespace(" "), true);
        });

        it("should return false for a string with something other than whitepsace", () => {
            assert.equal(StringHelper.isUndefinedOrWhitespace("  d   "), false);
        });
    });
});
