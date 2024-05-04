$(document).ready(function (){
    function loadAllCustomer() {
        $("#customer-tbl-body").empty();
        $.ajax({
            url: "http://localhost:8080/shop/api/v1/customer",
            method: "GET",
            dataType: "json",
            success: function (resp) {
                for (const customer of resp) {
                    let row = `<tr><td>${customer.customer_code}</td><td>${customer.customer_name}</td><td>${customer.gender}</td><td>${customer.join_date}</td>
                                    <td>${customer.level}</td><td>${customer.total_points}</td><td>${customer.dob}</td><td>${customer.address1}</td><td>${customer.address2}</td><td>${customer.address3}</td><td>${customer.address4}</td><td>${customer.address5}</td></tr>`;
                    $("#customer-tbl-body").append(row);
                }
                callMethod();
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }

    function callMethod() {
        $("#customer-tbl-body>tr").click(function (){
            let customer_id = $(this).children().eq(0).text();
            let name = $(this).children().eq(1).text();
            let gender = $(this).children().eq(2).text();
            let joinDate = $(this).children().eq(3).text();
            let totalPoints = $(this).children().eq(5).text();
            let level = $(this).children().eq(4).text();
            let dob = $(this).children().eq(6).text();
            let address1 = $(this).children().eq(7).text();
            let address2 = $(this).children().eq(8).text();
            let address3 = $(this).children().eq(9).text();
            let address4 = $(this).children().eq(10).text();
            let address5 = $(this).children().eq(11).text();

            $("#cust_id").val(customer_id);
            $("#name").val(name);
            $("input[name='flexRadioDefault'][value='" + gender + "']").prop('checked', true); // Set gender radio button
            $("#joindate").val(joinDate);
            $("#totalpoint").val(totalPoints);
            $("#inputState").val(level);
            $("#dob").val(dob);
            $("#address1").val(address1);
            $("#address2").val(address2);
            $("#address3").val(address3);
            $("#address4").val(address4);
            $("#address5").val(address5);

        });
    }

    // Save customer
    $("#save_customer").click(function () {
        let formData = {
            customer_code: $("#cust_id").val(),
            customer_name: $("#name").val(),
            gender: $("input[name='flexRadioDefault']:checked").val(),
            join_date: $("#joindate").val(),
            level: $("#inputState").val(),
            total_points: $("#totalpoint").val(),
            dob: $("#dob").val(),
            address1: $("#address1").val(),
            address2:$("#address2").val(),
            address3:$("#address3").val(),
            address4:$("#address4").val(),
            address5:$("#address5").val()
        };

        $.ajax({
            method: "POST",
            url: "http://localhost:8080/shop/api/v1/customer",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (data) {
                reset();
                alert("Customer saved successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    // Update customer
    $("#update_customer").click(function (){
        let formData = {
            customer_code: $("#cust_id").val(),
            customer_name: $("#name").val(),
            gender: $("input[name='flexRadioDefault']:checked").val(),
            join_date: $("#joindate").val(),
            level: $("#inputState").val(),
            total_points: $("#totalpoint").val(),
            dob: $("#dob").val(),
            address1: $("#address1").val(),
            address2:$("#address2").val(),
            address3:$("#address3").val(),
            address4:$("#address4").val(),
            address5:$("#address5").val()
        };

        $.ajax({
            method: "PATCH",
            url: "http://localhost:8080/shop/api/v1/customer",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (data) {
                reset();
                alert("Customer updated successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    // Delete customer
    $("#delete_customer").click(function () {
        let customer_id = $("#cust_id").val();

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8080/shop/api/v1/customer/" + customer_id,
            success: function (data) {
                reset();
                alert("Customer deleted successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    // Reset form
    $("#customer_reset").click(function () {
        reset();
    });

    // Reset function
    function reset() {
        $("#cust_id").val("");
        $("#name").val("");
        $("#joindate").val("");
        $("#totalpoint").val("");
        $("#inputState").val("");
        $("#dob").val("");
        $("#address1").val("");
        $("#address2").val("");
        $("#address3").val("");
        $("#address4").val("");
        $("#address5").val("");
        loadAllCustomer();
    }

    // Load customers on page load
    loadAllCustomer();
});