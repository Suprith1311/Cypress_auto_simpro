/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://react.simprocloud.com/build/index.html')
    })
    
    //Validating by giving the price of the book as 35.80(Which will generate the error message as Invalid price)
    it('To Validate Error message while buying a 50 harry potter books at 35.80 each', () => {
        //Select the option Harry Potter from the drop down
        cy.get('.bookoptions').select('Harry Potter')

        //Entering the unit value 50 for books
        cy.get(':nth-child(7) > input').type('50')

        //Entering the price of the each book as 35.80
        cy.get(':nth-child(8) > input').type('35.80')
        //Clicking on Submit button
        cy.get('[name="submit"]').click();
        //Validating the error message as Invalid price
        cy.get('p').contains('Invalid price');
          
    })
     
    //(Happy Path) To validate the error message is gone by changing the value of the price to 36
    it('To Validate the error message is gone & Total amount is correctly appled', () => {
        //Select the option Harry Potter from the drop down
        cy.get('.bookoptions').select('Harry Potter')
        //Entering the unit value 50 for books
        cy.get(':nth-child(7) > input').type('50')
         //Entering the price of the each book as 35.80
         cy.get(':nth-child(8) > input').type('36')
         //Clicking on Submit button
         cy.get('[name="submit"]').click();

         //validating whether the order was placed correctly
         //validating the Item number column to 1
         cy.get('tr > :nth-child(1)').should('contain','1');
        //Validating books selected was Harry potter only
         cy.get('tr > :nth-child(2)').should('contain','Harry Potter');
        //Validating Units of Books was 50 only
         cy.get('tr > :nth-child(3)').should('contain','50');
         //Validating Price of the each book was $36 only
         cy.get('tr > :nth-child(4)').should('contain','$ 36');
         //Validate the amount or Subtotal
         cy.get('tr > :nth-child(5)').should('contain','1800');
         //Validate the discount is 0
         cy.get('tr > :nth-child(6)').should('contain','$ 0.00');
         
         var numberOfBooks = 50;
         //Validating that the total amount has been correctly applied by Multipying Units*Price = Final Amount
         cy.get('tr > :nth-child(4)').then(($span) => {
             const priceOfBooks = parseFloat($span.text().replace('$',''));
             var totalAmount = priceOfBooks * numberOfBooks;
             cy.get('tr > :nth-child(7)').then(($total) => {
                 const total =$total.text().replace('$','');
                 assert.equal(totalAmount, total);
             })

        })
    })  
    //To Check required fields are validated correctly or not
    it('Validating by leaving the books empty in drop down/Default value', () => {
   //Validating the fileds by leaving the book name value to null or empty(By not selecting it from drop down)
        //Entering the value 50 in units box         
        cy.get(':nth-child(7) > input').type('50')
        //Entering the value 36 in price box  
        cy.get(':nth-child(8) > input').type('36')
        //Clicking on submit button
        cy.get('[name="submit"]').click();
        //Validating the column Books in "Order Details" Section is empty or not 
        cy.get('tr > :nth-child(2)').should('contain','');
    })
       
    it('Validating by leaving the units field empty and checking error message', () => {
        //Validating the fileds by leaving the units field empty(An error message is generated)
             //Select the option Friday Barnes from the drop down       
             cy.get('.bookoptions').select('Friday Barnes')
             //Entering the value 36 in price box  
             cy.get(':nth-child(8) > input').type('36')
             //Clicking on submit button
             cy.get('[name="submit"]').click();
             //Validating the error message as Input is not valid
             cy.get('p').contains('Input is not valid');
    })  
    
    it('Validating by leaving the price field empty and checking error message', () => {
        //Validating the fileds by leaving the price field empty(An error message is generated)
             //Select the option Friday Barnes from the drop down       
             cy.get('.bookoptions').select('Hunger Games')
             //Entering the value 50 in units box         
        cy.get(':nth-child(7) > input').type('50')
             //Clicking on submit button
             cy.get('[name="submit"]').click();
             //Validating the error message as price is required
             cy.get('p').contains('Price is required');
    }) 
    
    it('Validating by leaving the price and units both field empty and checking error messages', () => {
        //Validating the fileds by leaving the price and units field both empty(Error messages are generated)
             //Select the option Friday Barnes from the drop down       
             cy.get('.bookoptions').select('Truly Tan')
             //Clicking on submit button
             cy.get('[name="submit"]').click();
             //Validating the error message as Input is not valid
             cy.get('form > :nth-child(8)').contains('Input is not valid');
             // Validating the error message as Price is required
             cy.get('form > :nth-child(10)').contains('Price is required');
    }) 


})    