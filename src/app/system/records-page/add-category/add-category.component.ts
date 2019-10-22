import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'ohr-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  @Output() onCategotyAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm) {
    let { name, capacity} = form.value;
    if (capacity < 0)  {
      capacity *= -1;
    }

    const category = new CategoriesService(name, capacity);
    this.categoriesService.addCategory(category)
        .subscribe((category: CategoriesService) => {
          form.reset();
          form.form.patchValue({capacity: 1});
          this.onCategotyAdd.emit(category);
        });
  }
}
