window.addEventListener("load",function(){
	
	var taille = 20;
	var grille;
	
	function Kase(){
		this.nbrBombVoisines = 0;
		this.bomb = false;
		this.cache = true;
		this.marque = false;
		this.boum = false;
	}
	
	function initGrille(){
		
		var i,j;
		grille = new Array();
		for(i=0;i<taille;i++){
			grille[i] = new Array();
			for(j=0;j<taille;j++){
				grille[i][j] = new Kase();
				if (Math.random()<=0.1)
					grille[i][j].bomb = true;
			}
		}
		compteBombes();
	}
	
	function initTabHTML(){
		var i,j,ligne,cellule;
		var table = document.createElement("table");
		for(i=0;i<taille;i++){
			ligne = document.createElement("tr");
			for(j=0;j<taille;j++){
				cellule = document.createElement("td");
				ligne.appendChild(cellule);
			}
			table.appendChild(ligne);
		}
		document.body.appendChild(table);
	}
	
	function compteBombes(){
		var i,j,compteur;
		for(i=0;i<taille;i++){
			for(j=0;j<taille;j++){
				compteur = 0;
				if((i>0)&&(j>0)&&(grille[i-1][j-1].bomb))
					compteur++;
				if((i>0)&&(grille[i-1][j].bomb))
					compteur++;
				if((i>0)&&(j<taille-1)&&(grille[i-1][j+1].bomb))
					compteur++;
				if((j>0)&&(grille[i][j-1].bomb))
					compteur++;
				if((j<taille-1)&&(grille[i][j+1].bomb))
					compteur++;
				if((i<taille-1)&&(j>0)&&(grille[i+1][j-1].bomb))
					compteur++;
				if((i<taille-1)&&(grille[i+1][j].bomb))
					compteur++;
				if((i<taille-1)&&(j<taille-1)&&(grille[i+1][j+1].bomb))
					compteur++;
				grille[i][j].nbrBombVoisines = compteur;
			}
		}
	}
	
	function detection(evt){
		var cellules = document.getElementsByTagName("td");
		var i,ligne,colonne;
		for(i=0;i<cellules.length;i++){
			if(cellules[i]==evt.target){
				ligne = Math.floor(i/taille);
				colonne = i%taille;
				switch(evt.button){
					case 0:
						decouvrir(ligne,colonne);
						break;
					case 2:
						marquer(ligne,colonne);
						break;
				}
				testFin();
			}
		}
	}
	
	function marquer(ligne,colonne){
		grille[ligne][colonne].marque = !grille[ligne][colonne].marque;
		affichage();
	}
	
	function decouvrir(i,j){
		if(grille[i][j].bomb){
			alert("BOUMMMMMMMMMM !!!");
			initGrille();
			affichage();
		}
		else if(grille[i][j].cache){
			grille[i][j].cache = false;
			if(grille[i][j].nbrBombVoisines==0){
				if((i>0)&&(j>0)&&(grille[i-1][j-1].cache))
					decouvrir(i-1,j-1);
				if((i>0)&&(grille[i-1][j].cache))
					decouvrir(i-1,j);
				if((i>0)&&(j<taille-1)&&(grille[i-1][j+1].cache))
					decouvrir(i-1,j+1);
				if((j<taille-1)&&(grille[i][j+1].cache))
					decouvrir(i,j+1);
				if((i<taille-1)&&(j<taille-1)&&(grille[i+1][j+1].cache))
					decouvrir(i+1,j+1);
				if((i<taille-1)&&(grille[i+1][j].cache))
					decouvrir(i+1,j);
				if((i<taille-1)&&(j>0)&&(grille[i+1][j-1].cache))
					decouvrir(i+1,j-1);
				if((j>0)&&(grille[i][j-1].cache))
					decouvrir(i,j-1);
			}
			affichage();
		}
	}
	
	function affichage(){
		var i,j;
		var cellules = document.getElementsByTagName("td");
		for(i=0;i<taille;i++){
			for(j=0;j<taille;j++){
				if(grille[i][j].cache){
					if(grille[i][j].marque)
						cellules[taille*i+j].setAttribute("class","marque");
					else
						cellules[taille*i+j].setAttribute("class","cache");
				}
				else {
					switch(grille[i][j].nbrBombVoisines){
						case 0:
							cellules[taille*i+j].setAttribute("class","vide");
							break;
						case 1:
							cellules[taille*i+j].setAttribute("class","un");
							break;
						case 2:
							cellules[taille*i+j].setAttribute("class","deux");
							break;
						case 3:
							cellules[taille*i+j].setAttribute("class","trois");
							break;
						case 4:
							cellules[taille*i+j].setAttribute("class","quatre");
							break;
						case 5:
							cellules[taille*i+j].setAttribute("class","cinq");
							break;
					}
				}
			}
		}
	}
	
	function testFin(){
		var i,j;
		var compteur = 0;
		for(i=0;i<taille;i++){
			for(j=0;j<taille;j++){
				if((grille[i][j].marque)&&(grille[i][j].bomb))
					compteur++;
				if(grille[i][j].cache==false)
					compteur++;
			}
		}
		if(compteur==taille*taille){
			alert("BRAVO !!!!!");
			initGrille();
			affichage();
		}
	}
	
	function rien(evt){
		evt.preventDefault();// Annule l'événement evt
	}
	
	initGrille();
	initTabHTML();
	affichage();
	window.addEventListener("click",detection,false);
	window.addEventListener("contextmenu",rien,false);
	
	
},false);