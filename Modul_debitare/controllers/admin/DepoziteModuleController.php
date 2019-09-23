<?php
class DepoziteModuleController extends ModuleAdminController
{
	public $bootstrap = true ;

    public function __construct()
    {
        $this->table = 'depozite_records';
        $this->className = 'DepoziteModuleData';
        $this->name = 'Modul_debitare';
        parent::__construct();
    }


    public function get_depozite_records($id = false)
    {
        if($id){
           $sql = 'SELECT * FROM '. _DB_PREFIX_ . 'depozite_records WHERE id = '.$id; 
           $sql2 = 'SELECT * FROM '. _DB_PREFIX_ . 'cutting_edges_depozite_records WHERE warehouse_id = '.$id; 
           $results['depozite_records'] = Db::getInstance(_PS_USE_SQL_SLAVE_)->getRow($sql);
           $cutting_edges = Db::getInstance()->ExecuteS($sql2);

	      	$cutting_edgesArr[] = array_column($cutting_edges, 'Pret_taiere', 'category_id');
	      	$cutting_edgesArr[] = array_column($cutting_edges, 'Pret_cantuire', 'category_id');
	      	$results['cutting_edges'] = $cutting_edgesArr;
		   
        }else{
            $query_dep = 'SELECT * FROM `' . _DB_PREFIX_ . 'depozite_records`';
            $query_cut = 'SELECT * FROM `' . _DB_PREFIX_ . 'cutting_edges_depozite_records`';
            $results['depozite_records'] = Db::getInstance()->ExecuteS($query_dep);
            $results['cutting_edges'] = Db::getInstance()->ExecuteS($query_cut);
        }
        return  $results;
    }

    public function UpdateFormData($data, $id){
		
		$taiere_values = $data['Pret_taiere'];
		$cantuire_values = $data['Pret_cantuire'];
		if(!empty($taiere_values) && !empty($cantuire_values)){
			$All_keys = array_merge(array_keys($taiere_values), array_keys($cantuire_values));
			$All_keys = array_unique($All_keys);
		}else if(!empty($taiere_values)){
			$All_keys = array_unique(array_keys($taiere_values));
		}else if(!empty($cantuire_values)){
			$All_keys = array_unique(array_keys($cantuire_values));
		}else{}
			unset($data['Pret_taiere']);
			unset($data['Pret_cantuire']);
			
		if(!Db::getInstance(_PS_USE_SQL_SLAVE_)->update('depozite_records', $data, 'id = '.$id, $limit = 0, $null_values = false, $use_cache = true, $add_prefix = true))
			return false;
		if(isset($All_keys)){
			foreach($All_keys as $key=>$key_values){
				
				if(array_key_exists($key_values, $cantuire_values)){
					$value_cantuire = $cantuire_values[$key_values];
				}
				
				if(array_key_exists($key_values, $taiere_values)){
					$value_taiere = $taiere_values[$key_values];
				}
				
				$sqlqry = "SELECT * FROM "._DB_PREFIX_."cutting_edges_depozite_records WHERE category_id=".$key_values." and warehouse_id=".$id;
				$ResponseData = Db::getInstance()->getValue($sqlqry);
				
				if($ResponseData){
					
					$sqlQuery = "UPDATE "._DB_PREFIX_."cutting_edges_depozite_records SET warehouse_name='".$data['Titlu']."', Pret_taiere='".$value_taiere."', Pret_cantuire='".$value_cantuire."'  WHERE category_id=".$key_values." and warehouse_id=".$id;	
					
					if (!Db::getInstance()->execute($sqlQuery))	
						return false;
				}else{
					$insert_Data = 
					array(
						'category_id'	 => $key_values,		
						'warehouse_id'   => $id,
						'warehouse_name' => $data['Titlu'],
						'Pret_taiere'    => $value_taiere,
						'Pret_cantuire'  => $value_cantuire
					);
				
					if(!Db::getInstance(_PS_USE_SQL_SLAVE_)->insert('cutting_edges_depozite_records', $insert_Data))
						return false;
				}
			}
		}
		//return true;
    }

