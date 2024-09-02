const AWS = require('aws-sdk');
const forge = require('node-forge');
const replacementChars = {'+':'-', '=':'_', '/':'~'}
const crypto = require('crypto');

// Initialize AWS SDK
const secretsManager = new AWS.SecretsManager({ region: 'eu-north-1' });

// Function to retrieve the secret from AWS Secrets Manager
async function getSecret() {
    const params = {
        SecretId: 'arn:aws:secretsmanager:eu-north-1:052035778887:secret:bs/prod/privateKey-aZ7V0O'
    };

    try {
        const data = await secretsManager.getSecretValue(params).promise();
        if (data.SecretString) {
            const val = JSON.parse(data.SecretString);
            const key = Object.keys(val)[0];
            const value = val[key];
            return { key, value };
        } else {
            throw new Error('SecretString not found in AWS Secrets Manager response');
        }
    } catch (err) {
        throw err;
    }
}

function convertPrivateKeyToPKCS8(privateKeyPEM) {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPEM);
    const privateKeyInfo = forge.pki.wrapRsaPrivateKey(forge.pki.privateKeyToAsn1(privateKey));
    return forge.pki.privateKeyInfoToPem(privateKeyInfo);
}

function replaceM3U8WithWildcard(url) {
    return url.replace(/index\.m3u8$/, '*');
}

async function generateSignedCookies(resource) {
    try {
        const { key, value } = await getSecret();
        console.log('Resource:', resource);
        let formattedPrivateKey = value;
        if (value.startsWith('-----BEGIN RSA PRIVATE KEY-----')) {
            formattedPrivateKey = convertPrivateKeyToPKCS8(value);
        }

        const expiryTime = Math.floor((Date.now() + 3600000) / 1000); // 1 hour expiration
        const policy = JSON.stringify({
            "Statement": [{
                "Resource": resource,
                "Condition": {
                    "DateLessThan": { "AWS:EpochTime": expiryTime }
                }
            }]
        });

        const signer = new AWS.CloudFront.Signer(key, formattedPrivateKey);

        return new Promise((resolve, reject) => {
            signer.getSignedCookie({ policy }, (err, signedCookies) => {
                if (err) {
                    console.error('Error generating signed cookies:', err);
                    reject(err);
                } else {
                    console.log('Signed Cookies:', signedCookies);
                    resolve(signedCookies);
                }
            });
        });
    } catch (err) {
        console.error('Error generating signed cookies:', err);
        throw err;
    }
}

// Function to generate signed URL components using a custom policy
async function generateSignedUrlComponents(url) {
    try {
        const { key, value } = await getSecret();
        console.log('URL to sign:', url);
        let formattedPrivateKey = value;

        // Convert private key to PKCS8 format if needed
        if (value.startsWith('-----BEGIN RSA PRIVATE KEY-----')) {
            formattedPrivateKey = convertPrivateKeyToPKCS8(value);
        }

        // Define custom policy with a specific expiration time (1 hour from now)
        const expiryTime = Math.floor((Date.now() + 3600000) / 1000); // 1 hour expiration in seconds
        const policy = JSON.stringify({
            "Statement": [{
                "Resource": url,
                "Condition": {
                    "DateLessThan": { "AWS:EpochTime": expiryTime }
                }
            }]
        });

//         // Create the CloudFront signer
//         const signer = new AWS.CloudFront.Signer(key, formattedPrivateKey);

//         // Get the signed URL components using the custom policy
//         const a = signer.getSignedUrl({
//             url,
//             policy,
//         });
        let encodedPolicy = new Buffer.from(policy).toString("base64");
        encodedPolicy = encodedPolicy.replace(/[+=/]/g, m => replacementChars[m]);
        console.log('Encoded Policy', encodedPolicy);

        
        const signer = crypto.createSign('RSA-SHA1');
        signer.update(policy);
        let signedPolicy = signer.sign(formattedPrivateKey, 'base64');
        signedPolicy = signedPolicy.replace(/[+=/]/g, m => replacementChars[m]);
        console.log('Signed Policy', signedPolicy);
    
        const paramDelimiter = (url.indexOf('?') === -1) ? '?' : '&';
        const cfSignedUrlAddon = `${paramDelimiter}Policy=${encodedPolicy}&Signature=${signedPolicy}&Key-Pair-Id=${key}`;
    
        console.log('Signed URL Components:', cfSignedUrlAddon);
        return cfSignedUrlAddon;
    } catch (err) {
        console.error('Error generating signed URL components:', err);
        throw err;
    }
}

