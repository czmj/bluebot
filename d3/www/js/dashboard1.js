var graph = (function () {

    "use strict";

    // Currently selected dashboard values
    var chart1;

    /* Functions to create the individual charts involved in the dashboard */

    function createSummaryChart(selector, dataset) {

        var data = {
                "xScale": "ordinal",
                "yScale": "linear",
                "main": dataset
            },

            options = {
                "axisPaddingLeft": 0,
                "paddingLeft": 20,
                "paddingRight": 0,
                "axisPaddingRight": 0,
                "axisPaddingTop": 5,
                "yMin": 9,
                "yMax": 40,
                "interpolation": "linear",
                "click": yearSelectionHandler
            },

            legend = d3.select(selector).append("svg")
                .attr("class", "legend")
                .selectAll("g")
                .data(dataset)
                .enter()
                .append("g")
                .attr("transform", function (d, i) {
                    return "translate(" + (64 + (i * 84)) + ", 0)";
                });


        return new xChart('line-dotted', data, selector + " .graph", options);
    }
    /* Data selection handlers */

    function yearSelectionHandler(d, i) {
        selectedYear = d.x;
    }

    /* Render the dashboard */

    function render() {

        var html =
            '<div id="chart1" class="chart">' +
                '<div class="title">Canada Medal Wins</div>' +
                '<div class="graph"></div>' +
                '</div>';

        $("#content").html(html);

        chart1 = createSummaryChart('#chart1', summary);
    }

    return {
        render: render
    }

}());