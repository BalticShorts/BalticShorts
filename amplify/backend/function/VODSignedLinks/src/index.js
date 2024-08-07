const AWS = require('aws-sdk');
const forge = require('node-forge');

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

// Main Lambda handler function
exports.handler = async (event) => {
    try {
        console.log('Event:', event);

        // Extract URL from POST body or query parameters
        let url;
        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body);
            url = body.url || 'https://vod.balticshorts.com/out/*'; // Use wildcard if URL is not provided
        } else {
            url = event.queryStringParameters?.url || 'https://vod.balticshorts.com/out/*'; // For GET requests
        }
        console.log('Original URL:', url);

        // Replace index.m3u8 with *
        url = replaceM3U8WithWildcard(url);
        console.log('Modified Resource URL:', url);
        const cookieDomain = 'balticshorts.com';
        // 
        const signedCookies = await generateSignedCookies(url);
        const cookieHeaders = Object.entries(signedCookies).map(([name, value]) => ({
            name,
            value: `${name}=${value}; Path=/; Domain: ${cookieDomain}; HttpOnly; Secure; SameSite=None`
        }));

        return {
            statusCode: 200,
            multiValueHeaders: {
                't1': cookieHeaders[0].value,
                't2': cookieHeaders[1].value,
                't3': cookieHeaders[2].value,
                'Set-Cookie': cookieHeaders.map(cookie => cookie.value),
                'Access-Control-Allow-Origin': ['https://testdev.balticshorts.com', 'http://localhost'], // Enable CORS if needed
                'Content-Type': ['application/json']
            },
            body: signedCookies,
            isBase64Encoded: false
        };
    } catch (err) {
        console.error('Lambda execution error:', err);
        return {
            statusCode: 500,
            multiValueHeaders: {
                'Access-Control-Allow-Origin': ['https://testdev.balticshorts.com', 'http://localhost'], // Enable CORS if needed
                'Content-Type': ['application/json']
            },
            body: JSON.stringify('Error generating signed cookies'),
            isBase64Encoded: false
        };
    }
};
