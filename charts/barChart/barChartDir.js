(function() {

    "use strict";

    app.directive("barChart", ["$timeout", "$window", function($timeout, $window) {

            function link(scope, element, attr) {
                var pieChartElement = angular.element("#secondChart"),
                    dataReceived,
                    updateData,
                    colorReceived,
                    dataToSend,
                    barColor = "brown",
                    temp;

                // check the event attr 
                // making it more configurable
                var eventOnAttr = function() {
                    var event = element.attr("event")
                    if (event === "hover" || event === "mouseover" || event === undefined) {
                        return "mouseover";
                    }
                    if (event == "click" || event == "Click") {
                        return "click";
                    } else {
                        return "mouseover";
                    }

                }();

                //watch for attr filter change on this element
                scope.$watch(function() {
                    return element.attr("filter");
                }, function(newValue, oldValue) {
                    // if the new value is there, pass that value into update function
                    if (newValue) {
                        dataReceived = JSON.parse(newValue);
                        updateData = bardata.map(function(t) {
                            return [t[0], t[1][dataReceived[0]]];
                        });
                        //get the color received from pie chart
                        colorReceived = dataReceived[1]

                        update(updateData, colorReceived);
                        //otherwise send the sumFreq into update
                    } else {
                        update(sumFreq);
                    }
                });



                // gettig the original data
                var bardata = scope.data;
                //putting the data as a string on attribute chart data
                element.attr("chart-data", JSON.stringify(bardata));

                // total sum of all the frequency for default value
                var sumFreq = bardata.map(function(item) {
                    return [item[0], _.reduce(item[1], function(sum, n) {
                        return sum + n;
                    }, 0)];
                });

                // extracting out the name from original data
                var hAxisPoints = bardata.map(function(t) {
                    return t[0];
                });

                var margin = { top: 30, right: 30, bottom: 40, left: 50 },
                    height = element[0].clientHeight - margin.top - margin.bottom,
                    width = element[0].clientWidth - margin.left - margin.right,
                    barWidth = 50,
                    barOffset = 5;

                // remapping height according to the data that we recieve
                var yScale = d3.scale.linear()
                    // .max takes an array of values.
                    // extracting out the values into one array because yScale only take an arrey of value
                    .domain([0, d3.max(sumFreq.map(function(item) {
                        return item;
                    }))])
                    .range([0, height]);

                // remapping width acording to the data that we receive(bars will resize them if we add more bars)
                var xScale = d3.scale.ordinal()
                    .domain(d3.range(0, sumFreq.length))
                    .rangeBands([0, width], 0.1);

                //in D3, any selection[0] contains the group                               
                //selection[0][0] is the DOM node
                var svg = d3.select(element[0]).append("svg")
                    .style("background", "white")
                    .attr('width', width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);

                var group = svg.append("g")
                    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
                    .selectAll("rect");

                var myChart = group.data(sumFreq)
                    .enter().append("rect")
                    .attr("fill", "brown")
                    //making height 0 beacuse we will animate the chart inside of the update function
                    .attr("height", 0)
                    .attr("y", height)
                    // grabed from the attr event


                .on(eventOnAttr, function(d) {
                        console.log("hello")
                            //grab the color for bar
                        temp = this.style.fill

                        console.log(this)
                            // d that is being passed to every function below is tha  actual data from .on event(sumfreq)
                            // temp = this.style.fill;

                        //if event given is mouseover there has to be mouseout
                        if (eventOnAttr == "mouseover") {
                            console.log(myChart)
                                //on mouseover
                            myChart.on(eventOnAttr, function(d) {
                                    d3.select(this)[0][0].style.fill = "green"
                                    setFilter(d)
                                })
                                //on mouseout 
                                .on("mouseout", function() {
                                    // set the color back
                                    d3.select(this)[0][0].style.fill = temp
                                    setFilterNull()
                                });

                            // handling if given event is click
                        }
                        if (eventOnAttr == "click") {

                            //when filter on pie is set
                            if (pieChartElement.attr("filter")) {

                                if (!(element.attr('filter'))) {
                                    console.log(this)

                                    setFilterNull();
                                    d3.select(this)[0][0].style.fill = barColor;
                                }

                                // if filter is not set, set it
                            } else {
                                d3.select(this)[0][0].style.fill = "#1C4489";
                                // if attr is not set , set it
                                setFilter(d);
                            }
                        }
                    }) //on


                function setFilterNull(d) {
                    scope.$apply(function() {
                        pieChartElement.attr("filter", null);
                    });
                }

                function setFilter(d) {
                    scope.$apply(function() {
                        dataToSend = [d[0]];
                        // dataToSend is a object.
                        // attr prop takes string values
                        var stringData = JSON.stringify(dataToSend)
                        pieChartElement.attr("filter", stringData);
                    });
                }



                function update(updateData, color) {
                    // //d3.max takes array of values
                    // extracting out the vales for the bar into an array
                    yScale.domain([0, d3.max(updateData.map(function(item) {
                        return item[1];
                    }))]);

                    //binding the new data
                    var bars = myChart.data(updateData)

                    // barAnim(updateData)
                    function animate() {

                        bars.transition()
                            .attr("height", function(d, i) {
                                return yScale(d[1]);
                            })
                            .attr("y", function(d, i) {
                                return height - yScale(d[1]);
                            })
                            .attr("width", xScale.rangeBand())
                            .attr("x", function(d, i) {
                                return xScale(i);
                            })
                            .style("fill", function(d, i) {
                                if (updateData !== sumFreq) {
                                    return color
                                } else {
                                    return barColor;
                                }
                            })
                            .duration(2000)
                            .ease("elastic");

                    } //animate

                    animate();
                } //update

                var vGuideScale = d3.scale.linear()
                    .domain([0, d3.max(sumFreq.map(function(item) {
                        return item[1];
                    }))])
                    .range([height, 0]);



                var vAxis = d3.svg.axis()
                    .scale(vGuideScale)
                    .orient("left")
                    .ticks(10);

                // jqlite angular own subset of jquery
                var vGuide = d3.select(element[0].querySelector("svg")).append("g");
                vAxis(vGuide);
                //trasforming the left guide right beside the graph
                vGuide.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
                vGuide.selectAll("path")
                    .style({ fill: 'none', stroke: "#000" });
                vGuide.selectAll("line")
                    .style("stroke", "#000");


                var hAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    //checkiing the tick values from xScale domain
                    .tickValues(xScale.domain())
                    .tickFormat(function(d, i) {
                        return hAxisPoints[i]
                    })

                var hGuide = d3.select(element[0].querySelector("svg")).append("g");
                hAxis(hGuide);
                hGuide.attr("transform", "translate(" + margin.left + ", " + (height + margin.top) + ")");
                hGuide.selectAll("path")
                    .style({ fill: 'none', stroke: "red" });
                hGuide.selectAll("line")
                    .style("stroke", "#000")

                angular.element($window).on('resize', function() { scope.$apply() })
                scope.$watch(function() {

                    return element[0].clientHeight + element[0].clientWidth;

                }, function() {

                    //redefining all the variables that need to resize and passsing new height and value
                    height = element[0].clientHeight - margin.top - margin.bottom;
                    width = element[0].clientWidth - margin.left - margin.right;

                    yScale.range([0, height]);

                    xScale.rangeBands([0, width], 0.1);
                    svg.attr('width', width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom);

                    group.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
                    myChart.attr("width", xScale.rangeBand())
                        .attr("x", function(d, i) {
                            return xScale(i)
                        })
                    vGuideScale.range([height, 0])

                    vAxis.scale(vGuideScale)
                    hAxis(hGuide)
                    hGuide.attr("transform", "translate(" + margin.left + ", " + (height + margin.top) + ")")
                })


            } //link

            return {
                link: link,
                restrict: "EA",
                replace: true,
                scope: { data: "=" }
            }

        }]) //dir



})();
