describe("poll", function () {
    server = null
    beforeEach(function () {
        server = sinon.fakeServer.create();
        jasmine.clock().install();
    });
    afterEach(function () {
        server.restore();
        jasmine.clock().uninstall();
    });

    it("should not retry when successful", function (done) {
        server.respondWith(
            'GET',
            'http://my/url',
            [200, { "Content-Type": "application/json" }, JSON.stringify({ hello: "world" })]
        );

        jQuery.poll('http://my/url', 100, (xhr, status, data) => {
            expect(data).toEqual({ hello: "world" });
            done();
            return true;
        })

        jasmine.clock().tick(101);
        server.respond();
    });

    it("should retry until successful", function (done) {
        var numCalls = 0;
        jQuery.poll('http://my/url', 100, (xhr, status, data) => {
            numCalls += 1;
            if(data.hello === 'world'){
              expect(numCalls).toBe(2)
              done();
              return true;
            }
        })
        jasmine.clock().tick(101);
        server.requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify({ hello: "worldx" }))
        jasmine.clock().tick(201);
        server.requests[1].respond(200, { "Content-Type": "application/json" }, JSON.stringify({ hello: "world" }))
    });
})