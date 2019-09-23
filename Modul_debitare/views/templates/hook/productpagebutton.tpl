<link rel="stylesheet" type="text/css" href="{_MODULE_DIR_}/Modul_debitare/custom_css/product_page.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/hooks_js/product_page.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/vendor/jquery.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/zepto.1.1.3.min.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/packer.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/foundation.min.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/main.js"></script>
<div class="panel">
	<div class="moduleconfig-content">
		<div class="myOverlayBody">
			<div class="loadingGIFUpper">
				<img src="http://{$smarty.server.HTTP_HOST}/modules/Modul_debitare/views/img/loading.gif" />
			</div>
		</div>
		<button type="button" class="button btn btn-default debit-pal-product" data-toggle="modal" data-target="#productbottomModal" id="{$product_id}"><img src="{$debitare_white_img_url}" />  Debitare/cantuire pal</button>
		<!--First modal-->
		<div class="modal fade" id="productbottomModal" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					  <h4 class="modal-title new-heading">Debitare/căntuire pal</h4>
					  <button type="button" class="close" data-dismiss="modal">&times;</button>
					  
					</div>
					<div class="modal-body">
						<div class="myOverlayUpper">
							<div class="loadingGIFUpper">
								<img src="http://{$smarty.server.HTTP_HOST}/modules/Modul_debitare/views/img/loading.gif" />
							</div>
						</div>
						<div class="modal-header-select">
							<div class="select-custom">
								<div class="form-group">
									<input type="hidden" id="prod_Area" class="modal_input" name="prod_Area">
									<input type="hidden" id="prod_height" class="modal_input" name="prod_height">
                                    <input type="hidden" id="prod_width" class="modal_input" name="prod_width">
									<input type="hidden" id="PageProduct_id" name="PageProduct_id" value="{$product_id}">
									<select class="form-control modal_input" name="warehouse_name" id="warehousesProduct">
									</select>
								</div>
								
							</div>
						</div>
						<div class="container-fluid">
							<div class="row">
								<div class="err_msg_box"></div>
								<div class="table-responsive">
									<table class="table table-bordered table-striped" id="product_data_prdt_page">
										<thead>
											<tr>
												<th>Denumire / numar piesa</th><th>Inaltime(mm)</th><th>Latime(mm)</th><th>Cantitate</th><th class="rot-width">Rotire</th><th class="width-class">Aplicare cant</th><th></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
								<div id="product_cutting_image_product">
								</div>
								<div class="table-responsive">
									<table class="table table-bordered table-striped" id="price_table">
								  		<thead>
							  				<th>Pret debitare</th>
							  				<th>Pret cantuire</th>
							  				<th>Pret total</th>
								  		</thead>
								  		<tbody>
										</tbody>
								  	</table>
							  	</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
					  	<div class="container">
							<div class="row">
							  	<div class="form-group Bottom_button">
								  	<button type="button" class="save_cart_btn">Continua</button>
								</div>
								<div class="form-group Bottom_button">
								  	<button type="button" class="remov_cart_btn">Anuleaza</button>	
								</div>
							</div>
						</div>	
					</div>
				</div>	
			</div>
		</div>
		<!--Second Model -->
		<div class="modal fade" id="productAnglebottomModal" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					  <h4 class="modal-title">Aplicare cant</h4>
					  <button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<div class="container-fluid">
							<div class="cust-product-box">
								<div class="Success_msg">
								</div>
								<div class="myOverlay">
									<div class="loadingGIF">
										<img src="http://{$smarty.server.HTTP_HOST}/modules/Modul_debitare/views/img/loading.gif" />
									</div>
								</div>
								<div class="cust-radio">
									<div class="form-group">
										  <p>
											<input type="radio" id="cant_col_pal" class="modal_input color_pale_product" name="color_pale" value="color_not_add" checked>
											<label for="cant_col_pal">Cant la culoarea palului</label>
										  </p>
										  <p>
											<input type="radio" id="all_col_pal" class="modal_input color_pale_product" name="color_pale" value="color_add">
											<label for="all_col_pal">Toate culorile</label>
										  </p>
									</div>
									<div class="content-cust">
										<span class="Product_size_cart"></span>
										<div class="angles"></div>
									</div>
								</div>

								<div class="form-group edging_div">
									<label class="control-label">Alege cant</label>
									<div class="cust-slect">
									<select class="form-control modal_input" name="edging_category" id="category_lists">
										<option value="-1">Alege cant</option>
									</select>
									</div>
								</div>

								<div class="form-group">
									<label>Alege cant fată</label>
									<div class="cust-slect">
										<input type='hidden' name="edging_price" class="edging_price modal_input" value="0">
										<select class="form-control modal_input" name="CatProducts_fată" id="CatProducts_fată">
											<option value="-1">Alege cant fată</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label>Alege cant spate</label>
									<div class="cust-slect">
										<select class="form-control modal_input" name="CatProducts_spate" id="CatProducts_spate">
											<option value="-1">Alege cant spate</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label>Alege cant dreapta</label>
									<div class="cust-slect ">
										<select class="form-control modal_input" name="CatProducts_dreapta" id="CatProducts_dreapta">
											<option value="-1">Alege cant dreapta</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label>Alege cant stanga</label>
									<div class="cust-slect">
										<select class="form-control modal_input" name="CatProducts_stanga" id="CatProducts_stanga">
											<option value="-1">Alege cant stanga</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
					  <button type="button" class="common-btn">Aplicare cant</button>
					</div>
				</div>
			</div>	
		</div>
	</div>
</div>
