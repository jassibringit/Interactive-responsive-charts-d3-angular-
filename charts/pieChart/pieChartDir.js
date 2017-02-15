(function() {
    "use strict";


    app.directive("pie", ["$timeout", "$window", function($timeout, $window) {

        function link(scope, element, attr) {

            console.log(element[0].clientHeight);
            var width = element[0].clientWidth,
                height = element[0].clientHeight,
                radius = (Math.min(width, height)) / 2 * 0.5,
                colors = d3.scale.ordinal().range(["#D67C7C", "#EFCC62", "#6AB469"]),
                barChartElement = angular.element("#firstChart"),
                dataReceived,
                dataToSend,
                updateData,
                piedata;

            var eventOnAttr = function() {
                var event = element.attr("event").toLowerCase();
                if (event === "hover" || event === "mouseover" || event === undefined) {
                    return "mouseover";
                }
                if (event == "click") {
                    return "click";
                } else {
                    return "mouseover";
                }
            }();


            if (attr.bindto !== undefined) {
                piedata = JSON.parse(angular.element("#" + attr.bindto).attr("chart-data"));
            } else {
                piedata = scope.data;
            }


            scope.$watch(function() {
                return element.attr("filter");
            }, function(newValue, oldValue) {

                if (newValue) {
                    dataReceived = JSON.parse(newValue);

                    updateData = piedata.filter(function(t) {


                        if (dataReceived.indexOf(t[0]) !== -1)
                            return true;
                        else
                            return false;
                    }); //filter

                    var finalData = updateData.reduce(function(c, e) {

                        _.map(e[1], function(v, k) {

                            var i = c.findIndex(function(e) {
                                return e[0] == k;
                            });
                            if (i === -1)
                                c.push([k, v]);
                            else
                                c[i][1] += v;
                        });

                        return c;
                    }, []);

                    update(finalData);
                } else {
                    update(arrSum);

                }

            });

            var newSum = ["low", "mid", "high"].map(function(d) {
                return {
                    type: d,
                    freq: d3.sum(piedata.map(function(t) {
                        return t[1][d];
                    }))
                };

            });

            //defult value for bars when not hovering over the pie
            var arrSum = _.map(newSum, function(d) {
                return [d.type, d.freq];
            });

            console.log("summmm", arrSum);

            // d3 pie layout
            var pie = d3.layout.pie()
                .value(function(d) {
                    return d[1];
                });
            // defining arc for our pie chart
            var arc = d3.svg.arc()
                .outerRadius(radius);

            // appending svg   
            var svg = d3.select(element[0]).append("svg")
                .attr("width", width)
                .attr("class", "pi-chart")
                .attr("height", height);

            var group = svg.append("g");
            //binding data 
            group.selectAll("path").data(pie(arrSum))
                .enter().append("g")
                .attr("class", "slice");

            var slices = d3.selectAll("g.slice")
                .append("path")
                .attr("class", "path")
                .attr("fill", function(d, i) {
                    return colors(i);
                })
                .attr("d", arc)
                //sending data  to mouseover. Diffrent data will be send on each diffrent slice
                .each(function(d) {
                    this.d = d;
                })
                //on mouseover setting attribute,containing data, on bar chart element
                .on(eventOnAttr, function(d) {
                    // var hoverColor = d3.select(this).style("fill");
                    function setFilerNull(d) {
                        scope.$apply(function() {
                            barChartElement.attr("filter", null);
                        });
                    }

                    function setFilter(d, hoverColor) {
                        scope.$apply(function() {
                            dataToSend = [d.data[0], hoverColor];
                            //parsing our data because attr only accept string values
                            var stringData = JSON.stringify(dataToSend);
                            //setting attr
                            barChartElement.attr("filter", stringData);
                        });
                    }


                    if (eventOnAttr == "mouseover") {
                        slices.on(eventOnAttr, function(d) {
                                var hoverColor = d3.select(this).style("fill");
                                setFilter(d, hoverColor)
                            })
                            .on("mouseout", setFilerNull);
                    }

                    // check if barchartElement has a filter attr on it

                    //if bar chart has a filter attr, remove it
                    if (eventOnAttr == "click") {
                        if (barChartElement.attr("filter")) {
                            setFilerNull(d);

                            // if filter attribute is not set
                            //set filter attribute
                        } else {
                            // set the filter attribute
                            var hoverColor = d3.select(this).style("fill");
                            setFilter(d, hoverColor)
                        }

                    }

                }); //on

            function update(updateData) {
                group.selectAll("path").data(pie(updateData))
                slices.attr("d", arc)
            }

            // addding text element to pie slices
            var text = d3.selectAll("g.slice")
                .append("text")
                .text(function(d, i) {
                    return d.data;
                })
                .attr("text-anchor", "start")
                .attr("fill", "white")
                .attr("transform", function(d) {
                    d.innerRadius = 0;
                    d.outerRadius = radius;
                    return "translate (" + arc.centroid(d) + ")";
                })

            // checking for window resize
            angular.element($window).on('resize', function() { scope.$apply(); });
            // watching the values when window resizes
            scope.$watch(function() {
                return element[0].clientHeight + element[0].clientWidth;
            }, function() {

                //rest is just getting new browser height and width and applying it
                width = element[0].clientWidth;
                height = element[0].clientHeight;

                radius = (Math.min(width, height)) / 2 * 0.9,

                    svg.attr("width", width)
                    .attr("height", height);


                arc.outerRadius(radius);

                group.attr("transform", "translate (" + (width / 2) + "," + (height / 2) + ") ");

                slices.attr("d", arc);

                text
                    .text(function(d, i) {
                        return d.data[0];
                    })
                    .style("font-size", "12px");

            });
        } //link


        return {
            link: link,
            restrict: "EA",
            scope: { data: "="}

        };

    }]); //dir


})();
