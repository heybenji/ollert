var CfdChartBuilder = (function (parent) {
  var _boardId;
  var _boardName;

  var initialize = function(boardId, boardName) {
    _boardId = boardId;
    _boardName = boardName;
  };

  var buildChart = function (data) {
    $('#cfdContainer').highcharts("StockChart", {
      chart: {
        type: 'area',
        zoomType: 'x'
      },
      rangeSelector: {
        buttons: [
          { type: 'day', count: 1, text: '1d' },
          { type: 'week', count: 1, text: '1w' },
          { type: 'week', count: 2, text: '2w' },
          { type: 'month', count: 1, text: '1m' },
          { type: 'month', count: 3, text: '3m' },
          { type: 'year', count: 1, text: '1y' },
          { type: 'all', text: 'All' }],
        selected: 3
      },
      title: {
        text: 'Cumulative Flow Diagram'
      },
      subtitle: {
        text: 'CFD'
      },
      xAxis: {
        minRange: 24 * 3600 * 1000, // one day
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        floor: 0,
        title: {
          text: 'Cards'
        },
        labels: {}
      },
      tooltip: {
        shared: true,
        valueSuffix: ' cards'
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: data.cfddata
    });
  };

  var postInitialLoadCallback = function(data) {
    $('#cfdSpinner').hide();

    var parsedData = jQuery.parseJSON(data);

    buildChart(parsedData);
  };

  var load = function (callback, parameters) {
    var queryString = parent.getQueryString(parameters);

    $.ajax({
      url: "/boards/" + _boardId + "/analysis/cfd" + queryString,
      success: callback,
      error: function (xhr) {
        $("#cfdSpinner").hide();
        container.text(xhr.responseText);
      }
    });
  };

  return {
    init: initialize,
    build: function(parameters) { load(postInitialLoadCallback, parameters); }
  };
}(DateFilterable));
