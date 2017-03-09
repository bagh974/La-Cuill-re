var db;

    //function will be called when an error occurred
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }
 
    //function will be called when process succeed
    function successCB() {
        console.log("Connecté!");
        db.transaction(queryTypes, errorCB);
    }

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		db = window.sqlitePlugin.openDatabase({name: 'cuillere.db', location: 'default'}, successCB, errorCB);
		db.transaction(populateDB, errorCB, successCB);		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    }
};

app.initialize();
//Vide les champs de saisie quantite/produit
$("#addProd").click(
	function(){
				
		$("#quantite").val('');
		$("#nomProd").val('');
		
});

//---------------------------PAGE PRODUIT -------------------------------
//Ajouter à la liste
$("#add").click(
	function(){
		var quantite = parseInt($("#quantite").val());
		var product = $("#nomProd").val();
		
		$("#myList").append('<tr><td class="qtt">'+quantite+'</td><td class="ingre">'+product+'</td></tr>');
		$("#myList").table("refresh");
			
		$(":mobile-pagecontainer").pagecontainer("change","#liste");
		
});
//---------------------------PAGE LISTE -------------------------------
//Supprimer un élément de la liste de course
$("#myList, #listIngre").on("click","tr",
	function(){
		$(this).remove();
});
//Partager la liste de course
$("#share").click(
	function(){
		var listeCourse=[];
		$("#myList > tr").each(function(){
			var qtt = $(this).find(".qtt").html();
			var ingre = $(this).find(".ingre").html();
			listeCourse.push(qtt+" - "+ingre);
		})
		alert(listeCourse.join("\n"));
		var message = {
			subject: "Courses à faire",
			text: listeCourse.join("\n")
		};
		window.socialmessage.send(message);
});

//---------------------------PAGE DETAILS -------------------------------	
//Détails de la recette (éléments existants de la liste)
$("#recipes li a").click(
	function(){
		$("#titreRecette").html( $(this).html() );
		//Affiche les ingrédients passés dans le data-filtertext
		$("#ingredients").html( $(this).data("filtertext") );
	
});
//---------------------------PAGE RECETTE -------------------------------	
//Ajouter ingrédient à nouvelle recette
$("#plus").click(
function(){
		var quantite = parseInt($("#newQuantite").val());
		var ingredient = $("#ingredient").val();
	$("#listIngre").append('<tr><td class="qtt">'+quantite+'</td><td class="ingre">'+ingredient+'</td></tr>');
	$("#listIngre").table("refresh");
	$("#newQuantite").val('');
	$("#ingredient").val('');
});

//Nouvelle recette
$("#save").click(
	function(){
		var tabIngre=[];
		var typeRecette = $("#typeRecette").val();
		var newTitle = $("#newTitre").val();
		
		//Crée un tableau quantite/ingrédient
		$("#ingreRecette #listIngre > tr").each(function(){
			var qtt = $(this).find(".qtt").html();
			var ingre = $(this).find(".ingre").html();
			tabIngre.push(qtt+" "+ingre);
				
		})
		
//		alert(typeRecette+" "+newTitle+" "+tabIngre.join(" | "));
		
		//Ajoute du HTML dans la page
		$("#listeTypeRecette #"+typeRecette).append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="#details" data-filtertext="'+newTitle+':'+tabIngre+'">'+newTitle+'</a></li>');
		$("#listeTypeRecette").listview("refresh");
		
		//Ajoute après le dernier élément de la liste
		$("#recipes li:last-child a").click(
			function(){
				$("#titreRecette").html( $(this).html() );
				$("#ingredients").html( $(this).data("filtertext") );
			
		});
		
	$(":mobile-pagecontainer").pagecontainer("change","#recipes");	
});
