import soapRequest from 'easy-soap-request';
import { XMLParser } from "fast-xml-parser";
const parser = new XMLParser();
import dotenv from 'dotenv';
dotenv.config();

import { EmailOptions } from '../types/sendMail.types';


const { ACTIVE_DIRECTORY_URL, HOST, SOAP_ACTION } = process.env;


export const mailService = async (data: EmailOptions) => {
    try {
            // axios post to xml api
            const { destinationEmail, sourceEmail, body, subject } = data;
        
            const url = `${ACTIVE_DIRECTORY_URL}`;
            const headers = {
                'Content-Type': 'text/xml',
            };
            
            const xml = `<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope">
            <Body>
                <SendMail xmlns="http://tempuri.org/">
                    <destinationEmail>${destinationEmail}</destinationEmail>
                    <sourceEmail>${sourceEmail}</sourceEmail>
                    <body>${body}</body>
                    <subject>${subject}</subject>
                </SendMail>
            </Body>
        </Envelope>`;
            
            const { response } = await soapRequest({ url, headers, xml });

            console.log("response: ", response);

            // return response;
            
            // convert to json
            let result = parser.parse(response.body);
            // format to get xml in order to get object
            result = reformatXml(result.Envelope.Body.GetInfoResponse.GetInfoResult);
            // get object
            result = parser.parse(result);
                    
            return result.root.record;
    } catch (error) {
        
    }
}

const reformatXml = (char: string) => {
    const newChar = char.replace(/&lt;/gi, `<`);
    const latChar = newChar.replace(/&gt;/gi, `>`);

    return latChar;
};


// https://t24-ewsserviceproxy.sterlingapps.p.azurewebsites.net/Service.asmx

//https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode
