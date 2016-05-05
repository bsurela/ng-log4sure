/**
 * Created by bsurela on 5/13/15.
 */
(function () {
    'use strict';

    angular.module('ng-log4sure', []).factory('$l4s', function () {
        var $l4s = {connectedToServer: false};
        var server = null;

        $l4s.init = function (options) {
            if (!options || !options.token) {
                console.error('log4sure : token is required for init');
            } else {
                try {
                    server = new LogServer(options.token);
                    $l4s.connectedToServer = true;
                } catch (e) {
                    console.error('log4sure : log4sure not found, this error usually occurs if you have not included log4sure.min.js in your application');
                }
            }
        };
        $l4s.logText = function (logMessage) {
            if (server != null) {
                server.logText(logMessage)
            }
        };
        $l4s.logError = function (name, message, stack) {
            if (server != null) {
                server.logError(name, message, stack);
            }
        };
        $l4s.log = function (value1, value2, value3, value4, value5, value6, value7, value8, value9, value10) {
            if (server != null) {
                server.log(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10);
            }
        };
        return $l4s;
    }());

    angular.module('ng-log4sure').directive('l4sTrack', function ($l4s) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var event = attrs['l4sTrack'];
                element.bind(event, function () {
                    var elemId = this.id;
                    var identifier;
                    if (!elemId) {
                        var name = this.name;
                        identifier = name;
                    } else {
                        identifier = elemId;
                    }
                    $l4s.logText(identifier + ' fired an event ' + event);
                });
            }
        }
    });

})();
