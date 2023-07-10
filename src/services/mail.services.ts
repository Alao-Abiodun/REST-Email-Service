import axios from 'axios';
import soapRequest from 'easy-soap-request';
import parser from 'fast-xml-parser';
import dotenv from 'dotenv';

const { ACTIVE_DIRECTORY_URL, HOST, SOAP_ACTION } = process.env;


export default class MailService {
    
   async sendMail(data) {
        // axios post to xml api
        const { destinationEmail, sourceEmail, body, subject } = data;
        
        const url = `${ACTIVE_DIRECTORY_URL}?op=SendMail`;
        const headers = {
            Host: HOST,
            'Content-Type': 'application/soap+xml; charset=utf-8',
            SOAPAction: `${SOAP_ACTION}/SendMail`,
        };

        const xml = `<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
          <soap12:Body>
            <SendMail xmlns="http://tempuri.org/">
                <destinationEmail>${destinationEmail}</destinationEmail>
                <sourceEmail>${sourceEmail}</sourceEmail>
                <body>${body}</body>
                <subject>${subject}</subject>
            </SendMail>
          </soap12:Body>
        </soap12:Envelope>`;

        const { response } = await soapRequest({ url, headers, xml });

            // convert to json
            let result = convertXml(response.body);
            // format to get xml in order to get object
            result = reformatXml(result.Envelope.Body.GetInfoResponse.GetInfoResult);
            // get object
            result = convertXml(result);
        
            return result.root.record;
 }
}

const convertXml = (res: string): any => {
    const options = {
        attributeNamePrefix: '',
        attrNodeName: 'attr',
        ignoreNameSpace: true,
        ignoreAttributes: false,
    };

    // const tObj = parser.getTraversalObj(res, options);
    // return parser.convertToJson(tObj, options);
};

const reformatXml = (char: string) => {
    const newChar = char.replace(/&lt;/gi, `<`);
    const latChar = newChar.replace(/&gt;/gi, `>`);

    return latChar;
};
