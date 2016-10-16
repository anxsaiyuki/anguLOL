indexApp.controller('index.controller', function($scope, PlayerInfo) {

	$scope.search_input = '';
  $scope.game_data = [];
  $scope.single_game_data;
  $scope.champImgUrl = 'http://ddragon.leagueoflegends.com/cdn/6.20.1/img/champion/';
  $scope.username = '';

  $scope.game_data_bool = false;
  $scope.username_bool = false;


  $scope.search = function() {
    PlayerInfo.getPlayerInfo($scope.search_input)
      .then(function(profile) {
        $scope.username = profile.name;
        return PlayerInfo.getPlayerGames(profile.id)
      })
      .then(function(result) {
        $scope.game_data = dataCleaner(result.data.games);
      })
    $scope.game_data_bool = false;
    $scope.username_bool = true;
    $scope.search_input = '';
  };

  $scope.gameDetail = function(game) {
    $scope.single_game_data = game;
    $scope.game_data_bool = true;
  };


  var dataCleaner = function(results) {
    var data = [];
    for (var game in results) {
      var champion = window.champData.data[results[game].championId].name;
      var championImgName = window.champData.data[results[game].championId].key;
      var stats = results[game].stats;
      var utcSeconds = results[game].createDate;
      var d = new Date(utcSeconds);
      // var date = d.setUTCSeconds(utcSeconds);
      data.push({
        'championId': results[game].championId,
        'championImgName': championImgName,
        'champion': champion,
        'gameMode': results[game].gameMode,
        'win': stats.win ? 'Win' : 'Lose',
        'totalDamageDealtToChampions': stats.totalDamageDealtToChampions || 0,
        'totalDamageTaken': stats.totalDamageTaken || 0,
        'wardsPlaced': stats.wardPlaced || 0,
        'wardsKilled': stats.wardKilled || 0,
        'playerRole': stats.playerRole,
        'assists': stats.assists || 0,
        'deaths': stats.numDeaths || 0,
        'largestMultiKill': stats.largestMultiKill || 0,
        'kills': stats.championsKilled || 0,
        'largestKillingSpree': stats.largestKillingSpree || 0,
        'timePlayed': (stats.timePlayed / 60).toFixed(2),
        'iPEarned': results[game].ipEarned,
        'date': d.toLocaleString()
      }); 
    }
    return data; // sherman was here :D 
  }

});

indexApp.directive('myGame', function() {
  return {
    template: '<img src="{{champImgUrl}}{{single_game_data.championImgName}}.png" />' +
              '<div class="champion">Champion: {{single_game_data.champion}}</div>' +
              '<div class="row">' +
                '<div class="col s12 main-title">GAME STATS</div>' +
                '<div class="col s6"><span class="sub-title">GAME MODE:</span> {{single_game_data.gameMode}}</div>' +
                '<div class="col s6"><span class="sub-title">RESULT:</span> {{single_game_data.win}}</div>' +
                '<div class="col s3"><span class="sub-title">Kills:</span> {{single_game_data.kills}}</div>' +
                '<div class="col s3"><span class="sub-title">Deaths:</span> {{single_game_data.deaths}}</div>' +
                '<div class="col s3"><span class="sub-title">Assists:</span> {{single_game_data.assists}}</div>' +
              '</div>' +
              '<div class="row">' +
                '<div class="col s12 main-title">GAME DETAILS</div>' +
                '<div class="col s12 title">Damage:</div>' +
                '<div class="col s12"><span class="sub-title">Damage Dealt:</span> {{single_game_data.totalDamageDealtToChampions}}</div>' +
                '<div class="col s12"><span class="sub-title">Damage Taken:</span> {{single_game_data.totalDamageTaken}}</div>' +
                '<div class="col s12 title">Ward:</div>' +
                '<div class="col s12"><span class="sub-title">Ward Place:</span> {{single_game_data.wardsPlaced}}</div>' +
                '<div class="col s12"><span class="sub-title">Ward Destroyed:</span> {{single_game_data.wardsKilled}}</div>' +
                '<div class="col s12 title">Kills:</div>' +
                '<div class="col s12"><span class="sub-title">Largest Killing Spree:</span> {{single_game_data.largestKillingSpree}}</div>' +
                '<div class="col s12"><span class="sub-title">Largest Multi Kill:</span> {{single_game_data.largestMultiKill}}</div>' +
                '<div class="col s12 title">Misc:</div>' +
                '<div class="col s12"><span class="sub-title">Date Played:</span> {{single_game_data.date}}</div>' +
                '<div class="col s12"><span class="sub-title">Time Played:</span> {{single_game_data.timePlayed}}</div>' +
                '<div class="col s12"><span class="sub-title">IP Earned:</span> {{single_game_data.iPEarned}}</div>' +
              '<div>'

  };
});