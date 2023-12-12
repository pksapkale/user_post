import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardApiServiceService } from '../services/dashboard-api-service.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  _route: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);
  _dashboardService: DashboardApiServiceService = inject(DashboardApiServiceService);

  selectedFile: File | null = null;
  userId: any = 0;
  ngOnInit(): void {
    this.userId = this._route.snapshot.params['user_id'];
  }

  productSubmitHandler(productForm: any) {
    if(this.selectedFile && productForm.status == "VALID") {
      let obj = { product_name: productForm.value.product_name, product_description: productForm.value.product_description, user_id: this.userId }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('data', JSON.stringify(obj));
      this._dashboardService.createProduct(formData).subscribe({
        next: data => {
          if(data.status) {
            this.jumpToRoute(`/dashboard/${this.userId}`);
          }
          else {
            console.log('Error in {productSubmitHandler} in {create-product-component}');
          }
        },
        error: err => {
          console.log('Error in {productSubmitHandler} in {create-product-component} ERROR ----->>>>>', err);
        }
      })
    }
    else {
      let msg = !this.selectedFile ? 'Please upload a product image' : 'Form is invalid';
      alert(msg);
    }
  }

  // Function for select file
  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  jumpToRoute(route: string) {
    this._router.navigateByUrl(`/dashboard/${this.userId}/${route}`);
  }
}
