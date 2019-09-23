<style>
.button_reponsive{
    margin-bottom: 8px;
}	
</style>
<div class="panel">
    <div class="row moduleconfig-header">
        <div class="col-xs-5 text-right">
           <!-- <img src="{$module_dir|escape:'html':'UTF-8'}views/img/logo.jpg" />-->
        </div>
        <div class="col-xs-7 text-left">
            <h2>{l s='Depozite Records' mod='Modul_debitare'}</h2>
            <h4>{l s='Depozite Records' mod='Modul_debitare'}</h4>
        </div>
    </div>

    <hr />
    <script>
		window.onload = function(){
			var Addnew = document.getElementById('Addnew');
			var Formwarehouse = document.getElementById('Formwarehouse');
			Addnew.onclick = function(){
				Formwarehouse.style.display = "block";
			}
		}
		
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
			$('.msg_box').html('');
			if (el.value.match(/^-\d+$/)) {
				$("#"+ el.id).closest('div').find('.msg_box').html('<div class="alert alert-danger alert-dismissible show"><button type="button" class="close" data-dismiss="alert">×</button>Please enter only positive value</div>');
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
		$( document ).ready(function() {
			$(".Delete").click(function(event){
				var r = confirm("Are you sure you really want to delete this record!!");
				if (r == true) {
				  return true;
				} else {
				  return false;
				}
			});
			$(".button_reponsive").click(function(){
				document.body.scrollTop = 0;
				var display = $( this ).closest('tr').find('.table_data').css('display');
				if(display == 'none'){
					$( this ).closest('tr').find('.table_data').css('display', 'block');
				}else{
					$( this ).closest('tr').find('.table_data').css('display', 'none');
				}
			});
			$('[data-toggle="tooltip"]').tooltip();
			
			
			$(".submitMayorista").click(function(){
				var top_val = '';
				var input_fields = '';
				var i = 1;
				$('.msg_box').html('');
				Array.prototype.slice.call(document.querySelectorAll("[required]")).forEach(function(input){
					input.addEventListener('invalid',function(e){
						//Your input is invalid!
						if(input.id != '' && i == 1){
							top_val = $("#"+input.id).offset().top;
							top_val = parseInt(top_val) - 300;
							console.log(top_val +' Your input is invalid!');
							$([document.documentElement, document.body]).animate({
								scrollTop: top_val
							}, 2000);
							$("#"+ input.id).closest('div').find('.msg_box').html('<div class="alert alert-danger alert-dismissible show"><button type="button" class="close" data-dismiss="alert">×</button>Field is required</div>');
						}else{
							$("#"+ input.id).closest('div').find('.msg_box').html('<div class="alert alert-danger alert-dismissible show"><button type="button" class="close" data-dismiss="alert">×</button>Field is required</div>');
						}
						i++;
					})
					
				});
				
				//event.preventDefault();
			});
		});
		
    </script>
    <div class="moduleconfig-content">	
        {if !empty($EditFormData.depozite_records)}
            <div class="row">
                <div class="col-xs-12">
                    <form action="" method="post" name="UpdateForm" class="contact-form-box" enctype="multipart/form-data">
                        <input type="hidden" name="action"  value="UpdateForm" />
                        <input type="hidden" name="id"  value="{$EditFormData.depozite_records.id}" />
                        <div class="row">
                            <div class="col-xs-12 col-md-3">
								<div class="form-group">
									<label for="Titlu">Titlu</label>
                                    <input class="form-control grey validate" type="text" id="Titlu" required name="Titlu" value="{$EditFormData.depozite_records.Titlu}" data-validate="isTitlu" onchange="validateInputField(this);"/>
									<div class="msg_box">
									</div>
								</div>	
									{if !empty($GetAllCategoryData)}
										<div class="Pret_cantuire">
											{assign var=cutting_key value=0}
										{foreach $GetAllCategoryData as $key=>$CategoryData}
											{if $CategoryData.Permite_personalizare == 'Da' }
											<div class="form-group">
											   <label for="Pret_taiere_{$key}">{$CategoryData.category_name} Pret taiere (Ron)</label>
											   <input  type="hidden" name="taiere_category_id[]" value="{$key}"/>
											   <input class="form-control grey" type="text" id="Pret_taiere_{$key}" required name="Pret_taiere[]" onchange="validateFloatKeyPress(this);" value = "{$EditFormData.cutting_edges.$cutting_key.$key}" />
											   <div class="msg_box"></div>
											</div> 
											{/if}
										{/foreach }
										</div>
									{/if}
								<div class="form-group">
									
									<label for="Nr_piese_pret_extra">Nr piese pret extra</label>
                                    <input class="form-control grey" type="number" id="Nr_piese_pret_extra" required name="Nr_piese_pret_extra" value="{$EditFormData.depozite_records.Nr_piese_pret_extra}" />
									<div class="msg_box"></div>
								</div>	
								<div class="form-group">
									
									<label for="Procent_pret_extra">Procent pret extra (%)</label>
                                     <input class="form-control grey" type="number" id="Procent_pret_extra" required name="Procent_pret_extra" value="{$EditFormData.depozite_records.Procent_pret_extra}"/>
									 <div class="msg_box"></div>
								</div>	 
								<div class="form-group">
									
									<label for="Dimensiune_disc_taiere">Dimensiune disc taiere (mm)</label>
                                    <input class="form-control grey" type="text" id="Dimensiune_disc_taiere" required name="Dimensiune_disc_taiere" value="{$EditFormData.depozite_records.Dimensiune_disc_taiere}" onchange="validateFloatKeyPress(this);"/>
									<div class="msg_box"></div>
								</div>
									{if !empty($GetAllCategoryData)}
										<div class="Pret_cantuire">
											{assign var=edging_key value=1}
										{foreach $GetAllCategoryData as $key=>$CategoryData}
											{if $CategoryData.Foloseste_la_cantur == 'Da' }
											<div class="form-group">
												
											   <label for="Pret_cantuire_{$key}">{$CategoryData.category_name} Pret cantuire (Ron)</label>
											   <input  type="hidden" name="cantuire_category_id[]" value="{$key}"/>
											   <input class="form-control grey" type="text" id="Pret_cantuire_{$key}" required name="Pret_cantuire[]" onchange="validateFloatKeyPress(this);" value="{$EditFormData.cutting_edges.$edging_key.$key}"/>
											   <div class="msg_box"></div>
											</div>   
											{/if}
										{/foreach }
										</div>
									{/if}
								<div class="form-group">
									
									<label for="Margine_taiere">Margine taiere (mm)</label>
                                    <input class="form-control grey" type="text" id="Margine_taiere" required name="Margine_taiere" value="{$EditFormData.depozite_records.Margine_taiere}" onchange="validateFloatKeyPress(this);"/>
									<div class="msg_box"></div>
								</div>
								<div class="form-group">
									<button type="submit" name="EditFormData" class="button btn btn-default submitMayorista">Actualizați </button>
								</div>
							</div>	
                        </div>
                    </form>
                </div>
            </div>
        {else}    
            <div class="row" id="Formwarehouse"  style="display:none;" >
                <div class="col-xs-12">
                    <form action="" method="post" name="Formwarehouse" class="contact-form-box Formwarehouse" enctype="multipart/form-data">
                        <fieldset>
                            <input type="hidden" name="action"  value="submit_depozite_records" />
                            <h2 class="page-subheading">Depozite</h2>
							<div class="row">
								<div class="col-xs-12 col-md-3">
									<div class="form-group">
										
										<label for="Titlu">Titlu</label>
											<input class="form-control grey validate" type="text" id="Titlu_Formwh" required name="Titlu" data-validate="isTitlu" onchange="validateInputField(this);" />
										<div class="msg_box"></div>
									</div>
										
									{if !empty($GetAllCategoryData)}
										<div class="Pret_cantuire">
										{foreach $GetAllCategoryData as $key=>$CategoryData}
											{if $CategoryData.Permite_personalizare == 'Da' }
											<div class="form-group">
												
											   <label for="Pret_taiere_{$key}">{$CategoryData.category_name} Pret taiere (Ron)</label>
											   <input  type="hidden" name="taiere_category_id[]" value="{$key}"/>
											   <input class="form-control grey" type="text" id="Pret_taiere_{$key}" required name="Pret_taiere[]" onchange="validateFloatKeyPress(this);"/>
											   <div class="msg_box"></div>
											</div>   
											{/if}
										{/foreach }
										</div>
									{/if}
									
									<div class="form-group">
										
										<label for="Nr_piese_pret_extra">Nr piese pret extra</label>
											<input class="form-control grey" type="number" id="Nr_piese_pret_extra" required name="Nr_piese_pret_extra" />
										<div class="msg_box"></div>
									</div>
									<div class="form-group">
										
										<label for="Procent_pret_extra">Procent pret extra (%)</label>
											 <input class="form-control grey" type="number" id="Procent_pret_extra" required name="Procent_pret_extra" />
										<div class="msg_box"></div>
									</div>
									<div class="form-group">
										<div class="msg_box"></div>
										<label for="Dimensiune_disc_taiere">Dimensiune disc taiere (mm)</label>
											<input class="form-control grey" type="text" id="Dimensiune_disc_taiere" required name="Dimensiune_disc_taiere" onchange="validateFloatKeyPress(this);"/>
										<div class="msg_box"></div>
									</div>
										{if !empty($GetAllCategoryData)}
											<div class="Pret_cantuire">
											{foreach $GetAllCategoryData as $key=>$CategoryData}
												{if $CategoryData.Foloseste_la_cantur == 'Da' }
												<div class="form-group">
													
												   <label for="Pret_cantuire_{$key}">{$CategoryData.category_name} Pret cantuire (Ron)</label>
												   <input  type="hidden" name="cantuire_category_id[]" value="{$key}"/>
												   <input class="form-control grey" type="text" id="Pret_cantuire_{$key}" required name="Pret_cantuire[]" onchange="validateFloatKeyPress(this);"/>
												   <div class="msg_box"></div>
												</div>   
												{/if}
											{/foreach }
											</div>
										{/if}
									<div class="form-group">
										
										<label for="Margine_taiere">Margine taiere (mm)</label>
											<input class="form-control grey" type="text" id="Margine_taiere" required name="Margine_taiere" onchange="validateFloatKeyPress(this);"/>
										<div class="msg_box"></div>
									</div>
									<div class="form-group">
										
										<button type="submit" name="submitMayorista" id="submitMayorista" class="button btn btn-default button-medium submitMayorista"><span>Adăuga <i class="icon-chevron-right right"></i> </span></button>
									</div>	
								</div>
							</div>
                        </fieldset>
                    </form>
                </div>
            </div>
        
            <div class="row">
                <div class="col-xs-12">
                    <p><h4>{l s='Depozite Records' mod='Modul_debitare'}</h4>
                    </p>
                    <button type="button" name="Addnew" id="Addnew" class="button btn btn-default button-medium"><span>
                    Adăuga nou Depozite</span></button>
                    <div class="table-responsive">
                    {if empty($ResponseData)}
                            No Records found
                    {else}
                    <table class="table" border="1px">
						<thead>
							<tr>
								<th>ID</th>
								<th>Titlu</th>
								<th>Pret taiere (Ron) & Pret cantuire (Ron)</th>
								<th>Nr_piese_pret_extra</th>
								<th>Procent_pret_extra</th>
								<th>Dimensiune_disc_taiere</th>
								<th>Margine_taiere</th>
								<th>Acțiune</th>
							</tr>
						</thead>
						<tbody>
                        {foreach item=item from=$ResponseData}
                            <tr>
                                <td align="center">{$item.id}</td>
                                <td align="center">{$item.Titlu}</td>
                                <td align="center">	
								<button type="button" class="button_reponsive">Expand Row</button>
								<br/>
								<div class="table_data" style="display:none;">
								{if !empty($GetAllCategoryData)}
									{foreach  $cutting_edges as $cut_keys=>$cut_values}
										{if $cut_values.warehouse_id == $item.id && $GetAllCategoryData[$cut_values.category_id].category_name != ''}
											
											<table class="table table_reponsive" border="1px" >
												<tr>
													<th>ID</th>
													<th>Category Name</th>
													<th>Warehouse Name</th>
													{if !empty($cut_values.Pret_taiere)}
													<th>Pret taiere (Ron)</th>
													{/if}
													{if !empty($cut_values.Pret_cantuire)}
													<th>Pret cantuire (Ron)</th>
													{/if}
												</tr>
												<tr>
													<td>{$cut_values.id}</td>
													<td>{$GetAllCategoryData[$cut_values.category_id].category_name}</td>
													<td>{$cut_values.warehouse_name}</td>
													{if !empty($cut_values.Pret_taiere)}
													<td>{$cut_values.Pret_taiere}</td>
													{/if}
													{if !empty($cut_values.Pret_cantuire)}
													<td>{$cut_values.Pret_cantuire}</td>
													{/if}
												</tr>
											</table>
											</br>
										{/if}	
									{/foreach}
								{/if}
								</div>
								</td>
                                <td align="center">{$item.Nr_piese_pret_extra}</td>
                                <td align="center">{$item.Procent_pret_extra}</td>
                                <td align="center">{$item.Dimensiune_disc_taiere}</td>
                                <td align="center">{$item.Margine_taiere}</td>
                                
                               <td align="center">
                                    <form action="" name="Edit_Delete" method="post" class="contact-form-box">
                                        <input type="hidden" name="action" value="Edit_Delete">
                                        <button type="submit" name="Delete" class="Delete" class="button btn btn-default" value="{$item.id}" data-toggle="tooltip" data-placement="top" title="Șterge!">Șterge</button> / <button type="submit" name="Edit" id="Edit" class="button btn btn-default" value="{$item.id}" data-toggle="tooltip" data-placement="top" title="Editați!">Editați</button>
                                    </form>
                                </td>
                            </tr>
                        {/foreach}
						</tbody>
                    </table>
                    {/if}
                    </div> 
                </div>
            </div>
        {/if}
    </div>
</div>                