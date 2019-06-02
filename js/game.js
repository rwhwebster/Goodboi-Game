let game = {
  setGameStart: function(classType) {
    this.resetPlayer(classType);
    this.setPreFight();
  },
  resetPlayer: function(classType) {
    switch (classType) {
      case "Doge":
        player = new Doggo("player", classType, 15, 12, 10, 15);
        break;
      case "Corgo":
        player = new Doggo("player", classType, 14, 11, 10, 8);
        break;
      case "Much Woofer":
        player = new Doggo("player", classType, 18, 15, 7, 12);
        break;
      case "Golden Pupper":
        player = new Doggo("player", classType, 12, 8, 14, 5);
        break;
    }
    let getInterface = document.querySelector(".interface");
    let pstats = '<img id="player-avatar" src="img/' + player.classType.toLowerCase() + '.png" class="img-avatar">';
    pstats += '<div><h3>' + player.classType + '</h3>';
    pstats += '<p class="player-health">Concern: ' + player.health + '/' + player.concern + '</p>';
    pstats += '<p>Bork: ' + player.bork + '</p>';
    pstats += '<p>Noms: ' + player.nom + '</p>';
    pstats += '<p>Zoomies: ' + player.zoom + '</p>';
    pstats += '</div>';
    getInterface.innerHTML = pstats;
    // getInterface.innerHTML = '<img src="img/'+classType.toLowerCase()+'.png" class="img-avatar"><div><h3>'+classType+'</h3><p>Concern: '+player.concern+'</p><p>Bork: '+player.bork+'</p><p>Nom: '+player.nom+'</p><p>Zoom: '+player.zoom+'</p></div>';
  },
  setPreFight: function() {
    let getHeader = document.querySelector(".header");
    let getActions = document.querySelector(".actions");
    let getArena = document.querySelector(".arena");
    getHeader.innerHTML = '<p>Find an opponent.</p>';
    getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="game.setFight()">Search for another goodboi.</a>';
    getArena.style.visibility = "visible";
  },
  setFight: function() {
    let getHeader = document.querySelector(".header");
    let getActions = document.querySelector(".actions");
    let getEnemy = document.querySelector(".enemy");
    // Create enemy
    let enemy00 = new Doggo("enemy", "Bork Hole", 25, 15, 10, 5);
    let enemy01 = new Doggo("enemy", "Cheddar", 20, 9, 15, 9);

    let chooseEnemy = Math.floor(Math.random()*2);
    switch (chooseEnemy) {
      case 0:
        enemy = enemy00;
        break;
      case 1:
        enemy = enemy01;
        break;
    }
    let abilities = '<a href="#" class="btn-prefight" onclick="Moves.attacc()">Attacc</a>';
    abilities += '<a href="#" class="btn-prefight" onclick="Moves.protecc()">Protecc</a>';
    abilities += '<a id="btn-special" href="#" class="btn-prefight" onclick="">Special (not ready)</a>';

    getHeader.innerHTML = '<p>Become the goodest boi!</p>';
    getActions.innerHTML = abilities;
    let estats = '<img id="enemy-avatar" src="img/' + enemy.classType.toLowerCase() + '.png" class="img-avatar">';
    estats += '<div><h3>' + enemy.classType + '</h3>';
    estats += '<p class="enemy-health">Concern: ' + enemy.health + '/' + enemy.concern + '</p>';
    estats += '<p>Bork: ' + enemy.bork + '</p>';
    estats += '<p>Noms: ' + enemy.nom + '</p>';
    estats += '<p>Zoomies: ' + enemy.zoom + '</p>';
    estats += '</div>';
    getEnemy.innerHTML = estats;
  }
}
