import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { UserService } from '../../services/user.service'; // Import the UserService
import { Store } from 'src/app/models/store.model';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/User.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss'],
})
export class AddStoreComponent implements OnInit {
  newStore: Store = {
    id: '', // We'll set this later
    name: '',
    location: '',
    logo: '',
    phoneNumber: '',
    storemanager: '',
    managerid: '',
    managerpass: '',
    totalsales: 0,
    lat: 0,
    lng: 0,
  };

  newUser: User = { // Define the properties of the new user here
    id: '', // Set the ID as needed
    username: '',
    userId: '',
    userPass: '',
    isAdmin: false,
    managesStoreId: '', // Set the managed store ID as needed
  };

  constructor(
    private storeService: StoreService,
    private userService: UserService, // Inject the UserService
    private alertController: AlertController
  ) {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  addNewStoreAndUser() {
    // First, create the new store
    this.storeService.getStores().subscribe((stores) => {
      const maxId = Math.max(...stores.map((store) => parseInt(store.id)));
  
      // Generate the next ID by incrementing the highest ID by 1
      const newId = (maxId + 1).toString();
  
      // Assign the new ID to the newStore object
      this.newStore.id = newId;
  
      this.storeService.addStore(this.newStore).subscribe(
        (response) => {
          if (response.success) {
            // Store created successfully, now create the new user
  
            // Create a new user based on the provided format
            const newUser: User = {
              id: newId,
              username: this.newStore.storemanager,
              userId: this.newStore.managerid,
              userPass: this.newStore.managerpass,
              managesStoreId: newId,
              isAdmin: false,
            };
  
            // Call the createUser method from the UserService
            this.userService.createUser(this.newUser).subscribe(
              () => {
                // Show a success message
                this.presentAlert('Store and user created successfully!');
              },
              (error) => {
                // Show an error message
                this.presentAlert('An error occurred while creating the user.');
                console.error('Error creating user:', error);
              }
            );
            
          } else {
            // Show an error message
            this.presentAlert('Store created successfully');
          }
        },
        (error) => {
          // Show an error message
          this.presentAlert('An error occurred while creating the store.');
        }
      );
    });
  }
  
  

  ngOnInit() {}
}
