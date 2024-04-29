const pool = require("../../config/database");
const axios = require('axios');
var error = "Error while connecting to database server";
const { sendEmail } = require('../email_service');
const nodemailer = require('nodemailer');
const CryptoJS = require('crypto-js');

// Replace these values with your own secret key
const secretKey = 'ims';

// Function to encrypt a string
function encrypt(text) {
  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encrypted;
}

// Function to decrypt an encrypted string
function decrypt(encryptedText) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey).toString(CryptoJS.enc.Utf8);
  return decrypted;
}





function sendResetEmail(email, password , callback) {
    var htmlContent = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-50 {
        width: 300px !important;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: 100% !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
        </style>
      
      
    
    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f0f0f0;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f0f0f0;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f0f0f0;"><![endif]-->
        
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ddffe7;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ddffe7;height: 100%;width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
        <img align="center" border="0" src="https://ims-filebrowser.zroooe.easypanel.host/api/public/dl/b4XGAOmk/account_created.jpg?inline=true" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;" width="100%"/>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <!--[if mso]><table width="100%"><tr><td><![endif]-->
        <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 22px; font-weight: 700;"><span><span><span>Your account has been created.</span></span></span></h1>
      <!--[if mso]></td></tr></table><![endif]-->
    
          </td>
        </tr>
      </tbody>
    </table>
    <strong style="padding:3px"><center>Your account credentials are : </center></strong>
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
    <div align="center">
      <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.the1bm.com" style="height:42px; v-text-anchor:middle; width:216px;" arcsize="0%"  strokecolor="#000000" strokeweight="2px" fillcolor="#ffffff"><w:anchorlock/><center style="color:#000000;"><![endif]-->
        <p style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: left;color: #000000; background-color: #ffffff; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:75%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-color: #000000; border-top-style: solid; border-top-width: 2px; border-left-color: #000000; border-left-style: solid; border-left-width: 2px; border-right-color: #000000; border-right-style: solid; border-right-width: 2px; border-bottom-color: #000000; border-bottom-style: solid; border-bottom-width: 2px;font-size: 18px;">
          <span style="display:block;padding:10px 20px;line-height:120%;"><b>Email : ${email}</b></span>
          <span style="display:block;padding:10px 20px;line-height:120%;"><b>Password : ${password}</b></span>
        </p>
        <!--[if mso]></center></v:roundrect><![endif]-->
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
        <p style="line-height: 140%;">You can login using these credentials to our Information Management System <a target="_blank" href="https://ims.the1properties.com">IMS</a></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <!--[if mso]><table width="100%"><tr><td><![endif]-->
        <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 18px; font-weight: 700;"><span><span><span><span><span><span><span>You need to complete your profile to access the IMS</span></span></span></span></span></span></span></h1>
      <!--[if mso]></td></tr></table><![endif]-->
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 2px 0px 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 2px 0px 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <!--[if mso]><table width="100%"><tr><td><![endif]-->
        <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 13px; font-weight: 400;"><span><span><span><span>If you have any questions, contact our Website  Guides.<br />Or, visit our Help Center.</span></span></span></span></h1>
      <!--[if mso]></td></tr></table><![endif]-->
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="300" style="background-color: #ffffff;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://ims-filebrowser.zroooe.easypanel.host/api/public/dl/IP32sqFS/image-2.png?inline=true" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 174px;" width="174"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
    <!--[if (mso)|(IE)]><td align="center" width="300" style="background-color: #ffffff;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
      <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="font-size: 14px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 140%;"><strong><span style="line-height: 19.6px;">#11 F- 5 Amenity Center – 1</span></strong></p>
    <p style="line-height: 140%;"><strong><span style="line-height: 19.6px;">Al Hamra, Ras Al Khaimah, UAE</span></strong></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="line-height: 140%;"><strong><span style="line-height: 19.6px;"><a rel="noopener" href="http://www.the1properties.com/" target="_blank" title="http://www.the1properties.com/">www.the1properties.com</a></span></strong><span style="line-height: 19.6px;"> </span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
      
      
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
      <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 0px 0px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 0px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>
    
    
        `;
    var subject = "IMS - Account Created";
    sendEmail(email, subject, htmlContent, callback);
}



function parseEmployeeJson(a){
   let employee = {};
   let office = null;
   let department = null;
   let lineManager = null;
   let user = null;
   let role = null;

   if(a.lineManagerId){
    lineManager = {
      employeeId : a.lineManagerId,
      firstName : a.lineManagerFirstName,
      lastName : a.lineManagerLastName,
      photoUrl : a.lineManagerPhoto
    };
   }

   if(a.officeId){
    office = {
      officeId : a.officeId,
      name : a.officeName
    };
   }



   if(a.departmentId){
    department = {
      departmentId : a.departmentId,
      name : a.departmentName
    };
   }

   if(a.roleId){
    role = {
      roleId : a.roleId,
      role : a.role,
      permissions : a.permissions
    };

    user = {
      displayName : a.firstName + " " + a.lastName,
      email : a.email,
      imageUrl : a.photoUrl,
      password : decrypt(a.password),
      employeeId : a.employeeId,
      roleId : a.roleId,
      role : role
    };
   }

   employee = {
    employeeId : a.employeeId,
    firstName : a.firstName,
    lastName : a.lastName,
    dateOfBirth : a.dateOfBirth,
    gender : a.gender,
    idNo : a.idNo,
    idExpiry : a.idExpiry,
    idImageUrl : a.idImageUrl,
    nationality : a.nationality,
    maritalStatus : a.maritalStatus,
    email : a.email,
    mobile : a.mobile,
    country : a.country,
    state : a.state,
    city:  a.city,
    postalCode : a.postalCode,
    address : a.address,
    photoUrl : a.photoUrl,
    cvUrl : a.cvUrl,
    lineManagerId : a.lineManagerId,
    lineManager : lineManager,
    status : a.status,
    passportNo : a.passportNo,
    passportExpiry : a.passportExpiry,
    passportImageUrl : a.passportImageUrl,
    visaType : a.visaType,
    visaNo : a.visaNo,
    visaExpiry : a.visaExpiry,
    visaImageUrl : a.visaImageUrl,
    officeId : a.officeId,
    departmentId : a.departmentId,
    companyId : a.companyId,
    createAt : a.createAt,
    modifiedAt : a.modifiedAt,
    user : user,
    department: department,
    office : office,
    lineManager : lineManager
   };

   return employee;
}

function parseOneEmployeeJson(a){
  return a;
}

var oneEmployeeSql = `
select * from employees e `;


var employeeSql = 
`select 
e.employeeId,
e.firstName, 
e.lastName, 
e.dateOfBirth, 
e.gender, 
e.idNo, 
e.idExpiry, 
e.idImageUrl, 
e.nationality, 
e.maritalStatus, 
e.email, 
e.mobile, 
e.country, 
e.state, 
e.city, 
e.postalCode, 
e.address, 
e.photoUrl, 
e.cvUrl, 
e.lineManagerId, 
l.firstName as lineManagerFirstName,
l.lastName as lineManagerLastName,
l.photoUrl as lineManagerPhoto,
e.status, 
e.passportNo, 
e.passportExpiry, 
e.passportImageUrl, 
e.visaType, 
e.visaNo, 
e.visaExpiry, 
e.visaImageUrl, 
e.officeId,
o.name as officeName, 
e.departmentId, 
d.name as departmentName,
e.companyId, 
e.createAt, 
e.modifiedAt,
u.roleId, 
role, 
permissions,
u.password

from employees e
left join offices o on e.officeId = o.officeId
left join departments d on e.departmentId = d.departmentId
left join users u on e.employeeId = u.employeeId
left join user_roles r on u.roleId = r.roleId
left join employees l on e.lineManagerId = l.employeeId`;


module.exports = {
    create : (req, callback) => {
        var data = req.body;
        const now = new Date();
        data.createAt = now;
        if(req.files.length > 0)
        {
          req.files.forEach(file => {
            data[file.fieldname] = req[file.fieldname];
          });
        }
        pool.query(`${oneEmployeeSql} where e.email = ?`, [data.email], (error, result, fields) => {
            if(error)
            {
                return callback(error);
            }
            if(result.length <= 0)
            {
                //create employee account
                pool.query(`Insert into employees (firstName, lastName, dateOfBirth, gender, nationality, maritalStatus, email, mobile, country, state, city, postalCode, address, photoUrl, lineManagerId, status, officeId, departmentId, companyId, createAt) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
                [
                    data.firstName,
                    data.lastName,
                    data.dateOfBirth,
                    data.gender,
                    data.nationality,
                    data.maritalStatus,
                    data.email,
                    data.mobile,
                    data.country, 
                    data.state, 
                    data.city, 
                    data.postalCode, 
                    data.address, 
                    data.photoUrl, 
                    data.lineManagerId, 
                    data.status, 
                    data.officeId, 
                    data.departmentId, 
                    data.companyId,
                    data.createAt
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        console.log(error);
                        return callback(error);
                    }
                    else{
                      //on success get the account details
                      var displayName = data.firstName + " " + data.lastName;
                      pool.query(`${oneEmployeeSql} where e.email = ?`, [data.email], (error, results, fields) => {
                        if(error)
                        {
                            console.log(error);
                            return callback(error);
                        }
                        else{
                          var emp = results[0];
                          //after getting details create a user account for employee
                          pool.query(`insert into users(displayName, imageUrl, email, password, employeeId, roleId, companyId, lastPassword, status) values(?,?,?,?,?,?,?,?,?)`,
                          [
                            displayName,
                            data.photoUrl,
                            data.email,
                            encrypt(data.password),
                            emp.employeeId,
                            data.roleId,
                            data.companyId,
                            encrypt(data.password),
                            1
                          ], 
                          (error, result, fields) => {
                            if(error)
                            {
                                return callback(error);
                            }
                            else{
                              sendResetEmail(data.email, data.password, (error, result) => {
                                if(error){
                                  console.error(error);
                                }
                                else{
                                  console.log(result);
                                }
                              });
                              return callback(null, parseOneEmployeeJson(emp));
                            }
                          });
                        }
                      });
                      
                    }
                    
                });
            }
            else{
                return callback("employee account already exists with this email. Please update the employee profile");
            }
        });
       
    },
    updateEmployee : (req, callback) => {
      var data = req.body;
        const now = new Date();
        let roleId = null;
        let password = null;
        data.modifiedAt = now;
        if(req.files.length > 0)
        {
          req.files.forEach(file => {
            data[file.fieldname] = req[file.fieldname];
          });
        }
        if(data.roleId){
          roleId = data.roleId;
          data.roleId = null;
        }

        if(data.password){
          password = data.password;
          data.password = null;
        }
        pool.query(`${oneEmployeeSql} where e.employeeId = ?`, [data.employeeId], (error, result, fields) => {
            if(error)
            {
                return callback(error);
            }
            if(result.length > 0)
            {
              let sql = 'UPDATE employees SET ';
              const setClauses = [];
              
              for (const key in data) {
                  if (data[key] !== null) {
                  setClauses.push(`${key} = ?`);
                  }
              }
              sql += setClauses.join(', '); 
              sql += ' WHERE employeeId = ?'; 
      
              const values = [...Object.values(data).filter(val => val !== null), data.employeeId];
              pool.query(sql, values,
                (error, result, fields) => 
                {
                    if(error)
                    {
                        console.log(error);
                        return callback(error);
                    }
                    else{
                      pool.query(`${oneEmployeeSql} where e.employeeId = ?`, [data.employeeId], (error, results, fields) => {
                        if(error)
                        {
                            return callback(error);
                        }
                        else{
                          var emp = results[0];
                          //after getting details create a user account for employee
                          if(password){
                            pool.query(`update users set password = ?, lastPassword = ?, roleId = ? where employeeId = ?`,
                            [
                              encrypt(password),
                              encrypt(password),
                              roleId,
                              emp.employeeId
                            ], 
                            (error, result, fields) => {
                              if(error)
                              {
                                  return callback(error);
                              }
                              else{
                                return callback(null, parseOneEmployeeJson(emp));
                              }
                            });
                          }
                          else{
                            return callback(null, parseOneEmployeeJson(emp));
                          }
                          
                        }
                      });
                    }
                });
            }
            else{
                return callback("Employee Account not exists. Please create account first to update the data");
            }
        });
    }, 

    updateProfilePhoto: (req, callback)=> {
      var data = req.body;
      var photoUrl = "";
      if(req.files.length > 0)
      {
        req.files.forEach(file => {
          data[file.fieldname] = req[file.fieldname];
        });
        pool.query(`update employees set photoUrl = ? where employeeId = ?`, [data.photoUrl, data.employeeId], (error, result) => {
          if(error)
            {
                return callback(error);
            }
            else{
              return callback(null, result);
            }
        });
      }
      else{
        return callback("profile photo file is required");
      }

      

    },

    updateCurrentJob: (req, callback)=> {
      var data = req.body;
      if(req.query.type == "new"){
        //add new record
        pool.query(`insert into employee_job_info(employeeId, jobTitleId, joinDate, departmentId, officeId, positionType, employmentType, isCurrent, jobType) values(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.employeeId, data.jobTitleId, data.joinDate, data.departmentId, data.officeId, data.positionType, data.employmentType, data.isCurrent, data.jobType], (error, result) => {
          if(error)
            {
                return callback(error);
            }
            else{
              //update all the other records current value to 0
              pool.query(`update employee_job_info set isCurrent = 0 where employeeId = ? and jobTitleId != ?`, [data.employeeId, data.jobTitleId], (error, result) =>{
                if(error)
                {
                    return callback(error);
                }
                else{
                  return callback(null, result);
                }
              });
              
            }
        });
      }
      else{
        pool.query(`update employee_job_info set jobTitleId = ?, joinDate = ?, departmentId = ?, officeId = ?, positionType = ?, employmentType = ?, isCurrent = ?, jobType = ? where employeeId = ? and jobInfoId = ?`, [ data.jobTitleId, data.joinDate, data.departmentId, data.officeId, data.positionType, data.employmentType, data.isCurrent, data.jobType, data.employeeId, data.jobInfoId], (error, result) => {
          if(error)
            {
                return callback(error);
            }
            else{
              return callback(null, result);
            }
        });
      }

    },

    updateCurrentSalary: (req, callback)=> {
      var data = req.body;
      if(req.query.type == "new"){
        //add new record
        pool.query(`insert into employee_salary_info(employeeId, effectiveStart, effectiveEnd, basicSalary, transportAllowance, houseRentAllowance, netSalary, reason, currency, current) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.employeeId, data.effectiveStart, data.effectiveEnd, data.basicSalary, data.transportAllowance, data.houseRentAllowance, data.netSalary, data.reason, data.currency, data.current], (error, result) => {
          if(error)
            {
                return callback(error);
            }
            else{
              //update all the other records current value to 0
              pool.query(`update employee_salary_info set current = 0 where employeeId = ? and netSalary != ?`, [data.employeeId, data.netSalary], (error, result) =>{
                if(error)
                {
                    return callback(error);
                }
                else{
                  return callback(null, result);
                }
              });
              
            }
        });
      }
      else{
        pool.query(`update employee_salary_info set effectiveStart = ?, effectiveEnd = ?, basicSalary = ?, transportAllowance = ?, houseRentAllowance = ?, netSalary = ?, reason = ?, currency = ?, current = ? where employeeId = ? and salaryId = ?`, [data.effectiveStart, data.effectiveEnd, data.basicSalary, data.transportAllowance, data.houseRentAllowance, data.netSalary, data.reason, data.currency, data.current, data.employeeId, data.salaryId], (error, result) => {
          if(error)
            {
                return callback(error);
            }
            else{
              return callback(null, result);
            }
        });
      }

    },

    updateBankInfo: (req, callback)=> {
      var data = req.body;
      if(req.query.type == "new"){
        //add new record
        pool.query(`insert into employee_bank_info(employeeId, bankName, branch, accountName, accountNumber, swift, iban) values(?, ?, ?, ?, ?, ?, ?)`, [data.employeeId, data.bankName, data.branch, data.accountName, data.accountNumber, data.swift, data.iban], (error, result) => {
          if(error)
            {
                return callback(error);
            }
            else{
              return callback(null, result);
            }
        });
      }
      else{
        pool.query(`update employee_bank_info set bankName = ?, branch = ?, accountName = ?, accountNumber = ?, swift = ?, iban = ? where employeeId = ? and bankId = ?`, [data.bankName, data.branch, data.accountName, data.accountNumber, data.swift, data.iban, data.employeeId, data.bankId], (error, result) => {
          if(error)
            {
                return callback(error);
            }
            else{
              return callback(null, result);
            }
        });
      }

    },

    deleteEmployee: (req, callback) => {
      var data = req.body;
      // Array to store the queries
      const queries = [
          'delete from employees where employeeId = ?',
          'delete from users where employeeId = ?',
          'delete from employee_attendance where employeeId = ?',
          'delete from employee_bank_info where employeeId = ?',
          'delete from employee_benefit where employeeId = ?',
          'delete from employee_dependants where employeeId = ?',
          'delete from employee_documents where employeeId = ?',
          'delete from employee_emergency_contacts where employeeId = ?',
          'delete from employee_job_info where employeeId = ?',
          'delete from employee_leave_requests where employeeId = ?',
          'delete from employee_offboard_info where employeeId = ?',
          'delete from employee_payroll_info where employeeId = ?',
          'delete from employee_probation_info where employeeId = ?',
          'delete from employee_salary_info where employeeId = ?'
      ];
  
      // Execute each query separately
      const deleteQueries = queries.map(query => {
          return new Promise((resolve, reject) => {
              pool.query(query, [data.employeeId], (error, results, fields) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(results);
                  }
              });
          });
      });
  
      // Execute all delete queries
      Promise.all(deleteQueries)
          .then(results => {
              // All queries executed successfully
              callback(null, results);
          })
          .catch(error => {
              // Error occurred while executing queries
              callback(error);
          });
  },
  

    getEmployeeById : (data, callback) =>{
        pool.query(`
        ${oneEmployeeSql} 
        where e.employeeId  = ?
        `, [data.userId], (error, result, fields)=> {
            if(error)
            {
                return callback(error);
            }
            else{
                var length = result.length;
                if(length > 0){
                    var a = result[0];
                    var user = parseOneEmployeeJson(a);
                    return callback(null, user);
                }
                else{
                    return callback("account not exists please create first");
                }
            }
    
        });
    },

    getAllEmployees : (data, callback) => {
      var text = "";
      if(data.search_text){
          text = data.search_text;
      }
      pool.query(`${employeeSql} where (e.firstName like ? or e.lastName like ? or e.gender like ? or e.idNo like ? or e.nationality like ? or e.maritalStatus like ? or e.email like ? or e.mobile like ? or e.country like ? or e.state like ? or e.city like ? or e.address like ? or e.status like ? or e.passportNo like ? or e.visaType like ? or e.visaNo like ? or o.name like ? or d.name like ? or r.role like ?) and e.companyId = ?`,
       [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, data.companyId], 
       (error, results, fields)=> {
          if(error)
          {
              return callback(error);
          }
          else{
              var employees = [];
              for(var d in results){
                employees.push(parseEmployeeJson(results[d]));
              }
              return callback(null, employees);
          }
              
       });
  },

  getUserRoles : (data, callback) => {
    var text = "";
    if(data.search_text){
        text = data.search_text;
    }
    pool.query(`select * from user_roles where companyId = ?`,
     [ data.companyId], 
     (error, results, fields)=> {
        if(error)
        {
            return callback(error);
        }
        else{
            return callback(null, results);
        }
            
     });
},

