import { browser, by, element } from 'protractor';
var AppPage = /** @class */ (function () {
    function AppPage() {
    }
    AppPage.prototype.navigateTo = function () {
        return browser.get('/');
    };
    AppPage.prototype.getParagraphText = function () {
        return element(by.deepCss('app-root ion-content')).getText();
    };
    return AppPage;
}());
export { AppPage };
//# sourceMappingURL=app.po.js.map