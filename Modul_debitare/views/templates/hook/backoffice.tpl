<div class="form-group">
    <label class="control-label col-lg-3">
        <span class="label-tooltip">
            {l s='Permite personalizare' mod='Modul debitare'}
        </span>
    </label>
    <div class="col-lg-4">
        <select name="Permite_personalizare" value="{$Permite_personalizare}">
            <option value="Nu">Nu</option>  
            <option value="Da" {($Permite_personalizare == 'Da') ? 'selected' : ''}>Da</option>
        </select>
    </div>
    <div class="col-lg-6 col-lg-offset-3">
    </div>
</div>
<div class="form-group">
    <label class="control-label col-lg-3">
        <span class="label-tooltip">
            {l s='Foloseste la canturi' mod='cutting'}
        </span>
    </label>
    <div class="col-lg-4">
        <select name="Foloseste_la_cantur" value="{$Foloseste_la_cantur}">
            <option value="Nu">Nu</option>  
            <option value="Da" {($Foloseste_la_cantur == 'Da') ? 'selected' : ''}>Da</option>
        </select>
    </div>
    <div class="col-lg-6 col-lg-offset-3">
    </div>
</div>