getEmployeeSalaryHistory : (data, callback) => {

  pool.query(`select * from employee_salary_info where employeeId = ?`,
   [ data.employeeId], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
          return callback(null, results);
      }
          
   });
},

getEmployeeBankInfo: (data, callback) => {

  pool.query(`select * from employee_bank_info where employeeId = ?`,
   [ data.employeeId], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
          var info = {};
          if(results.length > 0){
            info = results[0];
          }
          return callback(null, info);
      }
          
   });
},

getEmployeeJobHistory : (data, callback) => {

  pool.query(`
  select 
  jobInfoId,
  employeeId, 
  jobTitleId, 
  joinDate, 
  j.departmentId, 
  j.officeId, 
  positionType, 
  employmentType, 
  isCurrent, 
  jobType, 
  j.createAt, 
  j.modifiedAt,
  id, 
  title, 
  t.description, 
  t.createAt as titleCreateAt, 
  t.modifiedAt as titleModifiedAt,  
  o.name as office, 
  d.name as department
  from 
  employee_job_info j 
  left join job_titles t on t.id = j.jobInfoId
  left join offices o on o.officeId = j.officeId
  left join departments d on d.departmentId = j.departmentId
  where j.employeeId = ?`,
   [ data.employeeId], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
           var history = [];
           for(var d in results){
            var item = results[d];
            var job = null;
            var jobTitle = {
              id: item.id,
              title: item.title,
              description : item.description,
              createAt: item.titleCreateAt,
              modifiedAt : item.titleModifiedeAt
            };
            var office = {
              officeId: item.officeId,
              name : item.office
            };
            var department = {
              departmentId : item.departmentId,
              name : item.department
            };

            job = {
              jobInfoId : item.jobInfoId,
              jobTitle : jobTitle,
              office : office,
              department : department,
              employeeId: item.employeeId,
              departmentId: item.departmentId,
              officeId: item.officeId,
              positionType: item.positionType,
              jobTitleId: item.jobTitleId,
              isCurrent: item.isCurrent,
              employmentType: item.employmentType,
              joinDate: item.joinDate,
              jobType: item.jobType,
              createAt: item.createAt,
              modifiedAt: item.modifiedAt,
            };

            history.push(job);
           }
          return callback(null, history);
      }
          
   });
},

