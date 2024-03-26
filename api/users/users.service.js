const pool = require("../../config/database");
const axios = require('axios');
var error = "Error while connecting to database server";
const otpGenerator = require('otp-generator');
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

const { sendEmail } = require('../email_service');
const nodemailer = require('nodemailer');



function sendResetEmail(userEmail, otp , callback) {
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

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
      
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
  <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
    <img align="center" border="0" src="https://ims-filebrowser.zroooe.easypanel.host/api/public/dl/IP32sqFS/image-1.png?inline=true" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 190px;" width="190"/>
    
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
  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 22px; font-weight: 700;"><span><span><span>Your OTP (one-time code) for IMS is</span></span></span></h1>
<!--[if mso]></td></tr></table><![endif]-->

    </td>
  </tr>
</tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
<tbody>
  <tr>
    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
      
<!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center">
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.the1bm.com" style="height:42px; v-text-anchor:middle; width:216px;" arcsize="0%"  strokecolor="#000000" strokeweight="2px" fillcolor="#ffffff"><w:anchorlock/><center style="color:#000000;"><![endif]-->
  <a href="#" class="" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #ffffff; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:38%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;border-top-color: #000000; border-top-style: solid; border-top-width: 2px; border-left-color: #000000; border-left-style: solid; border-left-width: 2px; border-right-color: #000000; border-right-style: solid; border-right-width: 2px; border-bottom-color: #000000; border-bottom-style: solid; border-bottom-width: 2px;font-size: 18px;">
    <span style="display:block;padding:10px 20px;line-height:120%;"><b>${otp}</b></span>
  </a>
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
  <p style="line-height: 140%;">Please verify you're really you by entering this</p>
<p style="line-height: 140%;">6-digit code when resetting your password. Just a heads up, this code will expire</p>
<p style="line-height: 140%;">in 20 minutes for security reasons.</p>
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
  <h1 style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 18px; font-weight: 700;"><span><span><span><span><span><span><span>We noticed you tried to reset your password. If this is not your attention then ignore this email and don't share the OTP with anyone.</span></span></span></span></span></span></span></h1>
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
  var subject = "Password Reset Request";
  sendEmail(userEmail, subject, htmlContent, callback);
}


function isOTPExpired(expireOn){
  // Get the current date and time
  const currentTime = new Date();

  const storedTime = new Date(expireOn.toString());

  // Check if the stored date and time have passed
  if (storedTime < currentTime) {
      return true;
  } else {
    return false;
  }


}

function parseUserJson(a){
    let company = null;
    let employee = null;
    if(a.companyId){
      company = {
        companyId : a.companyId,
        name : a.name,
        tagLine: a.tagLine,
        description : a.companyDescription,
        missionStatement: a.missionStatement,
        visionStatement: a.visionStatement,
        licenseNo: a.licenseNo,
        licenseExpiry: a.licenseExpiry,
        fiscalYear: a.fiscalYear,
        email: a.companyEmail,
        contact: a.contact,
        website: a.website,
        headquarterAddress: a.headquarterAddress,
        country: a.country,
        founder: a.founder,
        logoUrl: a.logoUrl,
        foundedDate: a.foundedDate,
        employeeCount: a.employeeCount,
        subscriptionType: a.subscriptionType,
        subscriptionStart: a.subscriptionStart,
        subscriptionEnd: a.subscriptionEnd,
        createAt: a.companyCreateAt,
        modifiedAt: a.companyModifiedAt,
      }
    }
    var user = {
        userId : a.userId,
        displayName : a.displayName,
        imageUrl : a.imageUrl,
        email : a.email,
        password : a.password,
        employeeId : a.employeeId,
        roleId : a.roleId,
        companyId : a.companyId,
        otp : a.otp,
        otpExpireAt : a.otpExpireAt,
        lastLoginAt : a.lastLoginAt,
        lastPassword : a.lastPassword,
        status : a.status,
        createAt : a.createAt,
        modifiedAt : a.modifiedAt,
        role : {
            roleId : a.roleId,
            role : a.role,
            permissions : a.permissions,
            description : a.description,
            createAt : a.roleCreateAt,
            modifiedAt : a.roleModifiedAt,
        },
        company: company,
        employee: employee
    };
    return user;

}


var userSql = 
`select 
u.userId, 
displayName, 
imageUrl, 
u.email, 
password, 
employeeId, 
u.roleId, 
u.companyId, 
otp, 
otpExpireAt, 
lastLoginAt, 
lastPassword, 
status, 
u.createAt, 
u.modifiedAt,
u.roleId, 
role, 
permissions, 
r.description, 
r.createAt as roleCreateAt, 
r.modifiedAt as roleModifiedAt,
name, 
tagLine, 
c.description as companyDescription, 
missionStatement, 
visionStatement, 
licenseNo, 
licenseExpiry, 
fiscalYear, 
c.email as companyEmail, 
contact, 
website, 
headquarterAddress, 
country, 
logoUrl, 
founder, 
foundedDate, 
employeeCount, 
subscriptionType, 
subscriptionStart, 
subscriptionEnd, 
c.createAt as companyCreateAt, 
c.modifiedAt as companyModifiedAt
from users u left join
user_roles r on u.roleId = r.roleId
left join companies c on u.companyId = c.companyId `;


