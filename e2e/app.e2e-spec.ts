import { DTrackPage } from './app.po';

describe('abp-zero-template App', function () {
    let page: DTrackPage;

    beforeEach(() => {
        page = new DTrackPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        page.getCopyright().then(value => {
            expect(value).toEqual(new Date().getFullYear() + ' © DTrack.');
        });
    });
});
