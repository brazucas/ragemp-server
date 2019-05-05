import { AppPage } from './app.po';
describe('new App', function () {
    var page;
    beforeEach(function () {
        page = new AppPage();
    });
    it('should be blank', function () {
        page.navigateTo();
        expect(page.getParagraphText()).toContain('The world is your oyster.');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map