getEmployeePayrollHistory : (data, callback) => {

  pool.query(`
  SELECT
  payrollId, 
  p.salaryId, 
  fileUrl, 
  paidAmount, 
  cutAmount, 
  cutReason, 
  paidDate, 
  paymentMethod,
  p.createAt, 
  p.modifiedAt,
  p.jobInfoId,
  p.employeeId, 
  jobTitleId, 
  joinDate, 
  j.departmentId, 
  j.officeId, 
  positionType, 
  employmentType, 
  isCurrent, 
  jobType, 
  j.createAt, 
  j.modifiedAt,
  id, 
  title, 
  t.description, 
  t.createAt as titleCreateAt, 
  t.modifiedAt as titleModifiedAt,  
  o.name as office, 
  d.name as department,
  effectiveStart, 
  effectiveEnd, 
  basicSalary, 
  transportAllowance, 
  houseRentAllowance, 
  netSalary, 
  reason, 
  currency, 
  current 
  FROM 
  employee_payroll_info p 
  left join employee_job_info j on j.jobInfoId = p.jobInfoId
  left join job_titles t on t.id = j.jobInfoId
  left join offices o on o.officeId = j.officeId
  left join departments d on d.departmentId = j.departmentId
  left join employee_salary_info s on s.salaryId = p.salaryId
  where p.employeeId = ?`,
   [ data.employeeId], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
           var history = [];
           for(var d in results){
            var item = results[d];
            var job = null;
            var salaryInfo = null;
            var payroll = null;
            var jobTitle = {
              id: item.id,
              title: item.title,
              description : item.description,
              createAt: item.titleCreateAt,
              modifiedAt : item.titleModifiedeAt
            };
            var office = {
              officeId: item.officeId,
              name : item.office
            };
            var department = {
              departmentId : item.departmentId,
              name : item.department
            };

            job = {
              jobInfoId : item.jobTitle,
              jobTitle : jobTitle,
              office : office,
              department : department,
              employeeId: item.employeeId,
              departmentId: item.departmentId,
              officeId: item.officeId,
              positionType: item.positionType,
              jobTitleId: item.jobTitleId,
              isCurrent: item.isCurrent,
              employmentType: item.employmentType,
              joinDate: item.joinDate,
              jobType: item.jobType,
              createAt: item.createAt,
              modifiedAt: item.modifiedAt,
            };

            salaryInfo = {
              salaryId  : item.salaryId,
              effectiveStart : item.effectiveStart,
              effectiveEnd : item.effectiveEnd,
              basicSalary: item.basicSalary,
              transportAllowance : item.transportAllowance,
              houseRentAllowance : item.houseRentAllowance,
              netSalary : item.netSalary,
              reason : item.reason,
              currency : item.currency,
              current: item.current
            };

            payroll = {
              jobInfo : job,
              salaryInfo: salaryInfo,
              payrollId : item.payrollId,
              fileUrl : item.fileUrl,
              paidAmount : item.paidAmount,
              cutAmount : item.cutAmount,
              employeeId : item.employeeId,
              jobInfoId : item.jobInfoId,
              salaryId : item.salaryId,
              cutReason : item.cutReason,
              paidDate: item.paidDate,
              paymentMethod: item.paymentMethod,
              createAt : item.createAt,
              modifiedAt : item.modifiedAt

            };

            history.push(payroll);
           }
          return callback(null, history);
      }
          
   });
},

