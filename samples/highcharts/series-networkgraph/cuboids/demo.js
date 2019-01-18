function generateConnectedCuboids(level) {
    var data = [];

    while (level--) {
        // Top
        data.push(
            [level + '_1', level + '_2'],
            [level + '_1', level + '_4'],
            [level + '_3', level + '_2'],
            [level + '_3', level + '_4']
        );

        // Connect tops:
        if (level >= 1) {
            data.push(
                [level - 1 + '_1', level + '_1'],
                [level - 1 + '_2', level + '_2'],
                [level - 1 + '_3', level + '_3'],
                [level - 1 + '_4', level + '_4']
            );
        }
    }

    return data;
}

Highcharts.chart('container', {
    chart: {
        type: 'networkgraph',
        plotBorderWidth: 1
    },
    title: {
        text: 'Verlet integration with custom forces'
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                linkLength: 3,
                enableSimulation: true,
                attractiveForce: function (d, k) {
                    return -(d * d) / (k * 100000);
                },
                repulsiveForce: function (d, k) {
                    return (k * k) / (d * d);
                }
            }
        }
    },

    series: [{
        data: generateConnectedCuboids(7)
    }]
});