    public function saveFormData($data){
		
		$taiere_values = $data['Pret_taiere'];
		$cantuire_values = $data['Pret_cantuire'];
		if(!empty($taiere_values) && !empty($cantuire_values)){
			$All_keys = array_merge(array_keys($taiere_values), array_keys($cantuire_values));
			$All_keys = array_unique($All_keys);
		}else if(!empty($taiere_values)){
			$All_keys = array_unique(array_keys($taiere_values));
		}else if(!empty($cantuire_values)){
			$All_keys = array_unique(array_keys($cantuire_values));
		}else{}
		
		
		unset($data['Pret_taiere']);
		unset($data['Pret_cantuire']);
		
		if(!Db::getInstance(_PS_USE_SQL_SLAVE_)->insert('depozite_records', $data))
            return false;
        
		
		
		$last_id =  Db::getInstance()->Insert_ID();
	
		if(isset($All_keys)){
			foreach($All_keys as $key=>$key_values){
				
				if(array_key_exists($key_values, $cantuire_values)){
					$value_cantuire = $cantuire_values[$key_values];
				}
				
				if(array_key_exists($key_values, $taiere_values)){
					$value_taiere = $taiere_values[$key_values];
				}
				
				$insert_Data = 
				array(
					'category_id'	 => $key_values,		
					'warehouse_id'   => $last_id,
					'warehouse_name' => $data['Titlu'],
				);
				
				
				if(isset($value_taiere)){
					$insert_Data['Pret_taiere'] = $value_taiere;
				}
				if(isset($value_cantuire)){
					$insert_Data['Pret_cantuire'] = $value_cantuire;
				}
				
				/* echo '<pre>';
				print_r($insert_Data);
				echo '</pre>';
				die; */
				if(!Db::getInstance(_PS_USE_SQL_SLAVE_)->insert('cutting_edges_depozite_records', $insert_Data))
				return false;
			}
		}
		return true;
    }

    public function DeleteFormData($id){
        if(!Db::getInstance(_PS_USE_SQL_SLAVE_)->delete('depozite_records' , 'id = '. $id, 1, $use_cache = false))
            return false;
		if(!Db::getInstance(_PS_USE_SQL_SLAVE_)->delete('cutting_edges_depozite_records' , 'warehouse_id = '. $id))
            return false;
        return true;
    }
	public function getdebitare_select($id_category)
    {
        $ResponseData['Permite_personalizare'] =  Db::getInstance()->getValue('SELECT Permite_personalizare FROM '._DB_PREFIX_.'category WHERE id_category = '. (int)$id_category);
        $ResponseData['Foloseste_la_cantur'] =  Db::getInstance()->getValue('SELECT Foloseste_la_cantur FROM '._DB_PREFIX_.'category WHERE id_category = '. (int)$id_category);
         
         return $ResponseData;
    }
	