async function sd(event, data, callback) {

    customPolicy = JSON.stringify(customPolicy);
  
    let encodedPolicy = new Buffer.from(customPolicy).toString("base64");
    encodedPolicy = encodedPolicy.replace(/[+=/]/g, m => replacementChars[m]);
  
    const signer = crypto.createSign('RSA-SHA1');
    signer.update(customPolicy);
    let signedPolicy = signer.sign(await getKeyFromSecretsManager(), 'base64');
    signedPolicy = signedPolicy.replace(/[+=/]/g, m => replacementChars[m]);
  
    const paramDelimiter = (event.baseUrl.indexOf('?') === -1) ? '?' : '&';
    const cfSignedUrl = `${event.baseUrl}${paramDelimiter}Policy=${encodedPolicy}&Signature=${signedPolicy}&Key-Pair-Id=${process.env.amazonCloudFrontKeyPairId}`;
  
    const response = {
      cfSignedUrl: cfSignedUrl
    };
    callback(null,response);
  }


// Main Lambda handler function
// exports.handler = async (event) => {
//     try {
//         console.log('Event:', event);

//         // Extract URL from POST body or query parameters
//         let url;
//         if (event.httpMethod === 'POST') {
//             const body = JSON.parse(event.body);
//             url = 'https://vod.balticshorts.com/*'; // body.url || Use wildcard if URL is not provided
//         } else {
//             url = 'https://vod.balticshorts.com/*'; // event.queryStringParameters?.url ||  For GET requests
//         }
//         console.log('Original URL:', url);

//         // Replace index.m3u8 with *
//         url = replaceM3U8WithWildcard(url);
//         console.log('Modified Resource URL:', url);
//         const cookieDomain = '.balticshorts.com';
//         // 
//         const signedCookies = await generateSignedCookies(url);
//         const cookieHeaders = Object.entries(signedCookies).map(([name, value]) => ({
//             name,
//             value: `${name}=${value}; Path=/; Domain: ${cookieDomain}; HttpOnly; Secure; SameSite=Lax`
//         }));

//         return {
//             statusCode: 200,
//             cookies: cookieHeaders.map(cookie => cookie.value),
//             multiValueHeaders: {
//                 't1': cookieHeaders[0].value,
//                 't2': cookieHeaders[1].value,
//                 't3': cookieHeaders[2].value,
//                 'Set-Cookie': cookieHeaders.map(cookie => cookie.value),
//                 'Access-Control-Allow-Origin': ['https://testdev.balticshorts.com', 'http://localhost'], // Enable CORS if needed
//                 'Content-Type': ['application/json']
//             },
//             body: signedCookies,
//             isBase64Encoded: false
//         };
//     } catch (err) {
//         console.error('Lambda execution error:', err);
//         return {
//             statusCode: 500,
//             multiValueHeaders: {
//                 'Access-Control-Allow-Origin': ['https://testdev.balticshorts.com', 'http://localhost'], // Enable CORS if needed
//                 'Content-Type': ['application/json']
//             },
//             body: JSON.stringify('Error generating signed cookies'),
//             isBase64Encoded: false
//         };
//     }
// };

// Main Lambda handler function
// Main Lambda handler function
exports.handler = async (event) => {
    try {
        console.log('Event:', event);

        // Extract URL from POST body or query parameters
        let url;
        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body);
            url = 'https://vod.balticshorts.com/*'; //  body.url || Use provided URL or default wildcard URL
        } else {
            url = 'https://vod.balticshorts.com/*'; //  event.queryStringParameters?.url ||
        }
        console.log('Original URL:', url);

        // Replace index.m3u8 with *
        url = replaceM3U8WithWildcard(url);
        console.log('Modified Resource URL:', url);

        // Generate signed URL components (custom policy, signature, key pair ID)
        const cfSignedUrlAddon = await generateSignedUrlComponents(url);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://testdev.balticshorts.com', // Enable CORS if needed
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cfSignedUrlAddon),
        };
    } catch (err) {
        console.error('Lambda execution error:', err);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': 'https://testdev.balticshorts.com', // Enable CORS if needed
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Error generating signed URL components' }),
        };
    }
};
