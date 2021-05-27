/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('https://react.simprocloud.com/build/index.html')
    })

    it('To Validate order was placed correctly for the rainbow book', () => {
        //Select the radio button Drama
        cy.get('#radioselect2 > input').check();
        //Select the book The Rainbow from the drop down
        cy.get('.bookoptions').select('The Rainbow');
        //Entering the value for unit field as 1
        cy.get(':nth-child(7) > input').type('1')
        //Enetring the value of price field as 125$
        cy.get(':nth-child(8) > input').type('125')
        //Selecting the discount checkbox
        cy.get('.discount > input').check();
        //Entering the discount value of 10
        cy.get('.discountvalue').type('10');
        //Clicking on submit button
        cy.get('[name="submit"]').click();
        
        //validating whether the order was placed correctly
         //validating the Item number column to 1
         cy.get('tr > :nth-child(1)').should('contain','1');
        //Validating books selected was the rainbow
         cy.get('tr > :nth-child(2)').should('contain','The Rainbow');
        //Validating Units of Books was 1 only
         cy.get('tr > :nth-child(3)').should('contain','1');
         //Validating Price of the each book was $125 only
         cy.get('tr > :nth-child(4)').should('contain','$ 125');
         //Validate the amount or Subtotal
         cy.get('tr > :nth-child(5)').should('contain','$ 125');
         //Validate the discount is appled correctly
         cy.get('tr > :nth-child(6)').should('contain','$ 12.50');
         //validate the total amount is correct
         cy.get('tr > :nth-child(7)').should('contain','$ 112.50');
    })  
    
   it('To Validate discount has been applied correctly & cumulative sum is correct', () => {
         
        //Select the radio button Drama
        cy.get('#radioselect2 > input').check();
        //Select the book The Rainbow from the drop down
        cy.get('.bookoptions').select('The Rainbow');
        //Entering the value for unit field as 1
        cy.get(':nth-child(7) > input').type('1')
        //Enetring the value of price field as 125$
        cy.get(':nth-child(8) > input').type('125')
        //Selecting the discount checkbox
        cy.get('.discount > input').check();
        //Entering the discount value of 10
        cy.get('.discountvalue').type('10');
        //Clicking on submit button
        cy.get('[name="submit"]').click();

        var percentageOfDisc = 10;
         //Validating that the discount is correctly calculated
         cy.get('tr > :nth-child(4)').then(($span) => {
             const priceOfBook = parseFloat($span.text().replace('$',''));
             var discAmount = priceOfBook * percentageOfDisc/100;
             cy.get('tr > :nth-child(6)').then(($total) => {
                 const total =$total.text().replace('$','');
                 assert.equal(discAmount, total);
                 //Validating The final amount is correctly calculated after the discount
                 var finAmount = priceOfBook - discAmount 
                 cy.get('tr > :nth-child(7)').then(($sum) => {
                     const sum = $sum.text().replace('$','');
                     assert.equal(finAmount, sum);
                 
                // to remove the record
                cy.get('.removeRecord').click();  
                //dialog message click on yes
                cy.get('#deletedialog > :nth-child(4)').click();  
                 })
               
               })
            })  

    })    
})