$(document).ready(function (){
    loadAllEmployee();

    function loadAllEmployee() {
        $("#employee-tbl-body").empty();
        $.ajax({
            url: "http://localhost:8080/shop/api/v1/employee",
            method: "GET",
            dataType: "json",
            success: function (resp) {
                for (const employee of resp) {
                    console.log(employee)
                    let row = `<tr id="employee-${employee.id}">
                        <td>${employee.id}</td>
                        <td>${employee.name}</td>
                        <td>${employee.proPic}</td>
                        <td>${employee.gender}</td>
                        <td>${employee.status}</td>
                        <td>${employee.role}</td>
                        <td>${employee.dob}</td>
                        <td>${employee.join_date}</td>
                        <td>${employee.atBranch}</td>
                        <td>${employee.ad1}</td>
                        <td>${employee.ad2}</td>
                        <td>${employee.ad3}</td>
                        <td>${employee.ad4}</td>
                        <td>${employee.ad5}</td>
                        <td>${employee.conNo}</td>
                        <td>${employee.email}</td>
                        <td>${employee.infoEmer}</td>
                        <td>${employee.emerNo}</td>
                        
                    </tr>`;
                    $("#employee-tbl-body").append(row);
                }
                callMethod();
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }

    function callMethod() {
        $("#employee-tbl-body").on("click", "tr", function () {
            let employee_id = $(this).children().eq(0).text();
            let employee_name= $(this).children().eq(1).text();
            let employee_profilePic= $(this).children().eq(2).text();
            let employee_gender= $(this).children().eq(3).text();
            let employee_status= $(this).children().eq(4).text();
            let destination= $(this).children().eq(5).text();
            let employee_role= $(this).children().eq(6).text();
            let employee_dob= $(this).children().eq(7).text();
            let employee_joinDate= $(this).children().eq(8).text();
            let employee_attachedBranch= $(this).children().eq(9).text();
            let employee_address1= $(this).children().eq(10).text();
            let employee_address2= $(this).children().eq(11).text();
            let employee_address3= $(this).children().eq(12).text();
            let employee_address4= $(this).children().eq(13).text();
            let employee_address5= $(this).children().eq(14).text();
            let employee_contactNo= $(this).children().eq(15).text();
            let employee_email= $(this).children().eq(16).text();
            let employee_informInCaseOfEmergency= $(this).children().eq(16).text();
            let employee_emergencyContactNo= $(this).children().eq(17).text();


            $("#employeeId").val(employee_id);
            $("#employeeName").val(employee_name);
            $("#employeeProfilePic").val(employee_profilePic);
            $("input[name='flexRadioDefault'][value='" + employee_gender + "']").prop('checked', true);
            $("#status").val(employee_status);
            $("#designation").val(destination);
            $("input[name='flexRadioDefault'][value='" + employee_role + "']").prop('checked', true);
            $("#employee_dob").val(employee_dob);
            $("#employee_joinDate").val(employee_joinDate);
            $("#employee_attachedBranch").val(employee_attachedBranch);
            $("#employee_ad1").val(employee_address1);
            $("#employee_ad2").val(employee_address2);
            $("#employee_ad3").val(employee_address3);
            $("#employee_ad4").val(employee_address4);
            $("#employee_ad5").val(employee_address5);
            $("#employee_contactNo").val(employee_contactNo);
            $("#employee_email").val(employee_email);
            $("#employee_informInCaseOfEmergency").val(employee_informInCaseOfEmergency);
            $("#employee_emergencyContactNo").val(employee_emergencyContactNo);
        });
    }

    $("#save_supplier").click(function () {
        let formData = {
            supplier_id: $("#suppl_id").val(),
            supplier_name: $("#suppl_name").val(),
            category: $("#category").val(),
            address_line_01: $("#sad1").val(),
            address_line_02: $("#sad2").val(),
            address_line_03: $("#sad3").val(),
            address_line_04: $("#sad4").val(),
            address_line_05: $("#sad5").val(),
            address_line_06: $("#sad6").val(),
            contact_no_01: $("#contact1").val(),
            contact_no_02: $("#contact2").val(),
            email: $("#email").val()
        };

        $.ajax({
            method: "POST",
            url: "http://localhost:8080/shop/api/v1/suppliers",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (data) {
                reset();
                alert("Supplier saved successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    $("#update_supplier").click(function (){
        let formData = {
            supplier_id: $("#suppl_id").val(),
            supplier_name: $("#suppl_name").val(),
            category: $("#category").val(),
            address_line_01: $("#sad1").val(),
            address_line_02: $("#sad2").val(),
            address_line_03: $("#sad3").val(),
            address_line_04: $("#sad4").val(),
            address_line_05: $("#sad5").val(),
            address_line_06: $("#sad6").val(),
            contact_no_01: $("#contact1").val(),
            contact_no_02: $("#contact2").val(),
            email: $("#email").val()
        };

        $.ajax({
            method: "PATCH",
            url: "http://localhost:8080/shop/api/v1/suppliers",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (data) {
                reset();
                alert("Supplier updated successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    $("#delete_supplier").click(function () {
        let supplier_id = $("#suppl_id").val();

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8080/shop/api/v1/suppliers/" + supplier_id,
            success: function (data) {
                reset();
                alert("Supplier deleted successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    // Reset form
    $("#supplier_reset").click(function () {
        reset();
    });

    // Reset function
    function reset() {
        $("#suppl_id").val("");
        $("#suppl_name").val("");
        $("#category").val("");
        $("#sad1").val("");
        $("#sad2").val("");
        $("#sad3").val("");
        $("#sad4").val("");
        $("#sad5").val("");
        $("#sad6").val("");
        $("#contact1").val("");
        $("#contact2").val("");
        $("#email").val("");
        loadAllSuppliers(); // Call loadAllSuppliers after resetting form
    }
});