createPayroll : (req, callback) => {
  var data = req.body;
  const now = new Date();
  data.createAt = now;
  if(req.files.length > 0)
  {
    req.files.forEach(file => {
      data[file.fieldname] = req[file.fieldname];
    });
  }


  pool.query(`insert into employee_payroll_info ( employeeId, jobInfoId, salaryId, fileUrl, paidAmount, cutAmount, cutReason, paidDate, paymentMethod) values(?,?,?,?,?,?,?,?,?)`,
  [
    data.employeeId,
    data.jobInfoId,
    data.salaryId,
    data.fileUrl,
    data.paidAmount,
    data.cutAmount,
    data.cutReason,
    data.paidDate,
    data.paymentMethod,
  ],
  (error, results, fields) =>{
    if(error)
    {
        return callback(error);
    }
    else{
        return callback(null, results);
    }
  }
);
},

updatePayroll : (req, callback) => {
  var data = req.body;
  const now = new Date();
  data.createAt = now;
  if(req.files.length > 0)
  {
    req.files.forEach(file => {
      data[file.fieldname] = req[file.fieldname];
    });
  }

  let sql = 'UPDATE employee_payroll_info SET ';
        const setClauses = [];
        
        for (const key in data) {
            if (data[key] !== null) {
            setClauses.push(`${key} = ?`);
            }
        }
        sql += setClauses.join(', '); 
        sql += ' where employeeId = ? and payrollId = ?'; 
        const values = [...Object.values(data).filter(val => val !== null), data.employeeId, data.payrollId];

        pool.query(sql, values, 
            (error, results, fields)=> {
                if(error)
                {
                    return callback(error);
                }
                else{
                    return callback(null, results);
                }
        });
},

