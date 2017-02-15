(function() {

    app.controller("chartsCtrl", ["$scope", "$http", function($scope, $http, $window) {


            $scope.charts = "charts page";

            $scope.sparkLineData = [

                { "month": 10, "sales": 5 },
                { "month": 20, "sales": 7 },
                { "month": 30, "sales": 3 },
                { "month": 40, "sales": 2 },
                { "month": 50, "sales": 5 },
                { "month": 60, "sales": 1 },
                { "month": 70, "sales": 6 },
                { "month": 80, "sales": 3 },
                { "month": 90, "sales": 3 },
                { "month": 100, "sales": 8 }

            ];


            $scope.barChartData = [

                [
                    "FL", {
                        "low": 16,
                        "mid": 59,
                        "high": 109
                    }
                ],
                [
                    "AZ", {
                        "low": 90,
                        "mid": 123,
                        "high": 174
                    }
                ],
                [
                    "CT", {
                        "low": 40,
                        "mid": 60,
                        "high": 118
                    }
                ],
                [
                    "DE", {
                        "low": 96,
                        "mid": 130,
                        "high": 262
                    }
                ],
                [
                    "LA", {
                        "low": 100,
                        "mid": 165,
                        "high": 238
                    }
                ],
                [
                    "SK", {
                        "low": 102,
                        "mid": 140,
                        "high": 201
                    }

                ],
                [
                    "KK", {
                        "low": 29,
                        "mid": 90,
                        "high": 171
                    }

                ],
                [
                    "SS", {
                        "low": 22,
                        "mid": 90,
                        "high": 171
                    }

                ],
                [
                    "QQ", {
                        "low": 100,
                        "mid": 165,
                        "high": 238
                    }
                ],

                [
                    "EE", {
                        "low": 96,
                        "mid": 100,
                        "high": 162
                    }
                ],
                [
                    "TT", {
                        "low": 96,
                        "mid": 130,
                        "high": 262
                    }
                ]




            ];












            // $scope.barChartData = [20, 30, 45, 15, 23, 54, 65, 23, 56, 76, 34, 23, 56, 23, 43, 23, 33, 55, 21, 100, 34, 65, 52, 76, 100];






            $scope.forceLayoutData = {

                    nodes: [{
                                uid: 4454,
                                name: "User",
                                image: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-group-128.png"
                            },

                            {
                                uid: 4455,
                                name: "Internet",
                                image: "http://findicons.com/files/icons/730/soft/128/internet.png",
                                targets: [{
                                        target: 4454,
                                        value: 1,
                                        linkDistance: 20,
                                        linkStyle: "link-animation-5",
                                        curve: .01,

                                    },

                                ],
                            }, {
                                uid: 4456,
                                name: "Barracuda",
                                image: "https://static-s.aa-cdn.net/img/ios/960797514/c7ffa7e43897e556854ddfdeac29ae5e?v=1",
                                targets: [

                                    {
                                        target: 4454,
                                        value: 1,
                                        linkDistance: 20,
                                        linkDistance: 20,
                                        linkStyle: "link-dotted",
                                        curve: .09,
                                    },

                                ],
                            }, {
                                uid: 4457,
                                name: "dell",
                                image: "http://static.wixstatic.com/media/03163e_8bfc0a7c5a5e4cee851775d3676cbce7.jpg_256",
                                targets: [{
                                        target: 4456,
                                        value: 1,
                                        linkDistance: 20,
                                        linkStyle: "link-dotted-animation-5",
                                        curve: .7,
                                    }

                                ],


                            }, {
                                uid: 4458,
                                name: "dell",
                                image: "http://static.wixstatic.com/media/03163e_8bfc0a7c5a5e4cee851775d3676cbce7.jpg_256",
                                targets: [{
                                        target: 4457,
                                        value: 1,
                                        linkDistance: 20,
                                        linkStyle: "link-alternate-black-red",
                                        curve: .6,

                                    }

                                ],
                            },


                            {
                                uid: 4459,
                                name: "Vlan",
                                image: "http://static2.pclink.lt/33790-cart_default/dell-networking-2824-l2-24x1gbe-2x1gbe-sfp-u1-auto-mdi-mdix-64-portbased-vlans-link-aggregation-qos-vlan-limited-snmp-monitoring.jpg",
                                targets: [{
                                        target: 4458,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "link-dotted-animation-infinite",
                                        curve: .02,
                                    }

                                ],
                            },

                            {

                                uid: 4460,
                                name: "IIBA-SV-1",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "link-alternate-black-red",
                                        curve: .02,
                                    }

                                ],
                            },

                            {

                                uid: 4461,
                                name: "IIBA-SV-2",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "link-alternate-black-red",
                                        curve: .02,
                                    }

                                ],

                            },

                            {
                                uid: 4462,
                                name: "IIBA-SV-3",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "link-alternate-black-red",
                                        curve: .04,
                                    }

                                ],

                            },

                            {
                                uid: 4463,
                                name: "IIBA-SV-4",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "link-animation-infinite",
                                        curve: .07,

                                    }

                                ],

                            },

                            {
                                uid: 4464,
                                name: "IIBA-SV-5",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "line-dotted link-animation-infinite",
                                        curve: .09,

                                    }

                                ],

                            },

                            {
                                uid: 4465,
                                name: "IIBA-SV-6",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "line-dotted link-animation-infinite link-blue",
                                        curve: .5,

                                    }

                                ],

                            },

                            {
                                uid: 4466,
                                name: "IIBA-SV-7",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        curve: .9,

                                    }

                                ],

                            },

                            {
                                uid: 4467,
                                name: "IIBA-SV-8",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "link-dotted-animation-infinite link-blue",
                                        curve: .1,

                                    }

                                ],

                            },

                            {
                                uid: 4468,
                                name: "IIBA-SV-9",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "link-green",
                                        curve: .6,

                                    }

                                ],

                            },

                            {
                                uid: 4469,
                                name: "IIBA-SV-10",
                                image: "http://png-3.findicons.com/files/icons/1714/dropline_neu/128/network_server.png",
                                targets: [{
                                        target: 4459,
                                        value: 2,
                                        linkDistance: 50,
                                        linkStyle: "link-green",
                                        curve: .1,

                                    }

                                ],


                            }


                        ] //nodesArray

                } //forceLyoutData

        }]) //ctrl


})();
