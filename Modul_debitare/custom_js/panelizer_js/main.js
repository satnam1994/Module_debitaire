$(document).foundation();


// TODO break out into separate files
// TODO create separate size entry and panel views
// TODO show detailed panel information in panel view
// TODO add kerf field to panel form
// TODO add kerf value to width and height of each part
// TODO remove parts from $addedParts when removed from part table
// TODO ensure part is smaller than sheet before adding to list
// TODO provide messaging for validation, button presses etc.
// TODO setup gulp?

Zepto(function ($) {
    
  var fitFactor = 5;
  var panelHeight = 0;
  var panelWidth = 0;
  var material = "";
  var thickness = 0;
  var widthOffset = 250;
  var panels = [];
  var partArray = [];
  var panelQuantity = 0;
  var $material ='';
  var $thickness = 1;
  
  var $addedParts = $([]);
  var pagerIndex = 0;
  var panelDivId = "";
  // builds an array of parts
  var addToPartArray = function () {
    for (var i = 0; i < $addedParts.length; i++) {
      for (var t = 0; t < $addedParts[i].qty; t++) {
        partArray.push({
          w: fitDisplay($addedParts[i].w),
          h: fitDisplay($addedParts[i].h)
        });
      }
    }

    // sort parts by comparing height - smallest
    // sort parts by comparing  width to height - largest
    partArray.sort(function (a, b) {
      return (b.h < a.h);
    });
    partArray.sort(function (a, a) {
      return (a.w > a.h);
    });
  };

  var drawRect = function (canvas, x, y, width, height) {
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      ctx.strokeRect(x, y, width, height);
    }
  };

  // scales provided item to fit a page
  var fitDisplay = function (item) {
    return item *= fitFactor;
  };

  var displayPanels = function (panelArray) {
    for (var i = 0; i < panelArray.length; i++) {
      var canvasId = "canvas" + i;
      var createCanvas = "<canvas class='canvas_data' id='" + canvasId + "' width ='" + fitDisplay(panelWidth) + "' height ='" + fitDisplay(panelHeight) + "'></canvas>";
      var generate_id = Math.floor(new Date().valueOf() * Math.random());
      $("#"+panelDivId).append("<div style='display:none;' id='"+generate_id+"''>"+createCanvas+"</div>");
      canvas = document.getElementById(canvasId);
      drawRect(canvas, 0, 0, fitDisplay(panelWidth), fitDisplay(panelHeight));

      panelQuantity = panels[i][panels[i].length - 1];

      // create a rectangle for each of the parts in this panel
      for (var t = 0; t < panelArray[i].length; t++) {
        block = panelArray[i][t];
        drawRect(canvas, block.fitX, block.fitY, block.w, block.h);
      }
      $(canvas).data("panelQty", panelQuantity);
    }
    $("canvas").hide();
    $("canvas").eq(pagerIndex).show();
  };

  // recursively processes the provided array of parts
  // fits parts into panel dimensions
  var optimize = function (partArray) {

    var removeBlockArray = [];
    var blockArray = [];

    // create a bin packing panel
    // fit the parts in the array into the panel
    var packer = new Packer(fitDisplay(panelWidth), fitDisplay(panelHeight));

    packer.fit(partArray);

    // decide if the part fits the panel
    // add to appropriate array
    for (var i = 0; i < partArray.length; i++) {
      var block = partArray[i];
      if (block.fit) {
        removeBlockArray.push(i);
        blockArray.push({
          fitX: block.fit.x,
          fitY: block.fit.y,
          w: block.w,
          h: block.h
        });
      }
    }

    // add this panel of parts to the array of panels
    panels.push(blockArray);

    // remove the fitted parts from the pool of parts to be fit
    for (var i = removeBlockArray.length - 1; i >= 0; i--) {
      partArray.splice(removeBlockArray[i], 1);
    }

    // if parts are still to be fit
    // call this optimize function again
    if (partArray.length > 0) {
      optimize(partArray);
    }
  }

  // find duplicate panels
  var compareBlocks = function (array1, array2) {

    if (array1.length != array2.length)
      return false;

    for (var i = array1.length - 1; i >= 0; i--) {
      if (array1[i].h != array2[i].h) return false;
      if (array1[i].w != array2[i].w) return false;
      if (array1[i].fitW != array2[i].fitW) return false;
      if (array1[i].fitY != array2[i].fitY) return false;
    }
    return true;
  }

  var deduplicatePanels = function (panels) {

    for (var i = 0; i < panels.length - 1; i++) {
      var panelQuantity = 1;
      for (var t = i + 1; t < panels.length; t++) {
        if (compareBlocks(panels[i], panels[t])) {
          panelQuantity = panelQuantity + 1;
          panels[i][panels[i].length - 1] = panelQuantity;
        }
      }
      panels.splice(i + 1, panelQuantity - 1);
    }
  }


  // Keyup to calculate cutting and edging price
  $( "#product_data tbody" ).on('blur', ".cantitate_cart", function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    panelDivId = "product_cutting_image";
     $("#product_cutting_image").html("");
    var warehouses = $("#warehousesCart").val();
    if(warehouses == -1){
      $("#warehousesCart").addClass("err_msg_input");
      $(this).val('');
      return false;
    }else{
      var current_piece_qty = parseInt($(this).val());
      var classes = $(this).closest("tr").attr('class').split(' ');
      var RowClass = classes[2].split('_');
      var product_ID =RowClass[2];
      var current_piece_latime = $("." + classes[2].toString()).find('.piece_latime').val();
      var current_piece_lungime = $("." + classes[2].toString()).find('.piece_lungime').val();

      var prodQty = 0;
      var prod_Area = $("#prod_Area").val();
      var prod_height = $("#prod_height").val();
      var prod_width = $("#prod_width").val();
      panelHeight = prod_height;
      panelWidth = prod_width;
      var Dimensiune_disc_taiere = 0;
      var Nr_piese_pret_extra = 0;
      var Pret_taiere = 0;
      var Procent_pret_extra = 0;
      var calculate_cutting_price = 0;
      var cal_crnt_cutt_price = 0;

      if(warehouses != '' && product_ID != ''){
        var jsonData = GetWareHousePrices(warehouses, product_ID);
      }
      if (jsonData.prodQty === null) {
        prodQty = 1;
        IncreaseQuantity(product_ID, 0, 1);
      }else{
        prodQty = jsonData.prodQty;
      }

      if(jsonData && jsonData.WareHousePrices && jsonData.WareHousePrices.cutting_edges.Pret_taiere !== null){
        
        Pret_taiere = jsonData.WareHousePrices.cutting_edges.Pret_taiere;
        Dimensiune_disc_taiere = jsonData.WareHousePrices.depozite_records.Dimensiune_disc_taiere;
        Nr_piese_pret_extra = jsonData.WareHousePrices.depozite_records.Nr_piese_pret_extra;
        Procent_pret_extra = jsonData.WareHousePrices.depozite_records.Procent_pret_extra;

        //Calculate the piece price
        Pret_taiere = parseFloat(Pret_taiere);
        Dimensiune_disc_taiere = parseFloat(Dimensiune_disc_taiere);
        Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra);

        var AllTotalCuttingArea = 0;
        //Calculate area according to height and width
        var ProdQtyNeeded = 0;
        var pieces = [];
        var check_row = [];
        $("#product_data .bottom_"+product_ID).each(function(){
          var rowClasses = $(this).attr("class").split(" ");
          if($.inArray( rowClasses[2], check_row ) == -1){
            check_row.push(rowClasses[2]);
            var rotire_val = $(this).find("select[name=rotire]").val();

            if(rotire_val == "DA"){
              //Swap the values of length and width
              var piece_latime = $(this).find(".piece_lungime").val();
              var piece_lungime = $(this).find(".piece_latime").val();

            }else{

              var piece_lungime = $(this).find(".piece_lungime").val();
              var piece_latime = $(this).find(".piece_latime").val();
            }

            var cantitate_cart = $(this).find(".cantitate_cart").val();

            if(piece_lungime != "" && piece_latime != "" && cantitate_cart != ""){
              var  cal_pieces_height = parseFloat(piece_lungime / 10) + (parseFloat(Dimensiune_disc_taiere / 10) * 2);
              var  cal_pieces_width = parseFloat(piece_latime / 10) + (parseFloat(Dimensiune_disc_taiere / 10) * 2);
              if(panelHeight > cal_pieces_height && panelWidth > cal_pieces_width){
                pieces.push({'h':cal_pieces_height,'w':cal_pieces_width, 'qty': cantitate_cart});
              }else{
                $(this).find(".piece_lungime").val('');
                $(this).find(".piece_latime").val('');
                alert("Dimensiunile piesei dorite depasesc dimensiunile produsului.");
              }
            }
          }  
        });
        panels = [];
        $addedParts = pieces;
        if($addedParts.length > 0){
          partArray = [];
          addToPartArray();
          optimize(partArray);
          for (var i = 0; i < panels.length; i++) {
            panels[i].push(1);
          }
          deduplicatePanels(panels);
          displayPanels(panels);
        };
        var panel_qty = 0;
        $(".canvas_data").each(function(){
          if ($(this).attr("data-panel-qty") || $(this).attr("data-panel-qty") != 'undefined') {
           panel_qty = panel_qty + parseInt($(this).attr("data-panel-qty"));
          }
        });
        console.log("panel_qty", panel_qty);
        if(panel_qty > prodQty){
          ProdQtyNeeded = panel_qty - prodQty;
        }
        if(ProdQtyNeeded > 0){
          ProdQtyNeeded = parseInt(ProdQtyNeeded);
          var r = confirm("Pentru a putea debita toate piesele dorite, trebuie sa mai adaugati "+ ProdQtyNeeded + " placi in cos");
          if (r != true) {
            $(this).val("");
            return false;
          } else {
            IncreaseQuantity(product_ID, 0, ProdQtyNeeded);
          }
        }

        var cantitate_sum = 0;
        var check_row_class = [];
        $('.cantitate_cart').each(function(){
          if(this.value != ''){
            var row = $(this).closest('tr');
            var All_classes = row.attr('class');
            All_classes = All_classes.split(" ");
            var RowClass_value = All_classes[2];
            if($.inArray( RowClass_value, check_row_class ) == -1){
              check_row_class.push(RowClass_value);
              cantitate_sum += parseInt(this.value);  // Or this.innerHTML, this.innerText
            }
          }
        });

        var piece_qty = parseInt(cantitate_sum);
        Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra) * (parseInt(prodQty) + parseInt(ProdQtyNeeded));
        if(piece_qty  > Nr_piese_pret_extra){
          calculate_cutting_price = ((parseFloat(Pret_taiere) * (parseInt(prodQty) + parseInt(ProdQtyNeeded))) + parseFloat((Procent_pret_extra * Pret_taiere) /  100)).toFixed(2);
        }else{
          calculate_cutting_price = (parseFloat(Pret_taiere) * (parseInt(prodQty) + parseInt(ProdQtyNeeded))).toFixed(2);
        }
        console.log("calculate_cutting_price", calculate_cutting_price);
        var getCookieData = getCookie("product_"+product_ID.toString());
        // Get Row parameters
        var rotire = $("."+classes[2]).find("select[name=rotire]").val();
        var cantitate = $("."+classes[2]).find("input[name=cantitate]").val();
        var parameter_height = $("."+classes[2]).find("input[name=lungime]").val();
        var parameter_width = $("."+classes[2]).find("input[name=latime]").val();

        var parameter_name = '';
        if(rotire == "DA"){
            parameter_name = "width";
        }else{
             parameter_name = "height";
        }

        var Total_edges_size = 0;
        var edging_product = 0;
        var edging_category = 0;
        if(getCookieData != ''){
            getCookieData = JSON.parse(getCookieData);
            $.each( getCookieData, function( key, value ) {
                if(key == classes[2]){
                    $.each( value, function( key2, value2 ) {
                        $.each( value2, function( key3, value3 ) {
                            if((key3 == 'CatProducts_fată' || key3 == 'CatProducts_spate') && value3 != -1){

                              edging_product =  value3;

                              if(parameter_name == "height"){
                                Total_edges_size += parseFloat(parameter_width);
                              }else{ 
                                Total_edges_size += parseFloat(parameter_height);
                              }
                                 
                            }else if((key3 == 'CatProducts_dreapta' || key3 == 'CatProducts_stanga') && value3 != -1){

                              edging_product =  value3;

                              if(parameter_name == "height"){
                                 Total_edges_size += parseFloat(parameter_height);
                              }else{
                                 Total_edges_size += parseFloat(parameter_width);
                              }
                                 
                            }else if(key3 == "edging_category"  && value3 != -1){
                                edging_category =  value3;
                            }else{}
                        });
                    });
                }
            });
        }
        var total_edging_price = 0;
        if(Total_edges_size != 0){
            if(edging_category != 0){
                var GetEdgingPrice = GetWareHousePricesByCategory(warehouses, edging_category);
            }else{
                var GetEdgingPrice = GetWareHousePrices(warehouses, edging_product);
            }
            if(cantitate != '' || piece_qty != ""){
              total_edging_price = UpdateAllPricesRow(GetEdgingPrice, Total_edges_size, cantitate, product_ID, classes);
               $("#price_table tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+parseFloat(total_edging_price).toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price )+parseFloat(total_edging_price)).toFixed(2)+" RON</td>");
            }else{
              $("#price_table tbody").html("");
            }
        }else{
          if(piece_qty != ""){
            var edg_price = $("#price_table .edg_price").html();
            if (edg_price != null){
              total_edging_price = edg_price.split(" ");
              total_edging_price = total_edging_price[0];
            }
            $("#price_table tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+parseFloat(total_edging_price).toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price )+parseFloat(total_edging_price)).toFixed(2)+" RON</td>");
          }else{
            $("#price_table tbody").html("");
          }
        }
      }else{
        $(this).val('');
        alert("Please add Price for the product category assigned for the selected warehouse.");
      }
    }
  });

  $( "#product_dataBottom" ).unbind().on('blur', ".cantitate", function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    panelDivId = "product_cutting_image_bottom";
    $("#product_cutting_image_bottom").html("");
    var warehouses = $("#warehousesBottom").val();
    if(warehouses == -1){
      $("#warehousesBottom").addClass("err_msg_input");
      $(this).val('');
      return false;
    }else{
      var current_piece_qty = parseInt($(this).val());
      var classes = $(this).closest("tr").attr('class').split(' ');
      var RowClass = classes[2].split('_');
      var product_ID =RowClass[2];
      var current_piece_latime = $("." + classes[2].toString()).find('.piece_latime').val();
      var current_piece_lungime = $("." + classes[2].toString()).find('.piece_lungime').val();

      var prodQty = 0;              
      var prod_Area = $("#prod_Area_bottom").val();
      var prod_height = $('#prod_height_bottom').val();
      var prod_width = $('#prod_width_bottom').val();
      panelHeight = prod_height;
      panelWidth = prod_width;
      var Dimensiune_disc_taiere = '';
      var Nr_piese_pret_extra = '';
      var Pret_taiere = '';
      var Procent_pret_extra = '';
      var calculate_cutting_price = '';
      var cal_crnt_cutt_price = '';
      var jsonData = '';
      if(warehouses != '' && product_ID != ''){
        jsonData = GetWareHousePrices(warehouses, product_ID);
      }
      if (jsonData.prodQty === null) {
        prodQty = 1;
        IncreaseQuantity(product_ID, 0, 1);
      }else{
        prodQty = jsonData.prodQty;
      }
      
      if(jsonData == '') {
          alert("Please add Price for the product category assigned for the selected warehouse.");
      }else {
        Pret_taiere = jsonData.WareHousePrices.cutting_edges.Pret_taiere;
        Dimensiune_disc_taiere = jsonData.WareHousePrices.depozite_records.Dimensiune_disc_taiere;
        Nr_piese_pret_extra = jsonData.WareHousePrices.depozite_records.Nr_piese_pret_extra;
        Procent_pret_extra = jsonData.WareHousePrices.depozite_records.Procent_pret_extra;

        //Calculate the piece price
        Pret_taiere = parseFloat(Pret_taiere);
        Dimensiune_disc_taiere = parseFloat(Dimensiune_disc_taiere);
        Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra);

        var AllTotalCuttingArea = 0;
        //Calculate area according to height and width
        var ProdQtyNeeded = 0;
        var pieces = [];
        var check_row = [];
        $("#product_dataBottom .bottom_"+product_ID).each(function(){
          var rowClasses = $(this).attr("class").split(" ");
          if($.inArray( rowClasses[2], check_row ) == -1){
            check_row.push(rowClasses[2]);
            var rotire_val = $(this).find("select[name=rotire]").val();

            if(rotire_val == "DA"){
              //Swap the values of length and width
              var piece_latime = $(this).find(".piece_lungime").val();
              var piece_lungime = $(this).find(".piece_latime").val();

            }else{

              var piece_lungime = $(this).find(".piece_lungime").val();
              var piece_latime = $(this).find(".piece_latime").val();
            }

            var cantitate_cart = $(this).find(".cantitate").val();

            if(piece_lungime != "" && piece_latime != "" && cantitate_cart != ""){
              var  cal_pieces_height = parseFloat(piece_lungime / 10) + (parseFloat(Dimensiune_disc_taiere / 10) * 2);
              var  cal_pieces_width = parseFloat(piece_latime / 10) + (parseFloat(Dimensiune_disc_taiere / 10) * 2);
              if(panelHeight > cal_pieces_height && panelWidth > cal_pieces_width){
                pieces.push({'h':cal_pieces_height,'w':cal_pieces_width, 'qty': cantitate_cart});
              }else{
                $(this).find(".piece_lungime").val('');
                $(this).find(".piece_latime").val('');
                alert("Dimensiunile piesei dorite depasesc dimensiunile produsului.");
              }
            }
          }  
        });
        panels = [];
        $addedParts = pieces;
        if($addedParts.length > 0){
          partArray = [];
          addToPartArray();
          optimize(partArray);
          for (var i = 0; i < panels.length; i++) {
            panels[i].push(1);
          }
          deduplicatePanels(panels);
          displayPanels(panels);
        };
        var panel_qty = 0;
        $(".canvas_data").each(function(){
          if ($(this).attr("data-panel-qty") || $(this).attr("data-panel-qty") != 'undefined') {
           panel_qty = panel_qty + parseInt($(this).attr("data-panel-qty"));
          }
        });
        console.log("panel_qty", panel_qty);
        if(panel_qty > prodQty){
          ProdQtyNeeded = panel_qty - prodQty;
        }
        if(ProdQtyNeeded > 0){
          ProdQtyNeeded = parseInt(ProdQtyNeeded);
          var r = confirm("Pentru a putea debita toate piesele dorite, trebuie sa mai adaugati "+ ProdQtyNeeded + " placi in cos");
          if (r != true) {
            $(this).val("");
            return false;
          } else {
            IncreaseQuantity(product_ID, 0, ProdQtyNeeded);
          }
        }

        var cantitate_sum = 0;
        $('.cantitate').each(function(){
          if(this.value != ''){
               cantitate_sum += parseInt(this.value);  // Or this.innerHTML, this.innerText
          }
        });

        var piece_qty = parseInt(cantitate_sum);
        Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra) * (parseInt(prodQty) + parseInt(ProdQtyNeeded));
        if(piece_qty  > Nr_piese_pret_extra){
          calculate_cutting_price = ((parseFloat(Pret_taiere) * (parseInt(prodQty) + parseInt(ProdQtyNeeded))) + parseFloat((Procent_pret_extra * Pret_taiere) /  100)).toFixed(2);
        }else{  
          calculate_cutting_price = (parseFloat(Pret_taiere) * (parseInt(prodQty) + parseInt(ProdQtyNeeded))).toFixed(2);
        }
        console.log("calculate_cutting_price", calculate_cutting_price);
        var getCookieData = getCookie("product_"+product_ID.toString());
        // Get Row parameters
        var rotire = $("."+classes[2]).find("select[name=rotire]").val();
        var cantitate = $("."+classes[2]).find("input[name=cantitate]").val();
        var parameter_height = $("."+classes[2]).find("input[name=lungime]").val();
        var parameter_width = $("."+classes[2]).find("input[name=latime]").val();

        var parameter_name = '';
        if(rotire == "DA"){
            parameter_name = "width";
        }else{
             parameter_name = "height";
        }

        var Total_edges_size = 0;
        var edging_product = 0;
        var edging_category = 0;
        if(getCookieData != ''){
            getCookieData = JSON.parse(getCookieData);
            $.each( getCookieData, function( key, value ) {
                if(key == classes[2]){
                    $.each( value, function( key2, value2 ) {
                        $.each( value2, function( key3, value3 ) {
                            if((key3 == 'CatProducts_fată' || key3 == 'CatProducts_spate') && value3 != -1){

                                  edging_product =  value3;

                                  if(parameter_name == "height"){
                                    Total_edges_size += parseFloat(parameter_width);
                                  }else{ 
                                    Total_edges_size += parseFloat(parameter_height);
                                  }
                                 
                            }else if((key3 == 'CatProducts_dreapta' || key3 == 'CatProducts_stanga') && value3 != -1){

                                  edging_product =  value3;

                                  if(parameter_name == "height"){
                                     Total_edges_size += parseFloat(parameter_height);
                                  }else{
                                     Total_edges_size += parseFloat(parameter_width);
                                  }
                                 
                            }else if(key3 == "edging_category"  && value3 != -1){
                                edging_category =  value3;
                            }else{}
                        });
                    });
                }
            });
        }
        var total_edging_price = 0;
        if(Total_edges_size != 0){
            if(edging_category != 0){
                var GetEdgingPrice = GetWareHousePricesByCategory(warehouses, edging_category);
            }else{
                var GetEdgingPrice = GetWareHousePrices(warehouses, edging_product);
            }
            if(cantitate != '' || piece_qty != ""){
              total_edging_price = UpdateAllPricesBottomRow(GetEdgingPrice, Total_edges_size, cantitate, product_ID, classes);
               $("#price_table_bottom tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+parseFloat(total_edging_price).toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price )+parseFloat(total_edging_price)).toFixed(2)+" RON</td>");
            }else{
              $("#price_table_bottom tbody").html("");
            }
        }else{
          if(piece_qty != ""){
            var edg_price = $("#price_table_bottom .edg_price").html();
            if (edg_price != null){
              total_edging_price = edg_price.split(" ");
              total_edging_price = total_edging_price[0];
            }
            $("#price_table_bottom tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+parseFloat(total_edging_price).toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price )+parseFloat(total_edging_price)).toFixed(2)+" RON</td>");
          }else{
            $("#price_table_bottom tbody").html("");
          }
        }       
      }
    }
  });

  // Key up to calculate cutting price
  $('#product_data_prdt_page').unbind().on('blur', ".cantitate", function() {
    panelDivId = "product_cutting_image_product";
    $("#product_cutting_image_product").html("");
    var warehouses = $("#warehousesProduct").val();
    if(warehouses == -1){
      $("#warehousesProduct").addClass("err_msg_input");
      $(this).val('');
      return false;
    }else{
      var current_piece_qty = parseInt($(this).val());
      var classes = $(this).closest("tr").attr('class').split(' ');
      var RowClass = classes[2].split('_');
      var product_ID =RowClass[2];
      var current_piece_latime = $("." + classes[2].toString()).find('.piece_latime').val();
      var current_piece_lungime = $("." + classes[2].toString()).find('.piece_lungime').val();

      var prodQty = 0;
      var prod_Area = $("#prod_Area").val();
      var prod_height = $("#prod_height").val();
      var prod_width = $("#prod_width").val();
      panelHeight = prod_height;
      panelWidth = prod_width;
      var Dimensiune_disc_taiere = '';
      var Nr_piese_pret_extra = '';
      var Pret_taiere = '';
      var Procent_pret_extra = '';
      var calculate_cutting_price = '';
      var cal_crnt_cutt_price = '';

      if(warehouses != '' && product_ID != ''){
        var jsonData = GetWareHousePrices(warehouses, product_ID);
      }

      if (jsonData.prodQty === null) {
        prodQty = 1;
        IncreaseQuantity(product_ID, 0, 1);
      }else{
        prodQty = jsonData.prodQty;
      }

      if(jsonData && jsonData.WareHousePrices && jsonData.WareHousePrices.cutting_edges.Pret_taiere !== null){
        
        Pret_taiere = jsonData.WareHousePrices.cutting_edges.Pret_taiere;
        Dimensiune_disc_taiere = jsonData.WareHousePrices.depozite_records.Dimensiune_disc_taiere;
        Nr_piese_pret_extra = jsonData.WareHousePrices.depozite_records.Nr_piese_pret_extra;
        Procent_pret_extra = jsonData.WareHousePrices.depozite_records.Procent_pret_extra;

        //Calculate the piece price
        Pret_taiere = parseFloat(Pret_taiere);
        Dimensiune_disc_taiere = parseFloat(Dimensiune_disc_taiere);
        Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra);

        var AllTotalCuttingArea = 0;
        //Calculate area according to height and width
        var ProdQtyNeeded = 0;
        var pieces = [];
        var check_row = [];
        $("#product_data_prdt_page .bottom_"+product_ID).each(function(){
          var rowClasses = $(this).attr("class").split(" ");
          if($.inArray( rowClasses[2], check_row ) == -1){
            check_row.push(rowClasses[2]);
            var rotire_val = $(this).find("select[name=rotire]").val();

            if(rotire_val == "DA"){
              //Swap the values of length and width
              var piece_latime = $(this).find(".piece_lungime").val();
              var piece_lungime = $(this).find(".piece_latime").val();

            }else{

              var piece_lungime = $(this).find(".piece_lungime").val();
              var piece_latime = $(this).find(".piece_latime").val();
            }

            var cantitate_cart = $(this).find(".cantitate").val();

            if(piece_lungime != "" && piece_latime != "" && cantitate_cart != ""){
              var  cal_pieces_height = parseFloat(piece_lungime / 10) + (parseFloat(Dimensiune_disc_taiere / 10) * 2);
              var  cal_pieces_width = parseFloat(piece_latime / 10) + (parseFloat(Dimensiune_disc_taiere / 10) * 2);
              if(panelHeight > cal_pieces_height && panelWidth > cal_pieces_width){
                pieces.push({'h':cal_pieces_height,'w':cal_pieces_width, 'qty': cantitate_cart});
              }else{
                $(this).find(".piece_lungime").val('');
                $(this).find(".piece_latime").val('');
                alert("Dimensiunile piesei dorite depasesc dimensiunile produsului.");
              }
            }
          }  
        });
        panels = [];
        $addedParts = pieces;
        if($addedParts.length > 0){
          partArray = [];
          addToPartArray();
          optimize(partArray);
          for (var i = 0; i < panels.length; i++) {
            panels[i].push(1);
          }
          deduplicatePanels(panels);
          displayPanels(panels);
        };
        var panel_qty = 0;
        $(".canvas_data").each(function(){
          if ($(this).attr("data-panel-qty") || $(this).attr("data-panel-qty") != 'undefined') {
           panel_qty = panel_qty + parseInt($(this).attr("data-panel-qty"));
          }
        });
        console.log("panel_qty", panel_qty);
        if(panel_qty > prodQty){
          ProdQtyNeeded = panel_qty - prodQty;
        }
        if(ProdQtyNeeded > 0){
          ProdQtyNeeded = parseInt(ProdQtyNeeded);
          var r = confirm("Pentru a putea debita toate piesele dorite, trebuie sa mai adaugati "+ ProdQtyNeeded + " placi in cos");
          if (r != true) {
            $(this).val("");
            return false;
          } else {
            IncreaseQuantity(product_ID, 0, ProdQtyNeeded);
          }
        }

        var cantitate_sum = 0;
        $('.cantitate').each(function(){
          if(this.value != ''){
               cantitate_sum += parseInt(this.value);  // Or this.innerHTML, this.innerText
          }
        });

        var piece_qty = parseInt(cantitate_sum);
        Nr_piese_pret_extra = parseInt(Nr_piese_pret_extra) * (parseInt(prodQty) + parseInt(ProdQtyNeeded));
        if(piece_qty  > Nr_piese_pret_extra){
          calculate_cutting_price = ((parseFloat(Pret_taiere) * (parseInt(prodQty) + parseInt(ProdQtyNeeded))) + parseFloat((Procent_pret_extra * Pret_taiere) /  100)).toFixed(2);
        }else{  
          calculate_cutting_price = (parseFloat(Pret_taiere) * (parseInt(prodQty) + parseInt(ProdQtyNeeded))).toFixed(2);
        }
        console.log("calculate_cutting_price", calculate_cutting_price);
        var getCookieData = getCookie("product_"+product_ID.toString());
        // Get Row parameters
        var rotire = $("."+classes[2]).find("select[name=rotire]").val();
        var cantitate = $("."+classes[2]).find("input[name=cantitate]").val();
        var parameter_height = $("."+classes[2]).find("input[name=lungime]").val();
        var parameter_width = $("."+classes[2]).find("input[name=latime]").val();

        var parameter_name = '';
        if(rotire == "DA"){
            parameter_name = "width";
        }else{
             parameter_name = "height";
        }

        var Total_edges_size = 0;
        var edging_product = 0;
        var edging_category = 0;
        if(getCookieData != ''){
            getCookieData = JSON.parse(getCookieData);
            $.each( getCookieData, function( key, value ) {
                if(key == classes[2]){
                    $.each( value, function( key2, value2 ) {
                        $.each( value2, function( key3, value3 ) {
                            if((key3 == 'CatProducts_fată' || key3 == 'CatProducts_spate') && value3 != -1){

                              edging_product =  value3;

                              if(parameter_name == "height"){
                                Total_edges_size += parseFloat(parameter_width);
                              }else{ 
                                Total_edges_size += parseFloat(parameter_height);
                              }
                                 
                            }else if((key3 == 'CatProducts_dreapta' || key3 == 'CatProducts_stanga') && value3 != -1){

                              edging_product =  value3;

                              if(parameter_name == "height"){
                                 Total_edges_size += parseFloat(parameter_height);
                              }else{
                                 Total_edges_size += parseFloat(parameter_width);
                              }
                                 
                            }else if(key3 == "edging_category"  && value3 != -1){
                                edging_category =  value3;
                            }else{}
                        });
                    });
                }
            });
        }
        var total_edging_price = 0;
        if(Total_edges_size != 0){
            if(edging_category != 0){
                var GetEdgingPrice = GetWareHousePricesByCategory(warehouses, edging_category);
            }else{
                var GetEdgingPrice = GetWareHousePrices(warehouses, edging_product);
            }
            if(cantitate != '' || piece_qty != ""){
              total_edging_price = UpdateAllPricesRowProduct(GetEdgingPrice, Total_edges_size, cantitate, product_ID, classes);
               $("#price_table tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+parseFloat(total_edging_price).toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price )+parseFloat(total_edging_price)).toFixed(2)+" RON</td>");
            }else{
              $("#price_table tbody").html("");
            }
        }else{
          if(piece_qty != ""){
            var edg_price = $("#price_table .edg_price").html();
            if (edg_price != null){
              total_edging_price = edg_price.split(" ");
              total_edging_price = total_edging_price[0];
            }
            $("#price_table tbody").html("<td>"+Pret_taiere+" RON</td><td class='edg_price'>"+parseFloat(total_edging_price).toFixed(2)+" RON</td><td class='calc_price'>"+(parseFloat(calculate_cutting_price )+parseFloat(total_edging_price)).toFixed(2)+" RON</td>");
          }else{
            $("#price_table tbody").html("");
          }
        }
      }else{
        $(this).val('');
        alert("Please add Price for the product category assigned for the selected warehouse.");
      }
    }
  });

});