deletePayroll: (data, callback) => {
  pool.query(`delete from employee_payroll_info where payrollId = ?`,
   [data.payrollId], 
   (error, results, fields)=> {
      if(error)
          {
              return callback(error);
          }
      return callback(null, results);
   });
},

getVisaTypes : (data, callback) => {
  var text = "";
  if(data.search_text){
      text = data.search_text;
  }
  pool.query(`select * from visaTypes`,
   [], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
          return callback(null, results);
      }
          
   });
},

getCurrencies : (data, callback) => {
  var text = "";
  if(data.search_text){
      text = data.search_text;
  }
  pool.query(`select * from currencies`,
   [], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
          return callback(null, results);
      }
          
   });
},

getJobTitles : (data, callback) => {
  var text = "";
  if(data.search_text){
      text = data.search_text;
  }
  pool.query(`select * from job_titles`,
   [], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
          return callback(null, results);
      }
          
   });
},

getPaymentMethods : (data, callback) => {
  var text = "";
  if(data.search_text){
      text = data.search_text;
  }
  pool.query(`select * from payment_methods`,
   [], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
          return callback(null, results);
      }
          
   });
},

getEmployeeJobInfo : (data, callback) => {
  var text = "";
  if(data.search_text){
      text = data.search_text;
  }
  pool.query(`
  SELECT 
  jobInfoId, 
  employeeId, 
  jobTitleId, 
  j.title as jobTitle, 
  j.description as titleDescription,
  i.description as jobDescription, 
  joinDate, 
  i.departmentId, 
  d.name as department, 
  i.officeId, 
  o.name as office,
  positionType, 
  employmentType, 
  isCurrent, 
  offBoardDate, 
  i.createAt, 
  i.modifiedAt
  FROM employee_job_info i 
  left join job_titles j on i.jobTitleId = j.id
  left join departments d on i.departmentId = d.departmentId
  left join offices o on i.officeId = o.officeId where i.employeeId = ?`,
   [ data.employeeId], 
   (error, results, fields)=> {
      if(error)
      {
          return callback(error);
      }
      else{
          var timeline = [];
          for(var d in results){
            var jobTitle = {};
            var office = {};
            var department = {};

            if(d.jobTitleId){
              jobTitle = {
                id: d.jobTitleId,
                title : d.jobTitle,
                description : d.titleDescription,
              };
            }

            if(d.departmentId){
              department = {
                departmentId : d.departmentId,
                name : d.department
              };
            }

            if(d.officeId){
              office = {
                officeId : d.officeId,
                name : d.office,
              };
            }

            var job = {
              jobInfoId : d.jobInfoId,
              employeeId : d.employeeId,
              description : d.jobDescription,
              departmentId : d.departmentId,
              department : department,
              officeId : d.officeId,
              office : office,
              positionType : d.positionType,
              jobTitleId : d.jobTitleId,
              jobTitle : d.jobTitle,
              isCurrent : d.isCurrent,
              employmentType : d.employmentType,
              joinDate : d.joinDate,
              offBoardDate : d.offBoardDate,
              createAt : d.createAt,
              modifiedAt : d.modifiedAt
            }

            timeline.push(job);

          }
          return callback(null, timeline);
      }
          
   });
},


}