function validateForm() {
    var errormessage = "";


    if (document.getElementById('fname').value==""){
        errormessage += "Enter your First Name \n";
        }

    if (document.getElementById('lname').value==""){
    errormessage += "Enter your Last Name \n";
        }

    if (document.getElementById('pnumber').value==""){
        errormessage += "Enter your contact number \n";
        }

    if (document.getElementById('bookingtime').value=="0"){
    errormessage += "Select Time of Booking \n";
    }

    if (errormessage !=""){
    alert(errormessage);
    return false;
    }
}
