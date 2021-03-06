var LabelCountChartBuilder = (function() {
  var buildChart = function(options) {
    $('#label-count-container').highcharts({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Card count per label'
      },
      subtitle: {
        text: 'cards can have multiple labels'
      },
      xAxis: {
        categories: options.labels,
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cards',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        pointFormat: 'Cards in list: <strong>{point.y} Cards</strong>',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          },
          colorByPoint: true,
          colors: options.colors
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: "Cards in List",
        showInLegend: false,
        data: options.counts
      }]
    });
  }

  var load = function(boardId, token) {
    var container = $("#label-count-container");
    container.height(container.height() - 10);

    $.ajax({
      url: "/api/v1/labels/" + boardId,
      data: {
        token: token
      },
      success: function(data) {
        $('#label-count-spinner').hide();

        var parsed = jQuery.parseJSON(data);
        buildChart({
          labels: parsed.labels,
          counts: parsed.counts,
          colors: parsed.colors
        });
      },
      error: function(xhr) {
        $("#label-count-spinner").hide();
        container.text(xhr.responseText);
      }
    });
  }

  return {
    build: load
  }
}());