# **Thai ID OCR App Assignment** 
## **[HOSTED APP LINK](https://qoala-ocr-36fc8f9bf3bf.herokuapp.com/)**
 
### OCR PROCESSING
The application is integrated with Google Vision API to perform OCR on ID card images, using reference from [Google API docs](https://cloud.google.com/vision/docs/ocr#optical_character_recognition_ocr). It will extract key information such as ID number, name, last name, date of birth, date of issue, and date of expiry and then it will all be saved on the MongoDB database.JSON OUTPUT :
The final output is a well-structured JSON object containing all the extracted data.
Ensured the accuracy and readability of the JSON output.

## To RUN
**HERE IS THE LINK TO RUN THE APPLICATION : ## [Try here]( https://qoala-ocr-36fc8f9bf3bf.herokuapp.com/)**
1. Upload a Thai ID card image in the following format(png, jpeg, and jpg). File size can not be bigger than 2MB.[Sample THAI ID card](https://pbs.twimg.com/media/FkcR718VEAAMEtL.jpg:large). 
2. The Extract button will give the required data extracted from the image and the Get All button will give the history of already generated OCR results.
3. CRUD operation could also be performed on the data and it will be modified in the database.

### Database and REST API Endpoints
-The MongoDB database is used to store and manage the OCR data.

*REST API Endpoints
1. Create a New OCR Record
   -Develop an API endpoint to create a new record in the database.
   -This record should reflect the success or failure status of an OCR process.
2. Update Existing OCR Data.
   -This modifies the information and stores the updated information in the database.
3. Retrieve and Display OCR Data
   -Create an API endpoint to fetch and display OCR data.
4. Delete OCR Records
   -Design an API endpoint to delete OCR records from the database.

## **HOSTED**
The application is hosted on Heroku ## **[TRY HERE](https://qoala-ocr-36fc8f9bf3bf.herokuapp.com/)**

