# Final Project: Re:Lease MTL

<img src="client/src/assets/ReLease screen1.png" style='width:100%' />

Built as the final project for Concordia Web Dev Bootcamp, Re:Lease MTL is a platform that allows users to post their apartment online in order to find a potential candidate to whom they can reassign their lease.

A lease reassignment differs from subletting in that all responsibility is transferred along with the lease to the new tenant. This allows the maintenance of a lease-flow, preventing any type of important unfounded rent increase.

## Demo Link

Click here to view the [Video Demo](https://www.youtube.com/watch?v=9Exye6WG1Ug)

## The App

### Technology used:

- React
- JS
- CSS
- HTML
- NodeJs
- Express
- Auth0
- Cloudinary
- Google Maps API
- React Leaflet
- MongoDB
- i18Next
- Cloudinary
- OpenCage Geocoding

### User Login

<img src="client/src/assets/ReLease screen19.png" style='float:left;width:48%;margin-right:4%;' />
<img src="client/src/assets/ReLease screen2.png" style='width:48%' />

The user can Sign up or Log in by entering his/her email address and a password. This information is stored with Auth0 and is sent to MongoDB, which contains the data for all existing users.

### Searching available apartments

<img src="client/src/assets/ReLease screen3.png" style='width:100%' />

The user can search for apartments based on their input in the Search Bar. The map will dynamically display all available options that fit their criteria.

### Markers and Popups

By clicking on a marker, a popup appears displaying relevant info.

<img src="client/src/assets/ReLease screen4.png" style='width:50%' />

The user can click the comments button to open a Comments modal, or the "+" button to see the bulk of the info.
<img src="client/src/assets/ReLease screen5.png" style='float:left;width:48%;margin-right:4%;' />
<img src="client/src/assets/ReLease screen6.png" style='width:48%' />

The user can also book a visit if any are available. Their visiting schedule can be found in the "Visit Schedule" tab in the Profile section. These can be deleted at any time. The schedule will update dynamically.

<img src="client/src/assets/ReLease screen7.png" style='float:left;width:48%;margin-right:4%;' />
<img src="client/src/assets/ReLease screen8.png" style='width:48%' />

### Profile page (without a valid listing)

If the user does not have a listing posted, he will be directed to the main section of the Profile page: a fillable form that will produce a listing if all information is valid.

<img src="client/src/assets/ReLease screen9.png" style='float:left;width:48%;margin-right:4%;' />
<img src="client/src/assets/ReLease screen10.png" style='width:48%' />
<img src="client/src/assets/ReLease screen11.png" style='float:left;width:48%;margin-right:4%;' />
<img src="client/src/assets/ReLease screen12.png" style='width:48%' />

The file input accepts only png and JPEG files and the photo cannot exceed a certain size (700mb). The Geocoding is done in the backend after the user clicked "Submit". If the address/postal code does not exist, an error is returned.

### Profile page (with a valid listing)

If the user has a valid listing, the Profile will display it. The user can edit or delete the listing as well as respond to any comments/questions left by interested users. Once edited, the listing will update dynamically.

<img src="client/src/assets/ReLease screen13.png" style='float:left;width:48%;margin-right:4%;' />
<img src="client/src/assets/ReLease screen14.png" style='width:48%' />
<img src="client/src/assets/ReLease screen15.png" style='float:left;width:48%;margin-right:4%;' />
<img src="client/src/assets/ReLease screen16.png" style='width:48%' />

### Listing Schedule tab

The listing user can add or delete timeslots to their schedule. Deletion can only be done if the target timeslot has not been booked.

<img src="client/src/assets/ReLease screen17.png" style='float:left;width:48%;margin-right:4%;' />
<img src="client/src/assets/ReLease screen18.png" style='width:48%' />
