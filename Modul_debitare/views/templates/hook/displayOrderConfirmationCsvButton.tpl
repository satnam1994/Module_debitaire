<script>
	var js_array = {$product_pieces|json_encode};
	function findElement(arr, propName, propValue) {
	  for (var i=0; i < arr.length; i++)
	    if (arr[i][propName] == propValue)
	      return arr[i];

	  // will return undefined if not found; you could return a default instead
	}
	function convertArrayOfObjectsToCSV(args) {
		var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    window.downloadCSV = function(args, product_id) {
    	var rowData = findElement(js_array, 'product_id', product_id);
    	var CookieData = rowData.Cookie;
    	CookieData = JSON.parse(CookieData);
    	var stockData = [];
    	Object.keys(CookieData).forEach(i => {
    		const co_val = CookieData[i];
    		var objects = {};
    		co_val.forEach(e => {
    			Object.keys(e).forEach(ei => {
    				const elm = e[ei];
    				objects[ei] = elm;
    			});
    		});
    		stockData.push(objects);
    	});
    	
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: stockData
        });
        if (csv == null) return;

        filename = args.filename || 'export_order.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>>
<div class="panel">
	<div class="moduleconfig-content">
		<h4>Products Pieces Detail</h4>
	</div>
	<div>
		<input type="hidden" name="order_id" value="{$product_pieces[0].order_id}">
        
		<div class="table-responsive">
			<table class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Product Quantity</th>
						<th>Product Price</th>
						<th>Product Pieces Details</th>
						<th>CSV File</th>
					</tr>
				</thead>
				<tbody>		
					{foreach $product_pieces as $key=>$product}
					<tr>
						<td>{$product.product_name}</td>
						<td>{$product.product_quantity}</td>
						<td>{$product.product_price}</td>
						<td>
							{if !empty($product.Cookie)}
								<table class="table table-bordered table-striped">
									{assign var=Cookie value=$product.Cookie|json_decode:1}
									<thead>
										<tr>
											<th>Piece Name</th>
											<th>Piece Quantity</th>
											<th>Piece Height</th>
											<th>Piece Width</th>
											<th>Piece Rotire</th>
											<th>Piece Color Pale</th>
										</tr>
									</thead>
								  	{foreach $Cookie as $Cookiekey=>$Cookieval}
								  		<tr>
								  		{foreach $Cookieval as $Cookie_key=>$Cookie_val}
					  						{if !empty($Cookie_val.piece_name)}
												<td>{$Cookie_val.piece_name}</td>
											{else if !empty($Cookie_val.cantitate) }
												<td>{$Cookie_val.cantitate}</td>
											{else if !empty($Cookie_val.lungime) }
												<td>{$Cookie_val.lungime}</td>
											{else if !empty($Cookie_val.latime) }
												<td>{$Cookie_val.latime}</td>
											{else if !empty($Cookie_val.rotire) }
												<td>{$Cookie_val.rotire}</td>
											{else if !empty($Cookie_val.color_pale) }
												{if ($Cookie_val.color_pale == "color_add")}
													<td>Toate culorile</td>
												{else}
													<td>Cant la culoarea palului</td>
												{/if}		
											{/if}
								  		{/foreach }
								  		</tr>
								 	 {/foreach }
								</table>
							{else}
								N/A	
							{/if}	
						</td>
						<td>
							{if !empty($product.Cookie)}
							<button onclick='downloadCSV({ filename: "Product_{$product.product_id}.csv" }, "{$product.product_id}");' type="button" class="btn btn-primary center-block" name="csv_data" style="margin-bottom: 20px;">
					       		Download
					        </button>	
					        {/if}
						</td>
					</tr>	
					{/foreach }
				</tbody>
			</table>
		</div>
	</div>
</div>