angular.module('ngVis', [])

    .factory('VisDataSet', function () {
        'use strict';
        return function (data, options) {
            // Create the new dataSets
            return new vis.DataSet(data, options);
        };
    })

    /**
     * Directive for network chart.
     */
    .directive('visNetwork', function () {
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function (scope, element, attr) {

                var networkEvents = [
                    'click',
                    'doubleclick',
                    'oncontext',
                    'hold',
                    'release',
                    'selectNode',
                    'selectEdge',
                    'deselectNode',
                    'deselectEdge',
                    'dragStart',
                    'dragging',
                    'dragEnd',
                    'hoverNode',
                    'blurNode',
                    'zoom',
                    'showPopup',
                    'hidePopup',
                    'startStabilizing',
                    'stabilizationProgress',
                    'stabilizationIterationsDone',
                    'stabilized',
                    'resize',
                    'initRedraw',
                    'beforeDrawing',
                    'afterDrawing',
                    'animationFinished',
                    'stopSimulation'

                ];
                var network = null;

                scope.$watch('data', function () {
                    // Sanity check
                    if (scope.data == null) {
                        return;
                    }

                    // If we've actually changed the data set, then recreate the graph
                    // We can always update the data by adding more data to the existing data set
                    if (network != null) {
                        network.destroy();
                    }
                    var parserOptions = {
                        edges: {
                            inheritColors: true
                        },
                        nodes: {
                            fixed: false,
                            parseColor: true
                        }
                    }
                    // parse the gephi file to receive an object
                    // containing nodes and edges in vis format.
                    var parsed = vis.network.convertGephi(scope.data, parserOptions);

                    angular.forEach(parsed.nodes, parse => {
                        console.log(parse.color);
                        parse.title = "<div class='panel' style='margin-bottom:0px; background-color:"+parse.color.background+";>"+
                                        "<div class='panel-heading'>" +
                                            "<h3 class='panel-title'>"+parse.label+"</h3>" +
                                        "</div>" +
                                     "</div>";
                        parse.label =  undefined;
                        parse.value = parse.size;
                        parse.shape = 'dot';
                        parse.scaling = {
                            min: 20,
                            max: 500,
                            customScalingFunction: function (min, max, total, value) {
                                if (max === min) {
                                    return 0.5;
                                }
                                else {
                                    var scale = 1 / (max - min);
                                    return Math.max(0, (value - min) * scale);
                                }
                            }
                        };
                    })
                    // provide data in the normal fashion
                    var data = {
                        nodes: parsed.nodes,
                        edges: parsed.edges
                    };

                    // Create the graph2d object
                    network = new vis.Network(element[0], data, scope.options);


                    // Attach an event handler if defined
                    angular.forEach(scope.events, function (callback, event) {
                        if (networkEvents.indexOf(String(event)) >= 0) {
                            network.on(event, callback);
                        }
                    });

                    network.on('selectNode', function (params) {

                    })

                    // onLoad callback
                    if (scope.events != null && scope.events.onload != null &&
                        angular.isFunction(scope.events.onload)) {
                        scope.events.onload(graph);
                    }


                });

                scope.$watchCollection('options', function (options) {
                    if (network == null) {
                        return;
                    }
                    network.setOptions(options);
                });

                scope.events.stopSimulation = function () {
                    if (network == null) {
                        return;
                    }
                    network.stopSimulation();
                }

                scope.events.startSimulation = function () {
                    if (network == null) {
                        return;
                    }
                    network.startSimulation();
                }
            }
        };
    });
