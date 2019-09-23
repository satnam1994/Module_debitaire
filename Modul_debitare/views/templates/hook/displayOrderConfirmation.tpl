<div class="panel">
	<div class="moduleconfig-content">
		<h4>Products Pieces Detail</h4>
	</div>
	<div>
		<div class="table-responsive">
			<table class="table table-bordered table-striped">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Product Quantity</th>
						<th>Product Price</th>
						<th>Product Pieces Details</th>
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
					</tr>	
					{/foreach }
				</tbody>
			</table>
		</div>
	</div>
</div>