module.exports = {
    create : (req, callback) => {
        // Initialize imageUrl to null
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.createAt = now;
        if(req.files.length > 0)
        {
          data.imageUrl = req.imageUrl;
        }
        pool.query(`select * from users where email = ?`, [data.email], (error, result, fields) => {
            if(error)
            {
                return callback(error);
            }
            if(result.length <= 0)
            {
    
                pool.query(`Insert into users (displayName, imageUrl, email, password, employeeId, roleId, companyId, otp, otpExpireAt, lastPassword) values (?,?,?,?,?,?,?,?,?,?)`, 
                [
                    data.displayName, 
                    imageUrl, 
                    data.email, 
                    encrypt(data.password),
                    data.employeeId, 
                    data.roleId, 
                    data.companyId,
                    data.otp, 
                    data.otpExpireAt, 
                    encrypt(data.password), 
                ],
                (error, result, fields) => 
                {
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
                return callback("user account already exists with this email. Please login instead");
            }
        });
       
    },

    updateUser : (req, callback) => {
        var data = req.body;
        const now = new Date();
        data.modifiedAt = now;
        if(req.files.length > 0)
        {
          data.imageUrl = req.imageUrl;
        }
        let sql = 'UPDATE users SET ';
        const setClauses = [];
        if(data.password){
            data.password = encrypt(data.password);
            data.lastPassword = encrypt(data.password);
        }
        for (const key in data) {
            if (data[key] !== null) {
            setClauses.push(`${key} = ?`);
            }
        }
        sql += setClauses.join(', '); 
        sql += ' WHERE userId = ?'; 

        const values = [...Object.values(data).filter(val => val !== null), data.userId];
        pool.query(sql, values,
                (error, result, fields) => 
                {
                    if(error)
                    {
                        console.log(error);
                        return callback(error);
                    }
                    else{
                        return callback(null, "user account is updated");
                    }
                });
    },

    userLogin : (data, callback) =>{
        pool.query(`
        ${userSql}
        where u.email  = ?
        `, [data.email], (error, result, fields)=> {
            if(error)
            {
                return callback(error);
            }
            else{
                var length = result.length;
                if(length > 0){
                    var a = result[0];
                    var user = parseUserJson(a);
                    const x = decrypt(user.password);
                    const passwordMatch = x==data.password;
                    if(user.status == 0){
                        return callback("You are not allowed to login this system.");
                    }
                    else if(passwordMatch == false){
                        return callback("You entered wrong password.");
                    }
                    else{
                        return callback(null, user);
                    }
                }
                else{
                    return callback("account not exists please sign up first");
                }
            }
    
        });
    },

    getUserById : (data, callback) =>{
        pool.query(`
        ${userSql}
        where u.userId  = ?
        `, [data.userId], (error, result, fields)=> {
            if(error)
            {
                return callback(error);
            }
            else{
                var length = result.length;
                if(length > 0){
                    var a = result[0];
                    var user = parseUserJson(a);
                    return callback(null, user);
                }
                else{
                    return callback("account not exists please sign up first");
                }
            }
    
        });
    },

    requestResetPassword: (data, callback) => {
        pool.query(`select * from users where email = ? `, [data.email], (error, results) =>{
          if(error){
            return callback(error);
          }
          else{
            var length = results.length;
            if(length > 0){
              const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, specialChars: false, upperCaseAlphabets: false });
              let currentTime = new Date();
              // Add 20 minutes to the current time
              currentTime.setMinutes(currentTime.getMinutes() + 20);
              sendResetEmail(data.email, otp, (error, result)=>{
                  if(error){
                      return callback(error);
                  }
                  else{
                      pool.query(`update users set otp = ?, otpExpireAt = ? where email = ?`, [otp, currentTime, data.email], (err, results) =>{
                        if(err){
                          return callback(err);
                        }
                        else{
                          return callback(null, result);
                        }
                      }
                      );
                      
                  }
              });
            }
            else{
              return callback("No account associated with the input email.");
            }
          }
        });
        
    },
   
    updatePassword: (data, callback) =>{
        const now = new Date();
        data.modifiedAt = now;
        pool.query(`select * from users where email = ?`, [data.email], (error, result)=>{
          if(error)
            {
                return callback("Error while resetting password");
            }
            else{
              var length = result.length;
              if(length > 0){
                var user = result[0];
                var expire = isOTPExpired(user.otpExpireAt);
                console.log(user.otpExpireAt);
                if(expire == false){
                  if(data.otp == user.otp){
                    if(decrypt(user.password) == data.password){
                      return callback('This password already used. Use new password.');
                    }
                    else{
                      pool.query(`Update users set password = ?, modifiedAt = ?, otpExpireAt = ?, lastPassword = ? where email = ?`, 
                      [
                          encrypt(data.password), 
                          data.modifiedAt,
                          data.modifiedAt,
                          encrypt(data.password), 
                          data.email,
                      ],
                      (error, result, fields) => 
                      {
                          if(error)
                          {
                              return callback("Error while resetting password");
                          }
                          else{
                            return callback(null, "Password Changed Now");
                          }
                      });
                    }
                  }
                  else{
                    return callback("Invalid OTP");
                  }
                }
                else{
                  return callback('OTP is expired. Please create new request for password reset.');
                }
              }
              else{
                return callback('No user found.');
              }
            }
        });
        
    },
   
   
}