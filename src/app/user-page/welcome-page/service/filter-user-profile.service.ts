import {Injectable} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {UserProfileService} from "./user-profile-service";

@Injectable({
  providedIn: 'root'
})
export class FilterUserProfileService{
  public filterForm = new FormGroup({
    minAge: new FormControl(18),
    maxAge: new FormControl(85),
    maxDistance: new FormControl(50),
    minCompatibility: new FormControl(),
    maxCompatibility: new FormControl(),
    preferenceList: new FormControl(),
    genderList: new FormControl(),
    educationList: new FormControl(),
    sexualOrientation: new FormControl(),
    raceList: new FormControl()
  })
  constructor(public userProfileService : UserProfileService) {
  }
  filter(){
    this.userProfileService.filteredUserProfileList = this.userProfileService.userProfilesList;
    this.filterByAge();
    this.filterByGender();
    this.filterByPreference();
    this.filterByRace();
    this.filterByEducation();
    this.filterBySexualOrientation();
    this.filterByCompatibilityRate();
    this.filterByMaxDistance();
    this.userProfileService.resetSelectedIndex();

  }
  private filterByAge(){
    if(this.filterForm.controls['minAge']?.value != null && this.filterForm.controls['maxAge']?.value != null){
      this.userProfileService.filteredUserProfileList = this.userProfileService.filteredUserProfileList
        .filter(it => {
          // @ts-ignore
          return this.getAge(it.birthDate) <= this.filterForm.controls['maxAge'].value && this.getAge(it.birthDate) >= this.filterForm.controls['minAge'].value
        })
    }

  }
  private filterByCompatibilityRate(){
    if(this.filterForm.controls['minCompatibility']?.value != null && this.filterForm.controls['maxCompatibility']?.value != null){
      this.userProfileService.filteredUserProfileList = this.userProfileService.filteredUserProfileList
        .filter(it => it.compatibility >= this.filterForm.controls['minCompatibility']?.value && it.compatibility <= this.filterForm.controls['maxCompatibility']?.value)
    }

  }
  private filterByMaxDistance(){
    if(!this.filterForm?.controls['maxDistance']?.value) return;
    this.userProfileService.filteredUserProfileList = this.userProfileService.filteredUserProfileList
      // @ts-ignore
      .filter(it => it.distance <= this.filterForm?.controls['maxDistance']?.value)

  }
  private filterByPreference(){
    if(this.filterForm.controls['preferenceList']?.value != null && this.filterForm.controls['preferenceList']?.value.length){
      this.userProfileService.filteredUserProfileList = this.userProfileService.filteredUserProfileList
        .filter(it => {
          return it.preferenceList && it.preferenceList.length && it.preferenceList.find(preference => this.filterForm.controls['preferenceList'].value.includes(preference));
        })
    }

  }
  private filterByGender(){
    if(this.filterForm.controls['genderList']?.value != null){
      this.userProfileService.filteredUserProfileList = this.userProfileService.userProfilesList
        .filter(it => {
          // @ts-ignore
          return this.filterForm.controls['genderList'].value?.includes(it.gender)
        })
    }
  }
  private filterByEducation(){
    if(this.filterForm.controls['educationList']?.value != null && this.filterForm.controls['educationList']?.value.length){
      this.userProfileService.filteredUserProfileList = this.userProfileService.filteredUserProfileList
        .filter(it => {
          return it.educationList && it.educationList.length && it.educationList.find(preference => this.filterForm.controls['educationList'].value.includes(preference));
        })
    }
  }
  private filterBySexualOrientation(){
    if(this.filterForm.controls['sexualOrientation']?.value != null && this.filterForm.controls['sexualOrientation']?.value.length){
      this.userProfileService.filteredUserProfileList = this.userProfileService.filteredUserProfileList
        .filter(it => {
          return it.sexualOrientation && this.filterForm.controls['sexualOrientation']?.value.includes(it.sexualOrientation);
        })
    }
  }
  private filterByRace(){
    if(this.filterForm.controls['raceList']?.value != null && this.filterForm.controls['raceList']?.value.length){
      this.userProfileService.filteredUserProfileList = this.userProfileService.filteredUserProfileList
        .filter(it => {
          return it.race && this.filterForm.controls['raceList']?.value.includes(it.race);
        })
    }
  }
  private getAge(date : Date){
    return new Date().getUTCFullYear() - new Date(date).getUTCFullYear();
  }
}
