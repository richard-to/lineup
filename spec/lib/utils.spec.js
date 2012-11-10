var utils = require('../../lib/utils');

describe("Utils", function() {
    it("Should replace file extension", function() {
        expect(utils.replaceFileExt('test.jpg', 'png')).toEqual('test.png');
    });
});