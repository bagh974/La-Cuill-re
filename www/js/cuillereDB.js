    function populateDB(tx) {
		
		tx.executeSql("CREATE TABLE IF NOT EXISTS types(id INTEGER PRIMARY KEY, nomType TEXT)");
        tx.executeSql("INSERT INTO types values(0, '<tout>')");
        tx.executeSql("INSERT INTO types values(1, 'Apero-Entree')");
        tx.executeSql("INSERT INTO types values(2, 'Plat')");
        tx.executeSql("INSERT INTO types values(3, 'Accompagnement')");
        tx.executeSql("INSERT INTO types values(4, 'Viande')");
        tx.executeSql("INSERT INTO types values(5, 'Poisson')");
        tx.executeSql("INSERT INTO types values(6, 'Dessert')");

        tx.executeSql("CREATE TABLE IF NOT EXISTS recettes(id INTEGER PRIMARY KEY, titre TEXT, typeRecette INTEGER)");
        tx.executeSql("INSERT INTO recettes values(0, 'Soupe au curry', 1)");
        tx.executeSql("INSERT INTO recettes values(1, 'Soupe a l'ail, 1)");
        tx.executeSql("INSERT INTO recettes values(2, 'Lasagnes', 2)");
        tx.executeSql("INSERT INTO recettes values(3, 'Choucroute', 2)");
        tx.executeSql("INSERT INTO recettes values(4, 'quinoa au curry', 3)");
        tx.executeSql("INSERT INTO recettes values(5, 'Ribs caramelise au miel', 4)");
        tx.executeSql("INSERT INTO recettes values(6, 'Papillote de saumon', 5)");
        tx.executeSql("INSERT INTO recettes values(7, 'Crepes', 6)");

        tx.executeSql("CREATE TABLE IF NOT EXISTS ingredients(idIngre INTEGER PRIMARY KEY, nomIngre TEXT)");
        tx.executeSql("INSERT INTO ingredients values(0, 'Farine')");
        tx.executeSql("INSERT INTO ingredients values(1, 'Sucre')");
        tx.executeSql("INSERT INTO ingredients values(2, 'Oeufs')");
        tx.executeSql("INSERT INTO ingredients values(3, 'Lait')");

        tx.executeSql("CREATE TABLE IF NOT EXISTS compos(id INTEGER PRIMARY KEY, recette TEXT, quantite INTEGER, ingredient TEXT)");
        tx.executeSql("INSERT INTO compos values(0, 'Crepes', 250, 'Farine')");
        tx.executeSql("INSERT INTO compos values(1, 'Crepes', 100, 'Sucre')");
        tx.executeSql("INSERT INTO compos values(2, 'Crepes', 3, 'Oeufs)");
        tx.executeSql("INSERT INTO compos values(3, 'Crepes', 50, 'Lait')");
    }