<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
	var controller_url = "{$link->getModuleLink('Modul_debitare', 'ajax', array())}";
	controller_url = controller_url.replace(/&amp;/g, '&');
	function UpdateEdgingCuttingPriceBottomForAllCart(calculate_cutting_price, total_edging_price)
	{	
		console.log("calculate_cutting_price warehouseslisting", calculate_cutting_price);
		console.log("total_edging_price warehouseslisting", total_edging_price);
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
	            console.log("UpdateEdgingCuttingPrice", jsonData);
	            if(parseInt(jsonData.edgingProdQty) > 1){
                	DeleteProd(36408, 0);
                }
                if(parseInt(jsonData.cuttingProdQty) > 1){
                	DeleteProd(36407, 0);
                }
	            /*if(jsonData.status = true)
	            {
	                if(jsonData.cuttingProdQty == null){
	                    IncreaseQuantity(36407, 0, 1);
	                }else if(jsonData.cuttingProdQty != "1"){
	                	DeleteProd(36407, 0);
	                }else{
	                	DeleteProd(36407, 0);
	                	setTimeout(function(){
	                		IncreaseQuantity(36407, 0, 1);
	                	}, 2000);
	                }

	                if(jsonData.edgingProdQty == null){
	                    IncreaseQuantity(36408, 0, 1);
	                }else if(jsonData.edgingProdQty != "1"){
	                	DeleteProd(36408, 0);
	                }else{
	                	DeleteProd(36408, 0);
	                	setTimeout(function(){
	                		IncreaseQuantity(36408, 0, 1);
	                	}, 2000);
	                }
	                
	            }*/
	        }
	    });
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
	$( document ).ready(function() {
		$(".myOverlayBody").show();
		var total_edging_price = 0;
		var calculate_cutting_price = 0;
		var pricing_table = false;
		var total_cutting_price = 0;
		var product_Ctng_Edg_Prc = getCookie("product_Ctng_Edg_Prc");
					
		if(product_Ctng_Edg_Prc != ''){
			product_Ctng_Edg_Prc = JSON.parse(product_Ctng_Edg_Prc);
	        $.each(product_Ctng_Edg_Prc, function(key, val){
	            $.each(val, function(key2, val2){
	            	var key_val = key2.split('_');
	            	if(key_val[0] == "cutting"){
	            		pricing_table = true;
	            		total_cutting_price = parseFloat(total_cutting_price) + parseFloat(val2);
	            	}else{
	            		total_edging_price = parseFloat(total_edging_price) + parseFloat(val2);
	            	}		
	            });
	        });
	        UpdateEdgingCuttingPriceBottomForAllCart(total_cutting_price, total_edging_price);
	    } 
		if((total_cutting_price != 0 || total_edging_price != 0) && pricing_table == true){
			var table_data = "<thead><tr><th>Pret debitare</th><th>Pret cantuire</th></tr></thead> <tbody><tr><td>"+total_cutting_price.toFixed(2)+" RON</td><td>"+total_edging_price.toFixed(2)+" RON</td></tr></tbody>";
			$("#product_prices").html(table_data);
			//location.reload(true);
		}else{
			$("#product_prices").html('');
		}
		setTimeout(function(){
			$( window ).load(function() {
			    if (window.location.href.indexOf('reload')==-1) {
			         window.location.replace(window.location.href+'?reload');
			    }
			});
			$(".myOverlayBody").hide();
		}, 4000);
	});
</script>
<div class="panel">
	<div class="moduleconfig-content">
		<table class="table table-bordered table-striped table-hover" id="product_prices"></table>
	</div>
</div>