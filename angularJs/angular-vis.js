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

                Array.prototype.unique = function () {
                    var n = {}, r = [];
                    for (var i = 0; i < this.length; i++) {
                        if (!n[this[i]]) {
                            n[this[i]] = true;
                            r.push(this[i]);
                        }
                    }
                    return r;
                };

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
                        parse.title = "<div class='panel' style='margin:0px !important; background-color:" + parse.color.background + ";>" +
                            "<div class='panel-heading' style='margin:0px !important; background-color:" + parse.color.background + ";>" +
                            "<h3 class='panel-title'>" + parse.label + "</h3>" +
                            "</div>" +
                            "</div>";
                        parse.label = undefined;
                        parse.value = parse.size;
                        parse.shape = 'dot';
                        parse.color.highlight = {
                            background: "rgba(176,176,176,0.5)",
                            border: "rgba(176,176,176,0.5)"
                        };
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
                        if (params.nodes.length == 1) {
                            // On envoie à la fin les infos  sur le noeud
                            var sauvegarde = params;
                            

                            // On recupere d'abord tous les noeuds
                            var selectedEdges = parsed.edges.filter(edge => {
                                if (edge.from == params.nodes[0] || edge.to == params.nodes[0])
                                    return true;
                                return false;
                            })

                            // On recupere tous les noeuds directement lié au noeud selectionné
                            var nodesId = network.getConnectedNodes(params.nodes[0])
                            nodesId.push(params.nodes[0])

                            // On met en gris tous les autres noeuds: 
                            nodesIdNotSelected = [];
                            angular.forEach(parsed.nodes, node => {
                                //console.log(node);
                                if(!nodesId.includes(node.id))
                                    nodesIdNotSelected.push(node.id);
                            });

                            // Pareil pour les edges :
                            edgesIdNotSelected = [];
                            angular.forEach(parsed.edges, edge => {
                                if(!params.edges.includes(edge.id))
                                    edgesIdNotSelected.push(edge.id);
                            });

                            edgesIdNotSelected = edgesIdNotSelected.unique();
                            nodesIdNotSelected = nodesIdNotSelected.unique();
                            var object = {
                                nodes : nodesIdNotSelected,
                                edges : edgesIdNotSelected
                            }
                            network.unselectAll();
                            network.setSelection(object);
                            scope.events.getInformation(sauvegarde);
                        } else {
                            console.log("dans le else");
                        }
                    })

                    network.on('setSelection', function(params){
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
