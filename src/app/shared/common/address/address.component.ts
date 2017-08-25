import { Component, OnInit, Injector, Input } from '@angular/core';
import { CountryServiceProxy, AddressEditDto, StateServiceProxy, CityServiceProxy, CountryListDto, StateListDto, CityListDto, ComboboxItemDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from "shared/common/app-component-base";
import { AppConsts } from '@shared/AppConsts';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'edit-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent extends AppComponentBase implements OnInit {

    @Input() address: FormGroup

    countries: ComboboxItemDto[] = [];
    states: ComboboxItemDto[] = [];
    cities: ComboboxItemDto[] = [];

    private countryLoading: boolean = false;
    private stateLoading: boolean = false;
    private cityLoading: boolean = false;

    private countryControl: FormControl;
    private stateControl: FormControl;
    private cityControl: FormControl;

    constructor(
        injector: Injector,
        private _countryService: CountryServiceProxy,
        private _stateService: StateServiceProxy,
        private _cityService: CityServiceProxy
    ) {
        super(injector);
    }

    ngOnInit() {
        this.countryControl = this.address.get('countryId') as FormControl;
        this.stateControl = this.address.get('stateId') as FormControl;
        this.cityControl = this.address.get('cityId') as FormControl;

        this.countryControl.setValidators([Validators.required, Validators.min(1)]);
        this.stateControl.setValidators([Validators.required, Validators.min(1)]);
        this.cityControl.setValidators([Validators.required, Validators.min(1)]);

        this.address.controls["streetLine1"].setValidators([Validators.required, Validators.maxLength(128)]);
        this.address.controls["streetLine2"].setValidators(Validators.maxLength(128));
        this.address.controls["postalCode"].setValidators(Validators.maxLength(20));

        this.countryControl.valueChanges.subscribe(value => {
            this.getStates(value);
        });
        this.stateControl.valueChanges.subscribe(value => {
            this.getCities(value);
        });

        if (this.countryControl && this.countryControl.value > 0 && this.stateControl && this.cityControl) {
            this.getCountries(this.countryControl.value);
            this.getStates(this.countryControl.value, this.stateControl.value);
            this.getCities(this.cityControl.value);
        } else {
            this.countryLoading = true;
            this._countryService.getCountryBySortName(AppConsts.userSettings.defaultCountrySortName).subscribe((c) => {
                this.countryLoading = false;
                this.getCountries(c.id);
            });
        }
    }

    getCountries(selectedId?: number): void {
        this.countryLoading = true;
        this._countryService.getCountryComboBoxItems().subscribe((data) => {
            this.countries = data.items;
            this.countryLoading = false;
            if (selectedId) {
                this.address.patchValue({countryId: selectedId});
            }
        });
    }
    getStates(countryId: number, selectedId?: number): void {
        this.states = [];
        this.cities = [];

        if (countryId > 0) {
            this.stateLoading = true;
            this._stateService.getStateComboBoxItems(countryId).subscribe((s) => {
                this.states = s.items;
                this.stateLoading = false;
                if (selectedId) {
                    this.address.patchValue({ stateId: selectedId });
                }
            });
        }
    }

    getCities(stateId: number, selectedId?: number): void {

        this.cities = [];

        if (stateId > 0) {
            this.cityLoading = true;
            this._cityService.getCityComboBoxItems(stateId).subscribe((c) => {
                this.cities = c.items;
                this.cityLoading = false;
                if (selectedId) {
                    this.address.patchValue({ cityId: selectedId });
                }
            });
        }
    }
}
