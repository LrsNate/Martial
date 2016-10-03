import ChangelogAddDirective from './changelog-add.directive';
import ChangelogFixDirective from './changelog-fix.directive';
import ChangelogImproveDirective from './changelog-improve.directive';
import ChangelogRefactorDirective from './changelog-refactor.directive';

export default angular.module('myApp.changelogItems', [])
    .directive('changelogAdd', ChangelogAddDirective)
    .directive('changelogFix', ChangelogFixDirective)
    .directive('changelogImprove', ChangelogImproveDirective)
    .directive('changelogRefactor', ChangelogRefactorDirective);