    public function initContent() {
        parent::initContent();
		
		$lang = (int)Context::getContext()->language->id;
		$cats = Category::getCategories($lang);
		$GetAllCategoryData = array();
		foreach($cats as $cat_val){
			foreach($cat_val as $cat_key=>$cat_key_val){
				$getdebitare_select = $this->getdebitare_select($cat_key);
				if($getdebitare_select['Permite_personalizare'] != '' || $getdebitare_select['Foloseste_la_cantur'] != ''){
					$category_name = $cat_key_val['infos']['name'];
					$getdebitare_select['category_name'] = $category_name;
					$GetAllCategoryData[$cat_key] =  $getdebitare_select;
				}
			}	
		}
		
		/* echo '<pre>';
		print_r($GetAllCategoryData);
		echo '</pre>'; */
		
        $FormdataEditData = '';
        
        // Edit and delete Data    
        if(Tools::getValue('action') == 'Edit_Delete'){

            $FormdataDelete = Tools::getValue('Delete');
            $FormdataEdit = Tools::getValue('Edit');
            if(isset($FormdataDelete) && !empty($FormdataDelete)){
                $response = $this->DeleteFormData($FormdataDelete);
				$this->confirmations[] = 'Deleted your record Successfully!!';
            }else{
                $FormdataEditData = $this->get_depozite_records($FormdataEdit);
            }
        }
        //Update Data
        else if(Tools::getValue('action') == 'UpdateForm'){
			
			$GetAllCategoryData = Tools::getAllValues();			
			$allData = Tools::getAllValues();
			$id = Tools::getValue('id');
			if(isset($allData['taiere_category_id']) && isset($allData['cantuire_category_id'])){
				$taiere_category_id = $allData['taiere_category_id'];
				$Pret_taiere = $allData['Pret_taiere'];
				
				$cantuire_category_id = $allData['cantuire_category_id'];
				$Pret_cantuire = $allData['Pret_cantuire'];
				
				$taiere_values = array_combine($taiere_category_id,$Pret_taiere);
				$cantuire_values = array_combine($cantuire_category_id,$Pret_cantuire);
			}else if(isset($allData['taiere_category_id'])){
				$taiere_category_id = $allData['taiere_category_id'];
				$Pret_taiere = $allData['Pret_taiere'];
				$taiere_values = array_combine($taiere_category_id,$Pret_taiere);
			}else if(isset($allData['cantuire_category_id'])){
				$cantuire_category_id = $allData['cantuire_category_id'];
				$Pret_cantuire = $allData['Pret_cantuire'];
				$cantuire_values = array_combine($cantuire_category_id,$Pret_cantuire);
			}else{
				$taiere_values = '';
				$cantuire_values = '';
			}
            $Formdata['Titlu'] = Tools::getValue('Titlu');
            $Formdata['Pret_taiere'] = $taiere_values;
			$Formdata['Pret_cantuire'] = $cantuire_values;
            $Formdata['Nr_piese_pret_extra'] = Tools::getValue('Nr_piese_pret_extra');
            $Formdata['Procent_pret_extra'] = Tools::getValue('Procent_pret_extra');
            $Formdata['Dimensiune_disc_taiere'] = Tools::getValue('Dimensiune_disc_taiere');
            $Formdata['Margine_taiere'] = Tools::getValue('Margine_taiere');
			
            $response = $this->UpdateFormData($Formdata, $id);
			$this->confirmations[] = 'Your record is Updated Successfully!!';
        }
        // Insert Data
        else if(Tools::getValue('action') == 'submit_depozite_records'){
			$allData = Tools::getAllValues();
			if(isset($allData['taiere_category_id']) && isset($allData['cantuire_category_id'])){
				$taiere_category_id = $allData['taiere_category_id'];
				$Pret_taiere = $allData['Pret_taiere'];
				
				$cantuire_category_id = $allData['cantuire_category_id'];
				$Pret_cantuire = $allData['Pret_cantuire'];
				
				$taiere_values = array_combine($taiere_category_id,$Pret_taiere);
				$cantuire_values = array_combine($cantuire_category_id,$Pret_cantuire);
			}else if(isset($allData['taiere_category_id'])){
				$taiere_category_id = $allData['taiere_category_id'];
				$Pret_taiere = $allData['Pret_taiere'];
				$taiere_values = array_combine($taiere_category_id,$Pret_taiere);
			}else if(isset($allData['cantuire_category_id'])){
				$cantuire_category_id = $allData['cantuire_category_id'];
				$Pret_cantuire = $allData['Pret_cantuire'];
				$cantuire_values = array_combine($cantuire_category_id,$Pret_cantuire);
			}else{
				$taiere_values = '';
				$cantuire_values = '';
			}
            $Formdata['Titlu'] = Tools::getValue('Titlu');
            $Formdata['Pret_taiere'] = $taiere_values;
			$Formdata['Pret_cantuire'] = $cantuire_values;
            $Formdata['Nr_piese_pret_extra'] = Tools::getValue('Nr_piese_pret_extra');
            $Formdata['Procent_pret_extra'] = Tools::getValue('Procent_pret_extra');
            $Formdata['Dimensiune_disc_taiere'] = Tools::getValue('Dimensiune_disc_taiere');
            $Formdata['Margine_taiere'] = Tools::getValue('Margine_taiere');
            // echo '<pre>';
            // print_r($Formdata);
            // echo '</pre>';
            // die;
			$response = $this->saveFormData($Formdata);
			$this->confirmations[] = 'Your record is added Successfully!!';
			/* $this->displayConfirmation($this->l()); */
        }else{}

        $ResponseData = $this->get_depozite_records();
        $this->context->smarty->assign(array(
            'ResponseData'=> $ResponseData['depozite_records'],
            'cutting_edges'=> $ResponseData['cutting_edges'],
            'GetAllCategoryData'=> $GetAllCategoryData,
            'EditFormData'=> $FormdataEditData,
        ));

       // $data = $this->createTemplate($this->tpl_form);
		
        $content=$this->context->smarty->fetch(_PS_MODULE_DIR_ . 'Modul_debitare/views/templates/admin/configure.tpl');
 		
        $this->context->smarty->assign(
                array(
                    'content' => $this->content . $content,
                )
        );
	}

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia();
        $this->addJqueryUi('ui.widget');
        $this->addJqueryPlugin('tagify');
    }
}

?>