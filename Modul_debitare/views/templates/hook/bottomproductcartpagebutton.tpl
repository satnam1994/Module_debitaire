<link rel="stylesheet" type="text/css" href="{_MODULE_DIR_}/Modul_debitare/custom_css/cart_bottom.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/hooks_js/product_cart_bottom.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/hooks_js/productcart.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/vendor/jquery.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/zepto.1.1.3.min.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/packer.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/foundation.min.js"></script>
<script src="{_MODULE_DIR_}/Modul_debitare/custom_js/panelizer_js/main.js"></script>
<div class="panel" id="bottom_cart_data">
    <div class="moduleconfig-content">
        <form action="" method="post" class="contact-form-box" enctype="multipart/form-data">
            <div class="myOverlayBody">
                <div class="loadingGIFUpper">
                    <img src="http://{$smarty.server.HTTP_HOST}/modules/Modul_debitare/views/img/loading.gif" />
                </div>
            </div>
            <button type="button" class="button btn btn-default debit-pal bottom_debitare" data-toggle="modal" data-target="#cartbottomModal"><img src="{$debitare_white_img_url}"/>  Debitare/cantuire pal</button>
            <!--First modal-->
            <div class="modal fade" id="cartbottomModal" role="dialog">
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
                                        <input type="hidden" id="prod_Area_bottom" class="modal_input" name="prod_Area">
                                        <input type="hidden" id="prod_height_bottom" class="modal_input" name="prod_height">
                                        <input type="hidden" id="prod_width_bottom" class="modal_input" name="prod_width">
                                        <select class="form-control" id="ProductListBottom" name="product_id">
                                            <option value="-1">Alege produs</option>
                                        </select>
                                    </div>
                                
                                    <div class="form-group" >
                                        <select class="form-control" id="warehousesBottom" name="warehouse_name">
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped table-hover" id="product_dataBottom">
                                            <thead>
                                                <tr>
                                                    <th>Denumire / numar piesa</th><th>Inaltime(mm)</th><th>Latime(mm)</th><th>Cantitate</th><th class="rot-width">Rotire</th><th class="width-class">Aplicare cant</th><th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
								<div id="product_cutting_image_bottom">
								</div>
                                <div class="row">    
                                     <table class="table table-bordered table-striped" id="price_table_bottom">
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
                        <div class="modal-footer">
                           
                            <div class="container">
                                <div class="row">
                                    <div class="form-group Bottom_button">
                                        <button type="button" class="save_cart_bottom_btn">Continua</button>
                                    </div>
                                    <div class="form-group Bottom_button">
                                        <button type="button" class="remov_cart_bottom_btn">Anuleaza</button>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            <!--Second Model -->
            <div class="modal fade" id="cartAnglebottomModal" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title">Aplicare cant</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="Success_msg">
                                </div>
                                <div class="myOverlay">
                                    <div class="loadingGIF">
                                        <img src="http://{$smarty.server.HTTP_HOST}/modules/Modul_debitare/views/img/loading.gif" />
                                    </div>
                                </div>
                                <div class="cust-product-box">
                                    
                                    <div class="cust-radio">
                                        <div class="form-group">
                                              <p>
                                                <input type="radio" class="modal_input bottom_color_pale" id="bottom_cant_col_pal" name="color_pale" value="color_not_add" checked>
                                                <label for="bottom_cant_col_pal">Cant la culoarea palului</label>
                                              </p>
                                              <p>
                                                <input type="radio" class="modal_input bottom_color_pale" id="bottom_all_col_pal" name="color_pale" value="color_add">
                                                <label for="bottom_all_col_pal">Toate culorile</label>
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
                                            <select class="form-control modal_input" id="category_listsCartBottom" name="edging_category">
                                                <option value="-1">Alege cant</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Alege cant fată</label>
                                        <div class="cust-slect">
                                            <input type='hidden' name="edging_price" class="edging_price modal_input" value="0">
                                            <select class="form-control modal_input" name="CatProducts_fată" id="CatProductsCartBottom_fată">
                                                <option value="-1">Alege cant fată</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Alege cant spate</label>
                                        <div class="cust-slect">
                                            <select class="form-control modal_input" name="CatProducts_spate" id="CatProductsCartBottom_spate">
                                                <option value="-1">Alege cant spate</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Alege cant dreapta</label>
                                        <div class="cust-slect ">
                                            <select class="form-control modal_input" name="CatProducts_dreapta" id="CatProductsCartBottom_dreapta">
                                                <option value="-1">Alege cant dreapta</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Alege cant stanga</label>
                                        <div class="cust-slect">
                                            <select class="form-control modal_input" name="CatProducts_stanga" id="CatProductsCartBottom_stanga">
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
        </form>
    </div>
</div>