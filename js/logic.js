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
        var role = "";
        var date = '';
        var rate = "";
        // Capture Button Click
        $("#submit-bid").on("click", function (event) {
                event.preventDefault();

            // Grabbed values from text-boxes
            name = $("#employeeName-input").val().trim();
            role = $("#role-input").val().trim();
            date = $("#date-input").val().trim();
            rate = $("#rate-input").val().trim();
            // Code for "Setting values in the database"
            database.ref().push({
                name: name,
                role: role,
                date: date,
                rate: rate,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });
    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
                // Log everything that's coming out of snapshot
            //     console.log(snapshot.val());
            // console.log(snapshot.val().name);
            // console.log(snapshot.val().email);
            // console.log(snapshot.val().age);
            // console.log(snapshot.val().comment);
            // Change the HTML to reflect
            var monthWork = Date()-ParseInt(snapshot.val().date);
            var totalBilled = monthWork * snapshot.val().rate;
            $("#name-display").text(snapshot.val().name);
            $("#role-display").text(snapshot.val().role);
            $("#date-display").text(snapshot.val().date);
            $("#rate-display").text(snapshot.val().rate);
            $('#totalTime-display').text(monthWork);
            $('#totalBilled-display').text(totalBilled);

            // Handle the errors
        }, function (errorObject) {
                console.log("Errors handled: " + errorObject.code);
            });