var i, j, listeType, len, idType, nomType, sectType, sectRecipe, idRecette, nomRecette;
	function populateDB(tx) {
		
		tx.executeSql("CREATE TABLE IF NOT EXISTS types(idType INTEGER PRIMARY KEY, nomType TEXT)");
        tx.executeSql("INSERT INTO types values(0, 'Type')");
        tx.executeSql("INSERT INTO types values(1, 'Apero-Entree')");
        tx.executeSql("INSERT INTO types values(2, 'Plat')");
        tx.executeSql("INSERT INTO types values(3, 'Accompagnement')");
        tx.executeSql("INSERT INTO types values(4, 'Viande')");
        tx.executeSql("INSERT INTO types values(5, 'Poisson')");
        tx.executeSql("INSERT INTO types values(6, 'Dessert')");

        tx.executeSql("CREATE TABLE IF NOT EXISTS recettes(idRecette INTEGER PRIMARY KEY, titre TEXT, typeRecette TEXT)");
		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES ('Salade', 'Apero-Entree')");
		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES ('Lasagnes', 'Plat')");
		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES ('Quinoa', 'Accompagnement')");
		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES ('Ribs', 'Viande')");
		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES ('Poulet tikka', 'Viande')");
		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES ('Saumon', 'Poisson')");
		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES ('Mousse au chocolat', 'Dessert')");
		
        tx.executeSql("CREATE TABLE IF NOT EXISTS ingredients(idIngre INTEGER PRIMARY KEY, nomIngre TEXT)");

        tx.executeSql("CREATE TABLE IF NOT EXISTS compos(idCompo INTEGER PRIMARY KEY, recette TEXT, quantite INTEGER, ingredient TEXT)");
		
		console.log("bdd ok");
    }
	
	function queryTypes(tx) {
		tx.executeSql("SELECT * FROM types", [], selectType,errorCB);
		tx.executeSql("SELECT DISTINCT typeRecette FROM recettes", [], showTypes,errorCB);
		tx.executeSql("SELECT * FROM recettes", [], showRecipes,errorCB);
	}
	
	function insertDB(tx) {
		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES(?,?)",[newTitle, nomType], insertRecipe, errorCB);
		tx.executeSql("INSERT INTO compos (recette, quantite, ingredient) VALUES(?,?,?)",[newTitle,quantite,ingredient],insertRecipe, errorCB);		
	}
	
	//Affiche les types dans liste déroulante - page creation
	function selectType(tx, results) {
		listeType = "";                                 //évite l'inscription "undefined"
		len = results.rows.length;
		for (i =0; i <len; i++) {
			nomType = results.rows.item(i).nomType;
			listeType += "<option value="+nomType+">"+nomType+"</option>";
		}
		$("#typeRecette").append(listeType);
	}

	//Affiche les recettes selon type - page recettes
	function showTypes (tx, results) {
		//affiche les types
		sectType = "";									//évite l'inscription "undefined"
		len = results.rows.length;
		for (i =0; i <len; i++) {
			nomType = results.rows.item(i).typeRecette;
			
			//Crée chaque section "type"
			sectType += "<div data-role='collapsible' data-filtertext='"+nomType+"'><h3>"+nomType+"</h3><ul id='"+nomType+"' data-role='listview' data-inset='false'>";

			sectType += "</ul></div>";
		}

		//affiche les types
		$("#listeTypeRecette").append(sectType);
		
	}	
		//affiche les recettes
	function showRecipes (tx, results) {
		len = results.rows.length;
		for (j =0; j <len; j++) {
			nomType = results.rows.item(j).typeRecette;
			nomRecette = results.rows.item(j).titre;
			sectRecipe = "<li><a href='#details' data-filtertext='"+nomRecette+"'>"+nomRecette+"</a></li>";		
			$("#listeTypeRecette #"+nomType).append(sectRecipe);
		}
	}
	
	//Création d'une recette
	function insertRecipe() {
		//Récupérer le type de recette
		nomType = $("#typeRecette option:selected").val();
		console.log(nomType);
		
		//Récupérer titre de la nouvelle recette
		var newTitle = $("#nTitre").val();
		console.log(newTitle);
		
		//Enregistrer titre + type dans recettes
//		tx.executeSql("INSERT INTO recettes (titre, typeRecette) VALUES(?,?)",[newTitle, nomType], queryTypes, errorCB);
//		alert(newTitle);
		
		//Enregistrer la nouvelle compo
		$("#ingreRecette #listIngre > tr").each(function(){
			var quantite = $(this).find(".qtt").html();
			var ingredient = $(this).find(".ingre").html();
			console.log(quantite+" "+ingredient);
//			tx.executeSql("INSERT INTO compos (recette, quantite, ingredient) VALUES(?,?,?)",[newTitle,quantite,ingredient],queryTypes, errorCB);		
		})
		console.log("Recette de "+newTitle+" enregistrée!");
	}


	