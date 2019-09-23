    var controller_url = "index.php?fc=module&module=Modul_debitare&controller=ajax";
    controller_url = controller_url.replace(/&amp;/g, '&');

    var CatProductsCartBottom_fata = "<option value='-1'>Alege cant fată</option>";
    var CatProductsCartBottom_spate = "<option value='-1'>Alege cant spate</option>";
    var CatProductsCartBottom_dreapta = "<option value='-1'>Alege cant dreapta</option>";
    var CatProductsCartBottom_stanga = "<option value='-1'>Alege cant stanga</option>";
    var edging_products = [];
    var edging_products_delete = [];
    function validateInputField(el) {
        var letters = '[a-zA-Z0-9_]+.*$';
        if(el.value.match(letters))
        {
            var wsRegex = el.value.trim();
            el.value = wsRegex;
            return true;
        }else{
            el.value = '';
        }
    }
    function validateFloatKeyPress(el) {
        $('.err_msg_box').html('');
        if (el.value.match(/^-\d+$/)) {
            $('.err_msg_box').html('<div class="alert alert-danger alert-dismissible show"><button type="button" class="close" data-dismiss="alert">×</button>Please enter only positive value</div>');
            el.value = '';
            return false;
        } else {
            var v = parseFloat(el.value);
        }
        var v = parseFloat(el.value);
        if(isNaN(v)){
            el.value = '';
            return false;
        }else{
            el.value = v.toFixed(2);
        }
    }
    function validateNumberKeyPress(el) {
        $('.err_msg_box').html('');
        if (el.value.match(/^-\d+$/)) {
            $('.err_msg_box').html('<div class="alert alert-danger alert-dismissible show"><button type="button" class="close" data-dismiss="alert">×</button>Please enter only positive value</div>');
            el.value = '';
            return false;
        } else {
            var v = parseInt(el.value);
        }
        var v = parseInt(el.value);
        if(isNaN(v)){
            el.value = '';
            return false;
        }else{
            el.value = v;
        }
    }
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    
    function delete_cookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    function Total_all_colors_bottom(row_values) {
        var category_Options = '<option value="-1">Alege cant</option>';
        $( document ).ready(function() {
            $("#category_listsCartBottom").html(category_Options);
            $("#CatProductsCartBottom_fată").html(CatProductsCart_fata);
            $("#CatProductsCartBottom_spate").html(CatProductsCart_spate);
            $("#CatProductsCartBottom_dreapta").html(CatProductsCart_dreapta);
            $("#CatProductsCartBottom_stanga").html(CatProductsCart_stanga);
            $.ajax({
                type: 'POST',
                url: controller_url,
                cache : false,
                data: {
                        ajax : true,
                        action : 'GetAllEdgingCategories',
                    },
                dataType: 'json',
                beforeSend: function() {
                  $(".myOverlay").show();
                },
                success: function(jsonData) {
                    $.each( jsonData.GetAllEdgingCategories, function( key, value ) {
                        if(value.Foloseste_la_cantur == 'Da'){
                            category_Options += "<option value='"+value.id_category+"' >"+value.name+"</option>";
                        }
                    });
                    $("#category_listsCartBottom").html(category_Options);
                    if(row_values != ''){
                        $.each( row_values, function( key1, value1 ) {
                            $.each( value1, function( key2, value2 ) {
                                if(key2 == "edging_category"){
                                    $('#category_listsCartBottom option[value="' + value2 + '"]').attr('selected', 'selected');
                                    $( "#category_listsCartBottom" ).trigger( "change" );
                                }
                            });
                        });
                    }
                    setTimeout(function(){
                        $(".myOverlay").hide();
                    },6000);
                }
            });
        });
    }   
    function Assigned_product_val_bottom(Product_id, row_values) {
        $( document ).ready(function() {
            var category_Options = '<option value="-1">Alege cant</option>';
            $("#category_listsCartBottom").html(category_Options);
            $("#CatProductsCartBottom_fată").html(CatProductsCart_fata);
            $("#CatProductsCartBottom_spate").html(CatProductsCart_spate);
            $("#CatProductsCartBottom_dreapta").html(CatProductsCart_dreapta);
            $("#CatProductsCartBottom_stanga").html(CatProductsCart_stanga);

            // body...
            $.ajax({
                type: 'POST',
                url: controller_url,
                cache : false,
                data: {
                        ajax : true,
                        action : 'GetProAssoc',
                        Product_id : Product_id,
                    },
                dataType: 'json',
                beforeSend: function() {
                  $(".myOverlay").show();
                },
                success: function(jsonData) {
                    var getAccessoriesLight = jsonData.getAccessoriesLight;
                    var Catproducts_Options = ''; 
                    $.each( getAccessoriesLight, function( key, value ) {
                        if(value.active == "1"){
                            Catproducts_Options += "<option value='"+value.id+"' >"+value.name+"</option>";
                        }
                    });
                    $("#CatProductsCartBottom_fată").html(CatProductsCart_fata + Catproducts_Options);
                    $("#CatProductsCartBottom_spate").html(CatProductsCart_spate + Catproducts_Options);
                    $("#CatProductsCartBottom_dreapta").html(CatProductsCart_dreapta + Catproducts_Options);
                    $("#CatProductsCartBottom_stanga").html(CatProductsCart_stanga + Catproducts_Options);
                    if(row_values != ''){
                        $.each( row_values, function( key1, value1 ) {
                            setTimeout(function(){
                                $.each( value1, function( key2, value2 ) {
                                    if(key2 == "CatProducts_fată"){
                                            if(value2 != -1){
                                                var hasOption = $('#CatProductsCartBottom_fată option[value="' + value2 + '"]');
                                                if (hasOption.length != 0) {
                                                    $('#CatProductsCartBottom_fată').closest(".cust-product-box").find('.angles').addClass("border-upper");
                                                    $('#CatProductsCartBottom_fată option[value="' + value2 + '"]').attr('selected', 'selected');
                                                }
                                            }else{
                                                $('#CatProductsCartBottom_fată').closest(".cust-product-box").find('.angles').removeClass("border-upper");
                                            }
                                    }else if(key2 == "CatProducts_spate"){
                                            if(value2 != -1){
                                                var hasOption = $('#CatProductsCartBottom_spate option[value="' + value2 + '"]');
                                                if (hasOption.length != 0) {
                                                    $('#CatProductsCartBottom_spate').closest(".cust-product-box").find('.angles').addClass("border-bottom");
                                                    $('#CatProductsCartBottom_spate option[value="' + value2 + '"]').attr('selected', 'selected');
                                                }
                                            }else{
                                                $('#CatProductsCartBottom_spate').closest(".cust-product-box").find('.angles').removeClass("border-bottom");
                                            }
                                    }else if(key2 == "CatProducts_dreapta"){
                                            if(value2 != -1){
                                                var hasOption = $('#CatProductsCartBottom_dreapta option[value="' + value2 + '"]');
                                                if (hasOption.length != 0) {
                                                    $('#CatProductsCartBottom_dreapta').closest(".cust-product-box").find('.angles').addClass("border-right");
                                                    $('#CatProductsCartBottom_dreapta option[value="' + value2 + '"]').attr('selected', 'selected');
                                                }
                                            }else{
                                                $('#CatProductsCartBottom_dreapta').closest(".cust-product-box").find('.angles').removeClass("border-right");
                                            }
                                            
                                    }else if(key2 == "CatProducts_stanga"){
                                            if(value2 != -1){
                                                var hasOption = $('#CatProductsCartBottom_stanga option[value="' + value2 + '"]');
                                                if (hasOption.length != 0) {
                                                    $('#CatProductsCartBottom_stanga').closest(".cust-product-box").find('.angles').addClass("border-left");
                                                    $('#CatProductsCartBottom_stanga option[value="' + value2 + '"]').attr('selected', 'selected');
                                                }
                                            }else{
                                                $('#CatProductsCartBottom_stanga').closest(".cust-product-box").find('.angles').removeClass("border-left");
                                            }
                                            
                                    }else{}
                                });
                            },2000);
                        });
                    }
                    setTimeout(function(){
                        $(".myOverlay").hide();
                    },4000);
                }
            });
        });         
    }

    function GetWareHousePrices(warehouses, product_ID) {
        var succeed = false;
        $( document ).ready(function() {
            $.ajax({
                    type: 'POST',
                    url: controller_url,
                    cache : false,
                    async: false,
                    data: {
                            ajax : true,
                            warehouse_id : warehouses,
                            Product_id : product_ID,
                            action : 'GetWareHousePrices',
                        },
                    dataType: 'json',
                    success: function(jsonData) {
                        succeed = jsonData;
                    }
            });
            
        });
         return succeed;
    }

    function GetWareHousePricesByCategory(warehouses, categoryId) {
        var succeed = false;
        $( document ).ready(function() {
            $.ajax({
                    type: 'POST',
                    url: controller_url,
                    cache : false,
                    async: false,
                    data: {
                            ajax : true,
                            warehouse_id : warehouses,
                            categoryId : categoryId,
                            action : 'GetWareHousePricesByCategory',
                        },
                    dataType: 'json',
                    success: function(jsonData) {
                        succeed = jsonData;
                    }
            });
            
        });
         return succeed;
    }

    function Add_edging_products(key, value) {

        let i = edging_products.findIndex(f => f.key == key);
        if(i != -1){
            let dvalue = edging_products[i].value;
            edging_products.splice(i, 1);
            var innerObj = {};
            innerObj["key"] = key;
            innerObj["value"] = parseFloat(value) + parseFloat(dvalue);
            edging_products.push(innerObj);
        }else{
            var innerObj = {};
            innerObj["key"] = key;
            innerObj["value"] = parseFloat(value);
            edging_products.push(innerObj);
        }

    }
    function UpdateAllPricesBottomRow(jsonDataval, Total_edges_size, piece_qty, product_ID, row_class) {
        var Pret_cantuire = 0;
        var edging_price_calculate = 0;
        if(jsonDataval != ""){
            if(typeof jsonDataval.WareHousePrices.cutting_edges !== "undefined" != ""){
                Pret_cantuire = jsonDataval.WareHousePrices.cutting_edges.Pret_cantuire;
                //calculate Cutting Edges Service Price
                if(piece_qty != ""){
                    var Total_edges_size_meter = parseFloat(Total_edges_size / 1000);
                    Total_edges_size_meter = Total_edges_size_meter * parseInt(piece_qty);
                    if((Total_edges_size_meter - Math.floor(Total_edges_size_meter)) !== 0){
                        Total_edges_size_meter = parseInt(Total_edges_size_meter + 1);
                    }
                    var cutting_edges_service_price = ( parseFloat(Pret_cantuire) * Total_edges_size_meter);
                    
                }else{
                    var cutting_edges_service_price = 0;
                }
                
                var check_row = [];
                $(".bottom_"+product_ID).each(function(){
                    var rowClasses = $(this).attr("class").split(" ");
                    if($.inArray( rowClasses[2], check_row ) == -1){
                         check_row.push(rowClasses[2]);
                        if(row_class[2] == rowClasses[2]){
                            console.log(rowClasses[2], cutting_edges_service_price);
                            $(this).find('.row_edging_price').val(cutting_edges_service_price);
                            edging_price_calculate = parseFloat(edging_price_calculate) + parseFloat(cutting_edges_service_price);
                        }else{
                            console.log(rowClasses[2], $(this).find('.row_edging_price').val());
                            edging_price_calculate = parseFloat(edging_price_calculate) + parseFloat($(this).find('.row_edging_price').val());
                        }
                    }
                });
                console.log("edging_price_calculate", edging_price_calculate);
                //Store New Edging Service Price
            }   
        }
        return edging_price_calculate;
    }
    function UpdateAllPricesBottom(jsonDataval, Total_edges_size, piece_qty, product_ID, row_class) {
        var Pret_taiere = 0;
        var Pret_cantuire = 0;
        var Dimensiune_disc_taiere = 0;
        var Nr_piese_pret_extra = 0;
        var Procent_pret_extra = 0;
        var warehouses = $("#warehousesBottom").val();
        var GetWareHousePricesVal = GetWareHousePrices(warehouses, product_ID);
        if(GetWareHousePricesVal != ''){
            prodQty = GetWareHousePricesVal.prodQty;
        }
        if(jsonDataval != ""){
            if(typeof jsonDataval.WareHousePrices.cutting_edges !== "undefined" != ""){
                Pret_taiere = jsonDataval.WareHousePrices.cutting_edges.Pret_taiere;
                Pret_cantuire = jsonDataval.WareHousePrices.cutting_edges.Pret_cantuire;
                Dimensiune_disc_taiere = jsonDataval.WareHousePrices.depozite_records.Dimensiune_disc_taiere;
                Nr_piese_pret_extra = jsonDataval.WareHousePrices.depozite_records.Nr_piese_pret_extra;
                Procent_pret_extra = jsonDataval.WareHousePrices.depozite_records.Procent_pret_extra;
                //calculate Cutting Edges Service Price
                var Total_edges_size_meter = parseFloat(Total_edges_size / 1000);
                Total_edges_size_meter = Total_edges_size_meter * parseInt(piece_qty);
                if((Total_edges_size_meter - Math.floor(Total_edges_size_meter)) !== 0){
                    Total_edges_size_meter = parseInt(Total_edges_size_meter + 1);
                }
                var cutting_edges_service_price = ( parseFloat(Pret_cantuire) * Total_edges_size_meter);
                var cantitate_sum = 0;
                $('.cantitate').each(function(){
                  if(this.value != ''){
                       cantitate_sum += parseInt(this.value);  // Or this.innerHTML, this.innerText
                  }
                });

                var calculate_cutting_price = 0;
                var piece_qty = parseInt(cantitate_sum);
                Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra) * parseInt(prodQty);
                if(piece_qty  > Nr_piese_pret_extra){
                  calculate_cutting_price = ((parseFloat(Pret_taiere) * (parseInt(prodQty))) + parseFloat((Procent_pret_extra * Pret_taiere) /  100)).toFixed(2);
                }else{  
                  calculate_cutting_price = (parseFloat(Pret_taiere) * (parseInt(prodQty))).toFixed(2);
                }

                var edging_price_calculate = 0;
                var check_row = [];
                $(".bottom_"+product_ID).each(function(){
                    var rowClasses = $(this).attr("class").split(" ");
                    if($.inArray( rowClasses[2], check_row ) == -1){
                        check_row.push(rowClasses[2]);
                        console.log(row_class, rowClasses[2]);
                        if(row_class == rowClasses[2]){
                            console.log("cutting_edges_service_price", cutting_edges_service_price);
                            $(this).find('.row_edging_price').val(cutting_edges_service_price);
                            edging_price_calculate = parseFloat(edging_price_calculate) + parseFloat(cutting_edges_service_price);
                        }else{
                            edging_price_calculate = parseFloat(edging_price_calculate) + parseFloat($(this).find('.row_edging_price').val());
                        }
                    }
                });
                console.log("edging_price_calculate", edging_price_calculate);

                $("#price_table_bottom tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+edging_price_calculate.toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price) + parseFloat(edging_price_calculate)).toFixed(2)+" RON</td>");
            }   
        }
    }   
    function GetProductsValues(Product_id) {

        var succeed = false;
        $( document ).ready(function() {
            $.ajax({
                    type: 'POST',
                    url: controller_url,
                    cache : false,
                    async: false,
                    data: {
                            ajax : true,
                            Product_id : Product_id,
                            action : 'GetProductsValues',
                        },
                    dataType: 'json',
                    success: function(jsonData) {
                        succeed = jsonData;
                    }
            });
            
        });
        return succeed;

    }
    function Update_prod_qty_dec_bottom(edging_products) {
        $.each(edging_products, function(key_val, value){
            var product_ID = '';
            var product_Qty = '';
            $.each(value, function(key_val2, value2){
                if(key_val2 == "product_ID"){
                    product_ID = value2;
                }else{
                    product_Qty = value2;
                }
            });
            var GetProductQtyCart = GetProductQtyFromCart_bottom(product_ID);
            console.log(GetProductQtyCart);
            if(GetProductQtyCart.prodQty != 0){
                if(GetProductQtyCart.prodQty == product_Qty){
                    DeleteProd(product_ID, 0);
                    console.log("Delete product_ID", product_ID +"_qty_" + product_Qty);
                }else{
                    decreaseProd(product_ID, 0, product_Qty);
                    console.log("Decrease product_ID", product_ID +"_qty_" + product_Qty);
                }
            }
            
        });
    }
    function Update_prod_qty_inc_bottom(edging_products) {
        $.each(edging_products, function(key_val, value){
            var product_ID = '';
            var product_Qty = '';
            $.each(value, function(key_val2, value2){
                if(key_val2 == "product_ID"){
                    product_ID = value2;
                }else{
                    product_Qty = value2;
                }
            });
            IncreaseQuantity(product_ID, 0, product_Qty);
            console.log("Increase product_ID", product_ID +"_qty_" + product_Qty);
        });
    }
    function GetProductQtyFromCart_bottom(Product_id){
        var succeed = false;
        $( document ).ready(function() {
            $.ajax({
                    type: 'POST',
                    url: controller_url,
                    cache : false,
                    async: false,
                    data: {
                            ajax : true,
                            Product_id : Product_id,
                            action : 'GetProductsQtyFromCart',
                        },
                    dataType: 'json',
                    success: function(jsonData) {
                        succeed = jsonData;
                    }
            });
            
        });
        return succeed;

    }
    function Add_edging_products_bottom(key, value) {

        let i = edging_products.findIndex(f => f.key == key);
        if(i != -1){
            let dvalue = edging_products[i].value;
            edging_products.splice(i, 1);
            var innerObj = {};
            innerObj["key"] = key;
            innerObj["value"] = parseFloat(value) + parseFloat(dvalue);
            edging_products.push(innerObj);
        }else{
            var innerObj = {};
            innerObj["key"] = key;
            innerObj["value"] = parseFloat(value);
            edging_products.push(innerObj);
        }

    }

    function Add_edging_products_delete_bottom(key, value) {

        let i = edging_products_delete.findIndex(f => f.key == key);
        if(i != -1){
            let dvalue = edging_products_delete[i].value;
            edging_products_delete.splice(i, 1);
            var innerObj = {};
            innerObj["key"] = key;
            innerObj["value"] = parseFloat(value) + parseFloat(dvalue);
            edging_products_delete.push(innerObj);
        }else{
            var innerObj = {};
            innerObj["key"] = key;
            innerObj["value"] = parseFloat(value);
            edging_products_delete.push(innerObj);
        }

    }
    function CalcuatePieceQty(Piece_size, piece_qty, product_ID){
        var GetProductsValuesData = GetProductsValues(product_ID);
        var AreaPiece = parseFloat(Piece_size / 10) * piece_qty;
        var Product_height = parseFloat(GetProductsValuesData.productDataValues.height);
        var Product_neededQty = 0;
        if(AreaPiece > Product_height && Product_height != 0){
            Product_neededQty = (AreaPiece / Product_height);
        }else{
            Product_neededQty = 1;
        }
        Product_neededQty = Product_neededQty.toString().split('.');
        if(Product_neededQty[1] > 0){
            Product_neededQty = parseInt(Product_neededQty[0]) + 1;
        }else{
            Product_neededQty = Product_neededQty[0];
        }

        return Product_neededQty;
    }

    function UpdateEdgingCuttingPriceBottomForAll(calculate_cutting_price, total_edging_price)
    {
        var calculate_cutting_price = calculate_cutting_price;
        var total_edging_price = total_edging_price;
        $.ajax({
            type: 'POST',
            url:    controller_url,
            cache : false,
            data: {
                    ajax : true,
                    action : 'UpdateEdgingCuttingPrice',
                    Total_cutting_price_cal : calculate_cutting_price.toFixed(2),
                    Total_edging_price_cal : total_edging_price.toFixed(2),
                },
            dataType: 'json',
            success: function(jsonData) {
                console.log(jsonData);
                if(jsonData.status = true)
                {
                    if(jsonData.cuttingProdQty == null){
                        IncreaseQuantity(36407, 0, 1);
                    }else{
                        DeleteProd(36407, 0);
                        setTimeout(function(){
                            IncreaseQuantity(36407, 0, 1);
                        },3000);
                    }

                    if(jsonData.edgingProdQty == null){
                        IncreaseQuantity(36408, 0, 1);
                    }else{
                        DeleteProd(36408, 0);
                        setTimeout(function(){
                            IncreaseQuantity(36408, 0, 1);
                        },3000);
                    }
                    
                }
            }
        });

    }

    function UpdateEdgingCuttingPriceBottom(product_ID, calculate_cutting_price, total_edging_price)
    {
        var calculate_cutting_price = calculate_cutting_price;
        var total_edging_price = total_edging_price;
        var product_Ctng_Edg_Prc = getCookie("product_Ctng_Edg_Prc");
        var price_array = [];
        var Total_cutting_price_cal = 0;
        var Total_edging_price_cal = 0;
        var innerObj = {};
        innerObj["cutting_"+product_ID] = calculate_cutting_price;
        innerObj["edging_"+product_ID] = total_edging_price;
        price_array.push(innerObj);
        if(product_Ctng_Edg_Prc != ''){
            Total_cutting_price_cal = parseFloat(calculate_cutting_price);
            Total_edging_price_cal = parseFloat(total_edging_price);
            product_Ctng_Edg_Prc = JSON.parse(product_Ctng_Edg_Prc);
            $.each(product_Ctng_Edg_Prc, function(key, val){
                $.each(val, function(key2, val2){
                    var key_val = key2.split('_');
                    if(key_val[0] == "cutting" && key_val[1] != product_ID.toString()){
                        var innerObj = {};
                        innerObj[key2] = val2;
                        price_array.push(innerObj);
                        Total_cutting_price_cal = parseFloat(Total_cutting_price_cal) + parseFloat(val2);
                    }else if(key_val[0] == "edging" && key_val[1] != product_ID.toString()){
                        var innerObj = {};
                        innerObj[key2] = val2;
                        price_array.push(innerObj);
                        Total_edging_price_cal = parseFloat(Total_edging_price_cal) + parseFloat(val2);
                    }else{}
                });
            });
        }else{
            Total_cutting_price_cal = parseFloat(calculate_cutting_price);
            Total_edging_price_cal = parseFloat(total_edging_price);
        }
           
        price_array = JSON.stringify(price_array);
        setCookie("product_Ctng_Edg_Prc", price_array, 7);
        Total_cutting_price_cal = parseFloat(Total_cutting_price_cal).toFixed(2);
        Total_edging_price_cal = parseFloat(Total_edging_price_cal).toFixed(2);

        $.ajax({
            type: 'POST',
            url:    controller_url,
            cache : false,
            data: {
                    ajax : true,
                    action : 'UpdateEdgingCuttingPrice',
                    Total_cutting_price_cal : Total_cutting_price_cal,
                    Total_edging_price_cal : Total_edging_price_cal,
                },
            dataType: 'json',
            success: function(jsonData) {
                console.log(jsonData);
                if(jsonData.status = true)
                {
                    if(jsonData.cuttingProdQty == null){
                        IncreaseQuantity(36407, 0, 1);
                    }else{
                        DeleteProd(36407, 0);
                        setTimeout(function(){
                            IncreaseQuantity(36407, 0, 1);
                        },3000);
                    }

                    if(jsonData.edgingProdQty == null){
                        IncreaseQuantity(36408, 0, 1);
                    }else{
                        DeleteProd(36408, 0);
                        setTimeout(function(){
                            IncreaseQuantity(36408, 0, 1);
                        },3000);
                    }
                    
                }
            }
        });
    }

    function validate_product_property(product_ID, parameter_length, param_name){
        var Product_id = product_ID;
        var parameter_length = (parseFloat(parameter_length) / 10);
        var succeed = false;
        $.ajax({
            type: 'POST',
            url:    controller_url,
            cache : false,
            async: false,
            data: {
                    ajax : true,
                    action : 'GetProductsValues',
                    Product_id : Product_id,
                },
            dataType: 'json',
            success: function(jsonData) {
                var Product_height = parseFloat(jsonData.productDataValues.height);
                var Product_width = parseFloat(jsonData.productDataValues.width);
                if(param_name == "height"){
                    if(parameter_length >= Product_height){
                        succeed =  "limit_exceed";
                    }
                }else{
                    if(parameter_length >= Product_width){
                        succeed =  "limit_exceed";
                    }
                }
            }
        });
        return succeed;
    }

    function Check_cart_products(){
        $.ajax({
            type: 'POST',
            url:    controller_url,
            cache : false,
            async: false,
            data: {
                    ajax : true,
                    action : 'GetAllProductData',
                },
            dataType: 'json',
            success: function(jsonData) {
                var reloadPage = false;
                var products_length = jsonData.products.length;
                if(products_length != 0){
                    for(var count = 0; count<products_length; count++){
                        var id_product = jsonData.products[count].id_product;
                        if(id_product == "36407" || id_product == "36408"){
                            reloadPage = true;
                        }
                    }
                }
                console.log("reloadPage", reloadPage);
                if(reloadPage == true){
                    if(jsonData.cutting_products == null){
                        DeleteProd(36407, 0);
                        DeleteProd(36408, 0);
                        delete_cookie("product_Ctng_Edg_Prc");
                        setTimeout(function(){
                           // location.reload();
                        }, 2000);
                    }else{
                        var Status = false;
                        $.each( jsonData.cutting_products, function( key, value ) {
                            var getCookieData = getCookie("product_"+value.toString());
                            if(getCookieData != ''){
                                Status = true;
                            }
                        });
                        if(Status != true){
                            DeleteProd(36407, 0);
                            DeleteProd(36408, 0);
                            delete_cookie("product_Ctng_Edg_Prc");
                            setTimeout(function(){
                              //  location.reload();
                            }, 2000);
                        }
                    }
                }
            }
        });

    }

    function DeleteProd(id, id_attribute){
        var token = prestashop.static_token; //important for logged user
        var actionURL = '/index.php';
        var query = 'controller=cart&delete=1&id_product='+ id +'&id_product_attribute='+id_attribute+'&op=down&token='+token;
        $.post(actionURL, query, null, 'json').then(function (resp) {
        prestashop.emit('updateCart', {
                reason: resp
              });
            console.log(resp);
        }).fail(function (resp) {
            prestashop.emit('handleError', { eventType: 'addProductToCart', resp: resp });
        });
    }

    function Check_cart_cutting_products(){
        $.ajax({
            type: 'POST',
            url:    controller_url,
            cache : false,
            async: false,
            data: {
                    ajax : true,
                    action : 'GetAllProductData',
                },
            dataType: 'json',
            success: function(jsonData) {
                console.log(jsonData.cutting_products);
                var reloadStatus = false;
                if(jsonData.cutting_products == null){
                    DeleteProd(36407, 0);
                    DeleteProd(36408, 0);
                    delete_cookie("product_Ctng_Edg_Prc");
                    reloadStatus = true;
                }else{
                    var Status = false;
                    $.each( jsonData.cutting_products, function( key, value ) {
                        var getCookieData = getCookie("product_"+value.toString());
                        if(getCookieData != ''){
                            Status = true;
                        }
                    });
                    if(Status != true){
                        DeleteProd(36407, 0);
                        DeleteProd(36408, 0);
                        delete_cookie("product_Ctng_Edg_Prc");
                    }
                    if(reloadStatus == true){
                        setTimeout(function(){
                          location.reload();
                        });
                    }
                        
                    $("#bottom_cart_data").show();
                }
            }
        });

    }
        
    $(document).on('click', ".remove-from-cart", function() {
        $(".myOverlayBody").show();
        var remove_url = $(this).attr('href').split('=');
        var Product_ID = remove_url[3].split('&');
        var getCookieData = getCookie("product_"+ Product_ID[0].toString());
        if(getCookieData != '') {
            var DataStore = false;
            var getCookie_val = JSON.parse(getCookieData);
            $.each( getCookie_val, function( key, value ) {
                $.each( value, function( data_key, data_value ) {
                    $.each( data_value, function( data_key1, data_value1 ) {
                        if((data_key1 ==  "CatProducts_fată" || data_key1 ==  "CatProducts_spate" || data_key1 ==  "CatProducts_dreapta" || data_key1 ==  "CatProducts_stanga") && data_value1 != -1){
                            var edg_product_id = parseInt(data_value1);
                            setTimeout(function(){
                                DeleteProd(edg_product_id, 0);
                            },2000);
                        }
                    });
                });
            });
        }
        delete_cookie("product_"+Product_ID[0].toString());
        delete_cookie("product_edging_"+Product_ID[0].toString());
        var product_Ctng_Edg_Prc = getCookie("product_Ctng_Edg_Prc");
        var price_array = [];
        var total_edging_price = 0;
        var total_cutting_price = 0;
        if(product_Ctng_Edg_Prc != ''){
            product_Ctng_Edg_Prc = JSON.parse(product_Ctng_Edg_Prc);
            $.each(product_Ctng_Edg_Prc, function(key, val){
                $.each(val, function(key2, val2){
                    var key_val = key2.split('_');
                    if(key_val[1] != Product_ID[0].toString()){
                        var innerObj = {};
                        innerObj[key2] = val2;
                        price_array.push(innerObj);
                        console.log("innerObj", innerObj)
                        if(key_val[0] == "cutting"){
                            total_cutting_price = parseFloat(total_cutting_price) + parseFloat(val2);
                        }else{
                            total_edging_price = parseFloat(total_edging_price) + parseFloat(val2);
                        }
                    }
                });
            });
        }
        if(total_cutting_price != 0 || total_edging_price != 0){
            price_array = JSON.stringify(price_array);
            setCookie("product_Ctng_Edg_Prc", price_array, 7);
            UpdateEdgingCuttingPriceBottomForAll(total_cutting_price, total_edging_price);
        }

        Check_cart_cutting_products();
        setTimeout(function(){
            location.reload(true);
            $( window ).load(function() {
                if (window.location.href.indexOf('reload')==-1) {
                     window.location.replace(window.location.href+'?reload');
                }
            });
        }, 4000);
        setTimeout(function(){
            $(".myOverlayBody").hide();
        }, 4000);
    });

    //Cutting products on keyup
    $(document).on('keyup', "#product_dataBottom tr:last", function() {
        var classes = $(this).closest("tr").attr('class').split(' ');
        //Row Class
        var row_class = classes[2];
        var rowCount = row_class.split('_');
        rowCount = parseInt(rowCount[1])+1;
        
        //Product Class
        var product_class = classes[1];
        var product_id = product_class.split('_')[1];
        var LastTrPrcVal = $('#product_dataBottom tr .prd_price').text();
        
        var table_body = '<tr class="productHasDatabottom bottom_' + product_id.toString() + ' row_' + rowCount.toString()+'_'+product_id.toString()+'"><td><input type="text" name="piece_name" class="modal_input" onblur="validateInputField(this);"></td><td><input type="text" name="lungime" class="piece_lungime modal_input" onblur="validateFloatKeyPress(this);"></td><td><input type="text" name="latime" class="piece_latime modal_input" onblur="validateFloatKeyPress(this);"></td><td><input type="text" name="cantitate" class="modal_input cantitate" onblur="validateNumberKeyPress(this);"></td><td class="select-form-class"><div class="form-group"><select class="form-control modal_input" name="rotire"><option value="-1" selected="selected">Poate fi rotit</option><option value="DA">DA: piesa poate fi rotita contra fibrei</option><option value="NU">NU: Lungimea piesei corespunde cu lungimea fibrei;</option> </select></div></td><td><div id="productCartbottomangles"><div class="angles"></div><span class="blue"> APLICARE CANT</span></div></td><td><span class="bin"><i class="fa fa-trash" aria-hidden="true"></i></span><input type="hidden" name="row_edging_price" class="row_edging_price modal_input" value="0"></td></tr>';
        
        $("#product_dataBottom").append(table_body);
    });

    $(document).on('change', "#product_dataBottom select[name=rotire]", function() {
        var classes = $(this).closest("tr").attr('class').split(' ');
        var RowClass = classes[2].split('_');
        var product_ID =RowClass[2];
        var cantitate = $("."+classes[2]).find("input[name=cantitate]").val();
        var parameter_latime = $("."+classes[2]).find("input[name=latime]").val();
        var parameter_lungime = $("."+classes[2]).find("input[name=lungime]").val();
        var rotire = $(this).val();

        if(rotire == "DA"){
            var validate1 = validate_product_property_cart(product_ID, parameter_latime, "height");
            var validate2 = validate_product_property_cart(product_ID, parameter_lungime, "width");
        }else{
            var validate1 = validate_product_property_cart(product_ID, parameter_latime, "width");
            var validate2 = validate_product_property_cart(product_ID, parameter_lungime, "height");
        }

        if(validate1 == "limit_exceed"){
            alert("Dimensiunile piesei dorite depasesc dimensiunile produsului.");
           $("."+classes[2]).find("input[name=latime]").val("");
            return false;
        }else if(validate2 == "limit_exceed"){
            alert("Dimensiunile piesei dorite depasesc dimensiunile produsului.");
            $("."+classes[2]).find("input[name=lungime]").val("");
             return false;
        }else{
            var getCookieData = getCookie("product_"+product_ID.toString());
            var total_edging_price = 0;
            var edging_product = 0;
            var edging_category = 0;
            var Total_edges_size = 0;
            if(getCookieData != '' && cantitate != '' && parameter_latime != '' && parameter_lungime != ''){
                getCookieData = JSON.parse(getCookieData);
                $.each( getCookieData, function( key, value ) {
                    if(key == classes[2]){
                        $.each( value, function( key2, value2 ) {
                            $.each( value2, function( key3, value3 ) {
                                if(key3 == "edging_price"){
                                    total_edging_price += parseFloat(value3);
                                }else if((key3 == 'CatProducts_fată' || key3 == 'CatProducts_spate') && value3 != -1){

                                    edging_product =  value3;

                                    if(rotire == "DA"){
                                        Total_edges_size += parseFloat(parameter_lungime);
                                    }else{ 
                                        Total_edges_size += parseFloat(parameter_latime);
                                    }
                                }else if((key3 == 'CatProducts_dreapta' || key3 == 'CatProducts_stanga') && value3 != -1){

                                      edging_product =  value3;

                                    if(rotire == "DA"){
                                        Total_edges_size += parseFloat(parameter_latime);
                                    }else{ 
                                        Total_edges_size += parseFloat(parameter_lungime);
                                    }
                                     
                                }else if(key3 == "edging_category"  && value3 != -1){
                                    edging_category =  value3;
                                }else{}    
                            });
                        });
                    }
                });

                if(Total_edges_size != 0){
                    var warehouses = $("#warehousesBottom").val()
                    if(edging_category != 0){
                        var jsonDataval = GetWareHousePricesByCategory(warehouses, edging_category);
                    }else{
                        var jsonDataval = GetWareHousePrices(warehouses, edging_product);
                    }

                    UpdateAllPricesBottom(jsonDataval, Total_edges_size, cantitate, product_ID, classes[2]);
                }
            }

        }
    });

    $(document).on('blur', "#product_dataBottom .piece_lungime", function() {
        var classes = $(this).closest("tr").attr('class').split(' ');
        var RowClass = classes[2].split('_');
        var product_ID =RowClass[2];
        var rotire = $("."+classes[2]).find("select[name=rotire]").val();
        var cantitate = $("."+classes[2]).find("input[name=cantitate]").val();

        console.log("rotire", rotire);
        console.log("rotire", cantitate);

        var parameter_length = $(this).val();
        var parameter_length_opposite = $("."+classes[2]).find("input[name=latime]").val();
        var parameter_name = '';
        if(rotire == "DA"){
            parameter_name = "width";
        }else{
            parameter_name = "height";
        }

        var validate = validate_product_property(product_ID, parameter_length, parameter_name);
        if(validate == "limit_exceed"){
            alert("Dimensiunile piesei dorite depasesc dimensiunile produsului.");
            $(this).val("");
        }

        var getCookieData = getCookie("product_"+product_ID.toString());
        var total_edging_price = 0;
        var edging_product = 0;
        var edging_category = 0;
        var Total_edges_size = 0;
        if(getCookieData != '' && cantitate != '' && parameter_length != '' && parameter_length_opposite != ''){
            console.log("getCookieData", getCookieData);
            getCookieData = JSON.parse(getCookieData);
            $.each( getCookieData, function( key, value ) {
                console.log("RowClass", key);
                console.log("RowClass", classes[2]);
                if(key == classes[2]){
                    $.each( value, function( key2, value2 ) {
                        $.each( value2, function( key3, value3 ) {
                            if(key3 == "edging_price"){
                                total_edging_price += parseFloat(value3);
                            }else if((key3 == 'CatProducts_fată' || key3 == 'CatProducts_spate') && value3 != -1){

                                  edging_product =  value3;

                                  if(parameter_name == "height"){
                                    Total_edges_size += parseFloat(parameter_length_opposite);
                                  }else{ 
                                    Total_edges_size += parseFloat(parameter_length);
                                  }
                                 
                            }else if((key3 == 'CatProducts_dreapta' || key3 == 'CatProducts_stanga') && value3 != -1){

                                  edging_product =  value3;

                                  if(parameter_name == "height"){
                                     Total_edges_size += parseFloat(parameter_length);
                                  }else{
                                     Total_edges_size += parseFloat(parameter_length_opposite);
                                  }
                                 
                            }else if(key3 == "edging_category"  && value3 != -1){
                                edging_category =  value3;
                            }else{}    
                        });
                    });
                }
            });

            
           if(Total_edges_size != 0){
                var warehouses = $("#warehousesBottom").val()
                if(edging_category != 0){
                    var jsonDataval = GetWareHousePricesByCategory(warehouses, edging_category);
                }else{
                    var jsonDataval = GetWareHousePrices(warehouses, edging_product);
                }

                console.log("UpdateAllPricesBottom",  jsonDataval);
                console.log("edging_product",  edging_product);
                console.log("edging_category",  edging_category);
                 UpdateAllPricesBottom(jsonDataval, Total_edges_size, cantitate, product_ID, classes[2]);
            }
           
        }
    });

    $(document).on('blur', "#product_dataBottom .piece_latime", function() {
        var classes = $(this).closest("tr").attr('class').split(' ');
        var RowClass = classes[2].split('_');
        var product_ID =RowClass[2];
        var rotire = $("."+classes[2]).find("select[name=rotire]").val();
        var parameter_length = $(this).val();
        var cantitate = $("."+classes[2]).find("input[name=cantitate]").val();
        var parameter_length_opposite = $("."+classes[2]).find("input[name=lungime]").val();

        console.log("rotire", rotire);

        var parameter_name = '';
        if(rotire == "DA"){
            parameter_name = "height";
        }else{
            parameter_name = "width";
        }


        var getCookieData = getCookie("product_"+product_ID.toString());
        var total_edging_price = 0;
        var edging_product = 0;
        var edging_category = 0;
        var Total_edges_size = 0;
        if(getCookieData != '' && cantitate != '' && parameter_length != '' && parameter_length_opposite != ''){
            console.log("getCookieData", getCookieData);
            getCookieData = JSON.parse(getCookieData);
            $.each( getCookieData, function( key, value ) {
                console.log("RowClass", key);
                console.log("RowClass", classes[2]);
                if(key == classes[2]){
                    $.each( value, function( key2, value2 ) {
                        $.each( value2, function( key3, value3 ) {
                            if(key3 == "edging_price"){
                                total_edging_price += parseFloat(value3);
                            }else if((key3 == 'CatProducts_fată' || key3 == 'CatProducts_spate') && value3 != -1){

                                  edging_product =  value3;

                                  if(parameter_name == "height"){
                                    Total_edges_size += parseFloat(parameter_length_opposite);
                                  }else{ 
                                    Total_edges_size += parseFloat(parameter_length);
                                  }
                                 
                            }else if((key3 == 'CatProducts_dreapta' || key3 == 'CatProducts_stanga') && value3 != -1){

                                  edging_product =  value3;

                                  if(parameter_name == "height"){
                                     Total_edges_size += parseFloat(parameter_length);
                                  }else{
                                     Total_edges_size += parseFloat(parameter_length_opposite);
                                  }
                                 
                            }else if(key3 == "edging_category"  && value3 != -1){
                                edging_category =  value3;
                            }else{}    
                        });
                    });
                }
            });

            if(Total_edges_size != 0){
                var warehouses = $("#warehousesBottom").val()
                if(edging_category != 0){
                    var jsonDataval = GetWareHousePricesByCategory(warehouses, edging_category);
                }else{
                    var jsonDataval = GetWareHousePrices(warehouses, edging_product);
                }
                console.log("UpdateAllPricesBottom",  jsonDataval);
                console.log("edging_product",  edging_product);
                console.log("edging_category",  edging_category);

                UpdateAllPricesBottom(jsonDataval, Total_edges_size, cantitate, product_ID, classes[2]);
            }
        }
        var validate = validate_product_property(product_ID, parameter_length, parameter_name);
        if(validate == "limit_exceed"){
            alert("Dimensiunile piesei dorite depasesc dimensiunile produsului.");
            $(this).val("");
        }
    });

    $( document ).ready(function() {

        //Delete Product row
        $('#product_dataBottom').on('click', '.bin', function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();     
            var classes = $(this).closest("tr").attr('class').split(' ');
            var row_class = classes[2];
            var rowCount = row_class.split('_');

            var product_id = row_class.split('_');
            var CountRows = 0;
            $(".bottom_"+product_id[2]).each(function(){
                CountRows++;
            });

            //Done by Sam
            var count = $('#product_data').find('tr').length;
            if(count == 2){
                return false;
            }
            var cantitate = $("."+row_class).find("input[name=cantitate]").val();
            var latime = $("."+row_class).find("input[name=latime]").val();
            var lungime = $("."+row_class).find("input[name=lungime]").val();
            
            if(cantitate == '' && latime == '' && lungime  ==''){
                $(this).closest('.productHasDatabottom').remove();
                return false;
            }
            $(".myOverlayUpper").show();
            var getCookieData = getCookie("product_"+product_id[2].toString());
            if(getCookieData != '') {
                var JsonCookie = {};
                var getCookie_val = JSON.parse(getCookieData);
                $.each( getCookie_val, function( key, value ) { 
                
                    if(key == row_class){
                        console.log("key", key);
                        console.log("row_class", row_class);
                        console.log("Match_Key");
                    }else{
                        JsonCookie[key] = value;
                    }
                    $.each( value, function( data_key, data_value ) {
                        setTimeout(function(){
                        $.each( data_value, function( data_key1, data_value1 ) {
                            if((data_key1 ==  "CatProducts_fată" || data_key1 ==  "CatProducts_spate" || data_key1 ==  "CatProducts_dreapta" || data_key1 ==  "CatProducts_stanga") && data_value1 != -1){
                                var edg_product_id = parseInt(data_value1);
                                    DeleteProd(edg_product_id, 0);
                            }
                        });
                        },4000);
                    });
                    
                });
                var Prodcookieslngth = Object.keys(JsonCookie).length;
                if(Prodcookieslngth == 0){
                    delete_cookie("product_"+product_id[2].toString());
                }else{
                    JsonCookie = JSON.stringify( JsonCookie );
                    console.log("JsonCookie", JsonCookie);
                    setCookie("product_"+product_id[2].toString(), JsonCookie, 7);
                }
            }

            $(this).closest('.productHasDatabottom').remove();

            var warehouses = $("#warehousesBottom").val();

            if(warehouses != '' && product_id[2].toString() != ''){
                var jsonData = GetWareHousePrices(warehouses, product_id[2].toString());
            }
            if(jsonData && jsonData.WareHousePrices && jsonData.WareHousePrices.cutting_edges !== null){
                
                var Pret_taiere = jsonData.WareHousePrices.cutting_edges.Pret_taiere;
                var Dimensiune_disc_taiere = jsonData.WareHousePrices.depozite_records.Dimensiune_disc_taiere;
                var Nr_piese_pret_extra = jsonData.WareHousePrices.depozite_records.Nr_piese_pret_extra;
                var Procent_pret_extra = jsonData.WareHousePrices.depozite_records.Procent_pret_extra;

                //Calculate the piece price
                Pret_taiere = parseFloat(Pret_taiere);
                Dimensiune_disc_taiere = parseFloat(Dimensiune_disc_taiere);
                Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra);
                var prodQty = parseInt(jsonData.prodQty);

                var cantitate_sum = 0;
                $('.cantitate').each(function(){
                    if(this.value != ''){
                         cantitate_sum += parseInt(this.value);  // Or this.innerHTML, this.innerText
                    }else{
                        return false;
                    }
                });

                var all_piece_qty = parseInt(cantitate_sum);
                Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra) * parseInt(prodQty);
                if(all_piece_qty  > Nr_piese_pret_extra){
                  calculate_cutting_price = ((parseFloat(Pret_taiere) * (parseInt(prodQty))) + parseFloat((Procent_pret_extra * Pret_taiere) /  100)).toFixed(2);
                }else{  
                  calculate_cutting_price = (parseFloat(Pret_taiere) * (parseInt(prodQty))).toFixed(2);
                }
                //Show Price table
                var getCookieData = getCookie("product_"+product_id[2].toString());
                var total_edging_price = 0;
                if(getCookieData != ''){
                    getCookieData = JSON.parse(getCookieData);
                    $.each( getCookieData, function( key, value ) {
                        $.each( value, function( key2, value2 ) {
                            console.log(value[key2].row_edging_price);
                            if(typeof value[key2].row_edging_price != "undefined"){
                                total_edging_price = total_edging_price + parseFloat(value[key2].row_edging_price);
                            }
                        });
                    });
                }
                console.log("calculate_cutting_price", calculate_cutting_price);
                console.log("total_edging_price", total_edging_price);
                UpdateEdgingCuttingPrice(product_id[2].toString(), calculate_cutting_price, total_edging_price);

                if(all_piece_qty != 0){
                    $("#price_table_bottom tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+total_edging_price.toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price) + parseFloat(total_edging_price)).toFixed(2)+" RON</td>");
                }else{
                    $("#price_table_bottom tbody").html("");
                }
                
            }
            setTimeout(function(){
                $(".myOverlayUpper").hide();
            },3000);
        });
    
        //on submit Model button
        $(".common-btn").unbind().click(function(){
            $(".myOverlay").show();
            var warehouses = $("#warehousesBottom").val();
            var RowClass = $(this).val();
            var classes = $("."+RowClass).attr('class').split(' ');
            var dataArray =  [];
            
            var prod_Area = $("#prod_Area_bottom").val();
            var CountData = 1;
            var piece_hight_cus = '';
            var piece_width_cus = '';
            var piece_qty = '';
            var rotire = '';


            $("."+RowClass).closest('tr').find('.angles').attr('class', anglesClasses);
            var productClass = classes[1];
            var product = productClass.split('_');
            var product_ID = product[1];

            $("." +RowClass).closest('tr').find(".modal_input").each(function() {
                if(this.value != -1 && this.value != ''){
                    if(this.name == "lungime"){
                        piece_hight_cus = this.value;
                    }else if(this.name == "latime"){
                        piece_width_cus = this.value;
                    }else if(this.name == "cantitate"){
                        piece_qty = this.value;
                    }else if(this.name == "rotire"){
                        rotire = this.value;
                    }else{}
                }
            });

            if(rotire == "DA"){
                var piece_hight = piece_width_cus;
                var piece_width = piece_hight_cus;
            }else{
                var piece_hight = piece_hight_cus;
                var piece_width = piece_width_cus;
            }

            console.log("piece_hight", piece_hight );
            console.log("piece_width", piece_width );

            var edging_category = '';
            var Total_edges_size = 0;
            var color_pale = '';
            var edging_product = '';
            edging_products = [];
            $(this).closest('.modal-content').find(".modal_input").each(function() {
                if(this.name == "edging_category" && this.value != -1){
                    edging_category = this.value;
                }else if(this.name == 'color_pale' && this.value != ''){
                    color_pale = this.value;
                }else if(this.name == 'CatProducts_fată' && this.value != -1){
                    Total_edges_size += parseFloat(piece_width);
                    edging_product = this.value;
                    Add_edging_products_bottom(edging_product, piece_width);
                }else if(this.name == 'CatProducts_spate' && this.value != -1){
                    Total_edges_size += parseFloat(piece_width);
                    edging_product = this.value;
                    Add_edging_products_bottom(edging_product, piece_width);
                }else if(this.name == 'CatProducts_dreapta' && this.value != -1){
                    Total_edges_size += parseFloat(piece_hight);
                    edging_product = this.value;
                    Add_edging_products_bottom(edging_product, piece_hight);
                }else if(this.name == 'CatProducts_stanga' && this.value != -1){
                    Total_edges_size += parseFloat(piece_hight);
                    edging_product = this.value;
                    Add_edging_products_bottom(edging_product, piece_hight);
                }else{}
            }); 
                
            if(edging_category != '' && color_pale == "color_add"){
                var jsonDataval = GetWareHousePricesByCategory(warehouses, edging_category);
                UpdateAllPricesBottom(jsonDataval, Total_edges_size, piece_qty, product_ID, RowClass);
            }else if(edging_product != ''){
                var jsonDataval = GetWareHousePrices(warehouses, edging_product);
                UpdateAllPricesBottom(jsonDataval, Total_edges_size, piece_qty, product_ID, RowClass);
            }else{
                UpdateAllPricesBottom("", Total_edges_size, piece_qty, product_ID, RowClass);
            }


            $("." +RowClass).closest('tr').find(".modal_input").each(function() {
                if(this.value != -1 && this.value != ''){
                    var innerObj = {};
                    innerObj[this.name] = this.value;
                    dataArray.push(innerObj);
                }
            });

            var anglesClasses = ' angles';
            $(this).closest('.modal-content').find(".modal_input").each(function() {
                if(this.name != "color_pale" && this.value != ''){
                    var innerObj = {};
                    innerObj[this.name] = this.value;
                    dataArray.push(innerObj);
                    if(this.name == 'CatProducts_fată' && this.value != -1){
                        anglesClasses += ' border-upper';
                    }else if(this.name == 'CatProducts_spate' && this.value != -1){
                        anglesClasses += ' border-bottom';
                    }else if(this.name == 'CatProducts_dreapta' && this.value != -1){
                        anglesClasses += ' border-right';
                    }else if(this.name == 'CatProducts_stanga' && this.value != -1){
                        anglesClasses += ' border-left';
                    }else{}
                    
                }else{
                    if(this.checked == true){
                        var innerObj = {};
                        innerObj[this.name] = this.value;
                        dataArray.push(innerObj);
                    }
                }
            });

            $("."+RowClass).closest('tr').find('.angles').attr('class', anglesClasses);
            var getCookieData = getCookie("product_"+product_ID.toString());
            var JsonCookie = {};
            
            var Dimensiune_disc_taiere = '';
            var Pret_taiere = '';
            var Nr_piese_pret_extra = '';
            var Procent_pret_extra = '';
            var prodQty = '';
            
            if(warehouses != '' && product_ID != ''){
                var jsonData = GetWareHousePrices(warehouses, product_ID);
            }
            if(jsonData && jsonData.WareHousePrices && jsonData.WareHousePrices.depozite_records !== null){

                Pret_taiere = jsonData.WareHousePrices.cutting_edges.Pret_taiere;
                Dimensiune_disc_taiere = jsonData.WareHousePrices.depozite_records.Dimensiune_disc_taiere;
                Nr_piese_pret_extra = jsonData.WareHousePrices.depozite_records.Nr_piese_pret_extra;
                Procent_pret_extra = jsonData.WareHousePrices.depozite_records.Procent_pret_extra;
            }

            if (jsonData.prodQty === null) {
                prodQty = 1;
                IncreaseQuantity(product_ID, 0, 1);
            }else{
                prodQty = jsonData.prodQty;
            }
            prod_Area = parseFloat(prod_Area).toFixed(2) * prodQty;
            var Status = true;
            if(Dimensiune_disc_taiere){
                var remainin_prod_space = 0;
                var piece_height_val = 0;
                var piece_width_val = 0;
                var piece_qty_val = 0;
                edging_products_delete = [];
                if(getCookieData != '') {
                    var DataStore = true;
                    var getCookie_val = JSON.parse(getCookieData);
                    
                    $.each( getCookie_val, function( key, value ) {
                        if(RowClass == key){
                            $.each( value, function( data_key, data_value ) {
                                $.each( data_value, function( data_key1, data_value1 ) {
                                    if(data_key1 == "lungime"){
                                        piece_height_val = data_value1;
                                    }else if(data_key1 ==  "latime"){
                                        piece_width_val = data_value1;
                                    }else if(data_key1 ==  "cantitate"){
                                        piece_qty_val = data_value1;
                                    }else if((data_key1 ==  "CatProducts_fată" || data_key1 ==  "CatProducts_spate" || data_key1 ==  "CatProducts_dreapta" || data_key1 ==  "CatProducts_stanga") && data_value1 != -1){
                                        
                                        var edg_product_id  = parseInt(data_value1);
                                        if(edg_product_id != 0 && piece_height_val != 0 && piece_width_val != 0){
                                            if(data_key1 ==  "CatProducts_fată" || data_key1 ==  "CatProducts_spate"){
                                                Add_edging_products_delete_bottom(edg_product_id, piece_height_val);
                                            }else{
                                                Add_edging_products_delete_bottom(edg_product_id, piece_width_val);
                                            }
                                        }   
                                    }
                                });
                            });
                            JsonCookie[RowClass] = dataArray;
                            DataStore = false;
                        }else{
                            JsonCookie[key] = value;
                        }
                    });
                
                    if(DataStore == true){
                        JsonCookie[RowClass] = dataArray;
                    }
                }else{
                    JsonCookie[RowClass] = dataArray;
                }
                var piece_height1 = 0;
                var piece_width1 = 0;
                var piece_qty1 = 0;
                if(Status == true){
                    if(parseInt(prod_Area) == 0){

                        alert("We are not able to continue with the process due to empty height and width of product.");
                        Status = false;
                        $(".myOverlay").hide();
                    }
                    if(Status == true){
                        //Get Size of Edging Product
                        var edging_products_delete_qty = [];
                        $.each(edging_products_delete, function( index, value ) {
                            var edge_product_ID = value.key;
                            var edge_piece_size = value.value;
                            var CalcuatePieceQtyVal = CalcuatePieceQty(edge_piece_size, piece_qty_val, edge_product_ID);

                            var innerObj = {};
                            innerObj["product_ID"] = parseInt(edge_product_ID);
                            innerObj["qty"] = CalcuatePieceQtyVal;

                            console.log(innerObj);
                            edging_products_delete_qty.push(innerObj);
                        });
                        Update_prod_qty_dec_bottom(edging_products_delete_qty);

                        //Get Size of Edging Product
                        console.log("edging_products", edging_products);
                        var edging_products_needed_qty = [];
                        $.each(edging_products, function( index, value ) {
                            var edge_product_ID = value.key;
                            var edge_piece_size = value.value;
                            var CalcuatePieceQtyVal = CalcuatePieceQty(edge_piece_size, piece_qty, edge_product_ID);

                            var innerObj = {};
                            innerObj["product_ID"] = parseInt(edge_product_ID);
                            innerObj["qty"] = CalcuatePieceQtyVal;

                            console.log(innerObj);
                            edging_products_needed_qty.push(innerObj);
                        });
                        Update_prod_qty_inc_bottom(edging_products_needed_qty);
                        ///End of Edging Product

                        JsonCookie = JSON.stringify( JsonCookie );
                        setCookie("product_"+product_ID, JsonCookie, 7);
                        setTimeout(function(){
                            var edging_price_calculate = $("#price_table_bottom .edg_price").html();
                            var calc_price = $("#price_table_bottom .calc_price").html();
                            edging_price_calculate = edging_price_calculate.split(" ");
                            edging_price_calculate = edging_price_calculate[0];
                            calc_price = calc_price.split(" ");
                            var calculate_cutting_price = parseFloat(calc_price[0]) - parseFloat(edging_price_calculate);
                            UpdateEdgingCuttingPriceBottom(product_ID.toString(), calculate_cutting_price, edging_price_calculate);
                            $(".myOverlay").hide();
                            $("#cartAnglebottomModal").find('.close').trigger('click');
                        },8000);
                    }else{
                        $(".myOverlay").hide();
                        $("#cartAnglebottomModal").find('.close').trigger('click');
                    }
                }
            }
        });
        //Cutting products on keyup
        $('#product_dataBottom').on("keyup", ".modal_input", function(e) {
            $(this).removeClass("err_msg_input");
        });
        $('.modal-content').on("change", ".modal_input", function(e) {
            $(this).removeClass("err_msg_input");
        });
        
        
        // Start Edging Category Amgles dropdown on change
        $("#CatProductsCartBottom_fată").unbind().change(function(){
            var RowClass = $(".common-btn").val();
            var CatProductsCartBottom_fata = $(this).val();
            if(CatProductsCartBottom_fata == -1){
                $(this).closest(".cust-product-box").find('.angles').removeClass("border-upper");
            } else {
                $(this).closest(".cust-product-box").find('.angles').addClass("border-upper");
            }
        });
        
        $("#CatProductsCartBottom_spate").unbind().change(function(){
            var RowClass = $(".common-btn").val();
            var CatProductsCartBottom_spate = $(this).val();
            if(CatProductsCartBottom_spate == -1){
                $(this).closest(".cust-product-box").find('.angles').removeClass("border-bottom");
            } else {
                $(this).closest(".cust-product-box").find('.angles').addClass("border-bottom");
            }
        
        });
        
        $("#CatProductsCartBottom_stanga").unbind().change(function(){
            var RowClass = $(".common-btn").val();
            var CatProductsCartBottom_fata = $(this).val();
            if(CatProductsCartBottom_fata == -1){
                $(this).closest(".cust-product-box").find('.angles').removeClass("border-left");
            } else {
                $(this).closest(".cust-product-box").find('.angles').addClass("border-left");
            }
        });
        
        $("#CatProductsCartBottom_dreapta").unbind().change(function(){
            var RowClass = $(".common-btn").val();
            var CatProductsCartBottom_dreapta = $(this).val();
            if(CatProductsCartBottom_dreapta == -1){
                $(this).closest(".cust-product-box").find('.angles').removeClass("border-right");
            } else {
                $(this).closest(".cust-product-box").find('.angles').addClass("border-right");
            }
        });
        
        //End Angles Dropdown
        
        // Edging Category On change
        $("#category_listsCartBottom").unbind().change(function(){
            var RowClass = $(".common-btn").val();

            var Product_class = RowClass.split('_');
            var Product_id = Product_class[2];
            $('#cartAnglebottomModal').closest('div').find(".angles").attr('class', 'angles');

            $("#CatProductsCartBottom_fată").html('');
            $("#CatProductsCartBottom_spate").html('');
            $("#CatProductsCartBottom_dreapta").html('');
            $("#CatProductsCartBottom_stanga").html('');
            
            var categoryId = $(this).val();

            if(categoryId == "-1"){
                $("#CatProductsCartBottom_fată").html(CatProductsCartBottom_fata);
                $("#CatProductsCartBottom_spate").html(CatProductsCartBottom_spate);
                $("#CatProductsCartBottom_dreapta").html(CatProductsCartBottom_dreapta);
                $("#CatProductsCartBottom_stanga").html(CatProductsCartBottom_stanga);
            }else{
                $.ajax({
                    type: 'POST',
                    url:    controller_url,
                    cache : false,
                    data: {
                            ajax : true,
                            categoryId : categoryId,
                            action : 'GetCategoryProducts',
                        },
                    dataType: 'json',
                    beforeSend: function() {
                      $(".myOverlay").show();
                    },
                    success: function(jsonData) {
                        var Catproducts_Options = ''; 
                        $.each( jsonData.Catproducts, function( Catproductskey, Catproductsvalue ) {
                            if ( typeof Catproductsvalue.id_product !== "undefined") {
                                if(Catproductsvalue.active == "1"){
                                    Catproducts_Options += "<option value='"+Catproductsvalue.id_product+"' >"+Catproductsvalue.name+"</option>";
                                }
                            }else{
                                $.each( Catproductsvalue, function( Childproductskey, Childproductsvalue ) {
                                    if(Childproductsvalue.active == "1"){
                                        Catproducts_Options += "<option value='"+Childproductsvalue.id_product+"' >"+Childproductsvalue.name+"</option>";
                                    }
                                });
                            } 
                        });

                        $("#CatProductsCartBottom_fată").html(CatProductsCartBottom_fata + Catproducts_Options);
                        $("#CatProductsCartBottom_spate").html(CatProductsCartBottom_spate + Catproducts_Options);
                        $("#CatProductsCartBottom_dreapta").html(CatProductsCartBottom_dreapta + Catproducts_Options);
                        $("#CatProductsCartBottom_stanga").html(CatProductsCartBottom_stanga + Catproducts_Options);
                        
                        var getCookieData = getCookie("product_"+Product_id);
                        if(getCookieData != ''){
                            getCookieData = JSON.parse(getCookieData);
                            $.each( getCookieData, function( key, value ) {
                                if(RowClass == key){
                                    $.each( value, function( key2, value2 ) {
                                        $.each( value2, function( key3, value3 ) {
                                            if(key3 == "CatProducts_fată"){
                                                    if(value3 != -1){
                                                        var hasOption = $('#CatProductsCartBottom_fată option[value="' + value3 + '"]');
                                                        if (hasOption.length != 0) {
                                                            $('#CatProductsCartBottom_fată').closest(".cust-product-box").find('.angles').addClass("border-upper");
                                                            $('#CatProductsCartBottom_fată option[value="' + value3 + '"]').attr('selected', 'selected');
                                                        }
                                                    }else{
                                                        $('#CatProductsCartBottom_fată').closest(".cust-product-box").find('.angles').removeClass("border-upper");
                                                    }
                                                
                                            }else if(key3 == "CatProducts_spate"){
                                                    if(value3 != -1){
                                                        var hasOption = $('#CatProductsCartBottom_spate option[value="' + value3 + '"]');
                                                        if (hasOption.length != 0) {
                                                            $('#CatProductsCartBottom_spate').closest(".cust-product-box").find('.angles').addClass("border-bottom");
                                                            $('#CatProductsCartBottom_spate option[value="' + value3 + '"]').attr('selected', 'selected');
                                                        }
                                                    }else{
                                                        $('#CatProductsCartBottom_spate').closest(".cust-product-box").find('.angles').removeClass("border-bottom");
                                                    }
                                            }else if(key3 == "CatProducts_dreapta"){
                                                    if(value3 != -1){
                                                        var hasOption = $('#CatProductsCartBottom_dreapta option[value="' + value3 + '"]');
                                                        if (hasOption.length != 0) {
                                                            $('#CatProductsCartBottom_dreapta').closest(".cust-product-box").find('.angles').addClass("border-right");
                                                            $('#CatProductsCartBottom_dreapta option[value="' + value3 + '"]').attr('selected', 'selected');
                                                        }
                                                    }else{
                                                        $('#CatProductsCartBottom_dreapta').closest(".cust-product-box").find('.angles').removeClass("border-right");
                                                    }
                                                    
                                            }else if(key3 == "CatProducts_stanga"){

                                                    if(value3 != -1){
                                                        var hasOption = $('#CatProductsCartBottom_stanga option[value="' + value3 + '"]');
                                                        if (hasOption.length != 0) {
                                                            $('#CatProductsCartBottom_stanga').closest(".cust-product-box").find('.angles').addClass("border-left");
                                                            $('#CatProductsCartBottom_stanga option[value="' + value3 + '"]').attr('selected', 'selected');
                                                        }
                                                    }else{
                                                        $('#CatProductsCartBottom_stanga').closest(".cust-product-box").find('.angles').removeClass("border-left");
                                                    }
                                                    
                                            }else{}
                                        });
                                    });
                                }       
                            });
                        }
                        $(".myOverlay").hide();
                    }
                });
            }
        });

        $(".bottom_color_pale").change(function () {
            var RowClass = $(".common-btn").val();
            var Product_class = RowClass.split('_');
            var Product_id = Product_class[2];
            var getCookieData = getCookie("product_"+Product_id.toString());
            var row_values = [];
            if(getCookieData != ''){
                getCookieData = JSON.parse(getCookieData);
                $.each( getCookieData, function( key, value ) {
                    if(RowClass == key){
                        $.each( value, function( key2, value2 ) {
                            row_values.push(value2);
                        });
                    }
                });
            }

            $('#cartAnglebottomModal').closest('div').find(".angles").attr('class', 'angles');

            if( $(this).val() == 'color_not_add' ){

                $(this).closest('.container-fluid').find('.edging_div').hide();

                Assigned_product_val_bottom(Product_id, row_values);
            }else{

                $(this).closest('.container-fluid').find('.edging_div').show();

                Total_all_colors_bottom(row_values);
            }

        });

        $('#product_dataBottom').on('click', '#productCartbottomangles', function() {
            

            $("input[name=color_pale][value='color_not_add']").prop('checked', true);
            var InputError = 0;
            var classes = $(this).closest("tr").attr('class').split(' ');
            var row_class = classes[2];
            var piece_hight = '';
            var piece_width = '';

            if($("#warehousesBottom").val() == -1){
                $("#warehousesBottom").addClass("err_msg_input");
                InputError++;
            }
            $(this).closest("tr").find(".modal_input").each(function() {
                if(this.value == '' || this.value == -1){
                    $(this).addClass("err_msg_input");
                    InputError++;
                }else{
                    if(this.name == "lungime"){
                        piece_hight = this.value;
                    }else if(this.name == "latime"){
                        piece_width = this.value;
                    }else{}
                }
            });
            
            if(InputError == 0){
                $('#cartAnglebottomModal').modal('show');
            }else{
                console.log(InputError);
                return false;
            }
            
            if(piece_hight != '' && piece_width != ''){
                $('.Product_size_cart').text(piece_hight +' x '+piece_width);
            }   
            
            $('.modal-content').closest('div').find(".common-btn").val(row_class);
            
            //Conditional Base According to select boxes
            $('#cartAnglebottomModal').closest('div').find(".angles").attr('class', 'angles');
            
            //Remove Error Classes From Inputs
            $('.modal-content').closest('div').find(".modal_input").each(function() {
                $(this).removeClass("err_msg_input");
            });
            
            var category_Options = '<option value="-1">Alege cant</option>';


            $("#category_listsCartBottom").html(category_Options);
            $("#CatProductsCartBottom_fată").html(CatProductsCartBottom_fata);
            $("#CatProductsCartBottom_spate").html(CatProductsCartBottom_spate);
            $("#CatProductsCartBottom_dreapta").html(CatProductsCartBottom_dreapta);
            $("#CatProductsCartBottom_stanga").html(CatProductsCartBottom_stanga);

            var Product_class = classes[1];
            Product_class = Product_class.split('_');
            var Product_id = Product_class[1];

            var getCookieData = getCookie("product_"+Product_id.toString());
            var row_values = [];
            var radio_color_pale = '';
            var edging_price = 0;
            if(getCookieData != ''){
                getCookieData = JSON.parse(getCookieData);
                $.each( getCookieData, function( key, value ) {
                    if(row_class == key){
                        $.each( value, function( key2, value2 ) {
                            row_values.push(value2);
                            $.each( value2, function( key3, value3 ) {
                                if(key3 == "edging_price"){
                                    edging_price = value3;
                                }else if(key3 == "color_pale"){
                                    radio_color_pale = value3;
                                    $("input[name=color_pale][value=" + value3 + "]").prop('checked', true);
                                }else{}
                            });
                        });
                    
                    }
                });
                if(edging_price != 0){
                    $(".edging_price").val(edging_price);
                }
                if(radio_color_pale == "color_add"){
                    $('.edging_div').show();
                }else{
                    $('.edging_div').hide();
                }
            }
            if(radio_color_pale == "color_add"){
                Total_all_colors_bottom(row_values);
            }else{
                Assigned_product_val_bottom(Product_id, row_values);
            }
        });
        
        $("#ProductListBottom").change(function(){
            var ProductId = $(this).val();
            if(ProductId == "-1"){
    
            }else{
                //Warehouse
                var getCookieWarehouse = getCookie("warehouse_"+ProductId.toString());
                if(getCookieWarehouse != "") {
                    var warehouses = getCookieWarehouse;
                    $("#warehousesBottom").val(getCookieWarehouse).change();
                }
                $.ajax({
                    type: 'POST',
                    url: controller_url,
                    cache : false,
                    data: {
                            ajax : true,
                            product_id : ProductId,
                            action : 'GetAllProductData',
                        },
                    dataType: 'json',
                    success: function(jsonData) {
                        var productData = jsonData.products;
                        var foundproductData = $.map(productData, function(val) {
                            return val.id_product == ProductId.toString() ? val : null;
                        });
                        
                        var table_body = '';
                        var getCookieData = getCookie("product_"+ProductId.toString());
                        var LastRowkey = '';
                        var anglesClasses = '';
                        var AppendData = false;
                        var row_edging_price = 0;
                        if(getCookieData != ''){
                            getCookieData = JSON.parse(getCookieData);
                            $.each( getCookieData, function( key, value ) {
                                table_body += '<tr class="productHasDatabottom bottom_' + ProductId.toString() + ' '+ key.toString() + '">';
                                LastRowkey = key;
                                anglesClasses = '';
                                row_edging_price = 0;
                                $.each( value, function( key2, value2 ) {
                                    $.each( value2, function( key3, value3 ) {
                                        if(key3 == 'CatProducts_fată' && value3 != -1){
                                            anglesClasses += ' border-upper';
                                        }else if(key3 == 'CatProducts_spate' && value3 != -1){
                                            anglesClasses += ' border-bottom';
                                        }else if(key3 == 'CatProducts_dreapta' && value3 != -1){
                                            anglesClasses += ' border-right';
                                        }else if(key3 == 'CatProducts_stanga' && value3 != -1){
                                            anglesClasses += ' border-left';
                                        }else if(key3 == 'piece_name'){
                                            AppendData = true;
                                            table_body += '<td><input type="text" name="'+ key3.toString() +'" class="modal_input" onblur="validateInputField(this);" value="'+ value3.toString() +'"> </td>';
                                        }else if(key3 == 'lungime'){
                                            table_body += '<td><input type="text" name="'+ key3.toString() +'" class="piece_lungime modal_input" onblur="validateFloatKeyPress(this);" value="'+ value3.toString() +'"> </td>';
                                        }else if(key3 == 'latime'){
                                            table_body += '<td><input type="text" name="'+ key3.toString() +'" class="piece_latime modal_input" onblur="validateFloatKeyPress(this);" value="'+ value3.toString() +'"> </td>';
                                        }else if(key3 == 'cantitate'){
                                            table_body += '<td><input type="text" name="cantitate" class="modal_input cantitate" onblur="validateNumberKeyPress(this);" value="'+ value3.toString() +'"></td>';
                                        }else if(key3 == 'row_edging_price'){
                                            row_edging_price = value3;
                                        }else if(key3 == 'rotire'){
                                            var Da = '';
                                            var Na = '';
                                            var Emptyval = '';
                                            if(value3 == 'DA'){
                                                Da = 'selected="selected"';
                                            }else if(value3 == 'NU'){
                                                Na = 'selected="selected"';
                                            }else{
                                                Emptyval = 'selected="selected"';
                                            }
                                            
                                            table_body += '<td class="select-form-class"><div class="form-group"><select class="form-control modal_input" name="rotire"><option value="-1" '+ Emptyval +'>Poate fi rotit</option><option value="DA" '+ Da +'>DA: piesa poate fi rotita contra fibrei</option><option value="NU" '+ Na +'>NU: Lungimea piesei corespunde cu lungimea fibrei;</option> </select></div></td>';
                                        }else{}
                                    });
                                });
                                table_body += '<td><div id="productCartbottomangles"><div class="angles'+anglesClasses+'"></div><span class="blue">MODIFICA</span></div></td><td><span class="bin"><i class="fa fa-trash" aria-hidden="true"></i></span><input type="hidden" name="row_edging_price" class="row_edging_price modal_input" value="'+row_edging_price+'"></td></tr>';
                            });
                        }
                        
                        if(LastRowkey != ''){
                            var LastrowCount = LastRowkey.split('_');
                            var LastCountr = parseInt(LastrowCount[1])+1;
                        }else{
                            var LastCountr = 1;
                        }
                        table_body += '<tr class="productHasDatabottom bottom_' + ProductId.toString() + ' row_'+LastCountr.toString() +'_'+ProductId.toString()+'"><td><input type="text" name="piece_name" class="modal_input" onblur="validateInputField(this);"> </td><td><input type="text" name="lungime" class="piece_lungime modal_input" onblur="validateFloatKeyPress(this);"></td><td><input type="text" name="latime" class="piece_latime modal_input" onblur="validateFloatKeyPress(this);"></td><td><input type="text" name="cantitate" class="modal_input cantitate" onblur="validateNumberKeyPress(this);"></td><td class="select-form-class"><div class="form-group"><select class="form-control modal_input" name="rotire" ><option value="-1" selected="selected">Poate fi rotit</option><option value="DA">DA: piesa poate fi rotita contra fibrei</option><option value="NU">NU: Lungimea piesei corespunde cu lungimea fibrei;</option> </select></div></td><td><div id="productCartbottomangles"><div class="angles"></div><span class="blue"> APLICARE CANT</span></div></td><td><span class="bin"><i class="fa fa-trash" aria-hidden="true"></i></span><input type="hidden" name="row_edging_price" class="row_edging_price modal_input" value="0"></td></tr>';
                        var pro_width_data = parseFloat(foundproductData[0].width).toFixed(2);
                        var pro_height_data = parseFloat(foundproductData[0].height).toFixed(2);
                        $('#product_dataBottom tbody').html(table_body);
                        $('#prod_Area_bottom').val(parseFloat(pro_width_data).toFixed(2) * parseFloat(pro_height_data).toFixed(2));
                        $('#prod_height_bottom').val(parseFloat(pro_height_data));
                        $('#prod_width_bottom').val(parseFloat(pro_width_data));


                        //Showing calculated price
                        
                        if(warehouses == -1){
                            $(this).val('');
                            return false;
                        }else{
                            var Dimensiune_disc_taiere = '';
                            var Nr_piese_pret_extra = '';
                            var prodQty = 0;
                            var Pret_taiere = '';
                            var Procent_pret_extra = '';
                            var calculate_cutting_price = '';
                            if(warehouses != '' && ProductId != ''  && AppendData == true){
                                var jsonData = GetWareHousePrices(warehouses, ProductId);
                            }
                            if(jsonData && jsonData.WareHousePrices && jsonData.WareHousePrices.cutting_edges !== null){
                                
                                Pret_taiere = jsonData.WareHousePrices.cutting_edges.Pret_taiere;
                                Dimensiune_disc_taiere = jsonData.WareHousePrices.depozite_records.Dimensiune_disc_taiere;
                                Nr_piese_pret_extra = jsonData.WareHousePrices.depozite_records.Nr_piese_pret_extra;
                                Procent_pret_extra = jsonData.WareHousePrices.depozite_records.Procent_pret_extra;

                                //Calculate the piece price
                                Pret_taiere = parseFloat(Pret_taiere);
                                Dimensiune_disc_taiere = parseFloat(Dimensiune_disc_taiere);
                                Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra);
                                prodQty = parseInt(jsonData.prodQty);
                                var cantitate_sum = 0;
                                $('.cantitate').each(function(){
                                    if(this.value != ''){
                                         cantitate_sum += parseInt(this.value);  // Or this.innerHTML, this.innerText
                                    }
                                });
                                var piece_qty = parseInt(cantitate_sum);
                                Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra) * parseInt(prodQty);
                                if(piece_qty  > Nr_piese_pret_extra){
                                  calculate_cutting_price = ((parseFloat(Pret_taiere) * (parseInt(prodQty))) + parseFloat((Procent_pret_extra * Pret_taiere) /  100)).toFixed(2);
                                }else{  
                                  calculate_cutting_price = (parseFloat(Pret_taiere) * (parseInt(prodQty))).toFixed(2);
                                }

                                var getCookieData = getCookie("product_"+ProductId.toString());
                                console.log("getCookieData", getCookieData);
                                var total_edging_price = 0;
                                if(getCookieData != ''){
                                    getCookieData = JSON.parse(getCookieData);
                                    $.each( getCookieData, function( key, value ) {
                                        $.each( value, function( key2, value2 ) {
                                            console.log(value[key2].row_edging_price);
                                            if(typeof value[key2].row_edging_price != "undefined"){
                                                total_edging_price = total_edging_price + parseFloat(value[key2].row_edging_price);
                                            }
                                        });
                                    });
                                    //Show Price table
                                    $("#price_table_bottom tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+parseFloat(total_edging_price).toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price) + parseFloat(total_edging_price)).toFixed(2)+" RON</td>");
                                }else{
                                     $("#price_table_bottom tbody").html("");
                                }
                            }else{

                                //alert("WareHouse Prices Prices is not updated");
                            }
                        }
                    }
                });
            }
        });
        $("#warehousesBottom").change(function(){
            $(this).removeClass("err_msg_input");
            var warehouse_select = $(this).val();
            var PageProduct_id = $("#ProductListBottom").val();
            setCookie("warehouse_"+PageProduct_id, warehouse_select, 7);
        });
        $(".bottom_debitare").click(function(){
            $(".myOverlayUpper").show();
            $("#product_dataBottom tbody").html('');
            $.ajax({
                type: 'POST',
                url: controller_url,
                cache : false,
                data: {
                        ajax : true,
                        action : 'GetAllProductData',
                    },
                dataType: 'json',
                success: function(jsonData) {
                    if(typeof jsonData.warehouse_all !== 'undefined' && jsonData.warehouse_all.length > 0){
                        var warehousesOptions = '<option value="-1">Alege depozit Regency</option>';
                        $.each( jsonData.warehouse_all, function( key, value ) {
                           warehousesOptions +=  "<option value='"+value.id+"'>"+value.Titlu+"</option>";
                        });
                        $('#warehousesBottom').html(warehousesOptions);
                    }
                    
                    if(typeof jsonData.products !== 'undefined' && jsonData.products.length > 0){
                        var productOptions = '<option value="-1">Alege produs</option>';
                        $.each( jsonData.products, function( key, value ) {
                            var product_id_val = parseInt(value.id_product);
                            if(jQuery.inArray(product_id_val, jsonData.cutting_products) != -1) {
                                productOptions +=  "<option value='"+value.id_product+"'>"+value.name+"</option>";      
                            }
                        });
                        
                        $('#ProductListBottom').html(productOptions);
                    }
                    //hide overlay
                    $(".myOverlayUpper").hide();
                }
            });
        });
        $('#cartbottomModal').on('click', '.close', function(event) {
            $(".myOverlayBody").show();
            setTimeout(function(){
                location.reload();
            }, 5000);
        });
        $("#bottom_cart_data").hide();
        $('.edging_div').hide();
       Check_cart_cutting_products();
    });
    //continue process
    $(document).on('click', '.save_cart_bottom_btn', function(e){
        e.stopPropagation();
        $(".myOverlayUpper").show();
        var Product_ID = $(this).closest('#cartbottomModal').find("#ProductListBottom").val();
        var JsonCookie = {};
        var check_row = [];
        $("#product_dataBottom .bottom_"+Product_ID).each(function(){
            var rowClasses = $(this).attr("class").split(" ");
            if($.inArray( rowClasses[2], check_row ) == -1){
                console.log("rowClasses", rowClasses[2]);
                check_row.push(rowClasses[2]);
                var rotire_val = $(this).find("select[name=rotire]").val();
                var piece_name = $(this).find("input[name=piece_name]").val();
                if(rotire_val == "DA"){
                    //Swap the values of length and width
                    var piece_latime = $(this).find(".piece_lungime").val();
                    var piece_lungime = $(this).find(".piece_latime").val();
                }else{
                    var piece_lungime = $(this).find(".piece_lungime").val();
                    var piece_latime = $(this).find(".piece_latime").val();
                }
                var cantitate_cart = $(this).find(".cantitate").val();
                var row_edging_price = $(this).find(".row_edging_price").val();
                console.log("row_edging_price", row_edging_price);
                console.log("cantitate_cart", cantitate_cart);
                console.log("piece_lungime", piece_lungime);
                console.log("piece_latime", piece_latime);
                var getCookieData = getCookie("product_"+Product_ID.toString());
                if(getCookieData != ''){
                    getCookieData = JSON.parse(getCookieData);
                    console.log("getCookieData", getCookieData[rowClasses[2]]);
                    if(typeof getCookieData[rowClasses[2]] != "undefined" && piece_name != "" && piece_lungime != "" && piece_latime != "" && cantitate_cart != ""){
                        var dataArray= []; 
                        var dataArraylength = getCookieData[rowClasses[2]].length;
                        for(var i=0;i<dataArraylength;i++){
                            $.each( getCookieData[rowClasses[2]][i], function( key2, value2 ) {
                                if(key2 == 'piece_name'){
                                    var innerObj = {};
                                    innerObj['piece_name'] = piece_name;
                                    dataArray.push(innerObj);
                                }else if(key2 == 'lungime'){
                                    var innerObj = {};
                                    innerObj['lungime'] = piece_lungime;
                                    dataArray.push(innerObj);
                                }else if(key2 == 'latime'){
                                    var innerObj = {};
                                    innerObj['latime'] = piece_latime;
                                    dataArray.push(innerObj);
                                }else if(key2 == 'cantitate'){
                                    console.log("cantitate_cart", cantitate_cart);
                                    var innerObj = {};
                                    innerObj['cantitate'] = cantitate_cart;
                                    dataArray.push(innerObj);
                                }else if(key2 == 'rotire'){
                                    var innerObj = {};
                                    innerObj['rotire'] = rotire_val;
                                    dataArray.push(innerObj);
                                }else if(key2 == 'row_edging_price'){
                                    var innerObj = {};
                                    innerObj['row_edging_price'] = row_edging_price;
                                    dataArray.push(innerObj);
                                }else{
                                    var innerObj = {};
                                    innerObj[key2] = value2;
                                    dataArray.push(innerObj);
                                }
                            }); 
                        }
                        JsonCookie[rowClasses[2]] = dataArray;
                    }else if(piece_name != "" || piece_lungime != "" || piece_latime != "" || cantitate_cart != ""){
                        var dataArray= [];
                        var innerObj = {};
                        innerObj['piece_name'] = piece_name;
                        dataArray.push(innerObj);

                        var innerObj = {};
                        innerObj['lungime'] = piece_lungime;
                        dataArray.push(innerObj);

                        var innerObj = {};
                        innerObj['latime'] = piece_latime;
                        dataArray.push(innerObj);

                        var innerObj = {};
                        innerObj['cantitate'] = cantitate_cart;
                        dataArray.push(innerObj);

                        var innerObj = {};
                        innerObj['rotire'] = rotire_val;
                        dataArray.push(innerObj);

                        var innerObj = {};
                        innerObj['row_edging_price'] = row_edging_price;
                        dataArray.push(innerObj);

                        JsonCookie[rowClasses[2]] = dataArray;
                    }else{}
                }else if(piece_name != "" || piece_lungime != "" || piece_latime != "" || cantitate_cart != ""){

                    var dataArray= [];
                    var innerObj = {};
                    innerObj['piece_name'] = piece_name;
                    dataArray.push(innerObj);

                    var innerObj = {};
                    innerObj['lungime'] = piece_lungime;
                    dataArray.push(innerObj);

                    var innerObj = {};
                    innerObj['latime'] = piece_latime;
                    dataArray.push(innerObj);

                    var innerObj = {};
                    innerObj['cantitate'] = cantitate_cart;
                    dataArray.push(innerObj);

                    var innerObj = {};
                    innerObj['rotire'] = rotire_val;
                    dataArray.push(innerObj);

                    var innerObj = {};
                    innerObj['row_edging_price'] = row_edging_price;
                    dataArray.push(innerObj);
                    JsonCookie[rowClasses[2]] = dataArray;
                    console.log("JsonCookie", JsonCookie);
                }else{}
            }   
        });
        var edg_price = $("#price_table_bottom .edg_price").html();
        var calc_price = $("#price_table_bottom .calc_price").html();
        if(typeof edg_price != "undefined" && typeof calc_price != "undefined"){
            edg_price = edg_price.split(" ");
            calc_price = calc_price.split(" ");
            var edging_price = edg_price[0];
            var cutting_price = parseFloat(calc_price[0]) - parseFloat(edging_price);
            console.log("edging_price",edging_price);
            console.log("cutting_price", cutting_price);
        }else{
            var edging_price = '';
            var cutting_price = '';
        }
        var product_Ctng_Edg_Prc = getCookie("product_Ctng_Edg_Prc");
        var price_array = [];
        var total_edging_price = 0;
        var total_cutting_price = 0;
        if(product_Ctng_Edg_Prc != ''){
            product_Ctng_Edg_Prc = JSON.parse(product_Ctng_Edg_Prc);
            $.each(product_Ctng_Edg_Prc, function(key, val){
                $.each(val, function(key2, val2){
                    var key_val = key2.split('_');
                    if(key_val[1] != Product_ID.toString()){
                        if(key_val[0] == "cutting"){
                            var innerObj = {};
                            innerObj[key2] = val2;
                            price_array.push(innerObj);
                            console.log("innerObj", innerObj);
                            total_cutting_price = parseFloat(total_cutting_price) + parseFloat(val2);
                        }else{
                            var innerObj = {};
                            innerObj[key2] = val2;
                            price_array.push(innerObj);
                            console.log("innerObj", innerObj);
                            total_edging_price = parseFloat(total_edging_price) + parseFloat(val2);
                        }
                    }else{
                        if(key_val[0] == "cutting" && cutting_price != ''){
                            var innerObj = {};
                            innerObj[key2] = cutting_price;
                            price_array.push(innerObj);
                            console.log("innerObj", innerObj);
                            total_cutting_price = parseFloat(total_cutting_price) + parseFloat(cutting_price);
                        }else if(edging_price != ''){
                            var innerObj = {};
                            innerObj[key2] = edging_price;
                            price_array.push(innerObj);
                            console.log("innerObj", innerObj);
                            total_edging_price = parseFloat(total_edging_price) + parseFloat(edging_price);
                        }else{}
                    }
                });
            });
        }else{
            
            if(cutting_price != '' && edging_price != ''){
                var innerObj = {};
                innerObj["cutting_"+Product_ID.toString()] = cutting_price;
                price_array.push(innerObj);

                var innerObj = {};
                innerObj["edging_"+Product_ID.toString()] = edging_price;
                price_array.push(innerObj);
                total_cutting_price = parseFloat(cutting_price);
                total_edging_price = parseFloat(edging_price);
            }
        }
        if(total_cutting_price != 0 || total_edging_price != 0){
            console.log("total_cutting_price", total_cutting_price);
            console.log("total_edging_price", total_edging_price);
            price_array = JSON.stringify(price_array);
            setCookie("product_Ctng_Edg_Prc", price_array, 7);
            UpdateEdgingCuttingPriceBottomForAll(total_cutting_price, total_edging_price);
        }
        JsonCookie = JSON.stringify(JsonCookie);
        JsonCookieLength = Object.keys(JsonCookie).length;
        console.log("JsonCookie", JsonCookie);
        if(JsonCookieLength != 2){
            setCookie("product_"+Product_ID, JsonCookie, 7);
        }else{
            delete_cookie("product_"+Product_ID);
        }
        Check_cart_cutting_products();
        setTimeout(function(){
            $("#cartbottomModal").find('.close').trigger('click');
        },2000);
    });

    //Delete Product all settings
    $(document).on('click', ".remov_cart_bottom_btn", function() {
        $(".myOverlayUpper").show();
        var Product_ID = $(this).closest('#cartbottomModal').find("#ProductListBottom").val();
        var getCookieData = getCookie("product_"+ Product_ID.toString());
        
        if(getCookieData != '') {
            var DataStore = false;
            var getCookie_val = JSON.parse(getCookieData);
            $.each( getCookie_val, function( key, value ) {
                $.each( value, function( data_key, data_value ) {
                    $.each( data_value, function( data_key1, data_value1 ) {
                        if((data_key1 ==  "CatProducts_fată" || data_key1 ==  "CatProducts_spate" || data_key1 ==  "CatProducts_dreapta" || data_key1 ==  "CatProducts_stanga") && data_value1 != -1){
                            var edg_product_id = parseInt(data_value1);
                            setTimeout(function(){
                                DeleteProd(edg_product_id, 0);
                            },2000);
                        }
                    });
                });
            });
        }

        delete_cookie("product_"+Product_ID.toString());
        delete_cookie("product_edging_"+Product_ID.toString());
        
        var product_Ctng_Edg_Prc = getCookie("product_Ctng_Edg_Prc");
        var price_array = [];
        var total_edging_price = 0;
        var total_cutting_price = 0;
        if(product_Ctng_Edg_Prc != ''){
            product_Ctng_Edg_Prc = JSON.parse(product_Ctng_Edg_Prc);
            $.each(product_Ctng_Edg_Prc, function(key, val){
                $.each(val, function(key2, val2){
                    var key_val = key2.split('_');
                    if(key_val[1] != Product_ID.toString()){
                        var innerObj = {};
                        innerObj[key2] = val2;
                        price_array.push(innerObj);
                        console.log("innerObj", innerObj)
                        if(key_val[0] == "cutting"){
                            total_cutting_price = parseFloat(total_cutting_price) + parseFloat(val2);
                        }else{
                            total_edging_price = parseFloat(total_edging_price) + parseFloat(val2);
                        }
                    }
                });
            });
        }
        if(total_cutting_price != 0 || total_edging_price != 0){
            price_array = JSON.stringify(price_array);
            setCookie("product_Ctng_Edg_Prc", price_array, 7);
            UpdateEdgingCuttingPriceBottomForAll(total_cutting_price, total_edging_price);
        }

        Check_cart_products();
        setTimeout(function(){
            $(".myOverlayUpper").hide();
            $("#cartbottomModal").find('.close').trigger('click');
        },3000);
    });