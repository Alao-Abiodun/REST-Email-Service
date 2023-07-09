import axios from 'axios';


export default class MailServices {
    
   async sendMail(data) {
        // axios post to xml api
        const { destinationEmail, sourceEmail, body, subject } = data;
        axios.post('https://t24-ewsserviceproxy.sterlingapps.p.azurewebsites.net/Service.asmx', {
            headers: {
                'Content-Type': 'text/xml',
                'SOAPAction': 'http://tempuri.org/IService/SendEmail'
            },
            data: `<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope">
            <Body>
                <SendMail xmlns="http://tempuri.org/">
                    <destinationEmail>${destinationEmail}</destinationEmail>
                    <sourceEmail>${sourceEmail}</sourceEmail>
                    <body>${body}</body>
                    <subject>${subject}</subject>
                </SendMail>
            </Body>
        </Envelope>`
   })
    .then((response) => {
        console.log(response);
    }, (error) => {
        console.log(error);
    });
 }
}