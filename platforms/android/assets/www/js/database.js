
	function populateDB(tx) {
		
		tx.executeSql("CREATE TABLE IF NOT EXISTS types(idType INTEGER PRIMARY KEY, nomType TEXT)");
        tx.executeSql("INSERT INTO types values(0, 'Type')");
        tx.executeSql("INSERT INTO types values(1, 'Apero-Entree')");
        tx.executeSql("INSERT INTO types values(2, 'Plat')");
        tx.executeSql("INSERT INTO types values(3, 'Accompagnement')");
        tx.executeSql("INSERT INTO types values(4, 'Viande')");
        tx.executeSql("INSERT INTO types values(5, 'Poisson')");
        tx.executeSql("INSERT INTO types values(6, 'Dessert')");

        tx.executeSql("CREATE TABLE IF NOT EXISTS recettes(idRecette INTEGER PRIMARY KEY, titre TEXT, typeRecette INTEGER)");

        tx.executeSql("CREATE TABLE IF NOT EXISTS ingredients(idIngre INTEGER PRIMARY KEY, nomIngre TEXT)");

        tx.executeSql("CREATE TABLE IF NOT EXISTS compos(idCompo INTEGER PRIMARY KEY, recette TEXT, quantite INTEGER, ingredient TEXT)");
		
		console.log("bdd ok");
    }
	
	function queryTypes(tx) {
		tx.executeSql("SELECT * FROM types", [], selectType,errorCB);
		tx.executeSql("SELECT * FROM types", [], showTypes,errorCB);
	}
	function selectType(tx, results) {
		var listeType;
		var len = results.rows.length;
		for (var i =0; i <len; i++) {
			var nomType = results.rows.item(i).nomType;
			listeType += "<option value="+nomType+">"+nomType+"</option>";
		}
		$("#typeRecette").append(listeType);
		showTypes();
	}
	
/* 	function queryRecipes(tx) {
		tx.executeSql("SELECT * FROM types", [], showTypes,errorCB);
		tx.executeSql("SELECT * FROM recettes, types WHERE typeRecette = idType ", [], showRecipes, errorCB);
	}*/
	function showTypes (tx, results) {
		var sectType;
		var len = results.rows.length;
		for (i =0; i <len; i++) {
			var nomType = results.rows.item(i).nomType;
//			sectType += "<div data-role='collapsible' data-filtertext='"+nomType+" "+filtre+"'><h3>"+nomType+"</h3><ul id='"+nomType+"' data-role='listview' data-inset='false'>";
sectType += "<div data-role='collapsible' data-filtertext='"+nomType+"'><h3>"+nomType+"</h3></ul></div>";
		}
		$("#listeTypeRecette").append(sectType);
	}
/*	function showRecipes (tx, results) {
		var sectType;
		var listeRecipes;
		var len = results.rows.length;
		for (i =0; i < len; i++) {
			var nomRecipe = results.rows.item(i).titre;
			var nomType = results.rows.item(i).nomType;
			var filtre += nomRecipe+" ";
			listeRecipes += "<li><a href='#details' data-filtertext='"+nomRecipe+"'>"+nomRecipe+"</a></li>";
		}
		sectType += "</ul>";
		$("#listeTypeRecette").append(listeRecipes);
	} */