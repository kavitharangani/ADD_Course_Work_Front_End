const loadAllItemCode = () => {
    $('#item_code').empty();
    $('#item_code').append("<option selected>Select customer code</option>");

    $.ajax({
        url: "http://localhost:8080/shop/api/v1/item",
        method: "GET",
        processData: false,
        contentType: false,
        success: function (resp) {
            console.log(resp);
            for (const item of resp) {
                let option = `<option data-name="${item.item_name}">${item.item_code}</option>;`
                $("#item_code").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading item codes:", exception);
        }
    });
}

$('#item_code').change((e) => {
    const item_code = e.target.value;
    if ('Select item code' !== item_code) {
        const name = e.target.options[e.target.selectedIndex].dataset.name;
        // const qty = e.target.options[e.target.selectedIndex].dataset.qty;

        $('#item_desc').val(name);
        // $('#customer_qty').val(qty);
    }
})
$(document).ready(function () {
loadAllItemCode();
    function loadAllInventory() {
        $("#inventory-tbl-body").empty();
        $.ajax({
            url: "http://localhost:8080/shop/api/v1/inventory",
            method: "GET",
            dataType: "json",
            success: function (resp) {
                for (const item of resp) {
                    let row = `<tr><td>${item.item_code}</td>
                                        <td>${item.item_desc}</td>
                                        <td>${item.item_qty}</td>
                                        <td>${item.item_pic}</td>
                                        <td>${item.category}</td>
                                        <td>${item.size}</td>
                                        <td>${item.unit_price_sale}</td>
                                        <td>${item.unit_price_buy}</td>
                                        <td>${item.expected_profit}</td>
                                        <td>${item.profit_margin}</td>
                                        <td>${item.status}</td>
                                    </tr>`;
                    $("#inventory-tbl-body").append(row);
                }
                callMethod();
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }

    function callMethod() {
        $("#inventory-tbl-body").on("click", "tr", function () {
            let item_code = $(this).children().eq(0).text();
            let item_desc = $(this).children().eq(1).text();
            let item_qty = $(this).children().eq(2).text();
            let item_pic = $(this).children().eq(3).text();
            let category = $(this).children().eq(4).text();
            let size = $(this).children().eq(5).text();
            let unit_price_sale = $(this).children().eq(6).text();
            let unit_price_buy = $(this).children().eq(7).text();
            let expected_profit = $(this).children().eq(8).text();
            let profit_margin = $(this).children().eq(9).text();
            let status = $(this).children().eq(10).text();

            $("#item_code").val(item_code);
            $("#item_desc").val(item_desc);
            $("#item_qty").val(item_qty);
            $("#item_pic").val(item_pic);
            $("#category").val(category);
            $("#size").val(size);
            $("#unit_price_sale").val(unit_price_sale);
            $("#unit_price_buy").val(unit_price_buy);
            $("#expected_profit").val(expected_profit);
            $("#profit_margin").val(profit_margin);
            $("#statuss").val(status);

        });
    }

    $("#save_inventory").click(function () {
        let formData = new FormData();
        formData.append("item_code", $("#item_code").val());
        formData.append("item_desc", $("#item_desc").val());
        formData.append("item_qty", $("#item_qty").val());
        formData.append("category", $("#categorys").val());
        formData.append("size", $("#size").val());
        formData.append("unit_price_sale", $("#unit_price_sale").val());
        formData.append("unit_price_buy", $("#unit_price_buy").val());
        formData.append("expected_profit", $("#expected_profit").val());
        formData.append("profit_margin", $("#profit_margin").val());
        formData.append("status", $("#statuss").val());

        let fileInput = document.getElementById('item_pic');
        formData.append("item_pic", fileInput.files[0]);

        $.ajax({
            method: "POST",
            url: "http://localhost:8080/shop/api/v1/inventory",
            processData: false, // Prevent jQuery from automatically processing data
            contentType: false, // Prevent jQuery from automatically setting contentType
            data: formData,
            success: function (data) {
                reset(); // Assuming reset() function is defined elsewhere
                alert("Item saved successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });


    $("#update_inventory").click(function () {
        let formData = new FormData();
        let item_code = $("#item_code").val();

        formData.append("item_code", item_code);
        formData.append("item_desc", $("#item_desc").val());
        formData.append("item_qty", $("#item_qty").val());
        formData.append("category", $("#categorys").val());
        formData.append("size", $("#size").val());
        formData.append("unit_price_sale", $("#unit_price_sale").val());
        formData.append("unit_price_buy", $("#unit_price_buy").val());
        formData.append("expected_profit", $("#expected_profit").val());
        formData.append("profit_margin", $("#profit_margin").val());
        formData.append("status", $("#statuss").val());

        let fileInput = document.getElementById('item_pic');
        if (fileInput.files.length > 0) {
            formData.append("item_pic", fileInput.files[0]);
        }

        $.ajax({
            method: "PATCH", // Use PATCH method for updating
            url: "http://localhost:8080/shop/api/v1/inventory/" + item_code, // Include item code in URL
            processData: false, // Prevent jQuery from automatically processing data
            contentType: false, // Prevent jQuery from automatically setting contentType
            data: formData,
            success: function (data) {
                reset(); // Assuming reset() function is defined elsewhere
                alert("Item updated successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });



    $("#reset_inventory").click(function () {
        reset();
    });

    function reset() {
        $("#item_code").val("");
        $("#item_desc").val("");
        $("#item_qty").val("");
        $("#item_pic").val("");
        $("#category").val("");
        $("#size").val("");
        $("#unit_price_sale").val("");
        $("#unit_price_buy").val("");
        $("#expected_profit").val(""); // Add this line
        $("#profit_margin").val("");
        $("#status").val("");
        loadAllInventory(); // Call loadAllItems after resetting form
    }

    loadAllInventory();
});
