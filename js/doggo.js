let player;
let enemy;

function Doggo(role, classType, concern, bork, nom, zoom) {
  this.role = role;
  this.classType = classType;
  this.concern = concern;
  this.bork = bork;
  this.nom = nom;
  this.zoom = zoom;
  this.health = 0;
  this.tally = 0;
  this.snacc = 0;
}

let Moves = {
  rollDice: function(trait, nSides) {
    // Roll an N sided dice.
    let baseDmg = Math.floor(nSides*Math.random()) + 1;
    // Apply modifier based on supplied trait
    baseDmg += Math.floor((trait - 10)/2);
    baseDmg = baseDmg > 0 ? baseDmg : 0; // Ensures no negative damage
    return baseDmg;
  },

  attaccRound: function(attacker, defender) {
    let dmg = this.rollDice(attacker.bork, 4);
    if (defender.snacc != 1) {
      defender.health += dmg; // Add damage to concern meter
      defender.tally += dmg; //Add damage to cumulative dmg counter
      let getConcern = document.querySelector("."+defender.role+"-health");
      let message = document.querySelector("#arena-"+attacker.role);
      if(defender.health >= defender.concern) {
        getConcern.innerHTML = 'Concern: '+defender.concern+"/"+defender.concern;
        message.innerHTML = "<p>"+attacker.classType+" has done "+defender.classType+" a heckin' concern!</p>"
        if(attacker.role == "player") {
          alert("You win, fren! Refresh the page to play again.")
        } else {
          alert("Sorry fren. You are not the goodest boi. Refresh the page to play again.")
        }
        return 1;
      } else {
        getConcern.innerHTML = 'Concern: '+defender.health+"/"+defender.concern;
        if (defender.tally >= defender.concern && defender.role == "player") {
          this.enableSpecial();
        }
        message.innerHTML = "<p>"+attacker.classType+" borked for "+dmg+" hecks.</p>";
        return 0;
      }
    } else { // If doggo is doing a bamboozle.
      // Attack does not succeed, message to reflect this
      let message = document.querySelector("#arena-"+attacker.role);
      message.innerHTML = "<p>"+attacker.classType+" has been bamboozled!</p>";
      // Doggo nourished by tasty snacc, reduces concern
      defender.health = defender.health - 5 > 0 ? defender.health - 5 : 0;
      let getConcern = document.querySelector("."+defender.role+"-health");
      getConcern.innerHTML = 'Concern: '+defender.health+"/"+defender.concern;
      // Bamboozle is complete, revert properties
      defender.snacc = 0;
      getSpecial = document.querySelector("#btn-special");
      getSpecial.innerHTML = "Special (not ready)";
      setImage = document.querySelector("#player-avatar");
      setImage.setAttribute('src', "img/"+defender.classType.toLowerCase()+".png");
    }

  },

  attacc: function() {
    // This function commences a single round of attacks
    // Where the fastest doggo attacks first, followed by
    // The other doggo, if not concerned.
    let playerSpeed = player.zoom;
    let enemySpeed = enemy.zoom;
    // Fastest doggo attacks first
    let fightOver;
    if (playerSpeed > enemySpeed) {
      fightOver = this.attaccRound(player, enemy);
    } else {
      fightOver = this.attaccRound(enemy, player);
    }
    //If fight is not over, second doggo attaccs.
    if (fightOver != 1) {
      if(playerSpeed > enemySpeed) {
        fightOver = this.attaccRound(enemy, player);
      } else {
        fightOver = this.attaccRound(player, enemy);
      }
    }
  },

  protecc: function() {
    // This function heals the player by some amount.
    // Healing is modified by the Noms trait.
    // The enemy also gets the chance to heal (but by a smaller amount).
    // Calculate amounts to be healed
    let playerHP = this.rollDice(player.nom, 4);
    let enemyHP = this.rollDice(enemy.nom, 3);
    // Modify attributes
    player.health = player.health - playerHP > 0 ? player.health - playerHP : 0;
    enemy.health = enemy.health - enemyHP > 0 ? enemy.health - enemyHP : 0;
    // Update counters
    document.querySelector(".player-health").innerHTML = 'Concern: '+player.health+"/"+player.concern;
    document.querySelector(".enemy-health").innerHTML = 'Concern: '+enemy.health+"/"+enemy.concern;
    // Create message
    let playerMessage = document.querySelector("#arena-player");
    let enemyMessage = document.querySelector("#arena-enemy");
    playerMessage.innerHTML = "<p>"+player.classType+" nommed, reducing concern to "+player.health+".</p>";
    enemyMessage.innerHTML = "<p>"+enemy.classType+" nommed, reducing concern to "+enemy.health+".</p>";
  },

  enableSpecial: function () {
    getSpecial = document.querySelector("#btn-special");
    getSpecial.innerHTML = "Do a Bamboozle!";
    getSpecial.setAttribute('onclick', 'Moves.special()');
  },

  special: function() {
    // Does a Bamboozle
    // Player turns into snacc
    // Doggo does not attacc snacc
    // Effects last one round
    getSpecial = document.querySelector("#btn-special");
    getSpecial.innerHTML = "But most importantly, he a snacc.";
    getSpecial.setAttribute('onclick', '');
    player.snacc = 1; // Denotes player is snacc
    setImage = document.querySelector("#player-avatar");
    setImage.setAttribute('src', "img/snack.png");

    // Reset player tally once action used.
    player.tally = 0;
  }
}
