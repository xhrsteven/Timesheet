// Initialize Firebase
        var config = {
                apiKey: "AIzaSyC_r3C6oBEDD67Dxb1vtKy-ZdDRCs_XkvY",
                authDomain: "fir-timesheet.firebaseapp.com",
                databaseURL: "https://fir-timesheet.firebaseio.com",
                storageBucket: "fir-timesheet.appspot.com"
        };
        firebase.initializeApp(config);
        // Create a variable to reference the database.
        var database = firebase.database();
        // Initial Values
        var name = "";
        var email = "";
        var age = 0;
        var comment = "";
        // Capture Button Click
        $("#add-user").on("click", function (event) {
                event.preventDefault();

            // Grabbed values from text-boxes
            name = $("#name-input").val().trim();
            email = $("#email-input").val().trim();
            age = $("#age-input").val().trim();
            comment = $("#comment-input").val().trim();
            // Code for "Setting values in the database"
            database.ref().set({
                name: name,
            email: email,
            age: age,
            comment: comment
        });
    });
    // Firebase watcher + initial loader HINT: .on("value")
        database.ref().on("value", function (snapshot) {
                // Log everything that's coming out of snapshot
                console.log(snapshot.val());
            console.log(snapshot.val().name);
            console.log(snapshot.val().email);
            console.log(snapshot.val().age);
            console.log(snapshot.val().comment);
            // Change the HTML to reflect
            $("#name-display").text(snapshot.val().name);
            $("#email-display").text(snapshot.val().email);
            $("#age-display").text(snapshot.val().age);
            $("#comment-display").text(snapshot.val().comment);
            // Handle the errors
        }, function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });