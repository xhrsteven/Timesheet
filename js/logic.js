        // Initialize Firebase
        var config = {
                apiKey: "AIzaSyC_r3C6oBEDD67Dxb1vtKy-ZdDRCs_XkvY",
                authDomain: "timesheet-b87f8.firebaseapp.com",
                databaseURL: "https://timesheet-b87f8.firebaseio.com",
                storageBucket: "timesheet-b87f8.appspot.com"
        };
        firebase.initializeApp(config);
        // Create a variable to reference the database.
        var database = firebase.database();
        
        
        // Capture Button Click
        $("#add-employee").on("click", function (event) {
                event.preventDefault();

            // Grabbed values from text-boxes
            var name = $("#employee-name-input").val().trim();
            var role = $("#role-input").val().trim();
            var date = moment($("#startdate-input").val().trim(),'DD/MM/YY').format('X');
            var rate = $("#rate-input").val().trim();

            // Creates local "temporary" object for holding employee data
            var newEmp ={
                name: name,
                role:role,
                date: date,
                rate: rate
            }
            // Code for "Setting values in the database"
            database.ref().push(newEmp);

            //Log everything to console
            // console.log(newEmp.name);
            // console.log(newEmp.role);
            // console.log(newEmp.date);
            // console.log(newEmp.rate);

            //Clear all the text boxes
            $('#employee-name-input').val('');
            $('#role-input').val('');
            $('#startdate-input').val('');
            $('#rate-input').val('');
    });

    // Firebase watcher + initial loader 
    database.ref().on("child_added", function (childSnapshot, prevChidKey) {
            
            // console.log(childSnapshot.val());

            //store everything into variable
            var empName = childSnapshot.val().name;
            var empRole = childSnapshot.val().role;
            var empDate = childSnapshot.val().date;
            var empRate = childSnapshot.val().rate

            //Employee info
            // console.log(empName);
            // console.log(empRole);
            // console.log(empDate);
            // console.log(empRate);

            //Moment method
            var empStartDate = moment.unix(empDate).format("MM/DD/YY");

            //Calculate the month worked 
            var empMonths = moment().diff(moment.unix(empDate, 'X'), 'months');
            // console.log(empMonths);

            //Calculate the total billed rate
            var empBilled = empMonths * empRate;
            // console.log(empBilled);

            //Add each data into the table
            $('#employee-table').append('<tr><td>'+empName +'</td><td>'+empRole + '</td><td>'+empStartDate + '</td><td>' + empMonths + '</td><td>' + empRate + '</td><td>' + empBilled + '</td></tr>');
           
            });