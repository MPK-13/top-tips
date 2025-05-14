//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


// My routes
router.post('/2', function(request, response) {
    //calculating the VAT amount
    let gross = request.session.data['gross'];
    let vatRate = request.session.data['vatRate'];
    let net = gross * (1+(vatRate/100)); 
    // times the smount by 1.x where x is a tebth of the VAT rate
    // for example, 1.2 for 20%

    // round to 2dp
    net = net.toFixed(2)

    // writing the net amount to session
    request.session.data['net'] = net

    //calculating the difference from gross and net (VAT added) and writing it to a session - all in one statement
    request.session.data['vatAmount'] = net - gross;
    
    // move to the next page
    response.redirect('3')

});

// forgot to change from post to get on the demo this is why it didn't work
// post happens on the submittion of a form
// get happens when the url is called
router.get('/setup', function(request, response) {
    // setting up some data to skip directly to the results page

    request.session.data['gross'] = 1000
    request.session.data['vatRate'] = 20
    request.session.data['vatAmount'] = 200
    request.session.data['net'] = 1200

    response.redirect('3')
});
